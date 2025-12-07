import { Schema, model } from "mongoose";
import { IUsers } from "../interfaces/IUsers"
import { regex } from "../utils/regex";
import { comparePassword } from "../utils/bcryptHelp";
import { hashPasswordMiddleware } from "../middlewares/user.mw";

 
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
 
// ajoute le mw de haach avant chaque save
hashPasswordMiddleware(UserSchema);

// méthode  pour comparer mdp
UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return comparePassword(candidatePassword, this.password);
};

export const User = model<IUsers>("User", UserSchema);