import { HttpException } from "../utils/http-exception";
import { Category } from "../models/Category";

export class CategoryService {
  async getAllCategories() {
    const categories = await Category.find();

    if (categories.length === 0) {
      throw new HttpException(404, "Aucune catégorie trouvée");
    }

    return categories;
  }
}