import { jest, beforeEach, test, expect } from "@jest/globals";

jest.unstable_mockModule("../../src/persistence/index.js", () => ({
  default: {
    removeItem: jest.fn(),
  },
}));

const { default: deleteItem } = await import("../../src/routes/deleteItem.js");

const persistenceModule = await import("../../src/persistence/index.js");

const mockedDb = persistenceModule.default as jest.Mocked<
  typeof persistenceModule.default
>;

beforeEach(() => {
  jest.clearAllMocks();
});

test("it propagates error when removeItem fails", async () => {
  const error = new Error("DB connection lost");

  const req: any = {
    params: { id: "123" },
  };

  const res: any = { sendStatus: jest.fn() };

  const next = jest.fn();

  mockedDb.removeItem.mockRejectedValue(error);

  await expect(deleteItem(req, res, next)).rejects.toThrow(
    "DB connection lost",
  );
});

test("it removes item correctly", async () => {
  const req: any = {
    params: { id: "123" },
  };

  const res: any = { sendStatus: jest.fn() };

  const next = jest.fn();

  mockedDb.removeItem.mockResolvedValue(undefined);

  await deleteItem(req, res, next);

  expect(mockedDb.removeItem).toHaveBeenCalledWith("123");
});
