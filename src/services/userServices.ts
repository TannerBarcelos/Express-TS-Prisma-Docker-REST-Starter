import type { User } from '../utils/zodTypes';
import { prismaClient } from '../config/prismaClient';

/**
 * @returns All users
 */
const getAllUsers = async () => {
  const users = await prismaClient.user.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });
  return users;
};

/**
 * @param id - Get basic user info by user ID
 * @returns User
 */
const getUserById = async (userId: string) => {
  return await prismaClient.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });
};

/**
 * @param id - Get a users profile by user ID - (Users public profile to view)
 * @returns User
 */
const getUserProfile = async (userId: string) => {
  return await prismaClient.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      createdAt: true,
      id: true,
      name: true,
      posts: true,
    },
  });
};

/**
 * @param id - Get User by email
 * @returns User
 * @description Utility function to help look up the user in the DB by email to see if they exist. This is usefule for registration and logging in
 */
const getUserByEmail = async (userEmail: string) => {
  return await prismaClient.user.findUnique({
    where: {
      email: userEmail,
    },
  });
};

/**
 * @param id - Unique user id
 * @returns updated users id
 */
const updateUser = async (userId: string, updateUserPayload: User) => {
  const updatedUser = await prismaClient.user.update({
    where: {
      id: Number(userId),
    },
    data: updateUserPayload,
    select: {
      createdAt: true,
      email: true,
      name: true,
      updatedAt: true,
      id: true,
      password: false,
    },
  });
  return updatedUser;
};

/**
 * @param id - Unique user id
 * @returns deleted users ID
 */
const deleteUser = async (userId: string) => {
  const deletedUser = await prismaClient.user.delete({
    where: {
      id: Number(userId),
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
