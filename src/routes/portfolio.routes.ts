import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolio.controller';
import { TickerController } from '../controllers/ticker.controller';
import { BudaClient } from '../clients/buda/buda.client';
import { CryptoClient } from '../clients/crypto/crypto.client';

const router = Router();
const budaClient = new BudaClient();
const cryptoClient = new CryptoClient();

const portfolioController = new PortfolioController(budaClient);
const tickerController = new TickerController(budaClient);

router.get('/ticker/:marketId/price', tickerController.getPrice);
router.post('/portfolio/value', portfolioController.getValue);

export default router;
 