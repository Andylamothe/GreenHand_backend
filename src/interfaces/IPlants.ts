import { PlantPhotos } from '../models/PlantPhotos.js';

export interface IPlants {
    plantId: number;
    name: string;
    categoryId: number;
    description: string;
    photos: PlantPhotos[];
    inventoryId: number;
    plantedDate: Date;
    lastWatered?: Date;
    notes?: string;
}