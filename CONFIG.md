# Configuration avec variables d'environnement

## Structure

Le projet utilise maintenant des fichiers `.env` pour gérer la configuration au lieu de fichiers JSON contenant des valeurs sensibles.

### Fichiers créés

- **`.env`** - Configuration pour développement (par défaut)
- **`.env.test`** - Configuration pour les tests
- **`.env.production`** - Configuration pour production
- **`.env.example`** - Template avec toutes les variables (à committer)

### Configuration

1. **Copier le fichier exemple** :
   ```bash
   cp .env.example .env
   ```

2. **Modifier les valeurs** selon votre environnement local

3. **Pour les tests** :
   Le fichier `.env.test` est automatiquement chargé quand `NODE_ENV=test`

4. **Pour la production** :
   Utiliser `.env.production` ou définir les variables directement sur le serveur

### Variables disponibles

#### Application
- `NODE_ENV` - Environnement (development, test, production)
- `APP_BASE_PATH` - Chemin de base de l'API

#### Serveur
- `HTTP_ENABLED` - Activer HTTP
- `HTTP_PORT` - Port HTTP
- `HTTPS_ENABLED` - Activer HTTPS
- `HTTPS_PORT` - Port HTTPS
- `REDIRECT_HTTP_TO_HTTPS` - Rediriger HTTP vers HTTPS
- `TRUST_PROXY` - Faire confiance aux proxies

#### Base de données
- `MONGO_URI` - URI de connexion MongoDB

#### Sécurité
- `JWT_SECRET` - Secret pour JWT
- `JWT_EXPIRES_IN` - Durée de validité des tokens
- `CORS_ORIGINS` - Origines autorisées (format JSON array)
- `RATE_LIMIT_WINDOW_MS` - Fenêtre de rate limiting (ms)
- `RATE_LIMIT_MAX` - Nombre max de requêtes

#### SSL
- `SSL_KEY_PATH` - Chemin vers la clé SSL
- `SSL_CERT_PATH` - Chemin vers le certificat SSL

## Utilisation avec node-config

Le module `config` charge automatiquement :
1. `config/default.json` - Valeurs par défaut
2. `config/custom-environment-variables.json` - Mapping des variables d'env
3. Les variables d'environnement depuis `.env`

### Important

⚠️ **Ne jamais committer les fichiers `.env*` contenant des valeurs réelles !**

Seul `.env.example` doit être versionné comme template.
