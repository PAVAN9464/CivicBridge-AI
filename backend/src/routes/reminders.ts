import { Router } from 'express';
import { getReminders, createReminder, updateReminder, deleteReminder } from '../controllers/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(getReminders));
router.post('/', asyncHandler(createReminder));
router.put('/:id', asyncHandler(updateReminder));
router.delete('/:id', asyncHandler(deleteReminder));

export default router;
