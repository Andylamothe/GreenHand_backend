import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./data/connectDB.ts";
import authRoute from "./routes/authRoute.ts";
import inventoryRoute from "./routes/inventoryRoute.ts";
import recommendationRoutes from "./routes/recommendationRoutes";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

//------------ CONNEXION MONGODB ATLAS ------------//
connectDB();

//------------ ROUTES ------------//
app.use('/api', recommendationRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

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


export default app;