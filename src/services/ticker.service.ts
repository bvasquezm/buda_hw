import { BudaClient } from '../clients/buda/buda.client';

export class TickerService {
  constructor(private budaClient: BudaClient) {}

  async getPrice(marketId: string): Promise<number> {
    const ticker = await this.budaClient.getTicker(marketId);
    return parseFloat(ticker.ticker.last_price[0]);
  }

  async getPrices(marketIds: string[]): Promise<Map<string, number>> {
    const prices = await Promise.all(
      marketIds.map(async (id) => {
        try {
          const price = await this.getPrice(id);
          return [id, price] as [string, number];
        } catch (error) {
          console.error(`Error fetching price for ${id}`, error);
          return [id, 0] as [string, number];
        }
      })
    );

    return new Map(prices);
  }
}
