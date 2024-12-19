import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/User';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

class AuthService {
    async register(username: string, password: string, role: 'user' | 'admin') {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await UserModel.createUser(username, hashedPassword, role);
    }

    async login(username: string, password: string): Promise<string | null> {
        const user = await UserModel.findByUsername(username);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    }
}

export default new AuthService();
