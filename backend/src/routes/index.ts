import { Router } from 'express';
import healthRoutes from './health.js';
import schemeRoutes from './schemes.js';
import reminderRoutes from './reminders.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/schemes', schemeRoutes);
router.use('/reminders', reminderRoutes);

export default router;
