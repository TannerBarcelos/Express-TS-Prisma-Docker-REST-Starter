import type { User } from '../utils/zodTypes';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authCheck = (
  request: Request,
  response: Response<{ data: string }>,
  next: NextFunction
) => {
  const token = request?.cookies?.auth_token;
  if (!token) {
    response.status(401).json({ data: '🔒 Not authorized' });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      request.user = data as User;
      next();
    } catch (error) {
      next(error);
    }
  }
};
