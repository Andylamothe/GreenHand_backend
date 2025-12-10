import { Request, Response, NextFunction } from "express";
import { PlantService } from "../services/plantService";

const plantService = new PlantService();

export class PlantController {
  // ...

  updatePlant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plantId = req.params.id as string;
      const updated = await plantService.updatePlant(plantId, req.body);

      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  getPlant = async (req: Request, res: Response, next: NextFunction) => {
     try {

        const plantId = req.params.id as string;
    const plant = await plantService.getPlant(plantId);
    res.json(plant);
  getPlantDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plantId = req.params.id as string;
      const details = await plantService.getPlantDetails(plantId);

      res.json(details);
    } catch (err) {
      next(err);
    }
  };

    addPhoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plantId = req.params.id as string;

      const { base64, healthScore, comparisonResult } = req.body;

      const photo = await plantService.addPhoto(plantId, {
        base64,
        healthScore,
        comparisonResult
      });

      res.json(photo);
    } catch (err) {
      next(err);
    }
  };

  deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plantId = req.params.id as string;
    const photoId = req.params.photoId as string;

    const deleted = await plantService.deletePhoto(plantId, photoId);

    res.json({ success: true, deleted });
  } catch (err) {
    next(err);
  }
};
}
