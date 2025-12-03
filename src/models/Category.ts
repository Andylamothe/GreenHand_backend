import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/ICategory"
import { regex } from "../utils/regex";

 
const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      match: [regex.nameRegex, "Le nom contient des caractères invalides"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    initialAdvice: {
      type: [String],
      required: true,
    },

    categoryIcon: {
        type: String,
        required: true,
        trim: true,
    },
  },
  { timestamps: true }
);
 

export const Category = model<ICategory>("Category", CategorySchema);