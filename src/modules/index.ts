import { Router } from 'express';
import authRouter from './auth/auth.routes';
import healthRouter from './health/health.routes';
import configRouter from './config/config.routes';
import creatorsRouter from './creators/creators.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/config', configRouter);
router.use('/creators', creatorsRouter);

export default router;
