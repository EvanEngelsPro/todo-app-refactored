import request from "supertest";
import app from "../src/app.js";
import db from "../src/persistence/index.js";
import { jest, describe, test, expect } from "@jest/globals";

describe("Error handling", () => {
  test("should return 500 when database throws unexpected error", async () => {
    const spy = jest
      .spyOn(db, "storeItem")
      .mockRejectedValue(new Error("Unexpected DB error"));

    const response = await request(app)
      .post("/api/items")
      .send({ name: "Test error" });

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
      error: "Internal Server Error",
    });

    spy.mockRestore();
  });
});
