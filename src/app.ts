import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import inventoryRoute from "./routes/inventoryRoute";
import recommendationRoutes from "./routes/recommendationRoutes";
import plantRoute from "./routes/plantRoute";
import dashboardRoutes from "./routes/dashboardRoutes";
import cors from "cors";
import config from "config";
import chartsRoute from "./routes/chartsRoute";
import swaggerRoute from "./routes/swaggerRoute";
import userRoute from "./routes/userRoute";
import categoryRoute from "./routes/categoryRoute";
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


// Inventory
app.use("/api/inventory", inventoryRoute);

// Recommendations
app.use("/api/recommendations", recommendationRoutes);

//plant
app.use("/api", plantRoute);

//category
app.use("/api", categoryRoute);

// user
app.use("/api/users", userRoute);

//dashboard
app.use("/api/dashboard", dashboardRoutes);



export default app;