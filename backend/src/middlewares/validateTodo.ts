import { Request, Response, NextFunction } from 'express';

export function validateCreateTodo(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const { name } = req.body ?? {};

    if (typeof name !== 'string' || name.trim().length === 0) {
        res.status(400).json({
            error: 'Invalid input: name must be a non-empty string',
        });
        return;
    }

    next();
}

export function validateUpdateTodo(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const { name, completed } = req.body ?? {};

    if (typeof name !== 'string' || name.trim().length === 0) {
        res.status(400).json({
            error: 'Invalid input: name must be a non-empty string',
        });
        return;
    }

    if (typeof completed !== 'boolean') {
        res.status(400).json({
            error: 'Invalid input: completed must be a boolean',
        });
        return;
    }

    next();
}