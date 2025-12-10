export interface Portfolio {
  portfolio: Record<string, number>;
  fiat_currency: string;
}

export interface PortfolioValue {
  success: boolean;
  totalValue: number;
  fiat_currency: string;
  breakdown: CoinValue[];
  errorMessage?: string;
}

export interface CoinValue {
  coin: string;
  value: number;
  price?: number;
  amount?: number;
}
