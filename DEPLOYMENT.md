# Configuration des variables d'environnement pour le déploiement

## 📦 Fichiers à committer

✅ **À committer (pas de secrets):**
- `config/*.json` - Mappings de variables d'environnement
- `.env.example` - Template pour les développeurs
- `cert/.gitkeep` - Préserve le dossier cert

❌ **Ne JAMAIS committer:**
- `.env*` (sauf `.env.example`)
- `cert/*.key`, `cert/*.cert` - Certificats SSL
- Tout fichier contenant des secrets/credentials

## 🚀 Configuration sur les plateformes de déploiement

### Variables d'environnement requises

Copiez ces variables sur votre plateforme (Render, Railway, Heroku, Vercel, etc.):

```bash
NODE_ENV=production
APP_BASE_PATH=/api

# Serveur
HTTP_ENABLED=true
HTTP_PORT=3000
HTTPS_ENABLED=true
HTTPS_PORT=3443
REDIRECT_HTTP_TO_HTTPS=true
TRUST_PROXY=true

# Base de données - IMPORTANT: Utilisez votre URI MongoDB de production!
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT - IMPORTANT: Générez un secret unique et fort!
JWT_SECRET=votre-secret-super-securise-ici
JWT_EXPIRES_IN=2h

# CORS - Ajoutez vos domaines de production
CORS_ORIGINS=["https://votre-domaine.com","https://www.votre-domaine.com"]

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=80

# SSL (si vous gérez les certificats)
SSL_KEY_PATH=/etc/secrets/server.key
SSL_CERT_PATH=/etc/secrets/server.cert
```

## 🔧 Configuration par plateforme

### Render / Railway / Fly.io
1. Aller dans Settings → Environment Variables
2. Ajouter chaque variable une par une
3. Redéployer l'application

### Heroku
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI="mongodb+srv://..."
heroku config:set JWT_SECRET="votre-secret"
# ... etc pour chaque variable
```

### Vercel
```bash
vercel env add NODE_ENV production
vercel env add MONGO_URI production
# ... ou via le dashboard Vercel
```

### Docker / Kubernetes
Créer un fichier `secrets.env` sur le serveur (ne pas committer):
```bash
docker run --env-file secrets.env votre-image
```

## 🔐 Bonnes pratiques

1. **JWT_SECRET**: Générer un secret fort
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **MONGO_URI**: Utiliser MongoDB Atlas avec IP whitelist

3. **CORS_ORIGINS**: Lister uniquement vos domaines de production

4. **Certificats SSL**: 
   - Utiliser Let's Encrypt pour la production
   - Ou laisser la plateforme gérer SSL (Render, Vercel, etc.)

## ✅ Vérification avant déploiement

- [ ] Variables d'environnement configurées sur la plateforme
- [ ] `config/*.json` commités dans Git
- [ ] `.env*` bien dans .gitignore
- [ ] JWT_SECRET changé de la valeur par défaut
- [ ] MONGO_URI pointe vers la DB de production
- [ ] CORS_ORIGINS contient les bons domaines
- [ ] Tests passent: `npm test`
