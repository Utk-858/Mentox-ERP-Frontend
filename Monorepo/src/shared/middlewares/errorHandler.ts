import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Central error handling middleware.
 * Catches all errors passed by the asyncHandler and sends a standardized JSON response.
 * @param {AppError} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
  // Log the error for debugging purposes (you can replace this with a more robust logger)
  console.error('ERROR:', err);

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'An unexpected internal server error occurred.';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    // Optionally include stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
