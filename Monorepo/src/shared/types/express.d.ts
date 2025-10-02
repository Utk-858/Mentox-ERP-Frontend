import { UserPayload } from '../../modules/auth/auth.types';

// This file uses declaration merging to add a custom 'user' property
// to the global Express Request interface. This allows us to attach
// the authenticated user's payload to the request object in our
// authentication middleware and access it in a type-safe way
// throughout our application.

declare global {
  namespace Express {
    interface Request {
      /**
       * The payload of the authenticated user, decoded from the JWT.
       * This property is attached by the `authenticateJWT` middleware.
       * It is optional, as it will not exist on unauthenticated routes.
       */
      user?: UserPayload;
    }
  }
}
