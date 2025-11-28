//TODO faire les relations entre les models via les methodes appropriées
// Pour l'instant, juste les classes de base avec les attributs et constructeurs

export class RecommendationAi {
    id: number;
    plantId: number; 
    recommendationType: 'watering' | 'fertilizing' | 'pruning' | 'general' | 'health';
    recommendationText: string;
    dateGenerated: Date;
    isRead: boolean;
    isApplied: boolean;

    constructor(id: number, plantId: number, recommendationType: 'watering' | 'fertilizing' | 'pruning' | 'general' | 'health', recommendationText: string) {
        this.id = id;
        this.plantId = plantId;
        this.recommendationType = recommendationType;
        this.recommendationText = recommendationText;
        this.dateGenerated = new Date();
        this.isRead = false;
        this.isApplied = false;
    }


}