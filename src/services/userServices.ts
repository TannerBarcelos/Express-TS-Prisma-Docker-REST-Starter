import type { User } from '../utils/zodTypes';
import { prisma as prismaClient } from '../config/prisma';

/**
 * @returns All users
 */
const getAllUsers = async () => {
  const users = await prismaClient.user.findMany({
    include: {
      posts: true,
    },
  });
  return users;
};

/**
 * @param id - Get user by id
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
    include: {
      posts: opts.includePosts,
    },
  });
};

/**
 * @param id - Get User by email
 * @returns User
 */
const getUserByEmail = async (
  email: string,
  opts: { includePosts: boolean } = { includePosts: true }
) => {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
    include: {
      posts: opts.includePosts,
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
  updateUser,
  deleteUser,
};
