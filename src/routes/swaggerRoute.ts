import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../docs/openapi';

const router = Router();

// Serve Swagger UI at /api/docs
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
