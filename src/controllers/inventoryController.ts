import { Request, Response, NextFunction } from "express";
import { InventoryService } from "../services/inventoryService";

// -----------------------------------------------------------
// INSTANCIATION
// -----------------------------------------------------------
const inventoryService = new InventoryService();

export class InventoryController {

  // GET /inventory/me
  getMyInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const inventory = await inventoryService.getInventory(userId);
      res.json(inventory);
    } catch (err) {
      next(err);
    }
  };

  // GET /inventory/me/plants
  getMyPlants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const inventory = await inventoryService.getInventory(userId);

      const inventoryId = inventory._id.toString();
      
      const plants = await inventoryService.getPlants(inventoryId);

      res.json(plants);
    } catch (err) {
      next(err);
    }
  };

  // POST /inventory/me/plants
  addPlant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const inventory = await inventoryService.ensureInventory(userId);

      const inventoryId = inventory._id.toString();

      const plant = await inventoryService.addPlant(
        inventoryId,
        req.body
      );

      res.status(201).json(plant);
    } catch (err) {
      next(err);
    }
  };

  // GET /inventory/search?name=xxx
  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const name = String(req.query.name);

      const inventory = await inventoryService.getInventory(userId);
      const inventoryId = inventory._id.toString();

      const plants = await inventoryService.searchPlant(
        inventoryId,
        name
      );

      res.json(plants);
    } catch (err) {
      next(err);
    }
  };

  // GET /inventory/filter?category=xxx
  filter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const categoryId = String(req.query.category);

      const inventory = await inventoryService.getInventory(userId);
      const inventoryId = inventory._id.toString();

      const plants = await inventoryService.filterCategory(
        inventoryId,
        categoryId
      );

      res.json(plants);
    } catch (err) {
      next(err);
    }
  };

  // DELETE /inventory/plants/:id
  deletePlant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plantId = req.params.id as string;

      await inventoryService.deletePlant(plantId);

      res.json({ message: "Plante supprimée" });
    } catch (err) {
      next(err);
    }
  };

  // DELETE /inventory/me
  deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userIdToDelete = req.params.userId; 

      const result = await inventoryService.deleteInventory(String(userIdToDelete));

      res.json(result);
    } catch (err) {
      next(err);
    }
  };

}
