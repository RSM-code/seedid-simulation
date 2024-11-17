import { Request, Response } from "express";
import KYCVerifier from "../models/KYCVerifier"; // Modèle Mongoose des vérificateurs

/**
 * Récupère tous les vérificateurs
 */
export const getVerifiers = async (req: Request, res: Response) => {
  try {
    const verifiers = await KYCVerifier.find();
    res.status(200).json(verifiers);
  } catch (error) {
    console.error("Error fetching verifiers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Ajoute un nouveau vérificateur
 */
export const addVerifier = async (req: Request, res: Response) => {
  const { address, verifierType } = req.body;

  if (!address || !verifierType) {
    return res
      .status(400)
      .json({ error: "Missing required fields: address, verifierType" });
  }

  try {
    const newVerifier = new KYCVerifier({
      address,
      verifierType,
      reputation: 0, // Par défaut
      validationsCount: 0, // Par défaut
    });

    await newVerifier.save();
    res.status(201).json(newVerifier);
  } catch (error) {
    console.error("Error adding verifier:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
