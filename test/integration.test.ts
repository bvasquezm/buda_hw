import { BudaClient } from '../src/clients/buda/buda.client';
import { MarketService } from '../src/services/market.service';
import { TickerService } from '../src/services/ticker.service';
import { PortfolioService } from '../src/services/portfolio.service';

describe('Buda API Integration', () => {
    let budaClient: BudaClient;
    let marketService: MarketService;
    let tickerService: TickerService;
    let portfolioService: PortfolioService;

    beforeAll(() => {
        budaClient = new BudaClient();
        portfolioService = new PortfolioService(budaClient);
        marketService = new MarketService(budaClient);
        tickerService = new TickerService(budaClient);
    });

    describe('BudaClient', () => {
        it('should fetch markets', async () => {
            const result = await budaClient.getMarkets();
            expect(result).toBeDefined();
            expect(result.markets).toBeInstanceOf(Array);
            expect(result.markets.length).toBeGreaterThan(0);
        });

        it('should fetch ticker for ETH-CLP', async () => {
            const result = await budaClient.getTicker('ETH-CLP');
            expect(result).toBeDefined();
            expect(result.ticker).toBeDefined();
            expect(result.ticker.market_id).toBe('ETH-CLP');
            expect(result.ticker.last_price).toBeInstanceOf(Array);
        });

        it('should fetch order book for ETH-CLP', async () => {
            const result = await budaClient.getOrderBook('ETH-CLP');
            expect(result).toBeDefined();
            expect(result.order_book).toBeDefined();
            expect(result.order_book.bids).toBeInstanceOf(Array);
            expect(result.order_book.asks).toBeInstanceOf(Array);
        });
    });

    describe('MarketService', () => {
        it('should get markets with caching', async () => {
            const markets1 = await marketService.getMarkets();
            const markets2 = await marketService.getMarkets();
            
            expect(markets1).toBeDefined();
            expect(markets2).toBeDefined();
            expect(markets1).toBe(markets2); // Should return same cached instance
        });

        it('should find a specific market', async () => {
            const market = await marketService.findMarket('BTC', 'CLP');
            expect(market).toBeDefined();
            expect(market?.id).toBe('BTC-CLP');
        });
    });

    describe('TickerService', () => {
        it('should get price for a market', async () => {
            const price = await tickerService.getPrice('BTC-CLP');
            expect(typeof price).toBe('number');
            expect(price).toBeGreaterThan(0);
        });

        it('should get prices for multiple markets in parallel', async () => {
            const marketIds = ['BTC-CLP', 'ETH-CLP'];
            const prices = await tickerService.getPrices(marketIds);
            
            expect(prices.size).toBe(2);
            expect(prices.get('BTC-CLP')).toBeGreaterThan(0);
            expect(prices.get('ETH-CLP')).toBeGreaterThan(0);
        });
    });

    describe('PortfolioService', () => {
        it('should calculate portfolio value', async () => {
            const portfolio = {
                portfolio: {
                    'BTC': 1,
                    'ETH': 1
                },
                fiat_currency: 'CLP'
            };

            const result = await portfolioService.calculateValue(portfolio);
            
            expect(result).toBeDefined();
            expect(result.totalValue).toBeGreaterThan(0);
            expect(result.fiat_currency).toBe('CLP');
            expect(result.breakdown).toBeInstanceOf(Array);
            expect(result.breakdown.length).toBeGreaterThan(0);
        }, 30000);

        it('should handle portfolio with fiat currency', async () => {
            const portfolio = {
                portfolio: {
                    'BTC': 1,
                    'CLP': 10000
                },
                fiat_currency: 'CLP'
            };

            const result = await portfolioService.calculateValue(portfolio);
            
            expect(result).toBeDefined();
            expect(result.totalValue).toBeGreaterThan(10000);
            const clpItem = result.breakdown.find(item => item.coin === 'CLP');
            expect(clpItem?.value).toBe(10000);
        }, 30000);
    });
});
