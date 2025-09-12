import mongoose from 'mongoose';
import { AllRoles } from '../../config/role-permissions.map';

// Dynamically create a UserRole type from the keys of the RolePermissionsMap
export type UserRole = (typeof AllRoles)[number];

// Interface for the data stored in a User document
export interface IUser {
  username: string;
  password?: string; // Optional because it's excluded by default on queries
  role: UserRole;
  department?: string;
  permissions: string[];
}

// Extends the base IUser with Mongoose Document properties and our custom methods
export interface IUserDocument extends IUser, mongoose.Document {
  comparePassword(password: string): Promise<boolean>;
}

// Defines the data structure we embed inside our JWTs.
// It includes optional iat and exp fields which are added by the jsonwebtoken library.
export interface UserPayload {
  _id: string;
  username: string;
  role: UserRole;
  department?: string;
  permissions: string[];
  iat?: number;
  exp?: number;
}

