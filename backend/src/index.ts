import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { corsMiddleware, requestLogger, errorHandler, notFoundHandler } from './middleware/index.js';
import apiRoutes from './routes/index.js';

const app = express();

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || 'localhost';
const API_VERSION = process.env.API_VERSION || 'v1';

app.use(helmet());
app.use(requestLogger);
app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    name: 'CivicBridge AI API',
    version: API_VERSION,
    description: 'Government services platform with AI-powered workflows',
    endpoints: {
      chat: `/api/${API_VERSION}/chat`,
      health: `/api/${API_VERSION}/health`,
      schemes: `/api/${API_VERSION}/schemes`,
      reminders: `/api/${API_VERSION}/reminders`,
      applications: `/api/${API_VERSION}/applications`,
      jobs: `/api/${API_VERSION}/jobs`
    }
  });
});

app.use(`/api/${API_VERSION}`, apiRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 CivicBridge AI server running at http://${HOST}:${PORT}`);
  console.log(`📡 API available at http://${HOST}:${PORT}/api/${API_VERSION}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default server;
