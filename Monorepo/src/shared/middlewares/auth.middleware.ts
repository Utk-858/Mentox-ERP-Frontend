import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../../modules/auth/auth.types';
import config from '../../config';

/**
 * Middleware to authenticate JWT tokens.
 * Verifies the token from the Authorization header, decodes the payload,
 * and attaches it to the request object as `req.user`.
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.accessTokenSecret) as UserPayload;
    req.user = decoded; // Attach user payload to the request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Middleware factory for Role-Based Access Control (RBAC).
 * Checks if the authenticated user's role is included in the list of allowed roles.
 * @param {...string} allowedRoles - A list of roles that are allowed to access the route.
 */
export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as UserPayload;

    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ message: 'Access denied: Role not authorized' });
      return;
    }

    next();
  };
};

/**
 * Middleware factory for checking specific user permissions.
 * Checks if the authenticated user has all of the required permissions.
 * @param {...string} requiredPermissions - A list of permissions required to access the route.
 */
export const checkPermission = (...requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as UserPayload;

    if (!user || !user.permissions) {
      res.status(403).json({ message: 'Access denied: No permissions found for user' });
      return;
    }

    const hasAllPermissions = requiredPermissions.every((p) => user.permissions.includes(p));

    if (!hasAllPermissions) {
      res.status(403).json({ message: 'Access denied: Missing required permissions' });
      return;
    }

    next();
  };
};
