import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolio.controller';
import { BudaClient } from '../clients/buda/buda.client';

const router = Router();
const budaClient = new BudaClient();

const portfolioController = new PortfolioController(budaClient);

router.post('/portfolio/value', portfolioController.getValue);

export default router;
