import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mainRouter from './routes';
import errorHandler from './shared/middlewares/errorHandler';
import { metricsMiddleware } from './config/metrics'; 

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// --- Metrics Middleware ---
// IMPORTANT: This should be one of the first middleware to run
app.use(metricsMiddleware);

app.use((req, res, next) => {
  console.log(`[INCOMING REQUEST]: Method: ${req.method}, URL: ${req.originalUrl}`);
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.use('/api', mainRouter);
app.use(errorHandler);

export default app;

