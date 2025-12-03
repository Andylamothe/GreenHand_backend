import { Schema, model } from "mongoose";
import { IPlants } from "../interfaces/IPlants"
import { regex } from "../utils/regex";

 
const PlantSchema = new Schema<IPlants>(
  {
    name: {
      type: String,
      required: true,
      match: [regex.nameRegex, "Le nom contient des caractères invalides"],
      trim: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
      required: true,
    },
    inventoryId: {
        type: Schema.Types.ObjectId,
      required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    creationDate: {
     type: Date,
    },
    lastWatered: { 
        type: Date,

       }
  },
  { timestamps: true }
);
 

export const Plant = model<IPlants>("Plant", PlantSchema);