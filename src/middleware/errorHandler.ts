import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode: number;
  isOperational?: boolean;
}

export const createError = (message: string, statusCode: number): AppError => {
  // this was a dodgy contruction
  // as we define statusCode as not undefined above but contruct an error with only a message and use 'as' to cast it
  return {
    name: 'AppError',
    message,
    statusCode,
  }
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // TODO: Implement proper error handling
  // - Handle different types of errors (validation, not found, server errors)
  // - Return appropriate HTTP status codes
  // - Format error responses consistently
  // - Log errors appropriately


  
  if (!err.statusCode) {
  // CATCH ALL - Default error response
    res.status(err.statusCode || 500).json({
      error: {
        message: err.message || 'Internal Server Error',
        status: err.statusCode || 500,
        timestamp: new Date().toISOString(),
      },
    });
  }
  
  res.status(err.statusCode).json({
    error: {
      message: err.message,
      status: err.statusCode,
      timestamp: new Date().toISOString(),
    },
  });

  next();
}; 