import { BudaClient } from '../clients/buda/buda.client';
import { Client } from '../clients/client';
import { CryptoClient } from '../clients/crypto/crypto.client';

export const parseMarketId = (marketId: string, clientId: Client): string => {
  if (clientId instanceof BudaClient) {
    return marketId.toLowerCase().replace('_', '-');
  } else if (clientId instanceof CryptoClient) {
    return marketId.toUpperCase().replace('-', '');
  } else {
    return ''
  }
}