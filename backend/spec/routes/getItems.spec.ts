import db from '../../src/persistence';
import getItems from '../../src/routes/getItems';

const ITEMS = [{ id: 12345 }];

jest.mock('../../src/persistence', () => ({
    getItems: jest.fn(),
}));

beforeEach(() => {
    jest.resetAllMocks();
});

test('it propagates error when getItems fails', async () => {
    const error = new Error('DB connection lost');
    const req: any = {};
    const res: any = {
        json: jest.fn(),
    };

    (db.getItems as jest.Mock).mockRejectedValue(error);

    await expect(getItems(req, res)).rejects.toThrow('DB connection lost');
    expect(res.json).not.toHaveBeenCalled();
});

test('it gets items correctly', async () => {
    const req: any = {};
    const res: any = {
        json: jest.fn(),
    };
    (db.getItems as jest.Mock).mockReturnValue(Promise.resolve(ITEMS));

    await getItems(req, res);

    expect((db.getItems as jest.Mock).mock.calls.length).toBe(1);
    expect(res.json.mock.calls[0].length).toBe(1);
    expect(res.json.mock.calls[0][0]).toEqual(ITEMS);
});

