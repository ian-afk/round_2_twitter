import { Comment } from '../db/models/comment';
import { AppError } from '../utils/AppError';

interface CreateCommentI {
  text: string;
  post: string;
  user: string;
}
export const createComment = async ({ text, post, user }: CreateCommentI) => {
  const newComment = await Comment.create({
    text,
    user,
    post,
  });
  return newComment;
};

export const listComments = async () => {
  const comment = await Comment.find();
  return comment;
};

export const findCommentById = async (commentId: string) => {
  const comment = await Comment.findById(commentId);

  if (!comment)
    throw new AppError(`Comment Id ${commentId} doesn't exists`, 404);
  return comment;
};

interface UpdateCommentI {
  comment?: string;
}

export const updateComment = async (
  commentId: string,
  { comment }: UpdateCommentI,
) => {
  return await Comment.findOneAndUpdate(
    {
      _id: commentId,
    },
    {
      $set: {
        comment,
      },
    },
    { new: true },
  );
};

export const deleteComment = async (commentId: string) => {
  return await Comment.deleteOne({ _id: commentId });
};
