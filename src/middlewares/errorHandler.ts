import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = response.statusCode || 500;
  response.status(statusCode);
  response.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
