import { Document, Types } from "mongoose";

export interface IRecommendationAi extends Document{
    userId: Types.ObjectId;
    plantId?: Types.ObjectId;
    userQuery: string;
    aiResponse: string;
    recommendationType?: 'watering' | 'fertilizing' | 'pruning' | 'general' | 'health';
    recommendationText?: string;
    priority?: 'low' | 'medium' | 'high';
    dateGenerated?: Date;
    isRead?: boolean;
    isApplied?: boolean;
}