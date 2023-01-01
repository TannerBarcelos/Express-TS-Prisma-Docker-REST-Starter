import { Router } from 'express';

import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/auth', authRoutes);

export default router;
