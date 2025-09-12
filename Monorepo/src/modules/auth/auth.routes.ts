import { Router } from 'express';
import AuthController from './auth.controller';
import validateRequest from '../../shared/middlewares/validateRequest';
import {
  registerSchema,
  registerStudentSchema,
  loginSchema,
} from './auth.validation';

const router = Router();

// Apply validation middleware to each route that accepts user input
router.post(
  '/register',
  validateRequest(registerSchema),
  AuthController.register
);

router.post(
  '/register-student',
  validateRequest(registerStudentSchema),
  AuthController.registerStudent
);

router.post(
  '/login',
  validateRequest(loginSchema),
  AuthController.login
);

// These routes do not take a request body, so they don't need validation
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

export default router;

