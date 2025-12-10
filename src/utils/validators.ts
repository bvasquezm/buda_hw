import { BudaMarket } from '../clients/buda/buda.types';

export const validateMinimumAmount = (amount: number, market: BudaMarket | undefined): boolean => {
  if (!market) return false;
  const minAmount = parseFloat(market.minimum_order_amount[0]);
  return amount >= minAmount;
};

export const validatePortfolio = (data: any): boolean => {
  return (
    data &&
    typeof data === 'object' &&
    data.portfolio &&
    typeof data.portfolio === 'object' &&
    typeof data.fiat_currency === 'string'
  );
};
