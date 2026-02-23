# ADR-002: Introduction d'une couche Service

## Status
Accepted

## Context

Initialement, les routes Express accédaient directement à la persistence.

Cela créait un fort couplage entre :

- la couche HTTP
- la couche persistence

Cela rendait le code difficile à maintenir et à tester.

## Decision

Introduction d'une couche service intermédiaire.

Architecture :

routes → services → persistence

Les routes appellent les services.
Les services contiennent la logique métier.
La persistence contient uniquement l'accès aux données.

## Consequences

### Avantages

- Meilleure séparation des responsabilités
- Code plus maintenable
- Testabilité améliorée
- Architecture évolutive

### Inconvénients

- Ajout d'une couche supplémentaire