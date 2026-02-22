# 🧠 Journal des Décisions Architecturales

Ce document trace chaque décision technique prise lors du refactoring, avec le contexte et la justification.

---

## ADR-001 : Processus de refactoring en 7 étapes

**Date** : 2026-02-21
**Statut** : Accepté

### Contexte
L'application Todo List est monolithique avec un couplage fort entre les couches. Un refactoring complet en une seule fois serait risqué et difficile à valider.

### Décision
Procéder en 7 étapes séquentielles :
1. Audit → 2. Tests → 3. Environnement → 4. TypeScript → 5. Node → 6. Hygiène → 7. Isolation

### Justification
- **Sécurité** : Les tests en étape 2 protègent les refactorings suivants
- **Traçabilité** : Chaque étape produit un commit isolé et documenté
- **Réversibilité** : On peut revenir en arrière à chaque étape
- **Pédagogie** : L'ordre respecte le principe "sécuriser avant de modifier"

### Conséquences
- Plus lent qu'un refactoring "big bang"
- Mais beaucoup plus sûr et démontrable

---

## ADR-002 : Tests avant architecture

**Date** : 2026-02-21
**Statut** : Accepté

### Contexte
On pourrait être tenté de commencer par séparer la logique métier des routes ou d'introduire TypeScript immédiatement.

### Décision
Ne jamais modifier l'architecture sans couverture de tests suffisante.

### Justification
- Citation de Robert C. Martin : *"The first rule of refactoring is to have tests"*
- Sans tests, chaque modification structurelle risque d'introduire des régressions silencieuses
- Les 9 tests existants couvrent le chemin nominal mais pas les cas d'erreur

### Conséquences
- L'étape 2 (tests) est un pré-requis absolu pour les étapes 4 à 7
- Cela peut sembler "lent" mais c'est la garantie de ne rien casser

---

## ADR-003 : Documentation versionnée dans le projet

**Date** : 2026-02-21
**Statut** : Accepté

### Contexte
La démarche de refactoring doit être traçable et explicable dans un contexte académique.

### Décision
Créer un dossier `docs/` versionné avec Git, contenant :
- `audit.md` : État initial du projet
- `refactoring-plan.md` : Plan de refactoring détaillé
- `decisions.md` : Journal des décisions architecturales (ADR)

### Justification
- La documentation versionnée montre l'évolution de la réflexion
- Les ADR sont une pratique reconnue en architecture logicielle
- Chaque commit de documentation est tracé dans l'historique Git

### Conséquences
- Chaque étape produit une mise à jour de ces documents
- L'historique Git raconte l'histoire du refactoring
