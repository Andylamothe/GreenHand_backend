import { Router } from 'express';
import { RecommendationAiController } from '../controllers/RecommandationAiController';

const router = Router();
const recommendationAiContll = new RecommendationAiController();

// POST - Sauvegarder une recommandation
router.post('/recommendations', recommendationAiContll.saveRecommendation);

// GET - Récupérer toutes les recommandations d'un utilisateur
router.get('/recommendations/:userId', recommendationAiContll.getRecommendationsByUserId);

export default router;
