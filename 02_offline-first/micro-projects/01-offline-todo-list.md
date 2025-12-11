# 📝 Micro-Project 1 : Todo List Offline

**Durée estimée :** 60-90 minutes
**Modules combinés :** Persistance Locale + Offline UX
**Niveau :** ⭐⭐ Intermédiaire

---

## 🎯 Objectif

Créer une todo list qui persiste localement avec IndexedDB et affiche clairement l'état de synchronisation.

---

## 📋 Fonctionnalités

### Obligatoires

- [ ] Ajouter des todos
- [ ] Marquer comme complété
- [ ] Supprimer des todos
- [ ] Persistence avec IndexedDB
- [ ] Interface qui affiche l'état de sauvegarde (🟢 Sauvegardé / 🟡 En attente)

### Bonus

- [ ] Filtrer (Tous / Actifs / Complétés)
- [ ] Compteur de todos
- [ ] Édition en double-clic
- [ ] Effacer tous les complétés

---

## 🏗️ Architecture

```
TodoApp
  ├─ IndexedDB (stockage)
  ├─ UI (affichage)
  └─ Status (indicateurs visuels)
```

---

## 💡 Conseils

1. **Commencez par** la classe IndexedDB (helper ou wrapper Promises)
2. **Ensuite** créez l'UI HTML/CSS
3. **Ajoutez** les interactions (add, toggle, delete)
4. **Terminez** par les indicateurs de statut

---

## ✅ Critères de Réussite

- Les todos persistent après rechargement de la page
- L'utilisateur voit clairement quand une todo est sauvegardée
- Toutes les opérations CRUD fonctionnent
- Interface claire et responsive

---

## 🎨 Wireframe

```
┌──────────────────────────────────────┐
│  📝 Todo List Offline      🟢 Sauvé │
├──────────────────────────────────────┤
│  [___________________________] Ajouter│
│                                      │
│  ☐ Apprendre IndexedDB         [×]  │
│  ☑ Faire les katas             [×]  │
│  ☐ Créer mon projet            [×]  │
│                                      │
│  3 todos - 1 complété               │
└──────────────────────────────────────┘
```

---

## 📝 Template HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Todo Offline</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .status-badge {
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 14px;
    }
    .status-saved { background: #d4edda; color: #155724; }
    .status-pending { background: #fff3cd; color: #856404; }
    .todo-input {
      width: 80%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .add-btn {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .todo-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
    }
    .todo-item input[type="checkbox"] {
      margin-right: 10px;
    }
    .todo-text {
      flex: 1;
    }
    .todo-text.completed {
      text-decoration: line-through;
      color: #999;
    }
    .delete-btn {
      background: #dc3545;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📝 Todo List Offline</h1>
    <span id="status-badge" class="status-badge status-saved">🟢 Sauvegardé</span>
  </div>

  <div style="margin: 20px 0;">
    <input type="text" id="todo-input" class="todo-input" placeholder="Nouvelle tâche...">
    <button id="add-btn" class="add-btn">Ajouter</button>
  </div>

  <div id="todo-list"></div>

  <div id="stats" style="margin-top: 20px; color: #666;"></div>

  <script src="app.js"></script>
</body>
</html>
```

---

## 🚀 Étapes de Développement

### Étape 1 : Classe IndexedDB (20 min)

```javascript
class TodoDB {
  constructor() {
    this.db = null;
  }

  async init() {
    // Ouvrir la DB, créer le store
  }

  async addTodo(todo) {
    // Ajouter une todo
  }

  async getAllTodos() {
    // Récupérer toutes les todos
  }

  async updateTodo(id, updates) {
    // Mettre à jour une todo
  }

  async deleteTodo(id) {
    // Supprimer une todo
  }
}
```

### Étape 2 : UI et Interactions (30 min)

```javascript
class TodoApp {
  constructor() {
    this.db = new TodoDB();
    this.todos = [];
  }

  async init() {
    await this.db.init();
    await this.loadTodos();
    this.setupEventListeners();
    this.render();
  }

  async addTodo() {
    // Ajouter une todo
  }

  async toggleTodo(id) {
    // Basculer done
  }

  async deleteTodo(id) {
    // Supprimer
  }

  render() {
    // Afficher les todos
  }
}

const app = new TodoApp();
app.init();
```

### Étape 3 : Indicateurs de Statut (10 min)

```javascript
updateStatusBadge(status) {
  const badge = document.getElementById('status-badge');
  if (status === 'saved') {
    badge.textContent = '🟢 Sauvegardé';
    badge.className = 'status-badge status-saved';
  } else {
    badge.textContent = '🟡 En attente';
    badge.className = 'status-badge status-pending';
  }
}
```

---

## 🎉 Challenge Bonus

Ajoutez une **fonctionnalité de recherche** qui filtre les todos en temps réel pendant la saisie.

---

**Bon code ! 🚀**
