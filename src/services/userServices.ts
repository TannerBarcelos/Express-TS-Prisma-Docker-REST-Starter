import type { User } from '../utils/zodTypes';
import { prismaClient } from '../config/prismaClient';

/**
 * @returns All users
 */
const getAllUsers = async () => {
  const users = await prismaClient.user.findMany({
    select: {
      name: true,
      createdAt: true,
      posts: true,
      id: true,
    },
  });
  return users;
};

/**
 * @param id - Get user by id (not same as getting yourself [profile])
 * @returns User
 */
const getUserById = async (
  id: string,
  opts: { includePosts: boolean } = { includePosts: true }
) => {
  return await prismaClient.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      name: true,
      createdAt: true,
      posts: opts.includePosts,
      id: true,
    },
  });
};

/**
 * @param id - Get user profile by id
 * @returns User
 */
const getUserProfile = async (id: string) => {
  return await prismaClient.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};

/**
 * @param id - Get User by email
 * @returns User
 * @description Utility function to help look up the user in the DB by email to see if they exist. This is usefule for registration and logging in
 */
const getUserByEmail = async (email: string) => {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
    include: {
      posts: false,
    },
  });
};

/**
 * @param id - Unique user id
 * @returns updated users id
 */
const updateUser = async (id: string, payload: User) => {
  const updatedUser = await prismaClient.user.update({
    where: {
      id: Number(id),
    },
    data: payload,
  });
  return updatedUser;
};

/**
 * @param id - Unique user id
 * @returns deleted users ID
 */
const deleteUser = async (id: string) => {
  const deletedUser = await prismaClient.user.delete({
    where: {
      id: Number(id),
    },
  });
  return deletedUser;
};

export default {
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserProfile,
  updateUser,
  deleteUser,
};
