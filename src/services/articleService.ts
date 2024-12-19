import ArticleModel, { Article } from '../models/articleModel';
import pool from "../config/db";

class ArticleService {
    async createArticle(title: string, content: string, authorId: number): Promise<Article> {
        return await ArticleModel.createArticle(title, content, authorId);
    }

    async getArticles(authorId?: number, keyword?: string): Promise<Article[]> {
        return await ArticleModel.getArticles(authorId, keyword);
    }

    async getArticleById(id: number): Promise<Article | null> {
        return await ArticleModel.getArticleById(id);
    }

    async updateArticle(id: number, title: string, content: string): Promise<Article | null> {
        return await ArticleModel.updateArticle(id, title, content);
    }

    async deleteArticle(id: number): Promise<void> {
        await ArticleModel.deleteArticle(id);
    }

    async getPaginatedArticles(limit: number, offset: number): Promise<Article[]> {
        const query = `
      SELECT * FROM articles
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2;
    `;

        const result = await pool.query(query, [limit, offset]);
        return result.rows; // Return rows as an array of Article objects
    }

}

export default new ArticleService();
