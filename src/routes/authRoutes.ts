import * as authControllers from '../controllers/authControllers';
import { Router } from 'express';
import { requestValidator } from '../middlewares/requestValidator';
import { SigninValidator, SignupValidator } from '../utils/zodTypes';
import { authCheck } from '../middlewares/authCheck';

const authRouter = Router();

authRouter.post(
  '/signin',
  requestValidator({
    body: SigninValidator,
  }),
  authControllers.signinUser
);

authRouter.post(
  '/signup',
  requestValidator({
    body: SignupValidator,
  }),
  authControllers.signupUser
);

authRouter.get('/signout', authCheck, authControllers.signout);

export default authRouter;
