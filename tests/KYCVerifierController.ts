import request from "supertest";
import app from "../app"; // Assurez-vous que le chemin est correct

describe("Verifier Controller Tests", () => {
  it("GET /api/verifiers - should return an empty array when no verifiers exist", async () => {
    const response = await request(app).get("/api/verifiers");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("POST /api/verifiers - should add a verifier and return it", async () => {
    const verifierData = {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      verifierType: "bank",
    };

    const response = await request(app)
      .post("/api/verifiers")
      .send(verifierData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(verifierData);
  });
});
