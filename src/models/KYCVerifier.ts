import mongoose, { Schema, Document } from "mongoose";

// Interface pour le modèle
export interface IKYCVerifier extends Document {
  address: string;
  verifierType: string;
  reputation: number;
  validationsCount: number;
}

// Schéma de vérificateur
const KYCVerifierSchema: Schema = new Schema({
  address: { type: String, required: true },
  verifierType: { type: String, required: true },
  reputation: { type: Number, default: 0 },
  validationsCount: { type: Number, default: 0 },
});

export default mongoose.model<IKYCVerifier>("KYCVerifier", KYCVerifierSchema);
