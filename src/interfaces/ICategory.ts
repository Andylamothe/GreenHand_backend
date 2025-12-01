import { Document, Types } from "mongoose";


export interface ICategory extends Document{
    name: string;
    description: string;
    initialAdvice: string[];
    categoryIcon?: string;
    wateringFrequency: number;
    sunlightRequirement: 'low' | 'medium' | 'high';
    // difficultyLevel: 'easy' | 'medium' | 'hard'; // ???
}