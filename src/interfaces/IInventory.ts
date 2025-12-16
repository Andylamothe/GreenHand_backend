import { Document, Types } from "mongoose";


export interface IInventory extends Document{
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    // quantity: number;
    // createdAt: Date;
    // updatedAt: Date;

}