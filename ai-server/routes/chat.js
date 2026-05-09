import express from 'express';
import { askAI } from '../controllers/chatController.js';

const router = express.Router();

// POST /ask-ai
router.post('/ask-ai', askAI);

export default router;