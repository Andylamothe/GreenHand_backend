import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/ICategory"

 
const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    initialAdvice: {
      type: [String],
      required: true,
    },

    categoryIcon: {
        type: String,
        required: true,
    },
    wateringFrequency: {
     type: Number,
    },
    sunlightRequirement: { 
        type: String,
        enum: ['low', 'medium', 'high']
       }
  },
  { timestamps: true }
);
 

export const Category = model<ICategory>("Category", CategorySchema);