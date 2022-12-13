import * as z from 'zod';

/**
 * Post payload validators
 */
export const PostValidator = z.object({
  content: z
    .string()
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
 * User payload validators
 */
export const UserValidator = z.object({
  name: z
    .string()
    .min(2, 'Name is required and must be at least 2 characters long'),
  email: z.string().email(),
  createdAt: z.string(),
  id: z.number(),
  password: z
    .string()
    .min(8, 'Password is required and must be 8 or more characters long'),
});

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

// Post types
export type Post = z.infer<typeof PostValidator>;
export type PostId = z.infer<typeof PostIdValidator>;

// User types
export type User = z.infer<typeof UserValidator>;
export type UserId = z.infer<typeof UserIdValidator>;

// Auth types
export type Login = z.infer<typeof LoginValidator>;
export type Signup = z.infer<typeof SignupValidator>;
