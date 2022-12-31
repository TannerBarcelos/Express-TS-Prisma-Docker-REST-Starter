import type { Signup } from '../utils/zodTypes';
import { prismaClient } from '../config/prismaClient';
import { genToken } from '../utils/helpers';

/**
 * @returns Signed up user
 */
const signupService = async (user: Signup) => {
  const createdUser = await prismaClient.user.create({
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
    },
  });
  return { createdUser, token: genToken(createdUser) };
};

export default {
  signupService,
};
