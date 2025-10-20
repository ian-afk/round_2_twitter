import { catchAsync } from '../utils/catchAsync';

import {
  createComment as createCommentService,
  findCommentById,
  listComments,
  updateComment as updateCommentService,
  deleteComment as deleteCommentService,
} from '../services/commentService';

export const createComment = catchAsync(async (req, res) => {
  const { text, post } = req.body;
  const userId = req.user.id;
  const newComment = await createCommentService({ text, post, user: userId });
  res.status(201).json({
    status: 'success',
    message: 'Comment successfully created',
    newComment,
  });
});

export const getComment = catchAsync(async (req, res) => {
  const comment = await listComments();
  res.status(200).json({
    status: 'success',
    data: comment,
  });
});

export const getCommentById = catchAsync(async (req, res) => {
  const comment = await findCommentById(req.params.id);

  res.status(200).json({
    status: 'success',
    comment,
  });
});

export const updateComment = catchAsync(async (req, res) => {
  const comment = await updateCommentService(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    message: 'Comment updated successfully',
    comment,
  });
});

export const deleteComment = catchAsync(async (req, res) => {
  const commentId = req.params.id;

  await deleteCommentService(commentId);
  res.status(200).json({
    status: 'success',
    message: 'Comment deleted successfully',
  });
});
