import { Router } from "express";
import { InventoryController } from "../controllers/inventoryController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();
const inventoryController = new InventoryController();


//Faut etre connecté pour acceder au inventaire sinon non non non 
router.use(authMiddleware);

router.get("/me", inventoryController.getMyInventory);
router.get("/me/plants", inventoryController.getMyPlants);
router.post("/me/plants", inventoryController.addPlant);
router.get("/search", inventoryController.search);
router.get("/filter", inventoryController.filter);
router.delete("/plants/:id", inventoryController.deletePlant);
router.delete(
  "/deleteInventory/:userId",
  roleMiddleware("admin"),
  inventoryController.deleteInventory
);


export default router;
