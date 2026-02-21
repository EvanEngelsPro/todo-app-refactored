const db = require('../../src/persistence');
const addItem = require('../../src/routes/addItem');
const ITEM = { id: 12345 };
const { v4: uuid } = require('uuid');

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
    const req = { body: { name: 'Test item' } };
    const res = { send: jest.fn() };

    db.storeItem.mockRejectedValue(error);

    await expect(addItem(req, res)).rejects.toThrow('DB connection lost');
    expect(res.send).not.toHaveBeenCalled();
});

test('it stores item correctly', async () => {
    const id = 'something-not-a-uuid';
    const name = 'A sample item';
    const req = { body: { name } };
    const res = { send: jest.fn() };

    uuid.mockReturnValue(id);

    await addItem(req, res);

    const expectedItem = { id, name, completed: false };

    expect(db.storeItem.mock.calls.length).toBe(1);
    expect(db.storeItem.mock.calls[0][0]).toEqual(expectedItem);
    expect(res.send.mock.calls[0].length).toBe(1);
    expect(res.send.mock.calls[0][0]).toEqual(expectedItem);
});
