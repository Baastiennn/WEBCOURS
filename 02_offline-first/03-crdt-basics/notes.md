# 🔄 CRDT Basics : Le Cœur du Local-First

## 📋 Vue d'ensemble

**CRDT** (Conflict-free Replicated Data Types) sont des structures de données qui permettent de fusionner automatiquement des modifications concurrentes sans conflits. C'est le fondement des applications local-first.

### 🎯 Objectifs

- Comprendre le problème de la synchronisation
- Implémenter un LWW-Register (Last-Write-Wins)
- Utiliser des timestamps et horloges logiques
- Fusionner des versions concurrentes
- Comprendre les propriétés mathématiques des CRDTs

---

## 🤔 Le Problème

### Scénario : 2 utilisateurs éditent simultanément

```
Temps 0 : Document initial = "Hello"

Alice (offline) : "Hello" → "Hello Alice"
Bob (offline)   : "Hello" → "Hello Bob"

Temps 1 : Synchronisation → Conflit !
```

**Question :** Quelle version garder ?

**Solutions classiques (mauvaises) :**
- ❌ **Dernière écriture gagne** → Perte de données
- ❌ **Verrouillage** → Impossible offline
- ❌ **Conflit manuel** → Mauvaise UX

**Solution CRDT :**
- ✅ **Fusion automatique** sans perte de données
- ✅ **Fonctionne offline** sans serveur central
- ✅ **Déterministe** : même résultat partout

---

## 📊 Types de CRDTs

### 1. **State-based CRDTs** (CvRDT)
- Envoie l'état complet
- Fusionne les états
- Plus simple, plus de bande passante

### 2. **Operation-based CRDTs** (CmRDT)
- Envoie les opérations
- Rejoue les opérations
- Plus complexe, moins de bande passante

---

## 🎯 LWW-Register (Last-Write-Wins Register)

### Concept

Le **LWW-Register** est le CRDT le plus simple :
- Chaque écriture a un **timestamp**
- Lors de la fusion, la valeur avec le **timestamp le plus récent** gagne
- En cas d'égalité, un **tie-breaker** (ex: ID client)

### Structure

```javascript
{
  value: "Hello Alice",
  timestamp: 1699876543210,
  clientId: "alice-123"
}
```

### Implémentation

```javascript
class LWWRegister {
  constructor(clientId) {
    this.clientId = clientId;
    this.value = null;
    this.timestamp = 0;
  }

  // Écrire une nouvelle valeur
  write(value) {
    this.value = value;
    this.timestamp = Date.now();
  }

  // Lire la valeur actuelle
  read() {
    return this.value;
  }

  // Fusionner avec un autre registre
  merge(other) {
    // Garder le timestamp le plus récent
    if (other.timestamp > this.timestamp) {
      this.value = other.value;
      this.timestamp = other.timestamp;
    } else if (other.timestamp === this.timestamp) {
      // Tie-breaker : ordre lexicographique des IDs
      if (other.clientId > this.clientId) {
        this.value = other.value;
      }
    }
    // Sinon, garder notre valeur (plus récente)
  }

  // Sérialiser pour le réseau
  toJSON() {
    return {
      value: this.value,
      timestamp: this.timestamp,
      clientId: this.clientId
    };
  }

  // Charger depuis JSON
  fromJSON(data) {
    this.value = data.value;
    this.timestamp = data.timestamp;
    this.clientId = data.clientId || this.clientId;
  }
}
```

### Utilisation

```javascript
// Client Alice
const aliceReg = new LWWRegister('alice-123');
aliceReg.write('Hello Alice');

// Client Bob
const bobReg = new LWWRegister('bob-456');
bobReg.write('Hello Bob');

// Synchronisation : Alice reçoit l'état de Bob
const bobState = bobReg.toJSON();
aliceReg.merge(bobState);

console.log(aliceReg.read()); // "Hello Bob" (plus récent)
```

---

## ⏰ Timestamps et Horloges

### Problème des horloges système

```javascript
// Alice écrit à 14:00:00 (horloge en avance)
aliceReg.write('Alice');

// Bob écrit à 13:59:58 (horloge en retard, mais après Alice réellement)
bobReg.write('Bob');

// Fusion : "Alice" gagne (incorrect !)
```

**Problème :** Les horloges système ne sont pas synchronisées.

### Solution 1 : Horloge Hybride

```javascript
class HybridClock {
  constructor() {
    this.logicalTime = 0;
    this.physicalTime = 0;
  }

  now() {
    const physical = Date.now();

    if (physical > this.physicalTime) {
      this.physicalTime = physical;
      this.logicalTime = 0;
    } else {
      this.logicalTime++;
    }

    return {
      physical: this.physicalTime,
      logical: this.logicalTime
    };
  }

  update(remoteTime) {
    if (remoteTime.physical > this.physicalTime) {
      this.physicalTime = remoteTime.physical;
      this.logicalTime = remoteTime.logical + 1;
    } else if (remoteTime.physical === this.physicalTime) {
      this.logicalTime = Math.max(this.logicalTime, remoteTime.logical) + 1;
    } else {
      this.logicalTime++;
    }
  }
}
```

### Solution 2 : Lamport Timestamp

```javascript
class LamportClock {
  constructor(clientId) {
    this.clientId = clientId;
    this.counter = 0;
  }

  tick() {
    this.counter++;
    return { counter: this.counter, clientId: this.clientId };
  }

  update(remoteTimestamp) {
    this.counter = Math.max(this.counter, remoteTimestamp.counter) + 1;
  }
}
```

---

## 🔄 LWW-Register avec Lamport Clock

```javascript
class LWWRegisterWithLamport {
  constructor(clientId) {
    this.clientId = clientId;
    this.value = null;
    this.clock = new LamportClock(clientId);
    this.timestamp = null;
  }

  write(value) {
    this.value = value;
    this.timestamp = this.clock.tick();
  }

  read() {
    return this.value;
  }

  merge(other) {
    // Mettre à jour notre horloge
    if (other.timestamp) {
      this.clock.update(other.timestamp);
    }

    // Comparer les timestamps
    if (!this.timestamp ||
        other.timestamp.counter > this.timestamp.counter ||
        (other.timestamp.counter === this.timestamp.counter &&
         other.timestamp.clientId > this.timestamp.clientId)) {
      this.value = other.value;
      this.timestamp = other.timestamp;
    }
  }

  toJSON() {
    return {
      value: this.value,
      timestamp: this.timestamp,
      clientId: this.clientId
    };
  }
}
```

---

## 🧪 Démonstration Complète

```javascript
// Simulation de 2 clients
const alice = new LWWRegisterWithLamport('alice');
const bob = new LWWRegisterWithLamport('bob');

// Alice écrit
alice.write('Version Alice 1');
console.log('Alice:', alice.read(), alice.timestamp);

// Bob écrit (sans savoir pour Alice)
bob.write('Version Bob 1');
console.log('Bob:', bob.read(), bob.timestamp);

// Synchronisation : Alice → Bob
bob.merge(alice.toJSON());
console.log('Bob après merge:', bob.read());

// Bob écrit à nouveau
bob.write('Version Bob 2');

// Synchronisation : Bob → Alice
alice.merge(bob.toJSON());
console.log('Alice après merge:', alice.read());

// Résultat : "Version Bob 2" partout (déterministe)
```

---

## 📦 Autre CRDT : LWW-Map

Un **LWW-Map** est une carte clé-valeur où chaque clé est un LWW-Register.

```javascript
class LWWMap {
  constructor(clientId) {
    this.clientId = clientId;
    this.map = new Map();
  }

  set(key, value) {
    if (!this.map.has(key)) {
      this.map.set(key, new LWWRegisterWithLamport(this.clientId));
    }
    this.map.get(key).write(value);
  }

  get(key) {
    return this.map.has(key) ? this.map.get(key).read() : undefined;
  }

  merge(other) {
    for (const [key, otherReg] of other.map.entries()) {
      if (!this.map.has(key)) {
        this.map.set(key, new LWWRegisterWithLamport(this.clientId));
      }
      this.map.get(key).merge(otherReg.toJSON());
    }
  }

  toJSON() {
    const obj = {};
    for (const [key, reg] of this.map.entries()) {
      obj[key] = reg.toJSON();
    }
    return obj;
  }
}

// Utilisation
const aliceMap = new LWWMap('alice');
aliceMap.set('name', 'Alice');
aliceMap.set('age', 30);

const bobMap = new LWWMap('bob');
bobMap.set('name', 'Bob');
bobMap.set('city', 'Paris');

// Fusion
aliceMap.merge(bobMap);
console.log(aliceMap.get('name')); // "Bob" (plus récent)
console.log(aliceMap.get('city')); // "Paris"
console.log(aliceMap.get('age'));  // 30
```

---

## 🎯 Propriétés Mathématiques

### Propriétés SEC (Strong Eventual Consistency)

1. **Convergence** : Tous les réplicas convergent vers le même état
2. **Commutativité** : `merge(A, B) = merge(B, A)`
3. **Associativité** : `merge(merge(A, B), C) = merge(A, merge(B, C))`
4. **Idempotence** : `merge(A, A) = A`

### Test de convergence

```javascript
const a = new LWWRegister('a');
const b = new LWWRegister('b');
const c = new LWWRegister('c');

a.write('A');
b.write('B');
c.write('C');

// Ordre différent
const x = new LWWRegister('x');
x.merge(a.toJSON());
x.merge(b.toJSON());
x.merge(c.toJSON());

const y = new LWWRegister('y');
y.merge(c.toJSON());
y.merge(a.toJSON());
y.merge(b.toJSON());

console.log(x.read() === y.read()); // true (convergence)
```

---

## 🧩 Cas d'Usage Réels

### 1. Éditeur Collaboratif Simple

```javascript
class CollaborativeDocument {
  constructor(clientId) {
    this.clientId = clientId;
    this.content = new LWWRegister(clientId);
  }

  edit(newContent) {
    this.content.write(newContent);
  }

  getContent() {
    return this.content.read();
  }

  sync(otherDoc) {
    this.content.merge(otherDoc.content.toJSON());
  }
}
```

### 2. Profil Utilisateur

```javascript
class UserProfile {
  constructor(userId) {
    this.data = new LWWMap(userId);
  }

  setName(name) { this.data.set('name', name); }
  setEmail(email) { this.data.set('email', email); }

  sync(otherProfile) {
    this.data.merge(otherProfile.data);
  }
}
```

---

## ⚠️ Limites de LWW

### ❌ Ce que LWW ne gère PAS

1. **Édition collaborative fine** (caractères, mots)
   - Solution : Yjs, Automerge (CRDT texte)

2. **Listes ordonnées**
   - Solution : RGA, LSEQ (CRDT liste)

3. **Compteurs**
   - Solution : G-Counter, PN-Counter

4. **Ensembles**
   - Solution : OR-Set, 2P-Set

### ✅ Ce que LWW gère BIEN

- Champs simples (nom, email, statut)
- Préférences utilisateur
- Configuration
- Profils

---

## 🔗 Bibliothèques CRDT

- **Yjs** - CRDT texte, map, array
- **Automerge** - CRDT JSON-like
- **Gun.js** - Base de données P2P avec CRDT
- **Conflict-free Replicated JSON** (CRJSON)

---

## 🎯 Résumé

### Concepts clés

- **CRDT** = structures de données sans conflits
- **LWW-Register** = valeur + timestamp + clientId
- **Merge** = fusion automatique basée sur le temps
- **Convergence** = même résultat partout

### Flux typique

1. Chaque client écrit localement (timestamp)
2. Synchronisation périodique (envoyer état)
3. Fusion automatique (merge)
4. Convergence garantie

---

**Prochaine étape : katas.md**
