import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/categoryService";

const categoryService = new CategoryService();

export class CategoryController {

    getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await categoryService.getAllCategories();
            res.json(categories);
        } catch (err) {
            next(err);
        }
    };

  
}
