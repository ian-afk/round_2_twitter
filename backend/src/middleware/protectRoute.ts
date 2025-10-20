import { AppError } from '../utils/AppError';
import { catchAsync } from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/user';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}
export const protect = catchAsync(async (req, res, next) => {
  let token = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError(`You're not logged in! Please login.`, 401));
  }

  const decoded = await new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as JwtPayload);
    });
  });

  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(new AppError('The user does not exists', 401));
  }

  req.user = {
    id: decoded.userId,
    user: {
      username: currentUser.username,
      fullName: currentUser.fullName,
    },
  };
  next();
});
