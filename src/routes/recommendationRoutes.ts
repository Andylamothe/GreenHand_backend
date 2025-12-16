import { Router } from 'express';
import { RecommendationAiController } from '../controllers/RecommandationAiController';
import { authMiddleware } from '../middlewares/authMiddleWare';

const router = Router();
const recommendationAiContll = new RecommendationAiController();

// Protéger toutes les routes avec authMiddleware
router.use(authMiddleware);

// POST - Sauvegarder une recommandation
// Route: POST /api/recommendations
router.post('/', recommendationAiContll.saveRecommendation);

// GET - Récupérer toutes les recommandations d'un utilisateur
// Route: GET /api/recommendations/:userId
router.get('/:userId', recommendationAiContll.getRecommendationsByUserId);

export default router;