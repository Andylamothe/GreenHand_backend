import { RecommendationAi } from "../models/Recommandation_Ai";
import { IRecommendationAi } from "../interfaces/IRecommendationAi";
import { HttpException } from "../utils/http-exception";
import { Types } from "mongoose";

// ===========================================================
// RECOMMENDATION AI SERVICE
// - Sauvegarde et récupération des recommandations IA
// ===========================================================

export class RecommendationAiService {
  // ---------------------------------------------------------
  // Sauvegarder une recommandation IA
  // ---------------------------------------------------------
  async saveRecommendation(
    userId: string,
    userQuery: string,
    aiResponse: string,
    recommendationType?: string,
    priority?: string,
    plantId?: string
  ): Promise<IRecommendationAi> {
    try {
      if (!userId || !userQuery || !aiResponse) {
        throw new HttpException(400, "userId, userQuery et aiResponse sont requis");
      }

      const recommendation = new RecommendationAi({
        userId: new Types.ObjectId(userId),
        userQuery,
        aiResponse,
        recommendationType,
        priority,
        plantId: plantId ? new Types.ObjectId(plantId) : undefined,
        dateGenerated: new Date(),
        isRead: true,
        isApplied: false,
      });

      const savedRecommendation = await recommendation.save();
      return savedRecommendation;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, "Erreur lors de la sauvegarde de la recommandation");
    }
  }

  // ---------------------------------------------------------
  // Récupérer toutes les recommandations d'un utilisateur
  // ---------------------------------------------------------
  async getRecommendationsByUserId(userId: string): Promise<IRecommendationAi[]> {
    try {
      if (!userId) {
        throw new HttpException(400, "userId est requis");
      }

      const recommendations = await RecommendationAi.find({
        userId: new Types.ObjectId(userId),
      }).sort({ dateGenerated: -1 });

      return recommendations;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, "Erreur lors de la récupération des recommandations");
    }
  }
}

