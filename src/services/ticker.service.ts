import { Client } from '../clients/client';
import { CryptoClient } from '../clients/crypto/crypto.client';
import { BudaClient } from '../clients/buda/buda.client';
import { parseMarketId } from '../utils/parser';

export class TickerService {
  constructor(private client: Client) {}

  async getPrice(marketId: string): Promise<number> {
    const response = await this.client.getTicker(marketId);
    if (this.client instanceof CryptoClient) {
      return response.last ?? 0;
    }

    if (this.client instanceof BudaClient) {
      return response.ticker?.last_price?.[0] ?? response.last ?? 0;
    }

    return response.ticker?.last_price?.[0] ?? response.last ?? 0;
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
