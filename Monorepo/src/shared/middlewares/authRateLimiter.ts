import rateLimit from 'express-rate-limit';

/**
 * A rate limiter for authentication routes to prevent brute-force attacks.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * A more lenient rate limiter for application submissions to prevent spam.
 */
export const applicationRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 application submissions per hour
  message: 'Too many applications created from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});

