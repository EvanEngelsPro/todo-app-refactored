import getGreeting from "../../src/routes/getGreeting";

test("it returns greeting correctly", async () => {
  const req: any = {};
  const res: any = { send: jest.fn() };

  await getGreeting(req, res);

  expect(res.send.mock.calls.length).toBe(1);
  expect(res.send.mock.calls[0][0]).toEqual({ greeting: "Hello world!" });
});
