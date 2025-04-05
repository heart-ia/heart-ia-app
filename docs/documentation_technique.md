# Documentation Technique Heart-IA

## Vue d'ensemble

Heart-IA est une application de prédiction des maladies cardiovasculaires basée sur l'intelligence artificielle. Cette documentation technique détaille l'architecture, les composants et les choix techniques du projet.

## Architecture globale

L'application est divisée en deux parties principales :
- **Backend** : API REST développée avec FastAPI (Python)
- **Frontend** : Interface utilisateur développée avec React et TypeScript

### Diagramme d'architecture

```
Heart-IA
├── API (FastAPI)
│   ├── Endpoints REST
│   ├── Modèles IA
│   └── Base de données
└── UI (React/TypeScript)
    ├── Interface utilisateur
    ├── Visualisation des données
    └── Formulaires de saisie
```

## Backend (API)

### Technologies utilisées

- **FastAPI** : Framework web asynchrone pour API REST
- **Pydantic** : Validation des données et sérialisation
- **SQLAlchemy** : ORM pour la gestion de la base de données
- **Scikit-learn/TensorFlow** : Bibliothèques pour les modèles d'IA
- **Pytest** : Framework de test

### Structure du projet

```
api/
├── main.py            # Point d'entrée de l'application
├── routers/           # Modules de routes par domaine
├── models/            # Modèles Pydantic et SQLAlchemy
├── services/          # Logique métier
├── dependencies/      # Dépendances FastAPI
└── utils/             # Fonctions utilitaires
```

### Endpoints API principaux

- `GET /health` : Vérification de l'état de l'API
- `POST /predict` : Prédiction de risque cardiovasculaire
- `GET /models` : Liste des modèles disponibles
- (Autres endpoints à documenter)

### Modèles de données

(À compléter avec les modèles de données spécifiques au projet)

## Frontend (UI)

### Technologies utilisées

- **React** : Bibliothèque UI
- **TypeScript** : Typage statique
- **Shadcn/UI** : Composants UI
- **Vitest** : Tests unitaires
- **React Query** : Gestion des requêtes API

### Structure du projet

```
src/
├── components/        # Composants React réutilisables
│   └── ui/            # Composants UI génériques (shadcn/ui)
├── hooks/             # Hooks React personnalisés
├── lib/               # Utilitaires et fonctions partagées
├── assets/            # Ressources statiques
└── App.tsx            # Composant racine
```

### Composants principaux

(À compléter avec les composants spécifiques au projet)

## Modèles d'IA

### Algorithmes utilisés

(À compléter avec les algorithmes spécifiques au projet)

### Processus d'entraînement

(À compléter avec le processus d'entraînement spécifique au projet)

### Évaluation des performances

(À compléter avec les métriques d'évaluation spécifiques au projet)

## Déploiement

### Environnements

- **Développement** : Configuration locale
- **Test** : Environnement de test automatisé
- **Production** : Déploiement sur Render

### CI/CD

Le projet utilise GitHub Actions pour l'intégration et le déploiement continus :
- Tests automatisés
- Analyse de code avec SonarCloud
- Déploiement automatique

## Sécurité

(À compléter avec les mesures de sécurité spécifiques au projet)

## Performance

(À compléter avec les considérations de performance spécifiques au projet)

---

*Note: Cette documentation technique est un document vivant qui sera mis à jour au fur et à mesure de l'évolution du projet.*