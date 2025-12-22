import { Portfolio, PortfolioValue, CoinValue } from '../models/portfolio.model';
import { MarketService } from './market.service';
import { TickerService } from './ticker.service';
import { validateMinimumAmount } from '../utils/validators';
import { getMarketsIds } from '../utils/calculations';
import { Client } from '../clients/client';

export class PortfolioService {
  readonly marketService: MarketService = new MarketService(this.client);
  readonly tickerService: TickerService = new TickerService(this.client);

  constructor(private client: Client) {}

  async calculateValue(payload: Portfolio): Promise<PortfolioValue> {
    const breakdown: CoinValue[] = [];
    const marketIds = getMarketsIds(payload.portfolio, payload.fiat_currency);
    const prices = await this.tickerService.getPrices(marketIds);

    for (const [coin, amount] of Object.entries(payload.portfolio)) {
      if (coin === payload.fiat_currency) {
        breakdown.push({ coin, value: amount });
        continue;
      }

      const market = await this.marketService.findMarket(coin, payload.fiat_currency);

      if (!validateMinimumAmount(amount, market)) {
        console.warn(`Amount below minimum for ${market?.id}`);
        return { 
          success: false,
          totalValue: 0,
          fiat_currency: payload.fiat_currency,
          breakdown: [],
          errorMessage: `Amount for ${coin} is below the minimum required.` 
        };
      }

      const price = prices.get(market?.id || '') || 0;
      const value = amount * price;

      breakdown.push({ coin, value, price, amount });
    }

    const totalValue = breakdown.reduce((sum, item) => sum + item.value, 0);

    return {
      success: true,
      totalValue,
      fiat_currency: payload.fiat_currency,
      breakdown
    };
  }
}
