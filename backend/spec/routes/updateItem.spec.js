const db = require('../../src/persistence');
const updateItem = require('../../src/routes/updateItem');
const ITEM = { id: 12345 };

jest.mock('../../src/persistence', () => ({
    getItem: jest.fn(),
    updateItem: jest.fn(),
}));

beforeEach(() => {
    jest.resetAllMocks();
});

test('it propagates error when updateItem fails', async () => {
    const error = new Error('DB connection lost');
    const req = {
        params: { id: 1234 },
        body: { name: 'New title', completed: false },
    };
    const res = { send: jest.fn() };

    db.updateItem.mockRejectedValue(error);

    await expect(updateItem(req, res)).rejects.toThrow('DB connection lost');
    expect(res.send).not.toHaveBeenCalled();
});

test('it updates items correctly', async () => {
    const req = {
        params: { id: 1234 },
        body: { name: 'New title', completed: false },
    };
    const res = { send: jest.fn() };

    db.getItem.mockReturnValue(Promise.resolve(ITEM));

    await updateItem(req, res);

    expect(db.updateItem.mock.calls.length).toBe(1);
    expect(db.updateItem.mock.calls[0][0]).toBe(req.params.id);
    expect(db.updateItem.mock.calls[0][1]).toEqual({
        name: 'New title',
        completed: false,
    });

    expect(db.getItem.mock.calls.length).toBe(1);
    expect(db.getItem.mock.calls[0][0]).toBe(req.params.id);

    expect(res.send.mock.calls[0].length).toBe(1);
    expect(res.send.mock.calls[0][0]).toEqual(ITEM);
});
