# 🥋 Katas : CRDT Basics

## Kata 1 : LWW-Register Simple ⭐
Implémentez un LWW-Register avec write(), read(), merge()

<details><summary>✅ Solution</summary>

```javascript
class LWWRegister {
  constructor(clientId) {
    this.clientId = clientId;
    this.value = null;
    this.timestamp = 0;
  }

  write(value) {
    this.value = value;
    this.timestamp = Date.now();
  }

  read() {
    return this.value;
  }

  merge(other) {
    if (other.timestamp > this.timestamp ||
       (other.timestamp === this.timestamp && other.clientId > this.clientId)) {
      this.value = other.value;
      this.timestamp = other.timestamp;
    }
  }

  toJSON() {
    return { value: this.value, timestamp: this.timestamp, clientId: this.clientId };
  }
}
```
</details>

---

## Kata 2 : Lamport Clock ⭐⭐
Implémentez une horloge de Lamport avec tick() et update()

<details><summary>✅ Solution</summary>

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
</details>

---

## Kata 3 : LWW-Map ⭐⭐⭐
Implémentez une map où chaque clé est un LWW-Register

<details><summary>✅ Solution</summary>

```javascript
class LWWMap {
  constructor(clientId) {
    this.clientId = clientId;
    this.map = new Map();
  }

  set(key, value) {
    if (!this.map.has(key)) {
      this.map.set(key, new LWWRegister(this.clientId));
    }
    this.map.get(key).write(value);
  }

  get(key) {
    return this.map.has(key) ? this.map.get(key).read() : undefined;
  }

  merge(other) {
    for (const [key, otherReg] of other.map.entries()) {
      if (!this.map.has(key)) {
        this.map.set(key, new LWWRegister(this.clientId));
      }
      this.map.get(key).merge(otherReg.toJSON());
    }
  }
}
```
</details>

---

## Challenge : Simuler 2 Clients ⭐⭐⭐
Créez 2 instances, écrivez des valeurs, synchronisez manuellement via JSON

<details><summary>✅ Solution</summary>

```javascript
const alice = new LWWRegister('alice');
const bob = new LWWRegister('bob');

alice.write('Alice version 1');
bob.write('Bob version 1');

// Simuler l'envoi via réseau
const aliceState = JSON.stringify(alice.toJSON());
const bobState = JSON.stringify(bob.toJSON());

// Fusionner
alice.merge(JSON.parse(bobState));
bob.merge(JSON.parse(aliceState));

console.log(alice.read() === bob.read()); // true - convergence!
```
</details>
