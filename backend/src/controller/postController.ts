import type { Request, Response, NextFunction } from 'express';
import {
  createPost as createPostService,
  findPostById,
  listPost,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from '../services/postService';
import { catchAsync } from '../utils/catchAsync';

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const { content } = req.body;
  const userId = req.user.id;
  const newPost = await createPostService({ content, user: userId });

  res.status(201).json({
    status: 'success',
    message: 'Post created successfully',
    post: newPost,
  });
});

export const getPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await listPost();
    res.status(200).json({
      status: 'success',
      data: post,
    });
  },
);

export const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await findPostById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: post,
    });
  },
);

export const updatePost = catchAsync(async (req: Request, res: Response) => {
  const post = await updatePostService(req.params.id, { content: req.body });
  res.status(200).json({
    status: 'success',
    message: 'Post updated successfully',
    post,
  });
});
export const deletePost = catchAsync(async (req: Request, res: Response) => {
  await deletePostService(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Post deleted successfully',
  });
});
