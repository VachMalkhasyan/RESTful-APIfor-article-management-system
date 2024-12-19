import { Request, Response } from 'express';
import CommentService from '../services/commentService';

interface AuthenticatedRequest extends Request {
    user?: { id: number }; // Adjust the type as per your authentication implementation
}
class CommentController {
    // Create a comment
    async create(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { article_id, content } = req.body;
        const author_id = req.user?.id;

        if (!article_id || !author_id || !content) {
            res.status(400).json({ error: 'All fields are required: article_id, author_id, and content' });
            return;
        }

        try {
            const comment = await CommentService.createComment(article_id, author_id, content);
            res.status(201).json(comment);
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ error: 'Failed to create comment' });
        }
    }

    // Get comments for a specific article
    async getComments(req: Request, res: Response): Promise<void> {
        const { article_id } = req.params;
        const limit = parseInt(req.query.limit as string) || 10;  // Default limit
        const offset = parseInt(req.query.offset as string) || 0;  // Default offset

        try {
            const comments = await CommentService.getCommentsByArticleId(parseInt(article_id), limit, offset);
            res.status(200).json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ error: 'Failed to fetch comments' });
        }
    }
}

export default new CommentController();
