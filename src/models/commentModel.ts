import pool from '../config/db';

export interface Comment {
    id: number;
    article_id: number;
    author_id: number;
    content: string;
    created_at: Date;
}


export default class CommentModel {
    static async createComment(comment: Omit<Comment, 'id' | 'created_at'>): Promise<Comment> {
        const query = `
            INSERT INTO comments (article_id, author_id, content)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [comment.article_id, comment.author_id, comment.content];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async getCommentsByArticleId(
        article_id: number,
        limit: number,
        offset: number
    ): Promise<Comment[]> {
        const query = `
            SELECT * FROM comments
            WHERE article_id = $1
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3;
        `;
        const values = [article_id, limit, offset];
        const result = await pool.query(query, values);
        return result.rows;
    }
}
