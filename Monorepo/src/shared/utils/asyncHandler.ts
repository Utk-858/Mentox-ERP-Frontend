import { Request, Response, NextFunction, RequestHandler } from 'express';

// Define a type for our async route handlers
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (requestHandler: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
