import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.ts";
import inventoryRoute from "./routes/inventoryRoute.ts";
import recommendationRoutes from "./routes/recommendationRoutes.ts";
import plantRoute from "./routes/plantRoute.ts";
import dashboardRoutes from "./routes/dashboardRoutes.ts";
import cors from "cors";
import config from "config";


dotenv.config();
const app = express();

// app.use(express.json()); 

/// Pour povoir envoyer des images en base64 (taille max augmentée) ///
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


// // --- Configuration CORS --- //
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

// Auth 
app.use("/api/auth", authRoute);

// Inventory
app.use("/api/inventory", inventoryRoute);

// Recommendations
app.use("/api/recommendations", recommendationRoutes);

//plant
app.use("/api", plantRoute);

//dashboard
app.use("/api/dashboard", dashboardRoutes);


export default app;