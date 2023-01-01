import * as z from 'zod';

/**
 * Validators are used to validate data for if they exist, are correct types etc. We use these as middleware to check the incoming
 * request params, body and args (if any) to confirm things were sent, sent correctly, have correct types and more.
 */

/**
 * Post payload validators
 */
export const PostValidator = z.object({
  content: z
    .string()
    .min(10, 'Post content must contain at least 10 characters.')
    .max(
      500,
      'Content is required and must contain no more than 500 characters.'
    ),
  authorId: z.number(),
});

export const PostIdValidator = z.object({
  id: z.string().min(1, 'Please include an author Id parameter'),
});

/**
 * User payload validators - Matches the shape of a User in our Prisma model
 */
export const UserValidator = z.object({
  name: z
    .string()
    .min(2, 'Name is required and must be at least 2 characters long'),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
  id: z.number(),
  password: z
    .string()
    .min(8, 'Password is required and must be 8 or more characters long'),
});

/**
 * UserId validator - used to validate request.params.id exists and is a number
 */
export const UserIdValidator = z.object({
  id: z.string().min(1, 'Please include an author id parameter'),
});

/**
 * Auth payload validators
 */
export const LoginValidator = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, 'Password is required and must be 8 or more characters long'),
});

export const SignupValidator = z.object({
  name: z
    .string()
    .min(2, 'Name is required and must be at least 2 characters long'),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password is required and must be 8 or more characters long'),
});

// Post types - Infer types of Post and PostId to use for helper code, params etc
export type Post = z.infer<typeof PostValidator>;
export type PostId = z.infer<typeof PostIdValidator>;

// User types - Infer types of User and UserId to use for helper code, params etc
export type User = z.infer<typeof UserValidator>;
export type UserId = z.infer<typeof UserIdValidator>;

// Auth types - Infer types of Login and Signup to use for helper code, params etc
export type Login = z.infer<typeof LoginValidator>;
export type Signup = z.infer<typeof SignupValidator>;
