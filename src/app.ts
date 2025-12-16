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

// Configuration CORS - DOIT être avant les routes
const corsOrigins = config.get<string[]>("security.cors.origins");
app.use(cors({
  origin: (origin, callback) => {
    // Autoriser les requêtes sans origine (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Autoriser les origines configurées
    if (corsOrigins.includes(origin) || corsOrigins.includes("*")) {
      return callback(null, true);
    }
    
    // Pour le développement, autoriser localhost et 127.0.0.1 sur n'importe quel port
    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
      return callback(null, true);
    }
    
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

//------------ ROUTES ------------//
// Home
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GreenHand API</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 600px;
          width: 100%;
          padding: 40px;
          text-align: center;
        }
        .logo {
          font-size: 60px;
          margin-bottom: 20px;
        }
        h1 {
          color: #2d3748;
          font-size: 32px;
          margin-bottom: 10px;
        }
        .tagline {
          color: #718096;
          font-size: 18px;
          margin-bottom: 30px;
        }
        .status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #48bb78;
          color: white;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 600;
          margin-bottom: 30px;
        }
        .status::before {
          content: '';
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .links {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 30px;
        }
        .link-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
          display: inline-block;
        }
        .link-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        .info {
          margin-top: 30px;
          padding: 20px;
          background: #f7fafc;
          border-radius: 10px;
          text-align: left;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .info-item:last-child {
          border-bottom: none;
        }
        .info-label {
          color: #718096;
          font-weight: 600;
        }
        .info-value {
          color: #2d3748;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">🌱</div>
        <h1>GreenHand API</h1>
        <p class="tagline">Votre assistant intelligent pour le jardinage</p>
        
        <div class="status">
          Serveur actif
        </div>
        
        <div class="links">
          <a href="/api/docs" class="link-btn">📚 Documentation API</a>
          <a href="https://github.com" class="link-btn">💻 GitHub</a>
        </div>
        
        <div class="info">
          <div class="info-item">
            <span class="info-label">Version</span>
            <span class="info-value">1.0.0</span>
          </div>
          <div class="info-item">
            <span class="info-label">Environnement</span>
            <span class="info-value">${process.env.NODE_ENV || 'development'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Base URL</span>
            <span class="info-value">/api</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
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