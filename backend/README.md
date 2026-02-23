# Backend — Todo App API

## Présentation

Ce backend fournit l’API REST de l’application Todo.  
Il a été entièrement refactoré afin d’améliorer :

- la maintenabilité
- la testabilité
- la robustesse
- la qualité du code
- la séparation des responsabilités

Le projet utilise **Node.js, Express et TypeScript**, avec une architecture claire et modulaire.

---

## Technologies utilisées

### Runtime

- Node.js (LTS ≥ 22)
- Express
- SQLite / MySQL
- UUID

### Développement

- TypeScript
- Jest
- Supertest
- dependency-cruiser
- ESLint
- Prettier
- Nodemon

---

## Architecture

Structure :

```text
backend
│   ├── data
│   ├── eslint.config.js
│   ├── jest.config.cjs
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── spec
│   │   ├── api.error.spec.ts
│   │   ├── api.spec.ts
│   │   ├── persistence
│   │   │   └── sqlite.spec.ts
│   │   ├── routes
│   │   │   ├── addItem.spec.ts
│   │   │   ├── deleteItem.spec.ts
│   │   │   ├── getGreeting.spec.ts
│   │   │   ├── getItems.spec.ts
│   │   │   └── updateItem.spec.ts
│   │   └── tsconfig.json
│   ├── src
│   │   ├── app.ts
│   │   ├── index.ts
│   │   ├── middlewares
│   │   │   ├── errorHandler.ts
│   │   │   └── validateTodo.ts
│   │   ├── persistence
│   │   │   ├── index.ts
│   │   │   ├── mysql.ts
│   │   │   ├── sqlite.ts
│   │   │   └── types.ts
│   │   ├── routes
│   │   │   ├── addItem.ts
│   │   │   ├── deleteItem.ts
│   │   │   ├── getGreeting.ts
│   │   │   ├── getItems.ts
│   │   │   └── updateItem.ts
│   │   ├── services
│   │   │   └── todoService.ts
│   │   └── static
│   ├── test-results
│   └── tsconfig.json
```

Architecture en couches :

```text
Routes → Services → Persistence
```

Responsabilités :

- routes → HTTP uniquement
- services → logique métier
- persistence → accès aux données
- middlewares → validation et gestion erreurs

---

## Tests

Tests disponibles :

- tests unitaires
- tests intégration HTTP
- tests gestion erreurs

Commande :

```text
npm run test
```

---

## Vérification architecture

dependency-cruiser empêche les violations d’architecture.

Commande :

```text
npm run architecture:test
```

---

## Vérification qualité complète

```text
npm run quality
```

---

## Auteur

Evan Engels
