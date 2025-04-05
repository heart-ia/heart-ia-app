# Heart-AI

Heart-AI est une application moderne de prédiction des maladies cardiovasculaires basée sur l'intelligence artificielle. Elle permet aux utilisateurs d'évaluer leur risque cardiaque à partir de données cliniques, via une interface intuitive et des modèles de machine learning performants.

## Structure du Projet

Le projet est divisé en deux parties principales :

- `api/` : Backend FastAPI (Python)
- `ui/` : Frontend React (TypeScript)

## Environnements

Le projet supporte deux environnements :

- **Local** : Pour le développement local
- **Production** : Pour le déploiement en production

Chaque partie du projet (API et UI) a ses propres fichiers de configuration d'environnement :

- `.env` : Variables d'environnement communes à tous les environnements
- `.env.development` : Variables d'environnement pour le développement local
- `.env.production` : Variables d'environnement pour la production

## Documentation

Pour plus d'informations sur chaque partie du projet, consultez les README spécifiques :

- [Documentation de l'API](api/README.md)
- [Documentation de l'UI](ui/README.md)

## Guide de Style

Un guide de style pour le projet est disponible dans [.junie/guidelines.md](.junie/guidelines.md).

## Technologies Utilisées

### Backend
- FastAPI
- Python
- NumPy

### Frontend
- React
- TypeScript
- shadcn/ui

### Autres
- Docker
- GitHub Actions (CI/CD)
- VS Code
- pnpm/npm

## Installation et Démarrage

### Backend (API)

```bash
cd api
python -m venv venv
source venv/bin/activate  # Sur Windows : venv\Scripts\activate
pip install -r requirements.txt
ENV_MODE=development uvicorn main:app --reload
```

### Frontend (UI)

```bash
cd ui
npm install
npm run dev
```

## Licence

[MIT](LICENSE)
