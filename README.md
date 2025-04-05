# Heart-AI

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=heart-ia-app)

Heart-AI est une application de prédiction des maladies cardiovasculaires basée sur l'intelligence artificielle.

## Guide de Style

Ce projet suit un guide de style strict pour assurer la cohérence et la qualité du code. Veuillez consulter le [Guide de Style](STYLE_GUIDE.md) pour plus de détails sur les conventions et bonnes pratiques à suivre.

## Structure du Projet

Le projet est divisé en deux parties principales :

### API (Backend)

- Développé avec FastAPI (Python)
- Structure modulaire suivant les bonnes pratiques
- Tests unitaires avec pytest

### UI (Frontend)

- Développé avec React et TypeScript
- Utilise des composants UI modernes
- Structure organisée par fonctionnalités

## Développement

### Prérequis

- Python 3.10+
- Node.js 18+
- npm ou yarn

### Installation et Configuration

#### Backend (API)

```bash
# Installer les dépendances
pip install -r requirements.txt

# Lancer le serveur de développement
uvicorn api.main:app --reload
```

#### Frontend (UI)

```bash
# Se placer dans le répertoire UI
cd ui

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## Tests

### Tests API (FastAPI)

Les tests de l'API utilisent pytest et incluent :
- Tests unitaires des endpoints
- Tests des dépendances
- Rapports de couverture de code

Pour exécuter les tests :
```bash
pytest
```

### Tests UI (React)

Les tests du frontend utilisent Vitest et React Testing Library :
```bash
cd ui
npm test                # Exécuter les tests une fois
npm run test:watch      # Exécuter les tests en mode watch
npm run test:coverage   # Exécuter les tests avec couverture
```

Les tests sont organisés dans des répertoires `__tests__` à côté des composants testés.

## CI avec GitHub Actions

Le projet utilise GitHub Actions pour l'intégration continue :

### Workflow API
- Déclenché à chaque push affectant les fichiers dans `api/`
- Utilise Python 3.10 (LTS)
- Installation des dépendances
- Exécution des tests avec couverture
- Analyse de qualité du code avec SonarCloud

### Workflow UI
- Déclenché à chaque push affectant les fichiers dans `ui/`
- Utilise Node.js 18 (LTS)
- Installation des dépendances
- Linting avec ESLint
- Build du projet
- Exécution des tests avec couverture
- Analyse de qualité du code avec SonarCloud

### Workflow de Tagging
- Déclenché après le succès des workflows API et UI sur la branche main
- Crée automatiquement un tag Git avec le format `vYYYY.MM.DD.N`

## Analyse de Qualité avec SonarCloud

Le projet utilise [SonarCloud](https://sonarcloud.io) pour l'analyse continue de la qualité du code :

- Détection des bugs et vulnérabilités
- Mesure de la dette technique
- Suivi de la couverture de code
- Application des bonnes pratiques de codage

Pour configurer SonarCloud pour votre fork :

1. Créez un compte sur [SonarCloud](https://sonarcloud.io)
2. Ajoutez votre repository GitHub
3. Générez un token d'accès
4. Ajoutez le token comme secret GitHub (`SONAR_TOKEN`)
5. Les analyses seront automatiquement exécutées lors des CI workflows
