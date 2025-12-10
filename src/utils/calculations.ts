export const getMarketId = (coin: string, fiat: string): string => {
  return `${coin.toUpperCase()}-${fiat.toUpperCase()}`;
};

export const getMarketsIds = (holdings: Record<string, number>, fiat: string): string[] => {
  return Object.keys(holdings)
    .filter(coin => coin.toUpperCase() !== fiat.toUpperCase())
    .map(coin => getMarketId(coin, fiat));
}; 

export const parsePrice = (priceArray: [string, string]): number => {
  return parseFloat(priceArray[0]);
};

export const sumValues = (values: number[]): number => {
  return values.reduce((sum, val) => sum + val, 0);
};
