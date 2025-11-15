import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  role: "guest" | "organizer";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      index: true,
    },
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ["guest", "organizer"],
      required: [true, "Role is required"],
      default: "guest",
    },
  },
  {
    timestamps: true,
  }
);

const User = (mongoose.models?.User ||
  mongoose.model<IUser>("User", UserSchema)) as Model<IUser>;

export default User;
