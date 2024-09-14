import UserInterface from "../lib/UserInterface";
import { Document } from "mongoose";
import mongoose from "mongoose";

interface UserDocument extends UserInterface, Document {}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
