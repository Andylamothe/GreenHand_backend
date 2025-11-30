//TODO faire les relations entre les models via les methodes appropriées
// Pour l'instant, juste les classes de base avec les attributs et constructeurs

import { Users } from './Users.js';
import { Plants } from './Plants.js';
import type { IInventory } from '../interfaces/IInventory.js';

export class Inventory implements IInventory {
    inventoryId: number;
    userId: number;
    plants: Plants[];
    createdAt: Date;
    updatedAt: Date;

    constructor(inventoryId: number, userId: number) {
        this.inventoryId = inventoryId;
        this.userId = userId;
        this.plants = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

}