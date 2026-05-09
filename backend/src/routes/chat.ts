import { Router } from 'express';
import { chat } from '../controllers/chatController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

/**
 * POST /api/v1/chat
 * Send a message to the AI assistant
 */
router.post('/', asyncHandler(chat));

export default router;
