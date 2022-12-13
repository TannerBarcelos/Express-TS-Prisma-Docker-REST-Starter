import type { Post } from '../utils/zodTypes';
import { prisma as prismaClient } from '../config/prisma';

/**
 * @returns All posts and the user who posted it (like a social feed on Reddit)
 */
const getAllPosts = async () => {
  const allPosts = await prismaClient.post.findMany({
    include: {
      author: true,
    },
  });
  return allPosts;
};

/**
 * @returns All posts for a specific user (author)
 */
const getPostsByAuthor = async (authorId: string) => {
  const authorsPosts = await prismaClient.post.findMany({
    where: {
      authorId: Number(authorId),
    },
  });
  return authorsPosts;
};

/**
 * @param id - Unique post id
 * @returns Post
 */
const getPost = async (postId: string) => {
  const post = await prismaClient.post.findUnique({
    where: {
      id: Number(postId),
    },
  });
  return post;
};

/**
 * @param id - Unique post id
 * @returns updated posts id
 */
const updatePost = async (postId: string, payload: Post) => {
  const updatedPost = await prismaClient.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      content: payload.content,
    },
  });
  return updatedPost;
};

/**
 * @returns A newly created Post
 */
const createPost = async (payload: Post) => {
  const createdPost = await prismaClient.post.create({
    data: payload,
  });
  return createdPost;
};

/**
 * @param id - Unique post id
 * @returns deleted posts ID
 */
const deletePost = async (postId: string) => {
  const deletedPost = await prismaClient.post.delete({
    where: {
      id: Number(postId),
    },
  });
  return deletedPost;
};

export default {
  getPostsByAuthor,
  getPost,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
