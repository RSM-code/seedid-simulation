import { Request, Response } from "express";
import { provider, contract } from "../utils/contract";
import { ethers, Contract } from "ethers";

export const addRevenue = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { verifier, amount } = req.body;
    const signer = await provider.getSigner();

    const contractWithSigner = contract.connect(signer) as Contract & {
      addRevenue(
        verifier: string,
        amount: number
      ): Promise<ethers.TransactionResponse>;
    };

    const tx = await contractWithSigner.addRevenue(verifier, amount);
    await tx.wait();

    res
      .status(200)
      .json({ message: "Revenue added successfully", txHash: tx.hash });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "An unknown error occurred" });
  }
};