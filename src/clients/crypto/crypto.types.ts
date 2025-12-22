export interface CryptoMarketsResponse {
  data: CryptoMarket[];
}

export interface CryptoMarket {
  id: string;
  symbol: string;
  name: string;
}

export interface CryptoTicker {
  symbol: string;
  price: number;
  volume24h: number;
  percentChange24h: number;
}

export interface CryptoOrderBook {
  symbol: string;
  bids: Array<[number, number]>;
  asks: Array<[number, number]>;
  timestamp: number;
}