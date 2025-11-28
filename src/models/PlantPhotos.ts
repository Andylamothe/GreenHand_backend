//TODO faire les relations entre les models via les methodes appropriées
// Pour l'instant, juste les classes de base avec les attributs et constructeurs

export class PlantPhotos {
    id: number;
    plantId: number; // Référence à la plant
    photoUrl: string;
    healthScore: number;
    comparisonResult: string;
    dateTaken: Date;
    analysisComplete: boolean;

    constructor(id: number, plantId: number, photoUrl: string, healthScore: number, comparisonResult: string, dateTaken: Date) {
        this.id = id;
        this.plantId = plantId;
        this.photoUrl = photoUrl;
        this.healthScore = healthScore;
        this.comparisonResult = comparisonResult;
        this.dateTaken = dateTaken;
        this.analysisComplete = false;
    }


}