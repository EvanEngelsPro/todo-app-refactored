const db = require('../../src/persistence');
const deleteItem = require('../../src/routes/deleteItem');
const ITEM = { id: 12345 };

jest.mock('../../src/persistence', () => ({
    removeItem: jest.fn(),
    getItem: jest.fn(),
}));

beforeEach(() => {
    jest.resetAllMocks();
});

test('it propagates error when removeItem fails', async () => {
    const error = new Error('DB connection lost');
    const req = { params: { id: 12345 } };
    const res = { sendStatus: jest.fn() };

    db.removeItem.mockRejectedValue(error);

    await expect(deleteItem(req, res)).rejects.toThrow('DB connection lost');
    expect(res.sendStatus).not.toHaveBeenCalled();
});

test('it removes item correctly', async () => {
    const req = { params: { id: 12345 } };
    const res = { sendStatus: jest.fn() };

    await deleteItem(req, res);

    expect(db.removeItem.mock.calls.length).toBe(1);
    expect(db.removeItem.mock.calls[0][0]).toBe(req.params.id);
    expect(res.sendStatus.mock.calls[0].length).toBe(1);
    expect(res.sendStatus.mock.calls[0][0]).toBe(200);
});
