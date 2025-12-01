import { Schema, model } from "mongoose";
import { IPlants } from "../interfaces/IPlants"

 
const PlantSchema = new Schema<IPlants>(
  {
    name: {
      type: String,
      required: true,
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