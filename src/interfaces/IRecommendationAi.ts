export interface IRecommendationAi {
    id: number;
    plantId: number;
    recommendationType: 'watering' | 'fertilizing' | 'pruning' | 'general' | 'health';
    recommendationText: string;
    priority: 'low' | 'medium' | 'high';
    dateGenerated: Date;
    isRead: boolean;
    isApplied: boolean;
}