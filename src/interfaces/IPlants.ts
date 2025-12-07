import {Types} from "mongoose"

// à revoir pour la partie analyse et catégories
export interface IPlants extends Document{
    name: string;
    categoryId: Types.ObjectId;
    inventoryId: Types.ObjectId;
    plantCondition?: number;
    description?: string;
    creationDate: Date;
    lastWatered?: Date;
    notes?: string;
}