import request from "supertest";
import app from "@/app";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/seedid-test");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Verifiers API", () => {
  it("should fetch an empty list of verifiers", async () => {
    const res = await request(app).get("/api/verifiers");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should add a new verifier", async () => {
    const newVerifier = { address: "0x123456789abcdef", verifierType: "bank" };
    const res = await request(app).post("/api/verifiers").send(newVerifier);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });
});
