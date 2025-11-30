import { Plants } from '../models/Plants.js';

export interface IInventory {
    inventoryId: number;
    userId: number;
    plants: Plants[];
    createdAt: Date;
    updatedAt: Date;
}