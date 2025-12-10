import { Request, Response } from 'express';
import { PortfolioService } from '../services/portfolio.service';
import { validatePortfolio } from '../utils/validators';

export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  getValue = async (req: Request, res: Response) => {
    try {
      if (!validatePortfolio(req.body)) {
        return res.status(400).json({ error: 'Invalid portfolio format' });
      }

      const result = await this.portfolioService.calculateValue(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error calculating portfolio value:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
