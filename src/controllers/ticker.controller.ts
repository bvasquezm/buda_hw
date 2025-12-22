import { Client } from '../clients/client';
import { Request, Response } from 'express';
import { TickerService } from '../services/ticker.service';

export class TickerController {
  readonly tickerService: TickerService;

  constructor(client: Client) {
    this.tickerService = new TickerService(client);
  } 

  getPrice = async (req: Request, res: Response) => {
    try {
      const marketId = req.params.marketId;
      const price = await this.tickerService.getPrice(marketId);
      res.json({ marketId, price });
    } catch (error) {
      console.error('Error fetching ticker price:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}