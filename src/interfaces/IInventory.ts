import { Plants } from '../models/Plants.js';

export interface IInventory {
    userId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;

}