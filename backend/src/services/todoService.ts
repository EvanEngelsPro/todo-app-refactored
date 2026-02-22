import db from '../persistence';
import { TodoItem } from '../persistence/types';
import { v4 as uuid } from 'uuid';

export async function createTodo(name: string): Promise<TodoItem> {
    const item: TodoItem = {
        id: uuid(),
        name: name.trim(),
        completed: false,
    };

    await db.storeItem(item);

    return item;
}

export async function getAllTodos(): Promise<TodoItem[]> {
    return db.getItems();
}

export async function updateTodo(
    id: string,
    name: string,
    completed: boolean,
): Promise<TodoItem | undefined> {
    await db.updateItem(id, { id, name, completed });

    return db.getItem(id);
}

export async function deleteTodo(id: string): Promise<void> {
    await db.removeItem(id);
}