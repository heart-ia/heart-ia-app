# Tests pour l'API Heart-IA

Ce répertoire contient les tests pour l'API Heart-IA. Les tests sont écrits avec pytest et utilisent le client de test FastAPI pour simuler des requêtes HTTP.

## Structure des tests

- `conftest.py` : Contient les fixtures pytest, notamment le client de test FastAPI.
- `test_main.py` : Tests pour l'endpoint racine de l'API.
- `test_dependencies.py` : Tests pour vérifier que les dépendances requises sont installées.
- `test_cardio.py` : Tests pour tous les endpoints du router cardio.

## Couverture des tests

La couverture actuelle des tests est de 97%, avec une couverture complète (100%) pour les routers et les modèles.

## Exécution des tests

Pour exécuter les tests, utilisez la commande suivante depuis le répertoire racine du projet :

```bash
cd api && python -m pytest tests/ -v
```

Pour exécuter les tests avec un rapport de couverture :

```bash
cd api && python -m pytest tests/ --cov=. -v
```

## Approche de test

Les tests suivent une approche de test d'intégration, en testant les endpoints de l'API de bout en bout. Chaque test vérifie :

1. Le code de statut de la réponse (200 OK pour les requêtes réussies)
2. La structure de la réponse (champs attendus, types de données)
3. La cohérence des données (par exemple, le nombre total d'enregistrements correspond à la somme des cas positifs et négatifs)

## Mocking

Les tests actuels n'utilisent pas de mocking car ils testent l'API de bout en bout, y compris le chargement et le traitement des données. Si nécessaire, des tests unitaires avec mocking pourraient être ajoutés pour tester des composants spécifiques de manière isolée.

## Tests à ajouter

Pour améliorer davantage la couverture des tests, les tests suivants pourraient être ajoutés :

1. Tests pour les cas d'erreur (par exemple, requêtes malformées)
2. Tests unitaires pour le service CardioService
3. Tests de performance pour les endpoints qui traitent de grandes quantités de données