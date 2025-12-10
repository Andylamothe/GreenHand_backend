// ===========================================================
// PLANT ROUTES
// - Modification plante, ajout de photo, analyse AI
// ===========================================================

import { Router } from "express";
import { PlantController } from "../controllers/plantController";
import { authMiddleware } from "../middlewares/authMiddleWare";

const router = Router();
const plantController = new PlantController();

// -----------------------------------------------------------
// ROUTES
// -----------------------------------------------------------


router.use(authMiddleware);

router.patch("/plants/:id", plantController.updatePlant);
router.get("/plant/:id", plantController.getPlant);
router.get("/plants/:id/details", plantController.getPlantDetails);
router.post("/plants/:id/photos", plantController.addPhoto);
router.delete("/plants/:id/photos/:photoId", plantController.deletePhoto);



export default router;