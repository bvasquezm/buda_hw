# Buda API Project

A TypeScript-based API service for interacting with the Buda.com cryptocurrency exchange API.

## Project Structure

```
src/
├── clients/           # External API clients
│   └── buda/
│       ├── buda.client.ts       # HTTP client for Buda API
│       └── buda.types.ts        # Type definitions
├── services/          # Business logic layer
│   ├── market.service.ts        # Market operations with caching
│   ├── portfolio.service.ts     # Portfolio calculations
│   └── ticker.service.ts        # Price fetching
├── utils/             # Utility functions
│   ├── calculations.ts          # Calculation helpers
│   └── validators.ts            # Validation functions
├── models/            # Domain models
│   └── portfolio.model.ts
├── controllers/       # HTTP controllers
│   └── portfolio.controller.ts
├── routes/            # Route definitions
│   └── portfolio.routes.ts
└── index.ts           # Application entry point
```

## Installation

```bash
npm install
```

## Usage

### Start the server

```bash
npm start
```

Server will run on `http://localhost:3000`

### Run tests

```bash
npm test
```

## API Endpoints

### Health Check
```
GET /health
```

### Calculate Portfolio Value
```
POST /api/portfolio/value
```

**Request Body:**
```json
{
  "portfolio": {
    "BTC": 1.5,
    "ETH": 10,
    "CLP": 50000
  },
  "fiat_currency": "CLP"
}
```

**Response:**
```json
{
  "totalValue": 125000000,
  "currency": "CLP",
  "breakdown": [
    {
      "coin": "BTC",
      "value": 75000000
    },
    {
      "coin": "ETH",
      "value": 50000000
    },
    {
      "coin": "CLP",
      "value": 50000
    }
  ]
}
```

## Features

- **Layered Architecture**: Clear separation of concerns with clients, services, controllers
- **Caching**: Market data cached for 1 minute to reduce API calls
- **Parallel Processing**: Fetches multiple ticker prices in parallel for performance
- **Validation**: Input validation and minimum order amount checks
- **Type Safety**: Full TypeScript support with strict typing
- **Error Handling**: Graceful error handling with proper HTTP status codes

## Architecture Benefits

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Clear structure makes code easy to understand and modify
3. **Scalability**: Easy to add new services or endpoints
4. **Loose Coupling**: Services depend on abstractions, not implementations
5. **Single Responsibility**: Each class has one well-defined purpose
