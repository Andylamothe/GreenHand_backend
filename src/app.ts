import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./data/connectDB.ts";
import authRoute from "./routes/authRoute.ts";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

//------------ CONNEXION MONGODB ATLAS ------------//
connectDB();

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
app.use("/api/v2/auth", authRoute);


export default app;