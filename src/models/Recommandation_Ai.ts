import { Schema, model } from "mongoose";
import { Document, Types } from "mongoose";
import { IRecommendationAi } from "../interfaces/IRecommendationAi";

 
const IRecommendationAiSchema = new Schema<IRecommendationAi>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    plantId: {
      type: Schema.Types.ObjectId,
      ref: 'Plants',
    },
    userQuery: {
      type: String,
      required: true,
    },
    aiResponse: {
      type: String,
      required: true,
    },
    recommendationType: {
      type: String,
      enum: ['watering', 'fertilizing', 'pruning', 'general','health'],
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
    },
    dateGenerated: {
     type: Date,
     default: Date.now,
    },
    isRead: {
     type: Boolean,
     default: false,
    },
    isApplied: {
     type: Boolean,
     default: false,
    },
  },
  { timestamps: true }
);
 

export const RecommendationAi = model<IRecommendationAi>("RecommendationAi", IRecommendationAiSchema);
