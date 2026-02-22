import request from 'supertest';
import app from '../src/app';
import db from '../src/persistence';

describe('Error handling', () => {
    test('should return 500 when database throws unexpected error', async () => {
        const originalStoreItem = db.storeItem;

        // Simuler une erreur interne
        db.storeItem = jest.fn().mockRejectedValue(new Error('Unexpected DB error'));

        const response = await request(app)
            .post('/api/items')
            .send({ name: 'Test error' });

        expect(response.status).toBe(500);

        expect(response.body).toEqual({
            error: 'Internal Server Error',
        });

        // restaurer le comportement normal
        db.storeItem = originalStoreItem;
    });
});