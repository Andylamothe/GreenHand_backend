import dotenv from "dotenv";
import mongoose from "mongoose";
// import fs from "fs";
// import path from "path";
// import cors from "cors";
// import https from "https";
// import http from "http";
import config from "config";
// import app from "../app.js"

dotenv.config();

export const connectDB = async () => {
  try {
    // --- Connexion MongoDB --- //
    const uri = config.get<string>("db.uri");
    console.log("Connexion vers" , uri)
    await mongoose.connect(uri);
    console.log("MongoDB est connecté avec succès");

    // // --- Configuration CORS --- //
    // app.use(cors({
    //   origin: config.get<string[]>("security.cors.origins"),
    //   methods: ["GET", "POST", "PUT", "DELETE"],
    //   allowedHeaders: ["Content-Type", "Authorization"]
    // }));

    // // --- Configuration HTTPS/HTTP --- //
    // const dirname = path.resolve();
    // const httpsPort = config.get<number>("server.https.port");
    // const httpPort = config.get<number>("server.http.port");

    // const options = {
    //   key: fs.readFileSync(path.join(dirname, "key.pem")),
    //   cert: fs.readFileSync(path.join(dirname, "cert.pem")),
    // };

    // // Serveur HTTPS
    // https.createServer(options, app).listen(httpsPort, () => {
    //   console.log(`Serveur HTTPS lancé sur https://localhost:${httpsPort}`);
    // });

    // // Serveur HTTP → redirection HTTPS
    // http.createServer((req, res) => {
    //   res.writeHead(301, { Location: `https://localhost:${httpsPort}${req.url}` });
    //   res.end();
    // }).listen(httpPort, () => {
    //   console.log(`Serveur HTTP sur http://localhost:${httpPort} (redirige vers HTTPS)`);
    // });

  } catch (error) {
    console.error("MongoDB n’a pas pu se connecter :", error);
    process.exit(1);
  }
};
 