import request from 'supertest';
import app from '../src/app';
import db from '../src/persistence';
import fs from 'fs';
import path from 'path';
import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';

const TEST_DB_PATH = path.join(__dirname, 'test.db');

describe('HTTP Integration Tests', () => {
    beforeAll(async () => {
        process.env.SQLITE_DB_LOCATION = TEST_DB_PATH;
        if (fs.existsSync(TEST_DB_PATH)) {
            fs.unlinkSync(TEST_DB_PATH);
        }
        await db.init();
    });

    afterAll(async () => {
        await db.teardown();
        if (fs.existsSync(TEST_DB_PATH)) {
            fs.unlinkSync(TEST_DB_PATH);
        }
    });

    test('GET /api/greeting should return the greeting', async () => {
        const response = await request(app).get('/api/greeting');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ greeting: 'Hello world!' });
    });

    test('Full Todo CRUD lifecycle', async () => {
        // 1. Get initial items (empty)
        const getInitial = await request(app).get('/api/items');
        expect(getInitial.status).toBe(200);
        expect(getInitial.body).toEqual([]);

        // 2. Add an item
        const addItem = await request(app)
            .post('/api/items')
            .send({ name: 'Integration Test Item' });
        expect(addItem.status).toBe(201);
        const newItem = addItem.body;
        expect(newItem.name).toBe('Integration Test Item');
        expect(newItem.completed).toBe(false);
        expect(newItem.id).toBeDefined();

        // 3. Update the item
        const updateItem = await request(app)
            .put(`/api/items/${newItem.id}`)
            .send({ name: 'Updated Name', completed: true });
        expect(updateItem.status).toBe(200);
        expect(updateItem.body.name).toBe('Updated Name');
        expect(updateItem.body.completed).toBe(true);

        // 4. Delete the item
        const deleteItem = await request(app).delete(`/api/items/${newItem.id}`);
        expect(deleteItem.status).toBe(200);

        // 5. Verify it's gone
        const getFinal = await request(app).get('/api/items');
        expect(getFinal.body).toEqual([]);
    });
});

