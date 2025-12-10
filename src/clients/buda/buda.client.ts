import axios, { AxiosInstance } from 'axios';
import { BudaMarketsResponse, BudaTicker, BudaOrderBook } from './buda.types';

export class BudaClient {
  private client: AxiosInstance;

  constructor(baseURL: string = 'https://www.buda.com/api/v2/') {
    this.client = axios.create({
      baseURL,
      timeout: 5000,
    });
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
