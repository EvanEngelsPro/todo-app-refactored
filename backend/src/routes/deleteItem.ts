import { Request, Response } from 'express';
import db from '../persistence';

export default async (req: Request, res: Response): Promise<void> => {
    await db.removeItem(req.params.id as string);
    res.sendStatus(200);
};
