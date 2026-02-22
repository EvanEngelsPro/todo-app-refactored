import { Request, Response } from 'express';
import db from '../persistence';

export default async (req: Request, res: Response): Promise<void> => {
    const items = await db.getItems();
    res.send(items);
};
