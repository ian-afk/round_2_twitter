import { catchAsync } from '../utils/catchAsync';
import {
  signUp as signUpServuce,
  signIn as signInService,
} from '../services/authService';

export const signup = catchAsync(async (req, res) => {
  const { username, fullName, email, password } = req.body;
  const newUser = await signUpServuce({
    username,
    fullName,
    email,
    password,
  });
  const token = newUser.token;
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
    path: '/',
  });

  res.status(201).json({
    status: 'success',
    ...newUser,
  });
});

export const signin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Please provide email and password');
  }
  const token = await signInService({ email, password });

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
    path: '/',
  });
  res.status(200).json({
    status: 'success',
    token,
  });
});
