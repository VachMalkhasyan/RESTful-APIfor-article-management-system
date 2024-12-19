import { body, } from 'express-validator';

// Validation rules for creating an article
export const validateCreateArticle = [
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('content').isString().notEmpty().withMessage('Content is required'),
];
