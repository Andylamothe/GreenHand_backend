import { Plant } from "../models/Plants";
import { Category } from "../models/Category";
import { PlantPhotos } from "../models/PlantPhotos";
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

   async getPlantDetails(plantId: string) {

    const plant = await Plant.findById(plantId)
    if (!plant) {
      throw new HttpException(404, "Plante introuvable");
    }

    const category = await Category.findById(plant.categoryId);
    const photos = await PlantPhotos.find({ plantId: plant._id });  

    return {
      plant,
      category,
      photos
    };
  }

 async addPhoto(plantId: string, data: { base64: string; healthScore: number; comparisonResult: string }) {
    const plant = await Plant.findById(plantId);
    if (!plant) {
      throw new HttpException(404, "Plante introuvable");
    }

    if (!data.base64) {
      throw new HttpException(400, "Image manquante (base64)");
    }

    if (data.healthScore === undefined) {
      throw new HttpException(400, "healthScore manquant");
    }

    const photo = await PlantPhotos.create({
      plantId,
      photoUrl: data.base64,
      healthScore: data.healthScore,
      comparisonResult: data.comparisonResult,
      dateTaken: new Date()
    });

    return photo;
  }

  async deletePhoto(plantId: string, photoId: string) {
  const deleted = await PlantPhotos.findOneAndDelete({
    _id: photoId,
    plantId
  });

  if (!deleted) {
    throw new HttpException(404, "Photo introuvable");
  }

  return deleted;
}


}
