import { Request, Response } from "express";
import {
  getVerifiers,
  addVerifier,
} from "@/controllers/verifierController";
import KYCVerifier from "@/models/KYCVerifier";

jest.mock("@/models/KYCVerifier"); // Mock de KYCVerifier

describe("Verifier Controller", () => {
  it("should fetch all verifiers", async () => {
    const mockVerifiers = [
      {
        address: "0x123",
        verifierType: "bank",
        reputation: 0,
        validationsCount: 0,
      },
    ];
    (KYCVerifier.find as jest.Mock).mockResolvedValue(mockVerifiers);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getVerifiers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockVerifiers);
  });
});
