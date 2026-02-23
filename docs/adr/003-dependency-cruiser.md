# ADR-003: Utilisation de dependency-cruiser

## Status
Accepted

## Context

Le projet nécessite une architecture propre avec séparation claire des responsabilités.

Il fallait empêcher certaines dépendances interdites, par exemple :

routes → persistence (interdit)

## Decision

Utilisation de dependency-cruiser pour analyser automatiquement les dépendances.

Ajout d'une règle :

routes ne peuvent pas importer persistence.

## Consequences

### Avantages

- Garantie de l'architecture
- Détection automatique des violations
- Prévention des régressions

### Inconvénients

- Ajout d'un outil supplémentaire