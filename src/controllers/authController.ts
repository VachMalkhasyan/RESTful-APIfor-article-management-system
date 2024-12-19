import { Request, Response } from 'express';
import AuthService from '../services/authService';

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        const { username, password, role } = req.body;

        try {
            const user = await AuthService.register(username, password, role);
            res.status(201).json(user);
        } catch (error: unknown) {  // Type the error as `unknown`
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const token = await AuthService.login(username, password);
            if (!token) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            res.status(200).json({ token });
        } catch (error: unknown) {  // Type the error as `unknown`
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }
}

export default new AuthController();
