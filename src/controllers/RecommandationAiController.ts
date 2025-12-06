import { Request, Response } from "express";
import { RecommendationAiService } from "../services/RecommandationAiService";

// Endpoint pour gérer les recommandations basées sur l'IA

export class RecommendationAiController {
  /**
   * Sauvegarder une recommandation IA
   * POST /api/recommendations
   */
  static async saveRecommendation(req: Request, res: Response) {
    try {
      const { userId, userQuery, aiResponse, recommendationType, priority, plantId } = req.body;

      // Validation basique
      if (!userId || !userQuery || !aiResponse) {
        return res.status(400).json({
          success: false,
          message: "userId, userQuery et aiResponse sont requis",
        });
      }

      const recommendation = await RecommendationAiService.saveRecommendation(
        userId,
        userQuery,
        aiResponse,
        recommendationType,
        priority,
        plantId
      );

      res.status(201).json({
        success: true,
        message: "Recommandation sauvegardée avec succès",
        data: recommendation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la sauvegarde de la recommandation",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * Récupérer toutes les recommandations d'un utilisateur
   * GET /api/recommendations/:userId
   */
  static async getRecommendationsByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "userId est requis",
        });
      }

      const recommendations = await RecommendationAiService.getRecommendationsByUserId(userId);

      res.status(200).json({
        success: true,
        data: recommendations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des recommandations",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}