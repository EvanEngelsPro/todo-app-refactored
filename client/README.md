# Frontend — Todo App Client

## Présentation

Ce frontend est l’interface utilisateur de l’application Todo.

Il permet :

- afficher les todos
- ajouter un todo
- modifier un todo
- supprimer un todo

Le frontend utilise **React, TypeScript et Vite**.

---

## Technologies utilisées

- React
- TypeScript
- Vite
- Bootstrap
- Sass
- Playwright

---

## Architecture

Structure :

```text
client
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── AddNewItemForm.tsx
│   │   │   ├── Greeting.tsx
│   │   │   ├── ItemDisplay.scss
│   │   │   ├── ItemDisplay.tsx
│   │   │   └── TodoListCard.tsx
│   │   ├── index.scss
│   │   ├── main.tsx
│   │   └── types
│   │       └── TodoItem.tsx
│   ├── test-results
│   ├── tsconfig.json
│   └── vite.config.js
```
---

## Communication avec le backend

API utilisée :

```text
GET /api/items  
POST /api/items  
PUT /api/items/:id  
DELETE /api/items/:id  
GET /api/greeting
```

---

## Installation

```text
npm install
```

---

## Lancer en développement

```text
npm run dev
```

---

## Build

```text
npm run build
```

---

## Tests E2E

```text
npx playwright test
```

---

## Auteur

Evan Engels