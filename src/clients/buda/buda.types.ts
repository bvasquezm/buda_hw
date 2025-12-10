export interface BudaMarket {
  id: string;
  minimum_order_amount: [string, string];
  base_currency: string;
  quote_currency: string;
}

export interface BudaTicker {
  ticker: {
    market_id: string;
    last_price: [string, string];
    volume: [string, string];
    min_ask: [string, string];
    max_bid: [string, string];
    price_variation_24h: string;
    price_variation_7d: string;
  };
}

export interface BudaOrderBook {
  order_book: {
    bids: [string, string][];
    asks: [string, string][];
  };
}

export interface BudaMarketsResponse {
  markets: BudaMarket[];
}
