# 🛠️ Guide de Développement

Ce document liste les commandes essentielles pour travailler sur le projet Todo App.

## 🚀 Lancement de l'Application

Le projet utilise Docker Compose pour orchestrer les services (Traefik, MySQL, Backend, Frontend).

```bash
# Lancer tous les services avec auto-sync (Compose Watch)
docker compose up --watch

# Tout arrêter
docker compose down
```

L'application est accessible sur [http://localhost](http://localhost).

---

## 🧪 Tests

### Backend (Unitaires & Intégration)
Les tests backend s'exécutent à l'intérieur du container.

```bash
# Lancer tous les tests backend
docker compose exec backend npm test

# Lancer un test spécifique
docker compose exec backend npx jest spec/routes/addItem.spec.js
```

### Frontend / E2E (Playwright)
Les tests de bout en bout (End-to-End) s'exécutent depuis l'hôte.

```bash
# Lancer les tests Playwright
npx playwright test

# Lancer en mode UI (pour le debug)
npx playwright test --ui
```

---

## 📋 Bonnes Pratiques

### Isolation des tests
Les tests backend utilisent une base SQLite en mémoire/fichier temporaire (`NODE_ENV=test`). Cela garantit que la base MySQL n'est jamais polluée par les tests.

### Permissions Docker
Si vous rencontrez des erreurs de permission avec `docker`, assurez-vous de faire partie du groupe `docker` :
```bash
sudo usermod -aG docker $USER
newgrp docker
```
