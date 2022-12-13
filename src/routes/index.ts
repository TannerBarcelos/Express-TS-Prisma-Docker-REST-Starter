import { Router } from 'express';

import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import authRoutes from './authRoutes';

const router = Router();

// Registering each route path
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/auth', authRoutes);

export default router;
