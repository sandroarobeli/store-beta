import mongoose from "mongoose";

// Define Company Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define User class per its Schema (Blueprint)
// Also check if the model already exists. If so, no need to create it again..
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
