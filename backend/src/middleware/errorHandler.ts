import { Request, Response, NextFunction } from 'express';

export type AppError = Error & { status?: number; code?: string };

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiError';
  }
}

export const errorHandler = (
  error: AppError | Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error instanceof ApiError ? error.status : 500;
  const message = error.message || 'Internal server error';
  const code = error instanceof ApiError ? error.code : 'INTERNAL_ERROR';

  response.status(status).json({
    error: {
      status,
      code,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
};

export const notFoundHandler = (
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  response.status(404).json({
    error: {
      status: 404,
      code: 'NOT_FOUND',
      message: 'Endpoint not found'
    }
  });
};
