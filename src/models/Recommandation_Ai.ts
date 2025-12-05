import { Schema, model } from "mongoose";
import { IUsers } from "../interfaces/IUsers"
import { IPlantPhotos } from "../interfaces/IPlantPhotos";
import { Document, Types } from "mongoose";
import { IRecommendationAi } from "../interfaces/IRecommendationAi";

 
const IRecommendationAiSchema = new Schema<IRecommendationAi>(
  {
    plantId: {
      type: Types.ObjectId,
      required: true,
    },
    recommendationType: {
      type: String,
      enum: ['watering', 'fertilizing', 'pruning', 'general','health'],
    },

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
    },
    dateGenerated: {
     type: Date,
    },
      isRead: {
     type: Boolean,
    },
     isApplied: {
     type: Boolean,
    },
  },
  { timestamps: true }
);
 

export const RecommendationAi= model<IRecommendationAi>("RecommendationAi", IRecommendationAiSchema);