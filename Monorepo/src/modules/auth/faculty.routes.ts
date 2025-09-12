import { Router } from 'express';
import {
  authenticateJWT,
  authorizeRole,
} from '../../shared/middlewares/auth.middleware';

const router = Router();

// This route requires the user to be a "Faculty" member
router.get(
  '/faculty-dashboard',
  authenticateJWT,
  authorizeRole('Faculty'),
  (req, res) => {
    res.json({ message: 'Welcome Faculty' });
  }
);

export default router;
