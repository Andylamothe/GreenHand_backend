import { Inventory } from "../models/Inventory";
import { Plant } from "../models/Plants";
import { HttpException } from "../utils/http-exception";

export class InventoryService {

  // sassurer que l’inventaire existe 
  async ensureInventory(userId: string) {
    let inv = await Inventory.findOne({ userId });
    if (!inv) inv = await Inventory.create({ userId });
    return inv;
  }

  // Récupérer inventaire du user
  async getInventory(userId: string) {
    const inv = await Inventory.findOne({ userId });
    if (!inv) throw new HttpException(404, "Inventaire introuvable");
    return inv;
  }

  // Récupérer plantes
  async getPlants(inventoryId: string) {
    return await Plant.find({ inventoryId });
  }

  // Ajouter plante
  async addPlant(inventoryId: string, plantData: any) {
    return await Plant.create({
      ...plantData,
      inventoryId,
    });
  }

  // Recherche
  async searchPlant(inventoryId: string, query: string) {
    return await Plant.find({
      inventoryId,
      name: { $regex: query, $options: "i" }
    });
  }

  // Filtre catégorie
  async filterCategory(inventoryId: string, categoryId: string) {
    return await Plant.find({ inventoryId, categoryId });
  }

  // Suppression plante
  async deletePlant(plantId: string) {
    const deleted = await Plant.findByIdAndDelete(plantId);
    if (!deleted) throw new HttpException(404, "Plante introuvable");
    return deleted;
  }


  // Supprimer un inventaire + toutes ses plantes
  async deleteInventory(userId: string) {
    const inventory = await Inventory.findOne({ userId });

    if (!inventory) {
      throw new HttpException(404, "Inventaire introuvable");
    }

    await Plant.deleteMany({ inventoryId: inventory._id });
    await Inventory.findByIdAndDelete(inventory._id);

    return { message: "Inventaire supprimé pour cet utilisateur" };
  }

}

