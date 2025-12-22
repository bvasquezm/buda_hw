import { BudaMarketsResponse, BudaTicker, BudaOrderBook } from './buda.types';
import { Client } from '../client';

export class BudaClient extends Client {
  constructor(baseURL: string = 'https://www.buda.com/api/v2/') {
    super(baseURL);
  }

  async getMarkets(): Promise<BudaMarketsResponse> {
    const response = await this.client.get<BudaMarketsResponse>('markets');
    return response.data;
  }

  async getTicker(marketId: string): Promise<BudaTicker> {
    const response = await this.client.get<BudaTicker>(`markets/${marketId}/ticker`);
    return response.data;
  }

  async getOrderBook(marketId: string): Promise<BudaOrderBook> {
    const response = await this.client.get<BudaOrderBook>(`markets/${marketId}/order_book`);
    return response.data;
  }
}
