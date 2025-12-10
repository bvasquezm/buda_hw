import express from 'express';
import portfolioRoutes from './routes/portfolio.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'API Server is running just fine!' });
});

app.use('/api', portfolioRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
