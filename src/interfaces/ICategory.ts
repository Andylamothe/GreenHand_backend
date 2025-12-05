import { Document, Types } from "mongoose";


export interface ICategory extends Document{
    name: string;
    growth : string;
    soil : string;
    sunlight : string,
    watering : string,
    fertilizationType : string;
    categoryIcon?: string;
}