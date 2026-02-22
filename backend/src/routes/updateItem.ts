import { RequestHandler } from 'express';
import { updateTodo } from '../services/todoService';

interface UpdateParams {
    id: string;
}

interface UpdateBody {
    name: string;
    completed: boolean;
}

const updateItem: RequestHandler<UpdateParams, unknown, UpdateBody> = async (
    req,
    res,
) => {
    const item = await updateTodo(
        req.params.id,
        req.body.name,
        req.body.completed,
    );

    res.json(item);
};


export default updateItem;