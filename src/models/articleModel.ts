import pool from '../config/db';

export interface Article {
    id: number;
    title: string;
    content: string;
    author_id: number;
    created_at: Date;
    updated_at: Date;
}

class ArticleModel {
    // Create an article
    async createArticle(title: string, content: string, authorId: number): Promise<Article> {
        const query = `
            INSERT INTO articles (title, content, author_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [title, content, authorId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Get articles with optional filtering
    async getArticles(authorId?: number, keyword?: string): Promise<Article[]> {
        let query = 'SELECT * FROM articles WHERE 1=1';
        const values: any[] = [];

        if (authorId) {
            query += ' AND author_id = $' + (values.length + 1);
            values.push(authorId);
        }

        if (keyword) {
            query += ' AND (title ILIKE $' + (values.length + 1) + ' OR content ILIKE $' + (values.length + 2) + ')';
            values.push(`%${keyword}%`, `%${keyword}%`);
        }

        query += ' ORDER BY created_at DESC';

        const result = await pool.query(query, values);
        return result.rows;
    }

    // Get article by ID
    async getArticleById(id: number): Promise<Article | null> {
        const query = 'SELECT * FROM articles WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    // Update an article
    async updateArticle(id: number, title: string, content: string): Promise<Article | null> {
        const query = `
            UPDATE articles
            SET title = $1, content = $2, updated_at = NOW()
            WHERE id = $3
            RETURNING *;
        `;
        const values = [title, content, id];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // Delete an article
    async deleteArticle(id: number): Promise<void> {
        const query = 'DELETE FROM articles WHERE id = $1';
        await pool.query(query, [id]);
    }

}

export default new ArticleModel();
