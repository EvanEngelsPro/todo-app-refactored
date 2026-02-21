const db = require('../../src/persistence');
const getItems = require('../../src/routes/getItems');
const ITEMS = [{ id: 12345 }];

jest.mock('../../src/persistence', () => ({
    getItems: jest.fn(),
}));

beforeEach(() => {
    jest.resetAllMocks();
});

test('it propagates error when getItems fails', async () => {
    const error = new Error('DB connection lost');
    const req = {};
    const res = { send: jest.fn() };

    db.getItems.mockRejectedValue(error);

    await expect(getItems(req, res)).rejects.toThrow('DB connection lost');
    expect(res.send).not.toHaveBeenCalled();
});

test('it gets items correctly', async () => {
    const req = {};
    const res = { send: jest.fn() };
    db.getItems.mockReturnValue(Promise.resolve(ITEMS));

    await getItems(req, res);

    expect(db.getItems.mock.calls.length).toBe(1);
    expect(res.send.mock.calls[0].length).toBe(1);
    expect(res.send.mock.calls[0][0]).toEqual(ITEMS);
});
