export interface ICategory {
    name: string;
    description: string;
    initialAdvice: string[];
    categoryIcon: string;
    wateringFrequency: number;
    sunlightRequirement: 'low' | 'medium' | 'high';
    difficultyLevel: 'easy' | 'medium' | 'hard';
}