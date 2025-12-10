import { Schema, model } from "mongoose";
import { IUsers } from "../interfaces/IUsers"
import { IPlantPhotos } from "../interfaces/IPlantPhotos";
import { Document, Types } from "mongoose";

 
const PlantPhotosSchema = new Schema<IPlantPhotos>(
  {
    plantId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    photoUrl: {
      type: String,
    },
    healthScore: {
      type: Number,
      required: true,
    },

    comparisonResult: {
        type: String
    },
    dateTaken: {
     type: Date,
    }
  },
  { timestamps: true }
);
 

export const PlantPhotos = model<IPlantPhotos>("PlantPhotos", PlantPhotosSchema);