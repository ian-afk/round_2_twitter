import { User } from '../db/models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signUp = async ({ username, fullName, email, password }) => {
  const newUser = await User.create({
    username,
    fullName,
    email,
    password,
  });

  const token = jwt.sign(
    { userId: newUser._id.toString() },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '5m',
    },
  );
  return { token, user: { ...newUser.toObject(), password: undefined } };
};

export const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password!');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid email or password!');
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '5m',
    },
  );
  return token;
};
