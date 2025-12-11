# 💬 Micro-Project 3 : Chat P2P

**Durée estimée :** 90-120 minutes
**Modules combinés :** Sync P2P + IndexedDB + Offline UX
**Niveau :** ⭐⭐⭐ Avancé

---

## 🎯 Objectif

Créer un chat peer-to-peer qui fonctionne sans serveur, avec persistence locale et indicateurs de connexion.

---

## 📋 Fonctionnalités

- [ ] Chat temps réel via WebRTC (Trystero)
- [ ] Historique persistant (IndexedDB)
- [ ] Indicateur de connexion (online/offline)
- [ ] Liste des pairs connectés
- [ ] Notifications de join/leave
- [ ] Interface claire et responsive

---

## 🏗️ Architecture

```
ChatApp
  ├─ Trystero (P2P communication)
  ├─ IndexedDB (historique messages)
  ├─ UI (interface chat)
  └─ Status (indicateurs pairs)
```

---

## 🚀 Template de Démarrage

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Chat P2P</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .header {
      background: #007bff;
      color: white;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .peers-count {
      background: rgba(255,255,255,0.2);
      padding: 5px 10px;
      border-radius: 20px;
    }
    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .message {
      margin: 10px 0;
      padding: 10px;
      background: white;
      border-radius: 8px;
      max-width: 70%;
    }
    .message.mine {
      margin-left: auto;
      background: #007bff;
      color: white;
    }
    .message .author {
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
    }
    .message.mine .author {
      color: rgba(255,255,255,0.7);
    }
    .system-message {
      text-align: center;
      color: #999;
      font-size: 14px;
      margin: 10px 0;
    }
    .input-area {
      padding: 15px;
      background: white;
      border-top: 1px solid #ddd;
      display: flex;
      gap: 10px;
    }
    .input-area input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 20px;
    }
    .input-area button {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h2 style="margin: 0;">💬 Chat P2P</h2>
      <div id="room-name" style="font-size: 14px; opacity: 0.8;"></div>
    </div>
    <div class="peers-count" id="peers-count">
      👥 0 connectés
    </div>
  </div>

  <div id="messages" class="messages"></div>

  <div class="input-area">
    <input type="text" id="message-input" placeholder="Votre message...">
    <button id="send-btn">Envoyer</button>
  </div>

  <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 📝 Structure de Code

### Configuration Trystero

```javascript
import { joinRoom } from 'https://cdn.skypack.dev/trystero';

const roomName = 'general-chat'; // Ou prompt utilisateur
const clientId = `user-${Math.random().toString(36).substr(2, 9)}`;

const room = joinRoom({ appId: 'p2p-chat-app' }, roomName);
const [sendMessage, onMessage] = room.makeAction('message');

// État
let connectedPeers = new Set();
const messages = [];

// Écouter les pairs
room.onPeerJoin(peerId => {
  connectedPeers.add(peerId);
  addSystemMessage(`${peerId} a rejoint le chat`);
  updatePeersCount();
});

room.onPeerLeave(peerId => {
  connectedPeers.delete(peerId);
  addSystemMessage(`${peerId} a quitté le chat`);
  updatePeersCount();
});

// Écouter les messages
onMessage((data, peerId) => {
  addMessage(data.author, data.text, false);
});
```

### Persistance IndexedDB

```javascript
class ChatDB {
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('p2p-chat', 1);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  async saveMessage(message) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['messages'], 'readwrite');
      const store = tx.objectStore('messages');
      const request = store.add(message);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async loadMessages() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['messages'], 'readonly');
      const store = tx.objectStore('messages');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
```

### UI Functions

```javascript
function addMessage(author, text, isMine) {
  const message = {
    author,
    text,
    timestamp: Date.now(),
    isMine
  };

  messages.push(message);
  chatDB.saveMessage(message);

  const messagesDiv = document.getElementById('messages');
  const messageEl = document.createElement('div');
  messageEl.className = `message ${isMine ? 'mine' : ''}`;
  messageEl.innerHTML = `
    <div class="author">${author}</div>
    <div>${text}</div>
  `;

  messagesDiv.appendChild(messageEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addSystemMessage(text) {
  const messagesDiv = document.getElementById('messages');
  const messageEl = document.createElement('div');
  messageEl.className = 'system-message';
  messageEl.textContent = text;

  messagesDiv.appendChild(messageEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function updatePeersCount() {
  document.getElementById('peers-count').textContent =
    `👥 ${connectedPeers.size} connecté${connectedPeers.size > 1 ? 's' : ''}`;
}
```

### Envoi de Message

```javascript
document.getElementById('send-btn').onclick = () => {
  const input = document.getElementById('message-input');
  const text = input.value.trim();

  if (!text) return;

  const message = {
    author: clientId,
    text
  };

  // Envoyer aux pairs
  sendMessage(message);

  // Afficher localement
  addMessage(clientId, text, true);

  input.value = '';
};

// Envoyer avec Enter
document.getElementById('message-input').onkeypress = (e) => {
  if (e.key === 'Enter') {
    document.getElementById('send-btn').click();
  }
};
```

---

## 🎯 Étapes de Développement

1. **Setup Trystero** (15 min) : Rejoindre room, écouter pairs
2. **UI Messages** (20 min) : Afficher messages, système
3. **IndexedDB** (20 min) : Sauvegarder/charger historique
4. **Envoi Messages** (15 min) : Input, envoi P2P
5. **Polish** (20 min) : CSS, notifications, compteur pairs

---

## ✅ Critères de Réussite

- Deux onglets peuvent chatter en temps réel
- L'historique persiste après rechargement
- Les notifications de join/leave sont visibles
- Le compteur de pairs est correct
- Interface claire et agréable

---

## 🎉 Challenge Bonus

### Fonctionnalités Avancées

1. **Pseudonyme** : Demander un pseudo au lieu d'ID aléatoire
2. **Rooms multiples** : Sélectionner différentes salles
3. **Typing indicator** : "X est en train d'écrire..."
4. **Horodatage** : Afficher l'heure de chaque message
5. **Markdown** : Support du formatage (gras, italique)

---

## 🐛 Debugging

**Tester avec 2 onglets :**
1. Ouvrir l'app dans un onglet
2. Dupliquer l'onglet (Ctrl+Shift+T ou Cmd+Shift+T)
3. Vérifier que les deux instances se voient
4. Envoyer des messages dans chaque direction

**Vérifier IndexedDB :**
- DevTools → Application → IndexedDB → p2p-chat
- Voir les messages sauvegardés

---

**Bon code ! 🚀**
