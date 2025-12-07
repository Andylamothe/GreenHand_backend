import { Schema, model } from "mongoose";
import { Types } from "mongoose";
import { IInventory } from "../interfaces/IInventory";
 
const InventorySchema = new Schema<IInventory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
 

export const Inventory = model<IInventory>("Inventory", InventorySchema);