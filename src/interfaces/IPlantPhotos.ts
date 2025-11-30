export interface IPlantPhotos {
    id: number;
    plantId: number;
    photoUrl: string;
    healthScore: number;
    comparisonResult: string;
    dateTaken: Date;
    analysisComplete: boolean;
}