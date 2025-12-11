# 🎨 Offline-First UX

## 📋 Vue d'ensemble

Une bonne **UX offline-first** communique clairement l'état de l'application à l'utilisateur. L'objectif est de rendre le mode déconnecté invisible ou au moins compréhensible.

### 🎯 Objectifs

- Détecter l'état de connexion
- Afficher des indicateurs visuels clairs
- Gérer les états de synchronisation
- Implémenter des changements optimistes
- Créer une UI résiliente

---

## 🤔 Principes de l'Offline-First UX

### 1. **Optimistic UI** (UI Optimiste)

Appliquer les changements immédiatement, synchroniser en arrière-plan.

```
Mauvaise UX :
User clique → Attente → Serveur répond → Affichage
(latence visible)

Bonne UX :
User clique → Affichage immédiat → Sync arrière-plan
(instantané)
```

### 2. **États Clairs**

L'utilisateur doit toujours savoir :
- ✅ Suis-je connecté ou déconnecté ?
- ✅ Mes changements sont-ils sauvegardés ?
- ✅ Y a-t-il des erreurs ?

### 3. **Feedback Visuel**

Utiliser des indicateurs :
- 🟢 Connecté et synchronisé
- 🟡 Déconnecté (changements locaux)
- 🔴 Erreur de synchronisation

---

## 🌐 Détecter la Connexion

### API Navigator Online

```javascript
// État actuel
if (navigator.onLine) {
  console.log('Connecté à Internet');
} else {
  console.log('Déconnecté');
}

// Écouter les changements
window.addEventListener('online', () => {
  console.log('Connexion restaurée');
});

window.addEventListener('offline', () => {
  console.log('Connexion perdue');
});
```

**⚠️ Attention :** `navigator.onLine` détecte seulement la connexion au réseau local, pas Internet.

### Vérification Réelle (Ping)

```javascript
async function checkRealConnection() {
  try {
    const response = await fetch('/api/ping', {
      method: 'HEAD',
      cache: 'no-cache'
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Vérifier périodiquement
setInterval(async () => {
  const isOnline = await checkRealConnection();
  updateConnectionStatus(isOnline);
}, 30000); // Toutes les 30s
```

---

## 📊 États de Synchronisation

### Les 4 États

1. **Synced** 🟢 : Tout est synchronisé
2. **Pending** 🟡 : Changements locaux en attente
3. **Syncing** 🔵 : Synchronisation en cours
4. **Error** 🔴 : Erreur de synchronisation

### Gestion d'État

```javascript
class SyncStatus {
  constructor() {
    this.state = 'synced';
    this.listeners = [];
  }

  setState(newState) {
    this.state = newState;
    this.listeners.forEach(fn => fn(newState));
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  getState() {
    return this.state;
  }
}

// Utilisation
const syncStatus = new SyncStatus();

syncStatus.onChange(state => {
  console.log('État de sync:', state);
  updateUI(state);
});

// Changer l'état
syncStatus.setState('pending');
```

---

## 🎨 Indicateurs Visuels

### 1. Badge de Statut

```html
<div id="status-badge" class="badge">
  <span id="status-icon">🟢</span>
  <span id="status-text">Synchronisé</span>
</div>

<style>
.badge {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge.offline {
  background: #fff3cd;
}

.badge.error {
  background: #f8d7da;
}

.badge.syncing {
  background: #d1ecf1;
}
</style>

<script>
function updateStatusBadge(status) {
  const badge = document.getElementById('status-badge');
  const icon = document.getElementById('status-icon');
  const text = document.getElementById('status-text');

  badge.className = 'badge';

  switch (status) {
    case 'synced':
      icon.textContent = '🟢';
      text.textContent = 'Synchronisé';
      break;
    case 'pending':
      icon.textContent = '🟡';
      text.textContent = 'Changements locaux';
      badge.classList.add('offline');
      break;
    case 'syncing':
      icon.textContent = '🔵';
      text.textContent = 'Synchronisation...';
      badge.classList.add('syncing');
      break;
    case 'error':
      icon.textContent = '🔴';
      text.textContent = 'Erreur de sync';
      badge.classList.add('error');
      break;
  }
}
</script>
```

### 2. Barre de Connexion

```html
<div id="connection-bar" class="connection-bar hidden">
  ⚠️ Vous êtes déconnecté. Les changements seront synchronisés à la reconnexion.
</div>

<style>
.connection-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: #ff9800;
  color: white;
  text-align: center;
  font-weight: bold;
  transform: translateY(0);
  transition: transform 0.3s;
}

.connection-bar.hidden {
  transform: translateY(-100%);
}
</style>

<script>
window.addEventListener('offline', () => {
  document.getElementById('connection-bar').classList.remove('hidden');
});

window.addEventListener('online', () => {
  document.getElementById('connection-bar').classList.add('hidden');
});
</script>
```

### 3. Icônes par Item

```html
<ul id="todo-list">
  <li data-status="synced">
    <span>Tâche 1</span>
    <span class="sync-icon">✓</span>
  </li>
  <li data-status="pending">
    <span>Tâche 2</span>
    <span class="sync-icon">⏳</span>
  </li>
  <li data-status="error">
    <span>Tâche 3</span>
    <span class="sync-icon">⚠️</span>
  </li>
</ul>

<style>
li[data-status="synced"] .sync-icon::before {
  content: "✓";
  color: green;
}

li[data-status="pending"] .sync-icon::before {
  content: "⏳";
  color: orange;
}

li[data-status="error"] .sync-icon::before {
  content: "⚠️";
  color: red;
}
</style>
```

---

## ⚡ Optimistic UI

### Principe

Appliquer immédiatement les changements dans l'UI, puis synchroniser en arrière-plan.

### Implémentation

```javascript
class OptimisticTodoApp {
  constructor() {
    this.todos = [];
    this.pendingChanges = [];
    this.syncStatus = new SyncStatus();
  }

  async addTodo(text) {
    // 1. Créer un ID temporaire
    const tempId = `temp-${Date.now()}`;
    const todo = { id: tempId, text, status: 'pending' };

    // 2. Ajouter immédiatement à l'UI
    this.todos.push(todo);
    this.renderTodos();

    // 3. Marquer comme pending
    this.syncStatus.setState('pending');
    this.pendingChanges.push({ type: 'add', todo });

    // 4. Synchroniser en arrière-plan
    try {
      const realId = await this.syncToServer({ type: 'add', data: todo });

      // Remplacer l'ID temporaire
      todo.id = realId;
      todo.status = 'synced';
      this.renderTodos();

      // Retirer des pending
      this.pendingChanges = this.pendingChanges.filter(c => c.todo.id !== tempId);

      if (this.pendingChanges.length === 0) {
        this.syncStatus.setState('synced');
      }
    } catch (error) {
      // Marquer comme erreur
      todo.status = 'error';
      this.renderTodos();
      this.syncStatus.setState('error');
    }
  }

  async syncToServer(change) {
    // Simuler une requête réseau
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (navigator.onLine) {
          resolve(`real-${Math.random()}`);
        } else {
          reject(new Error('Offline'));
        }
      }, 1000);
    });
  }

  renderTodos() {
    const list = document.getElementById('todo-list');
    list.innerHTML = this.todos.map(todo => `
      <li data-status="${todo.status}">
        <span>${todo.text}</span>
        <span class="sync-icon"></span>
      </li>
    `).join('');
  }
}
```

---

## 🔄 Queue de Synchronisation

Gérer les opérations en attente de synchronisation.

```javascript
class SyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  add(operation) {
    this.queue.push(operation);
    this.process();
  }

  async process() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    while (this.queue.length > 0) {
      const operation = this.queue[0];

      try {
        await this.executeOperation(operation);
        this.queue.shift(); // Retirer de la queue
      } catch (error) {
        console.error('Sync failed:', error);
        // Réessayer plus tard
        await this.wait(5000);
      }
    }

    this.processing = false;
  }

  async executeOperation(operation) {
    // Envoyer au serveur ou P2P
    const response = await fetch('/api/sync', {
      method: 'POST',
      body: JSON.stringify(operation)
    });

    if (!response.ok) throw new Error('Sync failed');
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Utilisation
const syncQueue = new SyncQueue();

// Ajouter des opérations
syncQueue.add({ type: 'create', data: { ... } });
syncQueue.add({ type: 'update', data: { ... } });

// Relancer la sync lors de la reconnexion
window.addEventListener('online', () => {
  syncQueue.process();
});
```

---

## 📝 Patterns UX Recommandés

### 1. **Toast Notifications**

```javascript
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Utilisation
window.addEventListener('online', () => {
  showToast('Connexion restaurée. Synchronisation...', 'success');
});

window.addEventListener('offline', () => {
  showToast('Mode hors ligne. Vos changements seront sauvegardés localement.', 'warning');
});
```

### 2. **Spinner de Sync**

```html
<button id="save-btn">
  <span class="btn-text">Sauvegarder</span>
  <span class="spinner hidden">⏳</span>
</button>

<script>
async function saveWithSpinner() {
  const btn = document.getElementById('save-btn');
  const text = btn.querySelector('.btn-text');
  const spinner = btn.querySelector('.spinner');

  btn.disabled = true;
  text.classList.add('hidden');
  spinner.classList.remove('hidden');

  try {
    await save();
    showToast('Sauvegardé!', 'success');
  } catch (error) {
    showToast('Erreur de sauvegarde', 'error');
  } finally {
    btn.disabled = false;
    text.classList.remove('hidden');
    spinner.classList.add('hidden');
  }
}
</script>
```

### 3. **Dernière Synchronisation**

```html
<div id="last-sync">
  Dernière sync : <span id="last-sync-time">jamais</span>
</div>

<script>
function updateLastSyncTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('last-sync-time').textContent = timeString;
}

// Après chaque sync réussie
syncQueue.onSuccess(() => {
  updateLastSyncTime();
});
</script>
```

---

## 🧩 Exemple Complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Offline-First App</title>
  <style>
    body { font-family: Arial; max-width: 600px; margin: 50px auto; }
    .status-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 10px;
      text-align: center;
      font-weight: bold;
    }
    .status-bar.online { background: #d4edda; color: #155724; }
    .status-bar.offline { background: #fff3cd; color: #856404; }
    .todo-item { padding: 10px; border-bottom: 1px solid #ccc; }
    .sync-badge { float: right; font-size: 12px; }
  </style>
</head>
<body>
  <div id="status-bar" class="status-bar online">
    🟢 Connecté et synchronisé
  </div>

  <div style="margin-top: 60px;">
    <h1>📝 Todo List Offline-First</h1>

    <input type="text" id="todo-input" placeholder="Nouvelle tâche...">
    <button id="add-btn">Ajouter</button>

    <div id="todo-list"></div>
  </div>

  <script type="module">
    class OfflineFirstApp {
      constructor() {
        this.todos = [];
        this.isOnline = navigator.onLine;

        this.setupEventListeners();
        this.updateStatusBar();
      }

      setupEventListeners() {
        window.addEventListener('online', () => {
          this.isOnline = true;
          this.updateStatusBar();
          this.syncPendingChanges();
        });

        window.addEventListener('offline', () => {
          this.isOnline = false;
          this.updateStatusBar();
        });

        document.getElementById('add-btn').onclick = () => this.addTodo();
      }

      updateStatusBar() {
        const bar = document.getElementById('status-bar');
        bar.className = 'status-bar ' + (this.isOnline ? 'online' : 'offline');
        bar.textContent = this.isOnline
          ? '🟢 Connecté et synchronisé'
          : '🟡 Hors ligne - Changements locaux';
      }

      addTodo() {
        const input = document.getElementById('todo-input');
        const text = input.value.trim();
        if (!text) return;

        const todo = {
          id: `temp-${Date.now()}`,
          text,
          status: 'pending',
          timestamp: Date.now()
        };

        // Ajout optimiste
        this.todos.push(todo);
        this.render();
        input.value = '';

        // Sync en arrière-plan
        this.syncTodo(todo);
      }

      async syncTodo(todo) {
        try {
          // Simuler une requête réseau
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              if (this.isOnline) {
                resolve();
              } else {
                reject(new Error('Offline'));
              }
            }, 500);
          });

          // Marquer comme synced
          todo.status = 'synced';
          this.render();
        } catch (error) {
          todo.status = 'error';
          this.render();
        }
      }

      async syncPendingChanges() {
        const pending = this.todos.filter(t => t.status === 'pending' || t.status === 'error');
        for (const todo of pending) {
          await this.syncTodo(todo);
        }
      }

      render() {
        const list = document.getElementById('todo-list');
        list.innerHTML = this.todos.map(todo => {
          let badge = '';
          switch (todo.status) {
            case 'synced': badge = '✓ Sync'; break;
            case 'pending': badge = '⏳ Pending'; break;
            case 'error': badge = '⚠️ Error'; break;
          }

          return `
            <div class="todo-item">
              ${todo.text}
              <span class="sync-badge">${badge}</span>
            </div>
          `;
        }).join('');
      }
    }

    const app = new OfflineFirstApp();
  </script>
</body>
</html>
```

---

## 🎯 Résumé

### Principes clés

- **Optimistic UI** : Afficher immédiatement, synchroniser ensuite
- **États clairs** : Toujours montrer l'état de connexion/sync
- **Feedback visuel** : Badges, toasts, spinners
- **Queue de sync** : Gérer les opérations en attente

### Checklist UX Offline-First

- [ ] Indicateur de connexion visible
- [ ] État de synchronisation clair
- [ ] Changements optimistes
- [ ] Queue de synchronisation
- [ ] Gestion des erreurs
- [ ] Feedback visuel instantané
- [ ] Dernière synchronisation affichée

---

**Prochaine étape : katas.md**
