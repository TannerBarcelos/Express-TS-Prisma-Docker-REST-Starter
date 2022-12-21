import express, { Express } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from '../routes';
import { errorHandler } from '../middlewares/errorHandler';
import { routeNotFound } from '../middlewares/routeNotFound';

export const createServer = (): Express => {
  // Allow environment variables
  config();

  // Initialize express instance
  const app = express();

  // Middlewares
  app.use(cookieParser());
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api', routes, routeNotFound);

  // Error handler middleware - comes last as a catch all
  app.use(errorHandler);

  return app;
};
