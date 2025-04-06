//connect database mongoDB
import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
