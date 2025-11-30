//TODO faire les relations entre les models via les methodes appropriées
// Pour l'instant, juste les classes de base avec les attributs et constructeurs

import type { ICategory } from '../interfaces/ICategory.js';

export class Category implements ICategory {
    categoryId: number;
    name: string;
    description: string;
    initialAdvice: string[];
    categoryIcon: string;
    wateringFrequency: number; // Fréquence d'arrosage en jours
    sunlightRequirement: 'low' | 'medium' | 'high';
    difficultyLevel: 'easy' | 'medium' | 'hard';

    constructor(categoryId: number, name: string, description: string, initialAdvice: string[], categoryIcon: string, wateringFrequency: number = 7, sunlightRequirement: 'low' | 'medium' | 'high' = 'medium', difficultyLevel: 'easy' | 'medium' | 'hard' = 'medium') {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.initialAdvice = initialAdvice;
        this.categoryIcon = categoryIcon;
        this.wateringFrequency = wateringFrequency;
        this.sunlightRequirement = sunlightRequirement;
        this.difficultyLevel = difficultyLevel;
    }


}