import { Document, Types } from "mongoose";


export interface IInventory extends Document{
    userId: Types.ObjectId;
    quantity: number;
    // createdAt: Date;
    // updatedAt: Date;

}