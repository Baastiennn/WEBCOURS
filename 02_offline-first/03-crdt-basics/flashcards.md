# 🧠 Flashcards : CRDT Basics

### Q: Qu'est-ce qu'un CRDT ?
<details><summary>R</summary>Conflict-free Replicated Data Type - structure de données qui fusionne automatiquement les modifications concurrentes sans conflits</details>

### Q: Principe du LWW-Register ?
<details><summary>R</summary>Last-Write-Wins : chaque valeur a un timestamp, lors de la fusion la plus récente gagne</details>

### Q: Structure d'un LWW-Register ?
<details><summary>R</summary>
```javascript
{ value: any, timestamp: number, clientId: string }
```
</details>

### Q: Comment fusionner 2 LWW-Registers ?
<details><summary>R</summary>Comparer timestamps : garder le plus récent. Si égalité, tie-breaker avec clientId</details>

### Q: Problème des timestamps système ?
<details><summary>R</summary>Horloges non synchronisées entre clients → incohérences temporelles</details>

### Q: Solution : Horloge de Lamport ?
<details><summary>R</summary>Compteur logique qui s'incrémente à chaque opération, synchronisé lors de la communication</details>

### Q: Propriétés SEC (Strong Eventual Consistency) ?
<details><summary>R</summary>Convergence, Commutativité, Associativité, Idempotence</details>

### Q: LWW convient pour quoi ?
<details><summary>R</summary>✅ Champs simples (nom, email, config) ❌ Édition collaborative fine, listes, compteurs</details>

### Q: Bibliothèque CRDT populaire ?
<details><summary>R</summary>Yjs (texte, map, array), Automerge (JSON-like), Gun.js (P2P database)</details>

### Q: Code minimal LWW ?
<details><summary>R</summary>
```javascript
class LWW {
  constructor(id) {
    this.id = id;
    this.value = null;
    this.ts = 0;
  }
  write(v) {
    this.value = v;
    this.ts = Date.now();
  }
  merge(other) {
    if (other.ts > this.ts) {
      this.value = other.value;
      this.ts = other.ts;
    }
  }
}
```
</details>

---

**🎉 Prêt pour le Sync P2P !**
