import { NextFunction, Request, Response } from 'express';

export const routeNotFound = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(404);
  next(new Error(`Route not found. Origin: ${request.originalUrl}`));
};
