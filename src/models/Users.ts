import { Schema, model } from "mongoose";
import { IUsers } from "../interfaces/IUsers"

 
const UserSchema = new Schema<IUsers>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    location: {
        type: String,
        required: true,
    },
    createdAt: {
     type: Date,
    }
  },
  { timestamps: true }
);
 

export const User = model<IUsers>("User", UserSchema);