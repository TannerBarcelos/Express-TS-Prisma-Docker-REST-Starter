import type { Signup } from '../utils/zodTypes';
import { prisma as prismaClient } from '../config/prisma';
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
  const token = genToken(createdUser);
  return { createdUser, token };
};

export default {
  signupService,
};
