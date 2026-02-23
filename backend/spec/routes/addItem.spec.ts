import { jest, beforeEach, test, expect } from "@jest/globals";

type TodoItem = {
  id: string;
  name: string;
  completed: boolean;
};

const mockedDb: {
  storeItem: jest.Mock<(item: TodoItem) => Promise<void>>;
} = {
  storeItem: jest.fn(),
};

const mockedUuid: {
  v4: jest.Mock<() => string>;
} = {
  v4: jest.fn(),
};

jest.unstable_mockModule("../../src/persistence/index.js", () => ({
  default: mockedDb,
}));

jest.unstable_mockModule("uuid", () => mockedUuid);

const { default: addItem } = await import("../../src/routes/addItem.js");

beforeEach(() => {
  jest.clearAllMocks();
});

test("it propagates error when storeItem fails", async () => {
  const error = new Error("DB connection lost");

  mockedDb.storeItem.mockRejectedValue(error);

  const req: any = {
    body: { name: "Test item" },
  };

  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(addItem(req, res)).rejects.toThrow("DB connection lost");

  expect(res.json).not.toHaveBeenCalled();
});

test("it stores item correctly", async () => {
  const id = "123";

  mockedUuid.v4.mockReturnValue(id);

  const req: any = {
    body: { name: "Test item" },
  };

  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await addItem(req, res);

  expect(mockedDb.storeItem).toHaveBeenCalledWith({
    id,
    name: "Test item",
    completed: false,
  });

  expect(res.status).toHaveBeenCalledWith(201);

  expect(res.json).toHaveBeenCalledWith({
    id,
    name: "Test item",
    completed: false,
  });
});

test("it always creates item with completed set to false", async () => {
  const id = "test-uuid";

  mockedUuid.v4.mockReturnValue(id);

  const req: any = {
    body: {
      name: "Buy milk",
      completed: true,
    },
  };

  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await addItem(req, res);

  const storedItem = mockedDb.storeItem.mock.calls[0][0];

  expect(storedItem.completed).toBe(false);
});
