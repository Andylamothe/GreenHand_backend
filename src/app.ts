import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.ts";
import inventoryRoute from "./routes/inventoryRoute.ts";
import recommendationRoutes from "./routes/recommendationRoutes.ts";
import plantRoute from "./routes/plantRoute.ts";
import dashboardRoutes from "./routes/dashboardRoutes.ts";
import cors from "cors";
import config from "config";
import chartsRoute from "./routes/chartsRoute.ts";
import swaggerRoute from "./routes/swaggerRoute.ts";
import categoryRoute from "./routes/categoryRoute.ts";
import c from "config";


dotenv.config();
const app = express();

// app.use(express.json()); 

/// Pour povoir envoyer des images en base64 (taille max augmentée) ///
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));



// // --- Configuration CORS --- //
// const corsOriginsEnv = process.env.CORS_ORIGINS; // ex: http://localhost:3000,http://localhost:5173
// const corsOrigins: string | string[] = (config as any).has?.("security.cors.origins")
//   ? config.get<string[]>("security.cors.origins")
//   : (corsOriginsEnv ? corsOriginsEnv.split(",").map((s) => s.trim()) : "*");

// app.use(cors({
//   origin: corsOrigins === "*" ? true : corsOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));
//------------ ROUTES ------------//
app.use('/api', recommendationRoutes);
    app.use(cors({
      origin: config.get<string[]>("security.cors.origins"),
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));

  
// Tester le frontend en local sans soucis de CORS
// app.use(cors({ origin: "*" }));

    

//------------ ROUTES ------------//

// Home
app.get("/", (req, res) => {
  res.send(" Serveur actif ! Bienvenue sur GreenHand ");
});
//swagger
app.use("/api/docs", swaggerRoute);

// Auth 
app.use("/api/auth", authRoute);

// charts
app.use("/charts", express.static("public"));


app.use("/api/charts", chartsRoute);

// Inventory
app.use("/api/inventory", inventoryRoute);

// Recommendations
app.use("/api/recommendations", recommendationRoutes);

//plant
app.use("/api", plantRoute);

//user
app.use("/api", categoryRoute);
//dashboard
app.use("/api/dashboard", dashboardRoutes);


export default app;