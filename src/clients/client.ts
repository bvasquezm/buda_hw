import axios, { AxiosInstance } from 'axios';

export abstract class Client {
  protected client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 5000,
    });
  }

  abstract getMarkets(): Promise<any>;
  abstract getTicker(marketId: string): Promise<any>;
  abstract getOrderBook(marketId: string): Promise<any>;
}
