//TODO faire les relations entre les models via les methodes appropriées
// Pour l'instant, juste les classes de base avec les attributs et constructeurs

import { Category } from './Category.js';
import { PlantPhotos } from './PlantPhotos.js';
import type { IPlants } from '../interfaces/IPlants.js';

export class Plants implements IPlants {
    plantId: number;
    name: string;
    categoryId: number; // Référence à la catégorie
    description: string;
    photos: PlantPhotos[];
    inventoryId: number; // Référence à l'inventaire
    plantedDate: Date;
    lastWatered?: Date;
    notes?: string;
  

    constructor(plantId: number, name: string, categoryId: number, description: string, inventoryId: number) {
        this.plantId = plantId;
        this.name = name;
        this.categoryId = categoryId;
        this.description = description;
        this.inventoryId = inventoryId;
        this.photos = [];
        this.plantedDate = new Date();
    }



    
}