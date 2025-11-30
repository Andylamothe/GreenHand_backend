//TODO faire les relations entre les models via les methodes appropriées
// Pour l'instant, juste les classes de base avec les attributs et constructeurs

import type { IRecommendationAi } from '../interfaces/IRecommendationAi.js';

export class RecommendationAi implements IRecommendationAi {
    id: number;
    plantId: number; 
    recommendationType: 'watering' | 'fertilizing' | 'pruning' | 'general' | 'health';
    recommendationText: string;
    priority: 'low' | 'medium' | 'high';
    dateGenerated: Date;
    isRead: boolean;
    isApplied: boolean;

    constructor(id: number, plantId: number, recommendationType: 'watering' | 'fertilizing' | 'pruning' | 'general' | 'health', recommendationText: string, priority: 'low' | 'medium' | 'high' = 'medium') {
        this.id = id;
        this.plantId = plantId;
        this.recommendationType = recommendationType;
        this.recommendationText = recommendationText;
        this.priority = priority;
        this.dateGenerated = new Date();
        this.isRead = false;
        this.isApplied = false;
    }


}