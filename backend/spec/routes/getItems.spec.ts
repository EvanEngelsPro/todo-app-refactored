import { jest, beforeEach, test, expect } from "@jest/globals";

jest.unstable_mockModule("../../src/persistence/index.js", () => ({
  default: {
    getItems: jest.fn(),
  },
}));

const { default: getItems } = await import("../../src/routes/getItems.js");

const persistenceModule = await import("../../src/persistence/index.js");

const mockedDb = persistenceModule.default as jest.Mocked<
  typeof persistenceModule.default
>;

beforeEach(() => {
  jest.clearAllMocks();
});

test("it propagates error when getItems fails", async () => {
  const error = new Error("DB connection lost");

  const req: any = {};
  const res: any = { json: jest.fn() };

  mockedDb.getItems.mockRejectedValue(error);

  await expect(getItems(req, res)).rejects.toThrow("DB connection lost");
});

test("it gets items correctly", async () => {
  const ITEMS = [{ id: "1", name: "Test", completed: false }];

  const req: any = {};
  const res: any = { json: jest.fn() };

  mockedDb.getItems.mockResolvedValue(ITEMS);

  await getItems(req, res);

  expect(res.json).toHaveBeenCalledWith(ITEMS);
});
