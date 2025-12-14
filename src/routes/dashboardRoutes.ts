import { Router } from 'express';
import { getWeatherStats } from '../controllers/weatherController';
import {getPlantStats} from '../controllers/plantDashController';
import { get } from 'http';
import { de } from 'zod/v4/locales';

const router = Router();

// http://localhost:3000/api/dashboard/weather
router.get('/weather', getWeatherStats);

// http://localhost:3000/api/dashboard/plante
router.get("/plante", getPlantStats);

export default router;
