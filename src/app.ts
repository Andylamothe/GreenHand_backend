import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.ts";
import inventoryRoute from "./routes/inventoryRoute.ts";
import recommendationRoutes from "./routes/recommendationRoutes";
import plantRoute from "./routes/plantRoute.ts";
import cors from "cors";
import config from "config";


dotenv.config();
const app = express();

app.use(express.json()); 

// // --- Configuration CORS --- //
    app.use(cors({
      origin: config.get<string[]>("security.cors.origins"),
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
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


export default app;