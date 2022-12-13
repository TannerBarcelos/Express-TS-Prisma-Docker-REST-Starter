import * as authControllers from '../controllers/authControllers';
import { Router } from 'express';
import { requestValidator } from '../middlewares/requestValidator';
import { LoginValidator, SignupValidator } from '../utils/zodTypes';
import { authCheck } from '../middlewares/authCheck';

const authRouter = Router();

authRouter.post(
  '/login',
  requestValidator({
    body: LoginValidator,
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

authRouter.get(
  '/logout',
  authCheck,
  requestValidator({}),
  authControllers.logoutUser
);

export default authRouter;
