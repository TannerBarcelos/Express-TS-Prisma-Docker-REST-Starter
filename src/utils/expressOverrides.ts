import { User } from './zodTypes';

declare module 'express' {
  // tells the request object that we might have a user object attached to it at some point
  // in the future... need this so our JWT auth check can add the authorized user data to
  // the request globally
  interface Request {
    user?: User;
  }
}
