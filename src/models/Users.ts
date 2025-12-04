import { Schema, model } from "mongoose";
import { IUsers } from "../interfaces/IUsers"
import { regex } from "../utils/regex";

 
const UserSchema = new Schema<IUsers>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [regex.emailRegex, "Email invalide"],
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      match: [
        regex.usernameRegex,
        "Nom d'utilisateur invalide (3 - 30 caractères, alphanum + ._-).",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      match: [
        regex.passwordRegex,
        "Mot de passe trop faible (8+ caractères, maj, min, chiffre, symbole).",
      ],
    },

    location: {
        type: String,
        required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
     type: Date,
    }
  },
  { timestamps: true }
);
 

export const User = model<IUsers>("User", UserSchema);