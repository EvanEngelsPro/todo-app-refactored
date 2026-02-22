import { RequestHandler } from 'express';

interface CreateBody {
    name: string;
}

export const validateCreateTodo: RequestHandler<
    Record<string, never>,
    unknown,
    CreateBody
> = (req, res, next) => {
    const { name } = req.body ?? {};

    if (typeof name !== 'string' || name.trim().length === 0) {
        res.status(400).json({
            error: 'Invalid input: name must be a non-empty string',
        });
        return;
    }

    next();
};

interface UpdateParams {
    id: string;
}

interface UpdateBody {
    name: string;
    completed: boolean;
}

export const validateUpdateTodo: RequestHandler<
    UpdateParams,
    unknown,
    UpdateBody
> = (req, res, next) => {
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
};