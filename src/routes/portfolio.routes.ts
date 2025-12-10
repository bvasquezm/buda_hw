import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolio.controller';
import { PortfolioService } from '../services/portfolio.service';
import { MarketService } from '../services/market.service';
import { TickerService } from '../services/ticker.service';
import { BudaClient } from '../clients/buda/buda.client';

const router = Router();

const budaClient = new BudaClient();

const marketService = new MarketService(budaClient);
const tickerService = new TickerService(budaClient);
const portfolioService = new PortfolioService(
  marketService,
  tickerService
);

const portfolioController = new PortfolioController(
  portfolioService
);

router.post('/portfolio/value', portfolioController.getValue);

export default router;
