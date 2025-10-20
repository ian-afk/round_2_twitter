import { protect } from '../middleware/protectRoute';
import {
  createPost,
  deletePost,
  getPost,
  getPostById,
  updatePost,
} from '../controller/postController';
import { Router } from 'express';

const router = Router();

router.route('/').get(getPost).post(protect, createPost);

router
  .route('/:id')
  .get(protect, getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;
