import { Request, Response } from 'express';
import { getAllTodos } from '../services/todoService';

export default async (req: Request, res: Response): Promise<void> => {
    const items = await getAllTodos();

    res.json(items);
};