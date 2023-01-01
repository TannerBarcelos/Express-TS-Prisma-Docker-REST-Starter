import { NextFunction, Request, Response } from 'express';
import type { User } from '../utils/zodTypes';
import authServices from '../services/authServices';
import { genHash, genToken } from '../utils/helpers';
import bcrypt from 'bcrypt';
import userServices from '../services/userServices';

export const signinUser = async (
  request: Request<{}, {}, User>,
  response: Response<{ data: User }>,
  next: NextFunction
) => {
  try {
    const userExists = await userServices.getUserByEmail(request.body.email);
    if (!userExists) {
      response.status(401);
      throw new Error('User does not exist. Please sign up.');
    }
    if (!bcrypt.compareSync(request.body.password, userExists.password)) {
      response.status(401);
      throw new Error('Your password is invalid. Please try again.');
    }
    const token = genToken(userExists);
    response.cookie('auth_token', token);
    response.status(200).json({ data: userExists });
  } catch (error) {
    next(error);
  }
};

export const signupUser = async (
  request: Request<{}, {}, User>,
  response: Response<{ data: User }>,
  next: NextFunction
) => {
  try {
    const { email, password, name } = request.body;
    const userExists = await userServices.getUserByEmail(email);
    if (userExists) {
      throw new Error('You already have an account. Please sign in.');
    }
    const newUser = {
      email,
      password: genHash(password),
      name,
    };
    const { token, createdUser } = await authServices.signupService(newUser);
    response.cookie('auth_token', token);
    response.status(201).json({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  request: Request,
  response: Response<{ data: string }>,
  next: NextFunction
) => {
  try {
    response.clearCookie('auth_token');
    response.status(200).end();
  } catch (error) {
    next(error);
  }
};
