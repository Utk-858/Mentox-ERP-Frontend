import { Registry, collectDefaultMetrics, Histogram } from 'prom-client'; // FIX: Import Histogram directly
import responseTime from 'response-time';
import { Request, Response } from 'express';

// Create a Registry to register the metrics
export const register = new Registry();

// Enable the collection of default metrics (e.g., CPU, memory)
collectDefaultMetrics({ register });

// Create a histogram metric to monitor HTTP request durations
// FIX: Changed prom_client.Histogram to new Histogram()
export const httpRequestDurationMicroseconds = new Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000, 2000], // Buckets for response time from 50ms to 2s
});

// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds);

/**
 * Middleware that captures response time and records it in our histogram.
 */
export const metricsMiddleware = responseTime((req: Request, res: Response, time: number) => {
  if (req.route?.path) {
    httpRequestDurationMicroseconds.observe(
      {
        method: req.method,
        route: req.route.path,
        code: res.statusCode,
      },
      time
    );
  }
});

