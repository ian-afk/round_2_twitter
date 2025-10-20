import { protect } from '../middleware/protectRoute';
import { signin, signup } from '../controller/authController';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUsers,
} from '../controller/userController';
import { Router } from 'express';

const router = Router();

router.route('/').get(protect, getUsers).post(protect, createUser);
router
  .route('/:id')
  .get(protect, getUserById)
  .patch(protect, updateUsers)
  .delete(protect, deleteUser);

router.route('/signup').post(signup);
router.route('/signin').post(signin);
export default router;
