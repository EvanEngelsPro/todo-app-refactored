import db from '../../src/persistence';
import addItem from '../../src/routes/addItem';
import { v4 as uuid } from 'uuid';

jest.mock('uuid', () => ({ v4: jest.fn() }));

jest.mock('../../src/persistence', () => ({
    removeItem: jest.fn(),
    storeItem: jest.fn(),
    getItem: jest.fn(),
}));

beforeEach(() => {
    jest.resetAllMocks();
});

test('it propagates error when storeItem fails', async () => {
    const error = new Error('DB connection lost');
    const req: any = { body: { name: 'Test item' } };
    const res: any = { send: jest.fn() };

    (db.storeItem as jest.Mock).mockRejectedValue(error);

    await expect(addItem(req, res)).rejects.toThrow('DB connection lost');
    expect(res.send).not.toHaveBeenCalled();
});

test('it stores item correctly', async () => {
    const id = 'something-not-a-uuid';
    const name = 'A sample item';
    const req: any = { body: { name } };
    const res: any = { send: jest.fn() };

    (uuid as jest.Mock).mockReturnValue(id);

    await addItem(req, res);

    const expectedItem = { id, name, completed: false };

    expect((db.storeItem as jest.Mock).mock.calls.length).toBe(1);
    expect((db.storeItem as jest.Mock).mock.calls[0][0]).toEqual(expectedItem);
    expect(res.send.mock.calls[0].length).toBe(1);
    expect(res.send.mock.calls[0][0]).toEqual(expectedItem);
});

test('it always creates item with completed set to false', async () => {
    const id = 'test-uuid';
    const req: any = { body: { name: 'Buy milk', completed: true } };
    const res: any = { send: jest.fn() };

    (uuid as jest.Mock).mockReturnValue(id);

    await addItem(req, res);

    const storedItem = (db.storeItem as jest.Mock).mock.calls[0][0];
    expect(storedItem.completed).toBe(false);
});

