import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    password: {
      type: String,
    },
    confirmPassword: String,
    role: {
      type: String,
      default: "user",
    },
    picture: String,
    displayName: String,
    email: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
