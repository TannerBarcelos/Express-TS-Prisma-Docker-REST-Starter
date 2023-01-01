import * as userControllers from '../controllers/userControllers';
import { Router } from 'express';
import { authCheck } from '../middlewares/authCheck';
import { requestValidator } from '../middlewares/requestValidator';
import { UserIdValidator, UserValidator } from '../utils/zodTypes';

const router = Router();

router.get('/all', authCheck, userControllers.getUsers);

router.get(
  '/:id',
  authCheck,
  requestValidator({
    params: UserIdValidator,
  }),
  userControllers.getUser
);

router.get(
  '/profile/:id',
  authCheck,
  requestValidator({
    params: UserIdValidator,
  }),
  userControllers.getUserProfile
);

router.put(
  '/update/:id',
  authCheck,
  requestValidator({
    body: UserValidator,
    params: UserIdValidator,
  }),
  userControllers.updateUser
);

router.delete(
  '/delete/:id',
  authCheck,
  requestValidator({
    params: UserIdValidator,
  }),
  userControllers.deleteUser
);

export default router;
