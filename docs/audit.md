# 🔍 Audit de l'Application Todo List

**Date** : 2026-02-21
**Auteur** : Evan Engels
**Objectif** : Établir une photographie complète de l'application avant toute modification.

---

## 1. Vue d'ensemble

Application Todo List composée de :
- Un **frontend React** (Vite + Bootstrap)
- Un **backend Node.js** (Express)
- Une **base de données MySQL** (avec fallback SQLite pour les tests)
- Une **infrastructure Docker** (multi-stage build + Compose)

---

## 2. Architecture Actuelle

```
┌─────────────────────────────────────────────────┐
│                 Docker Compose                   │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐   │
│  │  Traefik  │───▶│  Client  │    │phpMyAdmin│   │
│  │  (proxy)  │    │ (React)  │    │          │   │
│  │           │    └──────────┘    └────┬─────┘   │
│  │           │    ┌──────────┐         │         │
│  │           │───▶│ Backend  │    ┌────▼─────┐   │
│  └──────────┘    │(Express) │───▶│  MySQL    │   │
│                   └──────────┘    └──────────┘   │
└─────────────────────────────────────────────────┘
```

**Routage Traefik** :
- `localhost` → Client (port 5173)
- `localhost/api/*` → Backend (port 3000)
- `db.localhost` → phpMyAdmin (port 80)

---

## 3. Stack Technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Runtime | Node.js | 22 |
| Backend | Express | 5.1.0 |
| BDD principale | MySQL | 9.3 |
| BDD tests | SQLite3 | 5.1.7 |
| Frontend | React | 19.1.0 |
| Build tool | Vite | 6.3.5 |
| CSS | Bootstrap + SCSS | 5.3.6 |
| Tests | Jest | 29.7.0 |
| Proxy | Traefik | 3.6 |

---

## 4. Structure des Fichiers

```
todo-app-refactored/
├── Dockerfile              # Multi-stage (6 stages)
├── compose.yaml            # 5 services
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── index.js        # Point d'entrée Express
│   │   ├── routes/          # 5 handlers CRUD
│   │   │   ├── addItem.js
│   │   │   ├── deleteItem.js
│   │   │   ├── getGreeting.js
│   │   │   ├── getItems.js
│   │   │   └── updateItem.js
│   │   └── persistence/     # Couche d'accès données
│   │       ├── index.js     # Switch MySQL/SQLite
│   │       ├── mysql.js
│   │       └── sqlite.js
│   └── spec/                # Tests Jest
│       ├── routes/          # 4 tests unitaires
│       └── persistence/     # 1 test d'intégration
└── client/
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── components/      # 5 composants React
            ├── Greeting.jsx
            ├── TodoListCard.jsx
            ├── AddNewItemForm.jsx
            ├── ItemDisplay.jsx
            └── ItemDisplay.scss
```

---

## 5. Analyse du Backend

### API REST

| Méthode | Route | Handler | Fonction |
|---------|-------|---------|----------|
| GET | `/api/greeting` | `getGreeting.js` | Message de bienvenue |
| GET | `/api/items` | `getItems.js` | Liste tous les todos |
| POST | `/api/items` | `addItem.js` | Crée un todo |
| PUT | `/api/items/:id` | `updateItem.js` | Modifie un todo |
| DELETE | `/api/items/:id` | `deleteItem.js` | Supprime un todo |

### Couche Persistence

Contrat implicite (pas d'interface formelle) :

```
init()              → Initialise la connexion
teardown()          → Ferme la connexion
getItems()          → Retourne tous les items
getItem(id)         → Retourne un item par ID
storeItem(item)     → Stocke un nouvel item
updateItem(id, item)→ Met à jour un item
removeItem(id)      → Supprime un item
```

**Mécanisme de switch** : `persistence/index.js` vérifie si `MYSQL_HOST` est défini.
- Si oui → utilise `mysql.js`
- Si non → utilise `sqlite.js` (utilisé par les tests)

---

## 6. Analyse du Frontend

| Composant | Responsabilité | Appels API |
|-----------|---------------|------------|
| `App.jsx` | Layout Bootstrap | Aucun |
| `Greeting.jsx` | Affiche le message | GET `/api/greeting` |
| `TodoListCard.jsx` | Orchestre la liste | GET `/api/items` |
| `AddNewItemForm.jsx` | Formulaire d'ajout | POST `/api/items` |
| `ItemDisplay.jsx` | Affiche un item + actions | PUT, DELETE `/api/items/:id` |

---

## 7. Tests Existants

### Résultat : ✅ 5 suites, 9 tests, tous passent

| Test | Type | Ce qui est testé |
|------|------|-----------------|
| `addItem.spec.js` | Unitaire (mock) | Création d'item avec UUID |
| `deleteItem.spec.js` | Unitaire (mock) | Suppression d'item |
| `getItems.spec.js` | Unitaire (mock) | Récupération de liste |
| `updateItem.spec.js` | Unitaire (mock) | Mise à jour d'item |
| `sqlite.spec.js` | Intégration | CRUD complet via SQLite |

### Couverture manquante

- ❌ Route `getGreeting` non testée
- ❌ Aucun test de cas d'erreur
- ❌ Aucune validation d'entrée testée
- ❌ Aucun test frontend
- ❌ Aucun test E2E

---

## 8. Infrastructure Docker

### Dockerfile – 6 stages

| Stage | Rôle |
|-------|------|
| `base` | Image de base Node 22 |
| `client-base` | Installation dépendances client |
| `client-dev` | Dev server Vite |
| `client-build` | Build production client |
| `backend-dev` | Dev server nodemon |
| `test` | Exécution tests Jest |
| `final` | Image production |

### Compose – 5 services

| Service | Image/Target | Port |
|---------|-------------|------|
| `proxy` | traefik:v3.6 | 80 |
| `backend` | backend-dev | 3000 |
| `client` | client-dev | 5173 |
| `mysql` | mysql:9.3 | 3306 |
| `phpmyadmin` | phpmyadmin | 80 |

---

## 9. Dettes Techniques Identifiées

| # | Description | Sévérité | Étape |
|---|-------------|----------|-------|
| 1 | Couplage fort routes ↔ persistence (`require` direct) | 🔴 Haute | É7 |
| 2 | Pas d'interface formelle pour la persistence | 🔴 Haute | É4 |
| 3 | Couverture de tests insuffisante | 🟠 Moyenne | É2 |
| 4 | Pas de validation d'entrée backend | 🟠 Moyenne | É2/É6 |
| 5 | Pas de gestion d'erreur centralisée | 🟠 Moyenne | É6 |
| 6 | Logique métier dans les routes | 🔴 Haute | É7 |
| 7 | Pas de `.gitignore` à la racine | 🟡 Faible | É3 |
| 8 | `package-lock.json` racine non tracké | 🟡 Faible | É3 |
| 9 | Permissions Docker (besoin de `sudo`) | 🟡 Faible | É3 |

---

## 10. Conclusion

L'application est **fonctionnelle** et dispose d'un **socle de tests minimal**. La structure Docker est bien conçue. Le principal enjeu architectural est le **couplage fort** entre les routes et la couche de persistence, qui sera traité progressivement au fil des étapes de refactoring.

**Prochaine étape** : Sécurisation par les tests (Étape 2)
