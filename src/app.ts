import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./data/connectDB.ts"

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

//------------ CONNEXION MONGODB ATLAS ------------//
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;