import { Router } from 'express';
import {
  authenticateJWT,
  authorizeRole,
  checkPermission,
} from '../../shared/middlewares/auth.middleware';
import { Permissions } from '../../config/permissions.config'; // Import the Permissions enum

const router = Router();

// This route requires the user to be an "Admin"
router.get(
  '/admin-panel',
  authenticateJWT,
  authorizeRole('Admin'),
  (req, res) => {
    res.json({ message: 'Welcome Admin' });
  }
);

// This route requires the "system_settings" permission
router.get(
  '/admin-data',
  authenticateJWT,
  checkPermission(Permissions.SYSTEM_SETTINGS), // Use the correct enum value
  (req, res) => {
    res.json({ message: 'Admin data accessed' });
  }
);

export default router;

