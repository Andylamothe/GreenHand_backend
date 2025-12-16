import { Request, Response, NextFunction } from "express";
import { RecommendationAiService } from "../services/RecommandationAiService";
import { logger } from "../utils/logger";
 

// RECOMMENDATION AI CONTROLLER
// - Gère les recommandations basées sur l'IA

 
const recommendationAiService = new RecommendationAiService();
 
export class RecommendationAiController {
  
  // POST /api/recommendations
  // OBJET: sauvegarder une recommandation IA
  // HTTP: 201 si créé ; erreurs remontées au middleware

  saveRecommendation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, userQuery, aiResponse, recommendationType, priority, plantId } = req.body;
 
      const recommendation = await recommendationAiService.saveRecommendation(
        userId,
        userQuery,
        aiResponse,
        recommendationType,
        priority,
        plantId
      );
 
      logger.info(`Recommandation sauvegardée pour l'utilisateur: ${userId}`);
 
      res.status(201).json({
        success: true,
        message: "Recommandation sauvegardée avec succès",
        data: recommendation,
      });
    } catch (err) {
      next(err);
    }
  };
 
  // GET /api/recommendations/:userId
  // OBJET: récupérer toutes les recommandations d'un utilisateur
  // HTTP: 200 si OK ; 400 si userId manquant

  getRecommendationsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "userId est requis",
        });
      }
 

      const recommendations = await recommendationAiService.getRecommendationsByUserId(userId);
 
      logger.info(`Recommandations récupérées pour l'utilisateur: ${userId}`);
 
      res.status(200).json({
        success: true,
        data: recommendations,
      });
    } catch (err) {
      next(err);
    }
  };
}