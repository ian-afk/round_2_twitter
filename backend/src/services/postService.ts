import { Post } from '../db/models/post';

export const listPost = async () => {
  const post = await Post.find({})
    .populate({
      path: 'comments', // populate the comments array
      populate: { path: 'user', select: 'username profilePic' }, // populate each comment's user
    })
    .populate('user', 'username profilePic');
  return post;
};

export const createPost = async ({ content, user }) => {
  const post = await Post.create({ content, user });

  return post;
};

export const findPostById = async (postId: string) => {
  const post = await Post.findById({ _id: postId });

  if (!post) throw new Error('Post id does not exist');
  return post;
};

export const updatePost = async (postId: string, { content }) => {
  const post = await Post.findById({ _id: postId });

  if (!post) throw new Error('Post id does not exists');
  const newPost = await Post.findByIdAndUpdate(
    {
      _id: postId,
    },
    {
      $set: content,
    },
    {
      new: true,
    },
  );

  return newPost;
};

export const deletePost = async (postId: string) => {
  return await Post.deleteOne({ _id: postId });
};
