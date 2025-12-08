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
  } catch (err) {
    next(err);
  }
};
}
