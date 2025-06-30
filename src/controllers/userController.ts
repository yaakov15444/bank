import * as userService from '../services/userService';
import { Request, Response } from 'express';
import AppError from '../utils/AppError';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};