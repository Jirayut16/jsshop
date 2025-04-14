//connect database mongoDB
import mongoose from "mongoose";
import "dotenv/config";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
