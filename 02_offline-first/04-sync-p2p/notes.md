# 🤝 Sync Peer-to-Peer avec WebRTC

## 📋 Vue d'ensemble

**WebRTC** (Web Real-Time Communication) permet de connecter des navigateurs directement entre eux, sans serveur central. Idéal pour les applications local-first.

### 🎯 Objectifs

- Comprendre WebRTC DataChannels
- Utiliser une bibliothèque P2P (Trystero)
- Synchroniser des données CRDT en temps réel
- Gérer la découverte de pairs (peers)

---

## 🤔 Pourquoi P2P ?

### Architecture Client-Serveur Traditionnelle

```
Client A → Serveur ← Client B
```
- ❌ Dépendance au serveur
- ❌ Latence réseau
- ❌ Coût d'infrastructure

### Architecture Peer-to-Peer

```
Client A ↔ Client B
```
- ✅ Communication directe
- ✅ Pas de serveur central
- ✅ Latence minimale
- ✅ Résilient

---

## 🛠️ WebRTC Basics

### Concepts Clés

1. **DataChannel** : Canal de communication bidirectionnel
2. **Signaling** : Échange initial d'informations (via serveur)
3. **ICE** : Traversée de NAT/firewall
4. **Peer Connection** : Connexion entre deux navigateurs

### Code Minimal (complexe)

```javascript
// Créer une connexion
const pc = new RTCPeerConnection();

// Créer un data channel
const channel = pc.createDataChannel('sync');

channel.onmessage = (event) => {
  console.log('Message reçu:', event.data);
};

channel.onopen = () => {
  channel.send('Hello peer!');
};

// Signaling (échange d'offres/réponses)
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);

// Envoyer l'offre au pair via signaling server
// ...
```

**Problème :** WebRTC brut est complexe (signaling, ICE, etc.)

---

## 🎁 Solution : Trystero (Bibliothèque P2P)

**Trystero** simplifie WebRTC avec une API minimaliste.

### Installation

```bash
npm install trystero
```

### Code Minimal

```javascript
import { joinRoom } from 'trystero';

// Rejoindre une "room" (groupe de pairs)
const room = joinRoom({ appId: 'my-app' }, 'room-123');

// Écouter les nouveaux pairs
room.onPeerJoin(peerId => {
  console.log('Pair connecté:', peerId);
});

room.onPeerLeave(peerId => {
  console.log('Pair déconnecté:', peerId);
});

// Créer un canal de communication
const [sendMessage, onMessage] = room.makeAction('chat');

// Recevoir des messages
onMessage((data, peerId) => {
  console.log(`Message de ${peerId}:`, data);
});

// Envoyer un message à tous
sendMessage('Hello everyone!');
```

---

## 🔄 Synchroniser des CRDTs via P2P

### Scénario : Synchroniser un LWW-Register

```javascript
import { joinRoom } from 'trystero';

class SyncedLWWRegister {
  constructor(clientId, roomName) {
    this.clientId = clientId;
    this.register = new LWWRegister(clientId);

    // Rejoindre la room
    this.room = joinRoom({ appId: 'lww-sync' }, roomName);

    // Créer un canal de sync
    const [sendState, onState] = this.room.makeAction('sync-state');

    this.sendState = sendState;

    // Écouter les états des pairs
    onState((state, peerId) => {
      console.log(`État reçu de ${peerId}`);
      this.register.merge(state);
      this.onSync?.();
    });

    // Envoyer notre état aux nouveaux pairs
    this.room.onPeerJoin(peerId => {
      console.log(`Envoi de l'état à ${peerId}`);
      this.sendState(this.register.toJSON(), peerId);
    });
  }

  write(value) {
    this.register.write(value);
    // Broadcaster le changement
    this.sendState(this.register.toJSON());
  }

  read() {
    return this.register.read();
  }

  onSync(callback) {
    this.onSync = callback;
  }
}

// Utilisation
const synced = new SyncedLWWRegister('alice-123', 'my-room');

synced.write('Hello P2P!');
synced.onSync(() => {
  console.log('Synchronisé:', synced.read());
});
```

---

## 🌐 Stratégies de Sync

### 1. **Broadcast** (diffusion à tous)

```javascript
const [broadcast, onBroadcast] = room.makeAction('broadcast');

// Envoyer à tous
broadcast({ type: 'update', value: 'new data' });

// Recevoir
onBroadcast((data, peerId) => {
  console.log('Broadcast reçu:', data);
});
```

### 2. **Unicast** (envoi à un seul pair)

```javascript
// Envoyer à un pair spécifique
sendMessage('Secret message', targetPeerId);
```

### 3. **Delta Sync** (envoyer seulement les changements)

```javascript
class DeltaSynced {
  constructor(clientId, roomName) {
    this.clientId = clientId;
    this.state = new LWWMap(clientId);
    this.lastSent = {};

    this.room = joinRoom({ appId: 'delta-sync' }, roomName);
    const [sendDelta, onDelta] = this.room.makeAction('delta');

    this.sendDelta = sendDelta;

    onDelta((delta, peerId) => {
      this.state.merge(delta);
    });
  }

  set(key, value) {
    this.state.set(key, value);

    // Envoyer seulement le changement
    const delta = { [key]: this.state.map.get(key).toJSON() };
    this.sendDelta(delta);
  }
}
```

---

## 🔍 Découverte de Pairs

### Torrent Tracker (Trystero par défaut)

```javascript
import { joinRoom } from 'trystero/torrent';

const room = joinRoom({ appId: 'my-app' }, 'room-123');
// Utilise BitTorrent DHT pour découverte
```

### Firebase (signaling via Firebase)

```javascript
import { joinRoom } from 'trystero/firebase';

const room = joinRoom({
  appId: 'my-app',
  firebaseApp: firebaseConfig
}, 'room-123');
```

### MQTT

```javascript
import { joinRoom } from 'trystero/mqtt';

const room = joinRoom({
  appId: 'my-app',
  mqttUrl: 'wss://broker.hivemq.com:8884/mqtt'
}, 'room-123');
```

---

## 📊 Gestion de la Connexion

### Détecter l'état de connexion

```javascript
const room = joinRoom({ appId: 'my-app' }, 'room-123');

let connectedPeers = new Set();

room.onPeerJoin(peerId => {
  connectedPeers.add(peerId);
  console.log(`Connectés: ${connectedPeers.size} pairs`);
});

room.onPeerLeave(peerId => {
  connectedPeers.delete(peerId);
  console.log(`Connectés: ${connectedPeers.size} pairs`);
});

// Obtenir la liste des pairs actuels
console.log('Pairs:', room.getPeers());
```

### Gérer les reconnexions

```javascript
let reconnectInterval;

room.onPeerLeave(peerId => {
  console.log('Pair perdu, tentative de reconnexion...');

  // Attendre avant de tenter de renvoyer l'état
  clearTimeout(reconnectInterval);
  reconnectInterval = setTimeout(() => {
    if (room.getPeers().length > 0) {
      sendState(currentState);
    }
  }, 5000);
});
```

---

## 🧩 Cas d'Usage Complet

### Application de Chat P2P

```html
<!DOCTYPE html>
<html>
<head>
  <title>Chat P2P</title>
  <script type="module">
    import { joinRoom } from 'https://cdn.skypack.dev/trystero';

    const room = joinRoom({ appId: 'p2p-chat' }, 'general');
    const [sendMsg, onMsg] = room.makeAction('message');

    const messagesEl = document.getElementById('messages');
    const inputEl = document.getElementById('input');
    const sendBtn = document.getElementById('send');

    // Recevoir des messages
    onMsg((msg, peerId) => {
      const li = document.createElement('li');
      li.textContent = `${peerId}: ${msg}`;
      messagesEl.appendChild(li);
    });

    // Envoyer un message
    sendBtn.onclick = () => {
      const msg = inputEl.value;
      sendMsg(msg);

      // Afficher localement
      const li = document.createElement('li');
      li.textContent = `Moi: ${msg}`;
      messagesEl.appendChild(li);

      inputEl.value = '';
    };

    // Notification de pair
    room.onPeerJoin(id => {
      const li = document.createElement('li');
      li.textContent = `→ ${id} a rejoint`;
      li.style.color = 'green';
      messagesEl.appendChild(li);
    });

    room.onPeerLeave(id => {
      const li = document.createElement('li');
      li.textContent = `← ${id} est parti`;
      li.style.color = 'red';
      messagesEl.appendChild(li);
    });
  </script>
</head>
<body>
  <h1>💬 Chat P2P</h1>
  <ul id="messages"></ul>
  <input id="input" type="text" placeholder="Message...">
  <button id="send">Envoyer</button>
</body>
</html>
```

---

## ⚠️ Limites et Considérations

### ❌ Limitations

1. **Traversée NAT** : Peut échouer dans certains réseaux d'entreprise
2. **Pas de garantie de livraison** : Messages peuvent être perdus
3. **Scalabilité** : P2P full-mesh difficile avec >10 pairs
4. **Signaling nécessaire** : Besoin d'un serveur pour découverte initiale

### ✅ Solutions

- **TURN servers** : Relais pour NAT difficile
- **Accusés de réception** : Confirmer la réception
- **Topologies** : Star, tree, gossip pour >10 pairs
- **Services tiers** : Trystero, PeerJS, Gun.js

---

## 🎯 Résumé

### Concepts clés

- **WebRTC** = communication temps réel navigateur-à-navigateur
- **Trystero** = API simplifiée pour P2P
- **Rooms** = groupes de pairs
- **Actions** = canaux de communication typés

### Flux typique

1. Rejoindre une room (`joinRoom`)
2. Créer des actions (`makeAction`)
3. Écouter les pairs (`onPeerJoin`, `onPeerLeave`)
4. Envoyer/recevoir des messages
5. Synchroniser les CRDTs

---

**Prochaine étape : katas.md**
