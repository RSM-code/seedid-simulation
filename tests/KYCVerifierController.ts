import request from "supertest";
import createApp from "../src/app";

const app = createApp();

describe("GET /api/verifiers", () => {
  it("should return an empty array", async () => {
    const response = await request(app).get("/api/verifiers");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
