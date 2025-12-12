import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { authMiddleware } from "../middlewares/authMiddleWare";

const router = Router();
const categoryController = new CategoryController();
// -----------------------------------------------------------
// ROUTES
// -----------------------------------------------------------

router.use(authMiddleware);

router.get("/categories", categoryController.getAllCategories);

export default router;