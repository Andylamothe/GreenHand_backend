import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.ts";
import inventoryRoute from "./routes/inventoryRoute.ts";
import recommendationRoutes from "./routes/recommendationRoutes";
import plantRoute from "./routes/plantRoute.ts";
import userRoute from "./routes/userRoute.ts";
import swaggerRoute from "./routes/swaggerRoute.ts";
import cors from "cors";
import config from "config";


dotenv.config();
const app = express();

app.use(express.json()); 

// // --- Configuration CORS --- //
const corsOriginsEnv = process.env.CORS_ORIGINS; // ex: http://localhost:3000,http://localhost:5173
const corsOrigins: string | string[] = (config as any).has?.("security.cors.origins")
  ? config.get<string[]>("security.cors.origins")
  : (corsOriginsEnv ? corsOriginsEnv.split(",").map((s) => s.trim()) : "*");

app.use(cors({
  origin: corsOrigins === "*" ? true : corsOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
//------------ ROUTES ------------//
app.use('/api', recommendationRoutes);

// -----------------------------------------------------------
// ROUTES
// -----------------------------------------------------------

app.get("/", (req, res) => {
  res.send(" Serveur actif ! Bienvenue sur GreenHand ");
});

// Auth 
app.use("/api/auth", authRoute);

// Inventory
app.use("/api/inventory", inventoryRoute);

//plant

app.use("/api", plantRoute);

//user
app.use("/api/users", userRoute);

//swagger
app.use("/api/docs", swaggerRoute);
export default app;