import express, { Express } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from '../routes';
import { errorHandler } from '../middlewares/errorHandler';
import { routeNotFound } from '../middlewares/routeNotFound';

export const createServer = (): Express => {
  config();

  const app = express();

  app.use(cookieParser());
  app.use(cors());
  app.use(express.json());

  app.use('/api', routes, routeNotFound);

  app.use(errorHandler);

  return app;
};
