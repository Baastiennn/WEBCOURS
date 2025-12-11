# 🥋 Katas : Sync P2P

## Kata 1 : Rejoindre une Room ⭐
Utilisez Trystero pour rejoindre une room et afficher les pairs connectés

<details><summary>✅ Solution</summary>

```javascript
import { joinRoom } from 'trystero';

const room = joinRoom({ appId: 'test-app' }, 'room-1');

room.onPeerJoin(peerId => {
  console.log('Pair connecté:', peerId);
});

room.onPeerLeave(peerId => {
  console.log('Pair déconnecté:', peerId);
});
```
</details>

---

## Kata 2 : Chat Simple ⭐⭐
Créez un chat P2P basique avec makeAction

<details><summary>✅ Solution</summary>

```javascript
const room = joinRoom({ appId: 'chat' }, 'general');
const [sendMsg, onMsg] = room.makeAction('message');

onMsg((msg, peerId) => {
  console.log(`${peerId}: ${msg}`);
});

// Envoyer un message
sendMsg('Hello P2P!');
```
</details>

---

## Kata 3 : Sync CRDT ⭐⭐⭐
Synchronisez un LWW-Register en temps réel via P2P

<details><summary>✅ Solution</summary>

```javascript
class SyncedRegister {
  constructor(clientId, roomName) {
    this.clientId = clientId;
    this.register = new LWWRegister(clientId);
    this.room = joinRoom({ appId: 'crdt-sync' }, roomName);

    const [sendState, onState] = this.room.makeAction('state');
    this.sendState = sendState;

    onState((state) => {
      this.register.merge(state);
      console.log('Sync:', this.register.read());
    });

    this.room.onPeerJoin((peerId) => {
      this.sendState(this.register.toJSON(), peerId);
    });
  }

  write(value) {
    this.register.write(value);
    this.sendState(this.register.toJSON());
  }

  read() {
    return this.register.read();
  }
}

// Utilisation
const synced = new SyncedRegister('alice', 'my-room');
synced.write('Hello!');
```
</details>

---

## Challenge : Todo List P2P ⭐⭐⭐
Créez une todo list synchronisée en temps réel entre plusieurs navigateurs

<details><summary>Indice</summary>
Utilisez un LWW-Map pour stocker les todos, synchronisez via P2P, affichez dans l'UI
</details>
