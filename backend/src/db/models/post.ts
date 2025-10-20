import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Post content is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

export const Post = mongoose.model('Post', postSchema);
