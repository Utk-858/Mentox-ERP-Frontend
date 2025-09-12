import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import logger from '../utils/logger';

/**
 * An improved validation middleware that catches Zod errors and formats them
 * into a structured response that is easy for clients to consume.
 *
 * @param {AnyZodObject} schema - The Zod schema to validate the request against.
 * @returns An Express request handler.
 */
const validateRequest =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Asynchronously parse the request against the provided schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      // If validation is successful, proceed to the next middleware/controller
      next();
    } catch (error) {
      // Check if the caught error is a ZodError
      if (error instanceof ZodError) {
        // Log the validation error for debugging
        logger.warn({ error: error.flatten() }, 'Zod validation failed');

        // Send a 400 Bad Request response with the structured, flattened errors
        res.status(400).json({
          status: 'error',
          message: 'Input validation failed',
          // .flatten().fieldErrors provides a clean object of field-specific error messages
          errors: error.flatten().fieldErrors,
        });
      } else {
        // For any other unexpected errors, pass them to our central error handler
        next(error);
      }
    }
  };

export default validateRequest;

