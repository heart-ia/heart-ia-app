# ❤️  [Heart-AI](https://heart-ia.onrender.com/)

---
[![UI CI](https://github.com/heart-ia/heart-ia-app/actions/workflows/ui-ci.yml/badge.svg)](https://github.com/heart-ia/heart-ia-app/actions/workflows/ui-ci.yml)
[![API CI](https://github.com/heart-ia/heart-ia-app/actions/workflows/api-ci.yml/badge.svg)](https://github.com/heart-ia/heart-ia-app/actions/workflows/api-ci.yml)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![React 19](https://img.shields.io/badge/react-19-61DAFB.svg?logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Render](https://img.shields.io/badge/deploy-Render-46E3B7.svg?logo=render&logoColor=white)](https://render.com)
---
[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=heart-ia_heart-ia-app)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=heart-ia_heart-ia-app&metric=alert_status&token=33ab1a672233508458e0c82f82547c8baac9a6ca)](https://sonarcloud.io/summary/new_code?id=heart-ia_heart-ia-app)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=heart-ia_heart-ia-app&metric=bugs&token=33ab1a672233508458e0c82f82547c8baac9a6ca)](https://sonarcloud.io/summary/new_code?id=heart-ia_heart-ia-app)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=heart-ia_heart-ia-app&metric=code_smells&token=33ab1a672233508458e0c82f82547c8baac9a6ca)](https://sonarcloud.io/summary/new_code?id=heart-ia_heart-ia-app)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=heart-ia_heart-ia-app&metric=coverage&token=33ab1a672233508458e0c82f82547c8baac9a6ca)](https://sonarcloud.io/summary/new_code?id=heart-ia_heart-ia-app)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=heart-ia_heart-ia-app&metric=duplicated_lines_density&token=33ab1a672233508458e0c82f82547c8baac9a6ca)](https://sonarcloud.io/summary/new_code?id=heart-ia_heart-ia-app)
---
🫀 Application de prédiction des maladies cardiovasculaires basée sur l'intelligence artificielle.

### 🔗 **Application déployée**: [https://heart-ia.onrender.com/](https://heart-ia.onrender.com/)

## 📑 Table des matières

- [🚀 Installation](#installation)
  - [🔙 API (Backend)](#api-backend)
  - [🖥️ UI (Frontend)](#ui-frontend)
- [📂 Structure du projet](#structure-du-projet)
- [✨ Fonctionnalités](#fonctionnalités)
- [🛠️ Technologies utilisées](#technologies-utilisées)
- [🌐 Déploiement](#déploiement)
- [📄 Licence](#licence)

## 🚀 Installation

### 🔙 API (Backend)

L'API est développée avec FastAPI et nécessite Python 3.10+.

1. Cloner le dépôt:
   ```bash
   git clone https://github.com/heart-ia/heart-ia-app.git
   cd heart-ia-app
   ```

2. Créer et activer un environnement virtuel:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Windows: venv\Scripts\activate
   ```

3. Installer les dépendances:
   ```bash
   pip install -r requirements.txt
   ```

4. Lancer l'API:
   ```bash
   uvicorn api.main:app --reload
   ```

L'API sera accessible à l'adresse: http://localhost:8000

Documentation API: http://localhost:8000/docs

### 🖥️ UI (Frontend)

L'interface utilisateur est développée avec React, TypeScript et Vite.

1. Naviguer vers le répertoire UI:
   ```bash
   cd ui
   ```

2. Installer les dépendances:
   ```bash
   npm install
   ```

3. Lancer le serveur de développement:
   ```bash
   npm run dev
   ```

L'interface sera accessible à l'adresse: http://localhost:5173

## 📂 Structure du projet

```
heart-ia-app/
├── api/                    # Backend FastAPI
│   ├── main.py             # Point d'entrée de l'application
│   ├── routers/            # Modules de routes par domaine
│   ├── models/             # Modèles Pydantic et SQLAlchemy
│   ├── services/           # Logique métier
│   ├── dependencies/       # Dépendances FastAPI
│   ├── utils/              # Fonctions utilitaires
│   └── dataset/            # Données et gestion des datasets
├── ui/                     # Frontend React
│   ├── src/
│   │   ├── components/     # Composants React réutilisables
│   │   ├── hooks/          # Hooks React personnalisés
│   │   ├── pages/          # Pages de l'application
│   │   └── lib/            # Utilitaires et fonctions partagées
│   ├── public/             # Fichiers statiques
│   └── package.json        # Dépendances et scripts
├── requirements.txt        # Dépendances Python
└── README.md               # Documentation du projet
```

## ✨ Fonctionnalités

- 📊 **Analyse de données**: Visualisation et analyse des données cardiovasculaires
- 🔮 **Prédiction**: Modèle d'IA pour prédire les risques de maladies cardiovasculaires
- 📈 **Dashboard interactif**: Interface utilisateur intuitive pour explorer les données
- 🔌 **API REST**: Endpoints pour accéder aux fonctionnalités du modèle

## 🛠️ Technologies utilisées

### 🔙 Backend
- 🚀 **FastAPI**: Framework web rapide pour la création d'APIs
- 🐼 **Pandas/NumPy**: Manipulation et analyse de données

### 🖥️ Frontend
- ⚛️ **React 19**: Bibliothèque UI avec hooks
- 📘 **TypeScript**: Typage statique pour JavaScript
- ⚡ **Vite**: Outil de build rapide
- 🎨 **TailwindCSS**: Framework CSS utilitaire
- 📈 **AG Grid/Charts**: Tableaux et graphiques interactifs
- 🔄 **TanStack Query**: Gestion des requêtes API

## 🌐 Déploiement

L'application est déployée sur [Render](https://render.com).