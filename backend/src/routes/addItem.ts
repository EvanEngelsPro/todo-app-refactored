import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import db from '../persistence';

export default async (req: Request, res: Response): Promise<void> => {
    const item = {
        id: uuid(),
        name: req.body.name,
        completed: false,
    };

    await db.storeItem(item);
    res.send(item);
};
