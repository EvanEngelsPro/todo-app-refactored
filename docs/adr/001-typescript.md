# ADR-001: Migration vers TypeScript

## Status
Accepted

## Context

Le projet initial était entièrement en JavaScript, ce qui rendait le refactoring risqué.  
L'absence de typage pouvait provoquer des erreurs non détectées à la compilation.

L'objectif du projet étant un refactoring sécurisé et une amélioration de la maintenabilité, il était nécessaire d'améliorer la sécurité du code.

## Decision

Le projet a été migré progressivement vers TypeScript.

Les actions réalisées :

- Installation de TypeScript
- Configuration en mode strict
- Migration progressive des fichiers
- Ajout d'interfaces explicites
- Typage des routes, services et persistence

## Consequences

### Avantages

- Détection des erreurs à la compilation
- Code plus robuste
- Refactoring sécurisé
- Meilleure maintenabilité
- Meilleure documentation implicite du code

### Inconvénients

- Temps de migration initial
- Nécessité d'ajouter des types