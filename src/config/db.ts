import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.DATABASE_URL || "mongodb://localhost:27017/seedid";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
