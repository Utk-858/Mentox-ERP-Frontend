import { z } from 'zod';
import { AllRoles } from '../../config/role-permissions.map';

// Helper for required string fields to provide consistent error messages
const requiredString = (message: string) => z.string().min(1, { message });

// Schema for user registration (for roles like Admin, Faculty, etc.)
export const registerSchema = z.object({
  body: z.object({
    username: requiredString('Username is required').min(3, 'Username must be at least 3 characters long'),
    password: requiredString('Password is required').min(6, 'Password must be at least 6 characters long'),
    // Ensures the role provided is one of the valid, predefined roles
    role: z.enum(AllRoles, {
      errorMap: () => ({ message: 'A valid role must be provided.' }),
    }),
    department: z.string().optional(),
  }),
});

// A separate, simpler schema for student registration
export const registerStudentSchema = z.object({
  body: z.object({
    username: requiredString('Username is required').min(3, 'Username must be at least 3 characters long'),
    password: requiredString('Password is required').min(6, 'Password must be at least 6 characters long'),
  }),
});

// Schema for user login
export const loginSchema = z.object({
  body: z.object({
    username: requiredString('Username is required'),
    password: requiredString('Password is required'),
  }),
});
