import { Plant } from "../models/Plants";
import { HttpException } from "../utils/http-exception";


// ===========================================================
// PLANT SERVICE
// - Modification plante, ajout de photo, analyse AI
// ===========================================================
export class PlantService {

  async updatePlant(plantId: string, data: any) {
    const updated = await Plant.findByIdAndUpdate(
      plantId,
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new HttpException(404, "Plante introuvable");
    }

    return updated;
  };

  async getPlant(plantId: string) {
    const plant = await Plant.findById(plantId);

    if (!plant) {
      throw new HttpException(404, "Plante introuvable");
    }

    return plant;
  }
}
