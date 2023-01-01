import userServices from '../services/userServices';
import type { UserId, User } from '../utils/zodTypes';
import { NextFunction, Request, Response } from 'express';
import { genHash } from '../utils/helpers';

export const getUsers = async (
  request: Request,
  response: Response<{
    data: Array<Omit<User, 'password' | 'email' | 'updatedAt'>>;
  }>,
  next: NextFunction
) => {
  try {
    const users = await userServices.getAllUsers();
    response.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  request: Request<UserId>,
  response: Response<{ data: Omit<User, 'password' | 'email' | 'updatedAt'> }>,
  next: NextFunction
) => {
  try {
    const foundUser = await userServices.getUserById(request.params.id);
    if (!foundUser) {
      response.status(404);
      throw new Error('User not found');
    }
    response.status(200).json({ data: foundUser });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (
  request: Request<UserId>,
  response: Response<{ data: Omit<User, 'updatedAt' | 'password' | 'email'> }>,
  next: NextFunction
) => {
  try {
    const foundUser = await userServices.getUserProfile(request.params.id);
    if (!foundUser) {
      response.status(404);
      throw new Error('User not found');
    }
    response.status(200).json({ data: foundUser });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  request: Request<UserId, {}, Omit<User, 'updatedAt' | 'createdAt' | 'id'>>,
  response: Response<{ data: Omit<User, 'password'> }>,
  next: NextFunction
) => {
  try {
    if (Number(request.params.id) !== request.user!.id) {
      response.status(401);
      throw new Error('Action cannot be completed. User not authorized');
    }
    const updatedUser = await userServices.updateUser(
      request.params.id,
      request.body
    );

    response.status(200).json({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  request: Request<UserId>,
  response: Response,
  next: NextFunction
) => {
  try {
    if (Number(request.params.id) !== request.user!.id) {
      response.status(401);
      throw new Error('Action cannot be completed. User not authorized');
    }
    await userServices.deleteUser(request.params.id);
    response.clearCookie('auth_token');
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};
