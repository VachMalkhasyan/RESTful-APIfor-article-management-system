import express, { Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    AuthController.register(req, res).catch(next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    AuthController.login(req, res).catch(next);
});

export default router;
