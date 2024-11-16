import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import verifiers from "./routes/verifiers"; // Chemin correct

dotenv.config();

const app = express();

const mongoUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/seedid";

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}


app.use(express.json());

// Enregistrement des routes
app.use("/api/verifiers", verifiers);

app.get("/", (req, res) => {
  res.send("Seed ID Backend Running");
});

export default app;
