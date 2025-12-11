# 💾 Persistance Locale avec IndexedDB

## 📋 Vue d'ensemble

**IndexedDB** est une API de bas niveau pour stocker de grandes quantités de données structurées côté client, y compris des fichiers et des blobs. Elle offre une base de données NoSQL directement dans le navigateur.

### 🎯 Objectifs d'apprentissage

- Comprendre les concepts fondamentaux d'IndexedDB
- Créer et gérer des bases de données locales
- Effectuer des opérations CRUD (Create, Read, Update, Delete)
- Utiliser les transactions et les indexes
- Gérer les erreurs et les migrations

---

## 🤔 Pourquoi IndexedDB ?

### Comparaison des options de stockage

| Technologie | Capacité | Type de données | Cas d'usage |
|-------------|----------|-----------------|-------------|
| **localStorage** | ~5-10 MB | Strings uniquement | Préférences simples |
| **sessionStorage** | ~5-10 MB | Strings uniquement | Données temporaires |
| **IndexedDB** | ~50 MB - illimité* | Objects, Blobs, Files | Applications complexes |
| **OPFS** | ~Illimité* | Fichiers binaires | Médias, documents |

*Selon le navigateur et les permissions utilisateur

### ✅ Avantages d'IndexedDB

- **Asynchrone** : N'bloque pas le thread principal
- **Transactionnel** : Garantit l'intégrité des données
- **Indexé** : Recherches rapides par clés ou indexes
- **Grande capacité** : Plusieurs gigaoctets possibles
- **Types riches** : Objets JavaScript, pas seulement des strings

### ❌ Inconvénients

- **API complexe** : Courbe d'apprentissage abrupte
- **Verbosité** : Beaucoup de code pour des opérations simples
- **Asynchrone** : Gestion de callbacks ou promesses
- **Pas de requêtes SQL** : NoSQL uniquement

---

## 🏗️ Architecture d'IndexedDB

### Hiérarchie des concepts

```
Database (ma-todo-app)
  │
  ├─ Object Store (todos)
  │    │
  │    ├─ Record 1: { id: 1, text: "...", done: false }
  │    ├─ Record 2: { id: 2, text: "...", done: true }
  │    └─ Record 3: { id: 3, text: "...", done: false }
  │
  └─ Object Store (tags)
       │
       ├─ Record 1: { id: 1, name: "urgent" }
       └─ Record 2: { id: 2, name: "personnel" }
```

### 📚 Concepts clés

1. **Database** : Conteneur principal (ex: `"ma-todo-app"`)
2. **Object Store** : Collection d'enregistrements (≈ table SQL)
3. **Record** : Objet JavaScript avec une clé unique
4. **Transaction** : Groupe d'opérations atomiques
5. **Index** : Accès rapide par propriété non-clé
6. **Cursor** : Itération sur plusieurs enregistrements

---

## 🚀 Premiers Pas : Ouvrir une Base de Données

### Code de base

```javascript
// Ouvrir (ou créer) une database
const request = indexedDB.open('ma-todo-app', 1);
//                                ↑            ↑
//                            nom de la DB   version

// Gestion des événements
request.onerror = (event) => {
  console.error('Erreur DB:', event.target.error);
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('DB ouverte avec succès', db);
};

request.onupgradeneeded = (event) => {
  // Appelé lors de la création ou mise à jour
  const db = event.target.result;

  // Créer un object store
  const objectStore = db.createObjectStore('todos', {
    keyPath: 'id',      // Clé primaire
    autoIncrement: true  // Auto-génération des IDs
  });

  console.log('Object store créé');
};
```

### 🔑 Comprendre les événements

- **`onupgradeneeded`** : Déclenché si la version change (création ou migration)
- **`onsuccess`** : Base ouverte avec succès
- **`onerror`** : Problème lors de l'ouverture

---

## 🛠️ Créer un Object Store

### Avec keyPath (clé dans l'objet)

```javascript
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // La clé est une propriété de l'objet
  const store = db.createObjectStore('todos', { keyPath: 'id' });

  // Les objets auront : { id: 1, text: "...", done: false }
};
```

### Avec autoIncrement (clé générée)

```javascript
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // IndexedDB génère automatiquement les IDs
  const store = db.createObjectStore('todos', {
    autoIncrement: true
  });

  // Les objets peuvent être : { text: "...", done: false }
  // La clé est stockée séparément
};
```

### Avec keyPath externe (out-of-line keys)

```javascript
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Pas de keyPath : vous fournissez la clé manuellement
  const store = db.createObjectStore('todos');

  // Ajout avec clé explicite : store.add(objet, clé)
};
```

---

## 🔍 Créer des Index

Les **index** permettent de chercher par n'importe quelle propriété, pas seulement la clé primaire.

```javascript
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore('todos', { keyPath: 'id' });

  // Index pour rechercher par "done" (true/false)
  store.createIndex('done', 'done', { unique: false });

  // Index pour rechercher par "category"
  store.createIndex('category', 'category', { unique: false });

  // Index unique pour rechercher par email (pas de doublons)
  store.createIndex('email', 'email', { unique: true });
};
```

**Paramètres :**
- 1er argument : Nom de l'index
- 2ème argument : Propriété à indexer (keyPath)
- 3ème argument : Options (`unique`, `multiEntry`)

---

## ✍️ Opérations CRUD

### 📝 CREATE : Ajouter des données

```javascript
function addTodo(db, todo) {
  // 1. Créer une transaction en mode "readwrite"
  const transaction = db.transaction(['todos'], 'readwrite');

  // 2. Accéder à l'object store
  const store = transaction.objectStore('todos');

  // 3. Ajouter l'objet
  const request = store.add(todo);

  // 4. Gérer le résultat
  request.onsuccess = () => {
    console.log('Todo ajouté avec la clé:', request.result);
  };

  request.onerror = () => {
    console.error('Erreur ajout:', request.error);
  };
}

// Utilisation
addTodo(db, { text: 'Apprendre IndexedDB', done: false });
```

### 📖 READ : Lire des données

#### Lire par clé primaire

```javascript
function getTodoById(db, id) {
  const transaction = db.transaction(['todos'], 'readonly');
  const store = transaction.objectStore('todos');
  const request = store.get(id);

  request.onsuccess = () => {
    if (request.result) {
      console.log('Todo trouvé:', request.result);
    } else {
      console.log('Aucun todo avec cet ID');
    }
  };
}

// Utilisation
getTodoById(db, 1);
```

#### Lire tous les enregistrements

```javascript
function getAllTodos(db) {
  const transaction = db.transaction(['todos'], 'readonly');
  const store = transaction.objectStore('todos');
  const request = store.getAll();

  request.onsuccess = () => {
    console.log('Tous les todos:', request.result);
  };
}
```

#### Lire avec un index

```javascript
function getTodosByStatus(db, done) {
  const transaction = db.transaction(['todos'], 'readonly');
  const store = transaction.objectStore('todos');
  const index = store.index('done'); // Utiliser l'index
  const request = index.getAll(done); // Chercher par valeur

  request.onsuccess = () => {
    console.log(`Todos ${done ? 'terminés' : 'en cours'}:`, request.result);
  };
}

// Utilisation
getTodosByStatus(db, false); // Tous les todos non terminés
```

### 🔄 UPDATE : Mettre à jour des données

```javascript
function updateTodo(db, id, updates) {
  const transaction = db.transaction(['todos'], 'readwrite');
  const store = transaction.objectStore('todos');

  // 1. Lire l'enregistrement existant
  const getRequest = store.get(id);

  getRequest.onsuccess = () => {
    const todo = getRequest.result;

    if (!todo) {
      console.log('Todo inexistant');
      return;
    }

    // 2. Modifier les propriétés
    Object.assign(todo, updates);

    // 3. Sauvegarder avec put()
    const putRequest = store.put(todo);

    putRequest.onsuccess = () => {
      console.log('Todo mis à jour:', todo);
    };
  };
}

// Utilisation
updateTodo(db, 1, { done: true });
```

**Différence `add()` vs `put()` :**
- **`add()`** : Échoue si la clé existe déjà
- **`put()`** : Remplace si la clé existe, crée sinon (upsert)

### 🗑️ DELETE : Supprimer des données

```javascript
function deleteTodo(db, id) {
  const transaction = db.transaction(['todos'], 'readwrite');
  const store = transaction.objectStore('todos');
  const request = store.delete(id);

  request.onsuccess = () => {
    console.log('Todo supprimé');
  };
}

// Utilisation
deleteTodo(db, 1);
```

#### Supprimer tous les enregistrements

```javascript
function deleteAllTodos(db) {
  const transaction = db.transaction(['todos'], 'readwrite');
  const store = transaction.objectStore('todos');
  const request = store.clear(); // Vide complètement le store

  request.onsuccess = () => {
    console.log('Tous les todos supprimés');
  };
}
```

---

## 🔄 Utiliser les Cursors

Les **cursors** permettent d'itérer sur plusieurs enregistrements.

### Parcourir tous les enregistrements

```javascript
function iterateAllTodos(db) {
  const transaction = db.transaction(['todos'], 'readonly');
  const store = transaction.objectStore('todos');
  const request = store.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;

    if (cursor) {
      console.log('Todo:', cursor.value);
      console.log('Clé:', cursor.key);

      // Passer au suivant
      cursor.continue();
    } else {
      console.log('Fin de l\'itération');
    }
  };
}
```

### Modifier pendant l'itération

```javascript
function markAllAsDone(db) {
  const transaction = db.transaction(['todos'], 'readwrite');
  const store = transaction.objectStore('todos');
  const request = store.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;

    if (cursor) {
      const todo = cursor.value;
      todo.done = true;

      // Mettre à jour l'enregistrement actuel
      cursor.update(todo);

      cursor.continue();
    }
  };
}
```

---

## 🔒 Transactions et Modes

### Les 3 modes de transaction

```javascript
// 1. readonly : Lecture seule (par défaut)
const tx1 = db.transaction(['todos'], 'readonly');

// 2. readwrite : Lecture + écriture
const tx2 = db.transaction(['todos'], 'readwrite');

// 3. versionchange : Changement de structure (automatique dans onupgradeneeded)
```

### Transaction multi-stores

```javascript
// Accéder à plusieurs object stores dans une transaction
const transaction = db.transaction(['todos', 'tags'], 'readwrite');
const todosStore = transaction.objectStore('todos');
const tagsStore = transaction.objectStore('tags');

// Opérations atomiques sur les deux stores
todosStore.add({ text: 'Coder', tagId: 1 });
tagsStore.add({ id: 1, name: 'urgent' });

transaction.oncomplete = () => {
  console.log('Transaction réussie');
};

transaction.onerror = () => {
  console.error('Transaction échouée, rollback automatique');
};
```

---

## 🎁 Wrapper avec Promises

L'API native utilise des callbacks, mais on peut la wrapper en Promises.

```javascript
class IndexedDBHelper {
  constructor(dbName, version, upgradeCallback) {
    this.dbName = dbName;
    this.version = version;
    this.upgradeCallback = upgradeCallback;
    this.db = null;
  }

  // Ouvrir la DB
  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onupgradeneeded = (event) => {
        this.upgradeCallback(event.target.result);
      };
    });
  }

  // Ajouter un enregistrement
  async add(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Obtenir un enregistrement
  async get(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Obtenir tous les enregistrements
  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Mettre à jour un enregistrement
  async update(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Supprimer un enregistrement
  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// Utilisation
const dbHelper = new IndexedDBHelper('ma-todo-app', 1, (db) => {
  db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
});

await dbHelper.open();
await dbHelper.add('todos', { text: 'Apprendre IndexedDB', done: false });
const todos = await dbHelper.getAll('todos');
console.log(todos);
```

---

## 📊 Gestion des Versions et Migrations

### Incrémenter la version

```javascript
// Version 1 : Création initiale
indexedDB.open('ma-app', 1).onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore('todos', { keyPath: 'id' });
};

// Version 2 : Ajout d'un index
indexedDB.open('ma-app', 2).onupgradeneeded = (event) => {
  const db = event.target.result;
  const oldVersion = event.oldVersion;

  if (oldVersion < 1) {
    // Créer le store (si migration depuis version 0)
    db.createObjectStore('todos', { keyPath: 'id' });
  }

  if (oldVersion < 2) {
    // Ajouter l'index (migration 1 → 2)
    const tx = event.target.transaction;
    const store = tx.objectStore('todos');
    store.createIndex('done', 'done', { unique: false });
  }
};
```

### Migration de données

```javascript
indexedDB.open('ma-app', 3).onupgradeneeded = (event) => {
  const db = event.target.result;
  const oldVersion = event.oldVersion;

  if (oldVersion < 3) {
    // Ajouter une nouvelle propriété à tous les enregistrements
    const tx = event.target.transaction;
    const store = tx.objectStore('todos');

    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const todo = cursor.value;

        // Ajouter une propriété "createdAt" si absente
        if (!todo.createdAt) {
          todo.createdAt = new Date().toISOString();
          cursor.update(todo);
        }

        cursor.continue();
      }
    };
  }
};
```

---

## ⚠️ Gestion des Erreurs

### Erreurs courantes

```javascript
const request = indexedDB.open('ma-app', 1);

request.onerror = (event) => {
  const error = event.target.error;

  switch (error.name) {
    case 'QuotaExceededError':
      console.error('Quota de stockage dépassé');
      break;
    case 'VersionError':
      console.error('Version invalide');
      break;
    case 'AbortError':
      console.error('Transaction annulée');
      break;
    default:
      console.error('Erreur inconnue:', error);
  }
};

request.onblocked = () => {
  console.warn('Mise à jour bloquée : fermez les autres onglets');
};
```

### Vérifier le support

```javascript
if (!window.indexedDB) {
  console.error('IndexedDB non supporté par ce navigateur');
  // Fallback vers une autre solution
}
```

---

## 🧹 Bonnes Pratiques

### 1. Toujours fermer la DB quand elle n'est plus nécessaire

```javascript
db.close();
```

### 2. Utiliser des transactions courtes

```javascript
// ❌ Mauvais : transaction longue
const tx = db.transaction(['todos'], 'readwrite');
await doSomethingAsync(); // La transaction peut être fermée auto
tx.objectStore('todos').add(data); // Risque d'erreur

// ✅ Bon : tout dans la transaction
const tx = db.transaction(['todos'], 'readwrite');
tx.objectStore('todos').add(data);
```

### 3. Gérer les événements de transaction

```javascript
const transaction = db.transaction(['todos'], 'readwrite');

transaction.oncomplete = () => {
  console.log('Tout s\'est bien passé');
};

transaction.onerror = () => {
  console.error('Erreur, rollback automatique');
};

transaction.onabort = () => {
  console.warn('Transaction annulée');
};
```

### 4. Utiliser des indexes pour les recherches fréquentes

```javascript
// ❌ Lent : parcourir tous les enregistrements
function findByEmail(email) {
  const store = db.transaction(['users']).objectStore('users');
  store.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor && cursor.value.email === email) {
      console.log(cursor.value);
    }
    cursor?.continue();
  };
}

// ✅ Rapide : utiliser un index
function findByEmail(email) {
  const store = db.transaction(['users']).objectStore('users');
  const index = store.index('email');
  index.get(email).onsuccess = (event) => {
    console.log(event.target.result);
  };
}
```

---

## 🎯 Résumé

### Concepts clés à retenir

- **IndexedDB** = base de données NoSQL dans le navigateur
- **Asynchrone** : utiliser callbacks ou Promises
- **Transactionnel** : garantit l'intégrité des données
- **Object Stores** : collections d'objets (≈ tables)
- **Index** : accès rapide par propriétés
- **Cursors** : itération sur plusieurs enregistrements

### Flux de travail typique

1. Ouvrir la DB avec `indexedDB.open()`
2. Créer les object stores dans `onupgradeneeded`
3. Créer une transaction (`readonly` ou `readwrite`)
4. Accéder à l'object store
5. Effectuer l'opération (`add`, `get`, `put`, `delete`)
6. Gérer le résultat avec `onsuccess` / `onerror`

---

## 🔗 Ressources

- [MDN - IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [MDN - Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- [Can I Use - IndexedDB](https://caniuse.com/indexeddb)
- [Dexie.js](https://dexie.org/) - Wrapper moderne pour IndexedDB

---

**Prochaine étape :** Pratiquez avec les katas dans `katas.md` !
