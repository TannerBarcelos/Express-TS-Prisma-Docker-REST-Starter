import type { Signup } from '../utils/zodTypes';
import { prismaClient } from '../config/prismaClient';
import { genToken } from '../utils/helpers';

/**
 * @returns Signed up user
 */
const signupService = async ({ email, name, password }: Signup) => {
  const createdUser = await prismaClient.user.create({
    data: {
      email,
      password,
      name,
    },
  });
  return { createdUser, token: genToken(createdUser) };
};

export default {
  signupService,
};
