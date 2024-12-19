import express from 'express';
import ArticleController from '../controllers/articleController';
import {authenticateJWT} from "../middleware/authMiddleware";

const router = express.Router();

// CRUD Routes
router.post('/articles', authenticateJWT, ArticleController.create);
router.get('/articles', ArticleController.paginate);
router.get('/articles/:id', ArticleController.getById);
router.put('/articles/:id', authenticateJWT, ArticleController.update);
router.delete('/articles/:id',authenticateJWT, ArticleController.delete);

export default router;
