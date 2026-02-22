import db from '../../src/persistence/sqlite';
import fs from 'fs';
import { TodoItem } from '../../src/persistence/types';
import { beforeEach, afterEach, test, expect } from '@jest/globals';

const location = process.env.SQLITE_DB_LOCATION || '/etc/todos/todo.db';

const ITEM: TodoItem = {
    id: '7aef3d7c-d301-4846-8358-2a91ec9d6be3',
    name: 'Test',
    completed: false,
};

beforeEach(() => {
    if (fs.existsSync(location)) {
        fs.unlinkSync(location);
    }
});

afterEach(async () => {
    await db.teardown().catch(() => { });
});

test('it initializes correctly', async () => {
    await db.init();
});

test('it can store and retrieve items', async () => {
    await db.init();

    await db.storeItem(ITEM);

    const items = await db.getItems();
    expect(items.length).toBe(1);
    expect(items[0]).toEqual(ITEM);
});

test('it can update an existing item', async () => {
    await db.init();

    const initialItems = await db.getItems();
    expect(initialItems.length).toBe(0);

    await db.storeItem(ITEM);

    await db.updateItem(
        ITEM.id,
        Object.assign({}, ITEM, { completed: !ITEM.completed }),
    );

    const items = await db.getItems();
    expect(items.length).toBe(1);
    expect(items[0].completed).toBe(!ITEM.completed);
});

test('it can remove an existing item', async () => {
    await db.init();
    await db.storeItem(ITEM);

    await db.removeItem(ITEM.id);

    const items = await db.getItems();
    expect(items.length).toBe(0);
});

test('it can get a single item', async () => {
    await db.init();
    await db.storeItem(ITEM);

    const item = await db.getItem(ITEM.id);
    expect(item).toEqual(ITEM);
});

test('it returns empty array when no items exist', async () => {
    await db.init();

    const items = await db.getItems();
    expect(items).toEqual([]);
});

test('it returns undefined for a non-existent item', async () => {
    await db.init();

    const item = await db.getItem('non-existent-id');
    expect(item).toBeUndefined();
});

