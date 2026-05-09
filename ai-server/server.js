import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', chatRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`AI Server running on port ${PORT}`);
});