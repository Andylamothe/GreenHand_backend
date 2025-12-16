# 🚀 Guide de déploiement sur Render

## ✅ Configuration terminée

Le projet est maintenant prêt pour le déploiement sur Render.

## 📋 Étapes de déploiement

### 1. Pousser le code sur Git

```bash
git add .
git commit -m "Configure production build for Render"
git push origin main
```

### 2. Créer un Web Service sur Render

1. Aller sur [render.com](https://render.com)
2. Cliquer sur **"New +"** → **"Web Service"**
3. Connecter votre repository GitHub/GitLab
4. Sélectionner le repository `GreenHand_backend`

### 3. Configuration du service

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Environment:**
- Environment: `Node`
- Region: `Oregon` (ou le plus proche)
- Branch: `main`
- Plan: `Free` (pour commencer)

### 4. Variables d'environnement

Dans l'onglet **"Environment"**, ajouter ces variables:

#### Obligatoires
```
NODE_ENV=production
MONGO_URI=mongodb+srv://votre-user:votre-password@cluster.mongodb.net/GreenHand_Prod
JWT_SECRET=[Générer avec la commande ci-dessous]
```

**Générer un JWT_SECRET sécurisé:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Recommandées
```
APP_BASE_PATH=/api
HTTP_ENABLED=true
HTTP_PORT=10000
HTTPS_ENABLED=false
TRUST_PROXY=true
JWT_EXPIRES_IN=2h
CORS_ORIGINS=["https://votre-frontend.onrender.com","https://votre-domaine.com"]
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=80
```

**⚠️ Important pour Render:**
- Le port est fourni automatiquement par Render dans `process.env.PORT`
- Mettre `HTTP_PORT=10000` (Render remplacera par son port)
- `HTTPS_ENABLED=false` (Render gère SSL automatiquement)
- `TRUST_PROXY=true` (obligatoire pour Render)

### 5. Déployer

1. Cliquer sur **"Create Web Service"**
2. Render va automatiquement:
   - Cloner le repo
   - Exécuter `npm install && npm run build`
   - Démarrer avec `npm start`
3. Votre API sera disponible sur: `https://votre-app.onrender.com`

## 🔍 Vérification

### Tester localement la build de production

```bash
# Nettoyer et compiler
npm run build

# Démarrer en mode production
npm start
```

### Endpoints à tester après déploiement

```bash
# Health check
curl https://votre-app.onrender.com/api

# Swagger docs
https://votre-app.onrender.com/api/docs
```

## 🐛 Dépannage

### Erreur: "ts-node-dev not found"
✅ **Résolu** - Utilise maintenant TypeScript compilé (`npm run build`)

### Erreur: "Cannot find module server.js"
✅ **Résolu** - `tsconfig.json` configuré avec `rootDir: "./src"`

### Erreur: Port déjà utilisé
- Render utilise `process.env.PORT`
- Le code doit écouter sur ce port (à vérifier dans server.ts)

### Base de données ne se connecte pas
- Vérifier `MONGO_URI` dans les variables d'environnement
- Vérifier que l'IP de Render est dans la whitelist MongoDB Atlas (ou mettre `0.0.0.0/0`)

### CORS errors
- Ajouter le domaine de votre frontend dans `CORS_ORIGINS`
- Format: `["https://frontend.com","https://www.frontend.com"]`

## 📊 Monitoring

Render fournit:
- **Logs en temps réel** dans le dashboard
- **Metrics** (CPU, Memory, Requests)
- **Alerts** par email
- **Auto-deploy** sur chaque push Git

## 🔄 Déploiements automatiques

Pour activer le déploiement automatique:
1. Dans Render Dashboard → Settings
2. Activer **"Auto-Deploy"**
3. Chaque push sur `main` déclenchera un nouveau déploiement

## 🎯 Prochaines étapes

- [ ] Configurer un domaine personnalisé
- [ ] Configurer les alertes email
- [ ] Ajouter des health checks
- [ ] Configurer un plan payant si nécessaire (plus de ressources)
- [ ] Mettre en place un monitoring externe (UptimeRobot, etc.)
