# 📝 Quiz : CRDT Basics

### Q1: Que signifie CRDT ?
A) Conflict-free Replicated Data Types
B) Concurrent Replication Data Transfer
C) Cloud Resilient Data Tables
D) Coordinated Real-time Data Types

<details><summary>Réponse</summary>**A** - Conflict-free Replicated Data Types (types de données répliquées sans conflits)</details>

---

### Q2: Quel est le principe du LWW-Register ?
A) First write wins
B) Last write wins (dernière écriture gagne)
C) Random choice
D) Manual resolution

<details><summary>Réponse</summary>**B** - Last Write Wins : la valeur avec le timestamp le plus récent gagne</details>

---

### Q3: Pourquoi les timestamps système posent problème ?
A) Trop lents
B) Horloges non synchronisées entre clients
C) Format incompatible
D) Consomment trop de mémoire

<details><summary>Réponse</summary>**B** - Les horloges système ne sont pas synchronisées, causant des incohérences</details>

---

### Q4: Qu'est-ce qu'une horloge de Lamport ?
A) Horloge physique
B) Horloge logique basée sur un compteur
C) Horloge GPS
D) Horloge atomique

<details><summary>Réponse</summary>**B** - Compteur logique qui s'incrémente à chaque opération</details>

---

### Q5: Propriété clé des CRDTs ?
A) Rapidité
B) Convergence (tous les réplicas convergent vers le même état)
C) Compression
D) Sécurité

<details><summary>Réponse</summary>**B** - Convergence : tous les réplicas finissent par avoir le même état</details>

---

### Q6: LWW-Register convient pour ?
A) Édition collaborative de texte
B) Listes ordonnées
C) Champs simples (nom, email, statut)
D) Compteurs

<details><summary>Réponse</summary>**C** - LWW convient pour champs simples, pas pour édition fine</details>

---

### Q7: Que fait la méthode merge() ?
A) Supprime les doublons
B) Fusionne deux états en gardant le plus récent
C) Combine les valeurs
D) Vérifie la cohérence

<details><summary>Réponse</summary>**B** - Fusionne en gardant la valeur avec le timestamp le plus récent</details>

---

### Q8: Limite de LWW ?
A) Trop lent
B) Perte de données concurrentes (écrasement)
C) Trop complexe
D) Incompatible offline

<details><summary>Réponse</summary>**B** - LWW peut perdre des modifications concurrentes (dernière écrase les autres)</details>

---

### Q9: Bibliothèque CRDT populaire ?
A) React
B) Yjs
C) Express
D) Lodash

<details><summary>Réponse</summary>**B** - Yjs est une bibliothèque CRDT pour texte collaboratif</details>

---

### Q10: Commutativité signifie ?
A) merge(A, B) = merge(B, A)
B) A + B = B + A
C) L'ordre n'importe pas
D) Toutes les réponses

<details><summary>Réponse</summary>**D** - Toutes les réponses : l'ordre de fusion n'affecte pas le résultat</details>

---

**Score : /10 - Objectif : 7/10**
