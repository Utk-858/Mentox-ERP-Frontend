/// <reference path="./shared/types/express.d.ts" />
import app from './app';
import config from './config';
import connectDB from './config/database';
import { register as metricsRegister } from './config/metrics'; // <-- IMPORT METRICS
import express from 'express';

// Function to start the main application server
const startMainServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`🚀 Main server is running on http://localhost:${config.port}`);
  });
};

// Function to start the metrics server
const startMetricsServer = () => {
  const metricsApp = express();
  const metricsPort = 9090; 

  metricsApp.get('/metrics', async (req, res) => {
    res.set('Content-Type', metricsRegister.contentType);
    res.end(await metricsRegister.metrics());
  });

  metricsApp.listen(metricsPort, () => {
    console.log(`📊 Metrics server running on http://localhost:${metricsPort}`);
  });
};

// Start both servers
startMainServer();
startMetricsServer();

