import { parseMarketId } from '../../utils/parser';
import { Client } from '../client';
import { CryptoMarketsResponse, CryptoTicker, CryptoOrderBook } from './crypto.types';

export class CryptoClient extends Client {
  constructor(baseURL: string = 'https://api.exchange.cryptomkt.com/api/') {
    super(baseURL);
  }

  async getMarkets(): Promise<CryptoMarketsResponse> {
    const response = await this.client.get<CryptoMarketsResponse>('listings');
    return response.data;
  }

  async getTicker(marketId: string): Promise<CryptoTicker> {
    marketId = parseMarketId(marketId, this);
    const response = await this.client.get<CryptoTicker>(`3/public/ticker/${marketId}`);
    return response.data;
  }

  async getOrderBook(marketId: string): Promise<CryptoOrderBook> {
    marketId = parseMarketId(marketId, this);
    const response = await this.client.get<CryptoOrderBook>(`orderbook/${marketId}`);
    return response.data;
  }
}
