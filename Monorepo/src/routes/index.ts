import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import adminRoutes from '../modules/auth/admin.routes';
import facultyRoutes from '../modules/auth/faculty.routes';
import registrationRoutes from '../modules/registration/registration.routes';
import { authRateLimiter } from '../shared/middlewares/authRateLimiter'; 

const router = Router();


router.use('/auth', authRateLimiter, authRoutes);
router.use('/admin', adminRoutes);
router.use('/faculty', facultyRoutes);
router.use('/registration', registrationRoutes);

export default router;