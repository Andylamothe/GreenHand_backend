import { Schema, model } from "mongoose";
import { Document, Types } from "mongoose";
import { IInventory } from "../interfaces/IInventory";
 
const InventorySchema = new Schema<IInventory>(
  {
    userId: {
      type: Types.ObjectId,
      required : true,
     
    },
    quantity: {
      type: Number,
    
  },
},

  { timestamps: true }
);
 

export const Inventory = model<IInventory>("Inventory", InventorySchema);