import express, { Express } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from '../routes';
import { errorHandler } from '../middlewares/errorHandler';
import { routeNotFound } from '../middlewares/routeNotFound';
import morgan from 'morgan';

export const createServer = (): Express => {
  // Allow environment variables
  config();

  // Initialize express instance
  const app = express();

  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
  );
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

/**
 * By making a createServer function, we not only clean up our root app.ts
 * file, but we also create a singleton which can be used when unit testing or APIs
 */
