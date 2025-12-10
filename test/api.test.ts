import request from 'supertest';
import express from 'express';
import portfolioRoutes from '../src/routes/portfolio.routes';

const app = express();
app.use(express.json());
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.use('/api', portfolioRoutes);

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('POST /api/portfolio/value', () => {
    it('should calculate portfolio value with valid input', async () => {
      const portfolio = {
        portfolio: {
          BTC: 1,
          ETH: 1
        },
        fiat_currency: 'CLP'
      };

      const response = await request(app)
        .post('/api/portfolio/value')
        .send(portfolio);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('totalValue');
      expect(response.body).toHaveProperty('fiat_currency', 'CLP');
      expect(response.body).toHaveProperty('breakdown');
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.breakdown)).toBe(true);
    }, 30000);

    it('should reject invalid portfolio format', async () => {
      const invalidPortfolio = {
        portfolio: 'invalid',
        fiat_currency: 'CLP'
      };

      const response = await request(app)
        .post('/api/portfolio/value')
        .send(invalidPortfolio);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should reject missing portfolio', async () => {
      const invalidPortfolio = {
        fiat_currency: 'CLP'
      };

      const response = await request(app)
        .post('/api/portfolio/value')
        .send(invalidPortfolio);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should reject missing currency', async () => {
      const invalidPortfolio = {
        portfolio: {
          BTC: 1
        }
      };

      const response = await request(app)
        .post('/api/portfolio/value')
        .send(invalidPortfolio);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
