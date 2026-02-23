# ADR-004: Stratégie de test

## Status
Accepted

## Context

Le refactoring doit être sécurisé.

Sans tests, le refactoring peut casser le comportement existant.

## Decision

Ajout de plusieurs niveaux de tests :

- Tests unitaires (routes, services)
- Tests persistence
- Tests intégration HTTP
- Tests E2E avec Playwright

## Consequences

### Avantages

- Refactoring sécurisé
- Détection rapide des bugs
- Haute confiance dans le code

### Inconvénients

- Temps d'écriture initial