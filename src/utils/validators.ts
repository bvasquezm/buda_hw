import { BudaMarket } from '../clients/buda/buda.types';
import { Portfolio } from '../models/portfolio.model';

export const validateMinimumAmount = (amount: number, market: BudaMarket | undefined): boolean => {
  if (!market) return false;
  const minAmount = parseFloat(market.minimum_order_amount[0]);
  return amount >= minAmount;
};

export const validatePortfolio = (data: Portfolio): boolean => {
  return data instanceof Object && data.portfolio instanceof Object && typeof data.fiat_currency === 'string';
};
