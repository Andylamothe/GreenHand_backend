import { Router } from 'express';
import { RecommendationAiController } from '../controllers/RecommandationAiController';

const router = Router();

// POST - Sauvegarder une recommandation
router.post('/recommendations', RecommendationAiController.saveRecommendation);

// GET - Récupérer toutes les recommandations d'un utilisateur
router.get('/recommendations/:userId', RecommendationAiController.getRecommendationsByUserId);

export default router;
