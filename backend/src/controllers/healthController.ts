import { Request, Response } from 'express';

export const healthCheck = (request: Request, response: Response) => {
  response.status(200).json({
    status: 'ok',
    message: 'CivicBridge AI API is running',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.0.1'
  });
};
