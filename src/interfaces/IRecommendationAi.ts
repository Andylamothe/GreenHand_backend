import { Document, Types } from "mongoose";

export interface IRecommendationAi extends Document{
    plantId: Types.ObjectId;
    recommendationType: 'watering' | 'fertilizing' | 'pruning' | 'general' | 'health';
    recommendationText: string;
    priority: 'low' | 'medium' | 'high';
    dateGenerated: Date;
    isRead: boolean;
    isApplied: boolean;
}