import { Client } from '../clients/client';
import { BudaMarket } from '../clients/buda/buda.types';
import { getMarketId } from '../utils/calculations';

export class MarketService {
  private marketsCache: BudaMarket[] | null = null;
  private cacheTimestamp: number = 0;
  private CACHE_TTL = 600000; // 10 min

  constructor(private client: Client) {}

  async getMarkets(): Promise<BudaMarket[] | null> {
    const now = Date.now();

    if (this.marketsCache && (now - this.cacheTimestamp) < this.CACHE_TTL) {
      return this.marketsCache;
    }

    const response = await this.client.getMarkets();
    this.marketsCache = response.markets;
    this.cacheTimestamp = now;

    return this.marketsCache;
  }

  async findMarket(coin: string, fiat: string): Promise<BudaMarket | undefined> {
    const markets = await this.getMarkets();
    const marketId = getMarketId(coin, fiat);
    return markets?.find(m => m.id === marketId);
  }
}
