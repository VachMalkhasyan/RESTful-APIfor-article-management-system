import pool from '../config/db';

interface User {
    id: number;
    username: string;
    password: string;
    role: 'user' | 'admin';
}

class UserModel {
    async findByUsername(username: string): Promise<User | null> {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return rows[0] || null;
    }

    async createUser(username: string, hashedPassword: string, role: 'user' | 'admin'): Promise<User> {
        const { rows } = await pool.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, role]
        );
        return rows[0];
    }
}

export default new UserModel();
