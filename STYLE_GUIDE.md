# Heart-IA Style Guide

Ce guide de style définit les conventions et bonnes pratiques pour le projet Heart-IA, une application de prédiction des maladies cardiovasculaires basée sur l'intelligence artificielle.

## Python (Backend)

### Conventions de style

- Suivre [PEP 8](https://peps.python.org/pep-0008/) pour le formatage du code
- Utiliser des noms de variables et fonctions en snake_case
- Limiter les lignes à 88 caractères (standard Black)
- Utiliser des docstrings pour toutes les fonctions, classes et modules
- Préférer les f-strings pour le formatage de texte

### Architecture FastAPI

- Organiser les routes par domaine fonctionnel
- Utiliser Pydantic pour la validation des données
- Structurer le projet comme suit:
  ```
  api/
  ├── main.py            # Point d'entrée de l'application
  ├── routers/           # Modules de routes par domaine
  ├── models/            # Modèles Pydantic et SQLAlchemy
  ├── services/          # Logique métier
  ├── dependencies/      # Dépendances FastAPI
  └── utils/             # Fonctions utilitaires
  ```
- Préférer l'injection de dépendances via FastAPI Depends()
- Utiliser des status codes HTTP appropriés

### Bonnes pratiques

- Privilégier les fonctions asynchrones pour les opérations I/O
- Utiliser typing pour le typage statique
- Éviter les variables globales
- Implémenter la gestion d'erreurs avec try/except ciblés
- Utiliser NumPy pour les opérations mathématiques vectorielles

## TypeScript/React (Frontend)

### Conventions de style

- Utiliser ESLint et Prettier pour le formatage
- Préférer les fonctions fléchées pour les composants React
- Nommer les fichiers de composants en kebab-case
- Utiliser PascalCase pour les noms de composants
- Préférer les imports nommés plutôt que les imports par défaut

### Architecture React

- Organiser les composants par domaine fonctionnel
- Structurer le projet comme suit:
  ```
  src/
  ├── components/        # Composants React réutilisables
  │   └── ui/            # Composants UI génériques (shadcn/ui)
  ├── hooks/             # Hooks React personnalisés
  ├── lib/               # Utilitaires et fonctions partagées
  ├── assets/            # Ressources statiques
  └── App.tsx            # Composant racine
  ```
- Préférer les composants fonctionnels avec hooks
- Utiliser des composants petits et ciblés (principe de responsabilité unique)
- Séparer la logique métier de la présentation

### Bonnes pratiques

- Utiliser TypeScript strictement typé
- Éviter any autant que possible
- Préférer les interfaces pour les props des composants
- Utiliser les hooks React (useState, useEffect, useCallback, useMemo) judicieusement
- Éviter les effets de bord non nécessaires
- Préférer l'approche déclarative plutôt qu'impérative

## Principes généraux

- Privilégier la simplicité et la lisibilité
- Écrire du code auto-documenté avec des noms explicites
- Suivre le principe DRY (Don't Repeat Yourself)
- Préférer la composition à l'héritage
- Écrire des tests unitaires pour les fonctionnalités critiques
- Utiliser Git avec des messages de commit descriptifs
- Documenter les décisions d'architecture importantes

## Pitfalls à éviter

- Suroptimisation prématurée
- Composants UI trop complexes ou trop grands
- Logique métier dans les composants UI
- Dépendances circulaires
- État global excessif
- Manque de gestion d'erreurs
- Code non typé ou utilisation excessive de any