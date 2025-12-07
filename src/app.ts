import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./data/connectDB.ts"
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

export default app;