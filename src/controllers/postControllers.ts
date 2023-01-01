import { NextFunction, Request, Response } from 'express';
import { Post, PostId, User } from '../utils/zodTypes';
import postServices from '../services/postServices';

export const getAllPosts = async (
  request: Request,
  response: Response<{
    data: (Post & {
      author: User;
    })[];
  }>,
  next: NextFunction
) => {
  try {
    const allPosts = await postServices.getAllPosts();
    response.status(200).json({ data: allPosts });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (
  request: Request<PostId>,
  response: Response<{ data: Post }>,
  next: NextFunction
) => {
  try {
    const post = await postServices.getPost(request.params.id);
    if (!post) {
      response.status(404);
      throw new Error('Post not found');
    }
    response.status(200).json({ data: post });
  } catch (error) {
    next(error);
  }
};

export const getUsersPosts = async (
  request: Request<PostId>,
  response: Response<{ data: Post[] }>,
  next: NextFunction
) => {
  try {
    const postExists = await postServices.getPost(request.params.id);
    if (!postExists) {
      response.status(404);
      throw new Error('The post you requested does not exist');
    }
    const usersPosts = await postServices.getPostsByAuthor(
      request!.user!.id.toString()
    );
    response.status(200).json({ data: usersPosts });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  request: Request<PostId>,
  response: Response<{ data: Post }>,
  next: NextFunction
) => {
  try {
    if (Number(request.params.id) !== request!.user!.id) {
      response.status(401);
      throw new Error('Action cannot be completed. User not authorized 🔒');
    }
    const foundPost = await postServices.getPost(request.params.id);
    if (!foundPost) {
      response.status(404);
      throw new Error('Action cannot be completed. Post does not exist');
    }
    const updatedPost = await postServices.updatePost(
      request.params.id,
      request.body
    );
    response.status(200).json({ data: updatedPost });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  request: Request<{}, {}, Post>,
  response: Response<{ data: Post }>,
  next: NextFunction
) => {
  try {
    const post = {
      content: request.body.content,
      authorId: request.user!.id, // the logged in user is the only one who can create a post so, we can look at the logged in users ID and attempt to make the creation. The catch all will catch errors if they arrise
    };
    const createdPost = await postServices.createPost(post);
    response.status(201).json({ data: createdPost });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  request: Request<PostId>,
  response: Response,
  next: NextFunction
) => {
  try {
    const foundPost = await postServices.getPost(request.params.id);
    if (!foundPost) {
      response.status(404);
      throw new Error('Action cannot be completed. Post does not exist');
    }
    if (Number(foundPost.authorId) !== request!.user!.id) {
      response.status(401);
      throw new Error('Action cannot be completed. User not authorized 🔒');
    }
    await postServices.deletePost(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};
