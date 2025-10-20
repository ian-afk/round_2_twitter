import { Request, Response } from 'express';
import {
  findUserById,
  listUsers,
  createUser as createUserService,
  deleteUser as deleteUserService,
  updateUser,
} from '../services/userService';
import { catchAsync } from '../utils/catchAsync';

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await listUsers();

  res.status(200).json({ status: 'success', data: users });
});

export const createUser = catchAsync(async (req, res) => {
  const user = req.body;

  const newUser = await createUserService(user);
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    data: newUser,
  });
});

export const getUserById = catchAsync(async (req, res) => {
  const user = await findUserById(req.params.id);

  res.status(200).json({ status: 'success', user });
});

export const updateUsers = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await updateUser(userId, req.body);

  res.status(200).json({
    status: 'success',
    message: 'User successfully upadated',
    user,
  });
});
export const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id;

  await deleteUserService(userId);
  res.status(200).json({
    status: 'success',
    message: 'User deleted Successfully',
  });
});
