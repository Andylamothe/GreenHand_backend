import { Document, Types } from "mongoose";


export interface IPlantPhotos extends Document{
    plantId: Types.ObjectId;
    photoUrl: string;
    healthScore: number;
    comparisonResult: string;
    dateTaken: Date;
    // analysisComplete: boolean; ??
}