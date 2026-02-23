# 📋 Plan de Refactoring

**Date de création** : 2026-02-21
**Auteur** : Evan Engels
**Deadline** : 2026-02-23

---

## Principes Directeurs

1. **Sécuriser avant de refactorer** – Aucune modification structurelle sans tests verts
2. **Petits pas** – Chaque changement est isolé, testé, et committé
3. **Expliquer le pourquoi** – Chaque décision est documentée
4. **Clean Code** – Single Responsibility, injection de dépendances, séparation domaine/infrastructure

---

## Processus en 7 Étapes

### Étape 1 : Audit et État Initial ✅
- [x] Explorer la structure complète du projet
- [x] Documenter l'architecture actuelle
- [x] Identifier et prioriser les dettes techniques
- [x] Vérifier que l'application fonctionne
- [x] Vérifier que les tests existants passent (9/9 ✅)

**Livrable** : `docs/audit.md`

---

### Étape 2 : Sécurisation par les Tests 🔄
- [x] Ajouter le test manquant pour `getGreeting` (sous-étape 2.1)
- [x] Ajouter les tests de cas d'erreur pour toutes les routes (sous-étape 2.2)
- [x] Protéger le comportement métier `addItem` → `completed: false` (sous-étape 2.3)
- [x] Ajouter les tests edge cases SQLite + teardown propre (sous-étape 2.4)
- [x] S'assurer que tous les tests passent
- [x] Extraire l'express app pour faciliter les tests (sous-étape 2.5)
- [x] Ajouter les tests intégration HTTP backend (sous-étape 2.6)
- [x] Ajouter les tests E2E frontend (sous-étape 2.7)
- [x] Vérifier l'isolation de l'environnement de test (sous-étape 2.8)

**Résultat** : 9 tests → 21 tests (8 suites), tous verts ✅

---

### Étape 3 : Fiabilisation Environnement ✅
- [x] Ajouter `.gitignore` à la racine
- [x] Nettoyer les fichiers non trackés
- [x] Documenter les commandes de développement (`docs/development.md`)
- [x] Résoudre le problème de permissions Docker

---

### Étape 4 : Introduction TypeScript ✅
- [x] Installer et configurer TypeScript
- [x] Convertir progressivement les fichiers backend
- [x] Définir les interfaces formelles (persistence)
- [x] Maintenir la compatibilité avec les tests

---

### Étape 5 : Mise à jour Node ✅
- [x] Évaluer la compatibilité des dépendances
- [x] Mettre à jour si nécessaire
- [x] Vérifier que tout fonctionne après mise à jour

---

### Étape 6 : Hygiène du Projet
- [x] Ajouter la gestion d'erreur centralisée
- [x] Ajouter la validation d'entrée
- [x] Nettoyer le code (nommage, structure)
- [x] Appliquer les principes Clean Code

---

### Étape 7 : Isolation Infrastructure
- [x] Extraire la logique métier des routes
- [x] Introduire l'injection de dépendances
- [x] Séparer domaine et infrastructure
- [x] Préparer l'architecture hexagonale

---

### Étape 8 : Hygiène Architecture et Qualité ✅

Objectif : renforcer la maintenabilité et prévenir les violations architecturales.

- [x] Installer et configurer dependency-cruiser
- [x] Définir des règles d'architecture :
  - routes → interdit d'accéder à persistence
  - respect de la séparation des couches
- [x] Ajouter scripts quality :
  - npm run quality
  - npm run architecture:test
  - npm run lint
- [x] Configurer Prettier et appliquer le formatage global
- [x] Vérifier conformité avec Clean Architecture

---

### Étape 9 : Migration Frontend vers TypeScript ✅

Objectif : améliorer la robustesse et la maintenabilité frontend.

- [x] Installer TypeScript et configurer Vite
- [x] Convertir tous les composants JSX → TSX
- [x] Introduire types métier (TodoItem)
- [x] Supprimer PropTypes
- [x] Corriger les incompatibilités FontAwesome
- [x] Vérifier compatibilité Docker
- [x] Vérifier tests E2E Playwright

---

### Étape 10 : Validation Finale et Industrialisation ✅

Objectif : garantir que le projet est prêt pour production et soutenance.

- [x] Vérifier build backend
- [x] Vérifier build frontend
- [x] Vérifier tests unitaires
- [x] Vérifier tests intégration
- [x] Vérifier tests E2E
- [x] Vérifier Docker build complet
- [x] Vérifier fonctionnement full-stack
- [x] Vérifier architecture avec dependency-cruiser
- [x] Vérifier qualité code avec Prettier

## Règles de Commit

Chaque commit suit le format :
```
<type>(<scope>): <description>

<corps explicatif si nécessaire>
```

Types utilisés :
- `docs` : Documentation
- `test` : Ajout/modification de tests
- `chore` : Configuration, outillage
- `refactor` : Refactoring (sans changement fonctionnel)
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
