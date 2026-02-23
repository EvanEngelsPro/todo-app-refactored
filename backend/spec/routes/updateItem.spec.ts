import { jest, test, expect, beforeEach } from "@jest/globals";

type TodoItem = {
  id: string;
  name: string;
  completed: boolean;
};

const mockedGetItem = jest.fn<() => Promise<TodoItem>>();
const mockedUpdateItem = jest.fn<() => Promise<void>>();

jest.unstable_mockModule("../../src/persistence/index.js", () => ({
  default: {
    getItem: mockedGetItem,
    updateItem: mockedUpdateItem,
  },
}));

const { default: updateItem } = await import("../../src/routes/updateItem.js");

beforeEach(() => {
  jest.clearAllMocks();
});

const ITEM: TodoItem = {
  id: "12345",
  name: "Test",
  completed: false,
};

test("it propagates error when updateItem fails", async () => {
  const error = new Error("DB connection lost");

  mockedUpdateItem.mockRejectedValue(error);

  const req: any = {
    params: { id: "1234" },
    body: { name: "New title", completed: false },
  };

  const res: any = {
    json: jest.fn(),
  };

  const next = jest.fn();

  await expect(updateItem(req, res, next)).rejects.toThrow(
    "DB connection lost",
  );
});

test("it updates items correctly", async () => {
  mockedGetItem.mockResolvedValue(ITEM);

  const req: any = {
    params: { id: "1234" },
    body: { name: "New title", completed: false },
  };

  const res: any = {
    json: jest.fn(),
  };

  const next = jest.fn();

  await updateItem(req, res, next);

  expect(mockedUpdateItem).toHaveBeenCalledWith("1234", {
    id: "1234",
    name: "New title",
    completed: false,
  });

  expect(mockedGetItem).toHaveBeenCalledWith("1234");

  expect(res.json).toHaveBeenCalledWith(ITEM);
});
