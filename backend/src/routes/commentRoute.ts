import {
  createComment,
  deleteComment,
  getComment,
  getCommentById,
  updateComment,
} from '../controller/commentController';
import { Router } from 'express';
import { protect } from '../middleware/protectRoute';

const router = Router();

router.route('/').get(protect, getComment).post(protect, createComment);

router
  .route('/:id')
  .get(protect, getCommentById)
  .patch(protect, updateComment)
  .delete(deleteComment);

export default router;
