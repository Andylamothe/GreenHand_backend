import { RecommendationAi } from "../models/Recommandation_Ai";
import { IRecommendationAi } from "../interfaces/IRecommendationAi";
import { Types } from "mongoose";

/* Méthodes pour sauvegarder et récupérer les recommandations IA
    dans la base de donnée MongoDB
*/

export class RecommendationAiService {
  /**
   * Sauvegarder une recommandation IA dans la base de données
   */
  static async saveRecommendation(
    userId: string,
    userQuery: string,
    aiResponse: string,
    recommendationType?: string,
    priority?: string,
    plantId?: string
  ): Promise<IRecommendationAi> {
    try {
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
      throw new Error(`Erreur lors de la sauvegarde de la recommandation: ${error}`);
    }
  }

  /**
   * Récupérer toutes les recommandations d'un utilisateur
   */
  static async getRecommendationsByUserId(userId: string): Promise<IRecommendationAi[]> {
    try {
      const recommendations = await RecommendationAi.find({
        userId: new Types.ObjectId(userId),
      }).sort({ dateGenerated: -1 });

      return recommendations;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des recommandations: ${error}`);
    }
  }
}

