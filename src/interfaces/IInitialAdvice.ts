import { Document, Types } from "mongoose";

export interface IInitialAdvice extends Document{
    categoryId: Types.ObjectId;
    growth : string;
    soil : string;
    sunlight : string,
    watering : string,
    fertilizationType : string;
    
}