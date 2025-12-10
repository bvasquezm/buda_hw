# API Buda - Cálculo de Valor de Portafolio

**API para Buda**

Servicio API en TypeScript que calcula el valor total de un portafolio de criptomonedas consultando la API de Buda.com en tiempo real.

## Estructura del Proyecto

```
src/
├── clients/buda/           # Cliente externo de Buda API
├── services/               # Lógica de negocio
│   ├── market.service.ts       # Operaciones con mercados (con caché)
│   ├── portfolio.service.ts    # Cálculos de portafolio
│   └── ticker.service.ts       # Obtención de precios
├── controllers/            # Controladores HTTP
├── routes/                 # Rutas de la API
└── utils/                  # Funciones de validación y cálculo
```

## Instalación

```bash
npm install
```

## Uso

### Iniciar servidor

```bash
npm start
```

Servidor disponible en `http://localhost:3000`

### Ejecutar tests

```bash
npm test
```

## Endpoints

### Health Check
```
GET /health
```

### Calcular Valor de Portafolio
```
POST /api/portfolio/value
```

**Body:**
```json
{
  "holdings": {
    "BTC": 1.5,
    "ETH": 10,
    "CLP": 50000
  },
  "currency": "CLP"
}
```

**Respuesta:**
```json
{
  "totalValue": 125000000,
  "currency": "CLP",
  "breakdown": [
    {
      "coin": "BTC",
      "amount": 1.5,
      "value": 75000000,
      "price": 50000000
    }
  ]
}
```

## Características Clave

### 🚀 Paralelismo
- **Fetch paralelo de precios**: Las cotizaciones de todos los activos se obtienen simultáneamente con `Promise.all()`, reduciendo drasticamente el tiempo de respuesta.
- Sin paralelismo: 5 activos × 500ms = 2.5 segundos
- Con paralelismo: ~500ms para todos los activos

### 🔌 Desacoplamiento
- **Arquitectura en capas**: Cliente → Servicios → Controladores
- **Inyección de dependencias**: Los servicios no crean instancias, las reciben como parámetros
- **Interfaces**: Las implementaciones dependen de abstracciones, no de clases concretas
- **Reutilizable**: Los servicios pueden usarse en diferentes endpoints sin cambios

### 💾 Optimizaciones
- **Caché de mercados**: Almacena datos de mercados por 1 minuto para evitar llamadas repetidas
- **Validación temprana**: Rechaza inputs inválidos antes de consultar APIs externas
- **Manejo de errores**: Si una cotización falla, continúa con las demás