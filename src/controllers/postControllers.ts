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
    const { id } = request.params;
    const post = await postServices.getPost(id);
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
    const { id } = request.params;
    const postExists = await postServices.getPost(id);
    if (!postExists) {
      response.status(404);
      throw new Error(`Post ${id} does not exist`);
    }
    const usersPosts = await postServices.getPostsByAuthor(request.user!.id);
    response.status(200).json({ data: usersPosts });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  request: Request<PostId, {}, Post>,
  response: Response<{ data: Post }>,
  next: NextFunction
) => {
  try {
    const { id } = request.params;

    const foundPost = await postServices.getPost(id);

    if (!foundPost) {
      response.status(404);
      throw new Error(`Action cannot be completed. Post ${id} does not exist`);
    }

    // If the post to be updated's author is not the user that is logged in / requesting this route, then this is not authorized (only can update your own posts)
    // Note these routes are all protected by auth middleware so you can never even reach this route if you never logged in which is why we can safely do this
    // comparison and not have to add the authorId of the user sending the request in the payload
    if (foundPost.authorId !== request.user!.id) {
      response.status(401);
      throw new Error('Action cannot be completed. User not authorized 🔒');
    }
    const updatedPost = await postServices.updatePost(id, request.body);
    response.status(200).json({ data: updatedPost });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  request: Request<{}, {}, Omit<Post, 'authorId'>>,
  response: Response<{ data: Post }>,
  next: NextFunction
) => {
  try {
    const { content } = request.body;
    const post = {
      content,
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

    // If the post to be updated's author is not the user that is logged in / requesting this route, then this is not authorized (only can update your own posts)
    // Note these routes are all protected by auth middleware so you can never even reach this route if you never logged in which is why we can safely do this
    // comparison and not have to add the authorId of the user sending the request in the payload
    if (foundPost.authorId !== request.user!.id) {
      response.status(401);
      throw new Error('Action cannot be completed. User not authorized 🔒');
    }
    await postServices.deletePost(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};
