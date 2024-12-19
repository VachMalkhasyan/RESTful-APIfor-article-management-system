import express from 'express';
import CommentController from '../controllers/commentController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/comments', authenticateJWT, CommentController.create);
router.get('/comments/:article_id', CommentController.getComments);

export default router;
