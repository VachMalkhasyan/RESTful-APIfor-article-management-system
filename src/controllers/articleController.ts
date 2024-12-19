import { Request, Response } from 'express';
import ArticleService from '../services/articleService';

// Extend the Request interface to include the `user` property
interface AuthenticatedRequest extends Request {
    user?: { id: number }; // Adjust the type as per your authentication implementation
}

class ArticleController {
    async create(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { title, content } = req.body;
        const authorId = req.user?.id; // This should now work correctly

        if (!authorId) {
            res.status(401).json({ error: 'Unauthorized: Missing user information' });
            return;
        }

        try {
            const article = await ArticleService.createArticle(title, content, authorId);
            res.status(201).json(article);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        const { author_id, keyword } = req.query;
        console.log(author_id,'author_id')

        try {
            const articles = await ArticleService.getArticles(
                author_id ? parseInt(author_id as string, 10) : undefined,
                keyword ? (keyword as string) : undefined
            );
            res.status(200).json(articles);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const article = await ArticleService.getArticleById(parseInt(id, 10));
            if (!article) {
                res.status(404).json({ message: 'Article not found' });
                return;
            }
            res.status(200).json(article);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { title, content } = req.body;

        try {
            const article = await ArticleService.updateArticle(parseInt(id, 10), title, content);
            if (!article) {
                res.status(404).json({ message: 'Article not found' });
                return;
            }
            res.status(200).json(article);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await ArticleService.deleteArticle(parseInt(id, 10));
            res.status(200).json({ message: 'Article deleted successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }
    async paginate(req: Request, res: Response): Promise<void> {
        try {
            // Parse query parameters for limit and offset, providing defaults if not set
            const { limit, offset } = req.query;
            const parsedLimit = parseInt(limit as string, 10) || 10;  // Default to 10 articles per page
            const parsedOffset = parseInt(offset as string, 10) || 0;  // Default to starting from 0

            // Fetch the paginated articles using the service
            const articles = await ArticleService.getPaginatedArticles(parsedLimit, parsedOffset);

            // Send the paginated articles back in the response
            res.json(articles);
        } catch (error: unknown) {
            // Handle errors and send a proper response
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }
}

export default new ArticleController();
