import { PlantPhotos } from '../models/PlantPhotos.js';
import {Types} from "mongoose"

export interface IPlants {
    name: string;
    categoryId: Types.ObjectId;
    inventoryId: Types.ObjectId;
    description: string;
    creationDate: Date;
    lastWatered?: Date;
    notes?: string;
}