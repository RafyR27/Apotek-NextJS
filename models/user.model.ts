import { IUser } from "@/types/user";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>({
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  noHP: {
    type: Schema.Types.String,
    required: true,
  },
  gambar: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.String,
    enum: ["kasir", "admin", "user"],
    default: "user",
    required: true,
  },
}, {
    timestamps: true,
});

const UserModel = mongoose.models.user || mongoose.model<IUser>("user", userSchema);

export default UserModel;