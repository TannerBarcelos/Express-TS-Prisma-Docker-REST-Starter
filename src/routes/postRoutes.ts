import * as postContollers from '../controllers/postControllers';
import { Router } from 'express';
import { requestValidator } from '../middlewares/requestValidator';
import { authCheck } from '../middlewares/authCheck';
import {
  PostIdValidator,
  PostValidator,
  UserIdValidator,
} from '../utils/zodTypes';

const postRouter = Router();

postRouter.get('/all', authCheck, postContollers.getAllPosts);

postRouter.get(
  '/user/:id',
  authCheck,
  requestValidator({
    params: UserIdValidator,
  }),
  postContollers.getUsersPosts
);

postRouter.post(
  '/create',
  authCheck,
  requestValidator({
    body: PostValidator,
  }),
  postContollers.createPost
);
postRouter.get(
  '/get/:id',
  authCheck,
  requestValidator({
    params: PostIdValidator,
  }),
  postContollers.getPost
);
postRouter.put(
  '/update/:id',
  authCheck,
  requestValidator({
    params: PostIdValidator,
    body: PostValidator,
  }),
  postContollers.updatePost
);
postRouter.delete(
  '/delete/:id',
  authCheck,
  requestValidator({
    params: PostIdValidator,
  }),
  postContollers.deletePost
);

export default postRouter;
