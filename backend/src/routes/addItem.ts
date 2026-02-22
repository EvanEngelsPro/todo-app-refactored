import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../persistence';

export default async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    const item = {
        id: uuid(),
        name: name.trim(),
        completed: false,
    };

    await db.storeItem(item);

    res.status(201).json(item);
};