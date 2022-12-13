import userServices from '../services/userServices';
import type { UserId } from '../utils/zodTypes';
import { NextFunction, Request, Response } from 'express';

export const getUsers = async (
  request: Request,
  response: Response<{ data: any }>,
  next: NextFunction
) => {
  try {
    const users = await userServices.getAllUsers();
    const modifiedUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        createdAt: user.createdAt,
        posts: user.posts,
      };
    });
    response.status(200).json({ data: modifiedUsers });
  } catch (error) {
    response.status(500);
    throw new Error(error as string);
  }
};

export const getUser = async (
  request: Request<UserId>,
  response: Response<{ data: any }>,
  next: NextFunction
) => {
  try {
    const foundUser = await userServices.getUserById(request.params.id);
    if (!foundUser) {
      response.status(404);
      throw new Error('User not found');
    }
    const user = {
      id: foundUser.id,
      name: foundUser.name,
      createdAt: foundUser.createdAt,
      posts: foundUser.posts,
    };
    response.status(200).json({ data: user });
  } catch (error) {
    response.status(500);
    next(error);
  }
};

export const updateUser = async (
  request: Request<UserId>,
  response: Response<{ data: any }>,
  next: NextFunction
) => {
  try {
    if (Number(request.params.id) !== Number(request!.user!.id)) {
      response.status(401);
      throw new Error('Action cannot be completed. User not authorized');
    }
    const updatedUser = await userServices.updateUser(
      request.params.id,
      request.body
    );
    response.status(200).json({ data: updatedUser });
  } catch (error) {
    response.status(500);
    next(error);
  }
};

export const deleteUser = async (
  request: Request<UserId>,
  response: Response,
  next: NextFunction
) => {
  try {
    if (Number(request.params.id) !== Number(request!.user!.id)) {
      response.status(401);
      throw new Error('Action cannot be completed. User not authorized');
    }
    await userServices.deleteUser(request.params.id);
    response.clearCookie('auth_token');
    response.status(204).end();
  } catch (error) {
    response.status(500);
    next(error);
  }
};
