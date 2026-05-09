import { Router } from 'express';
import chatRoutes from './chat.js';
import healthRoutes from './health.js';
import schemeRoutes from './schemes.js';
import reminderRoutes from './reminders.js';
import applicationRoutes from './applications.js';
import jobEligibilityRoutes from './jobEligibility.js';

const router = Router();

router.use('/chat', chatRoutes);
router.use('/health', healthRoutes);
router.use('/schemes', schemeRoutes);
router.use('/reminders', reminderRoutes);
router.use('/applications', applicationRoutes);
router.use('/jobs', jobEligibilityRoutes);

export default router;
