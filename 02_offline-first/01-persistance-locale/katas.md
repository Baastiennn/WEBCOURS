# 🥋 Katas : Persistance Locale avec IndexedDB

## 📋 Instructions

Chaque kata est conçu pour renforcer votre compréhension d'IndexedDB. Progressez dans l'ordre :

1. **Débutant** ⭐ : Concepts de base
2. **Intermédiaire** ⭐⭐ : Opérations avancées
3. **Avancé** ⭐⭐⭐ : Cas complexes

**Testez votre code** dans la console du navigateur ou créez un fichier HTML.

---

## 🌱 Niveau Débutant

### Kata 1 : Ouvrir une Base de Données ⭐
**Objectif :** Ouvrir (ou créer) une base IndexedDB

**Consigne :**
Créez une fonction `openDatabase()` qui :
- Ouvre une base de données nommée `"my-first-db"`
- Version : `1`
- Affiche "DB ouverte" dans la console en cas de succès
- Affiche l'erreur en cas d'échec

<details>
<summary>💡 Indice</summary>

Utilisez `indexedDB.open(nom, version)` et gérez les événements `onsuccess` et `onerror`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function openDatabase() {
  const request = indexedDB.open('my-first-db', 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    console.log('DB ouverte', db);
  };

  request.onerror = (event) => {
    console.error('Erreur ouverture DB:', event.target.error);
  };
}

openDatabase();
```
</details>

---

### Kata 2 : Créer un Object Store ⭐
**Objectif :** Créer un object store lors de la création de la DB

**Consigne :**
Modifiez la fonction précédente pour créer un object store nommé `"books"` avec :
- `keyPath: "isbn"` (clé primaire)
- Lors de l'événement `onupgradeneeded`

<details>
<summary>💡 Indice</summary>

Utilisez `db.createObjectStore()` dans le handler `onupgradeneeded`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function openDatabase() {
  const request = indexedDB.open('my-first-db', 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const store = db.createObjectStore('books', { keyPath: 'isbn' });
    console.log('Object store "books" créé');
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    console.log('DB ouverte', db);
  };

  request.onerror = (event) => {
    console.error('Erreur:', event.target.error);
  };
}

openDatabase();
```
</details>

---

### Kata 3 : Ajouter un Enregistrement ⭐
**Objectif :** Ajouter un livre dans l'object store

**Consigne :**
Créez une fonction `addBook(db, book)` qui :
- Prend une instance de DB et un objet livre : `{ isbn: "123", title: "1984", author: "Orwell" }`
- Ajoute le livre dans le store `"books"`
- Affiche "Livre ajouté" en cas de succès

<details>
<summary>💡 Indice</summary>

Créez une transaction en mode `readwrite`, accédez au store avec `transaction.objectStore()`, puis utilisez `store.add()`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function addBook(db, book) {
  const transaction = db.transaction(['books'], 'readwrite');
  const store = transaction.objectStore('books');
  const request = store.add(book);

  request.onsuccess = () => {
    console.log('Livre ajouté:', book);
  };

  request.onerror = () => {
    console.error('Erreur ajout:', request.error);
  };
}

// Utilisation
const request = indexedDB.open('my-first-db', 1);
request.onsuccess = (event) => {
  const db = event.target.result;
  addBook(db, { isbn: '123', title: '1984', author: 'Orwell' });
};
```
</details>

---

### Kata 4 : Lire un Enregistrement ⭐
**Objectif :** Récupérer un livre par son ISBN

**Consigne :**
Créez une fonction `getBook(db, isbn)` qui :
- Récupère un livre par son ISBN
- Affiche le livre dans la console si trouvé
- Affiche "Livre non trouvé" sinon

<details>
<summary>💡 Indice</summary>

Utilisez `store.get(isbn)` avec une transaction `readonly`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function getBook(db, isbn) {
  const transaction = db.transaction(['books'], 'readonly');
  const store = transaction.objectStore('books');
  const request = store.get(isbn);

  request.onsuccess = () => {
    if (request.result) {
      console.log('Livre trouvé:', request.result);
    } else {
      console.log('Livre non trouvé');
    }
  };

  request.onerror = () => {
    console.error('Erreur lecture:', request.error);
  };
}

// Utilisation
getBook(db, '123');
```
</details>

---

### Kata 5 : Lire Tous les Enregistrements ⭐
**Objectif :** Récupérer tous les livres

**Consigne :**
Créez une fonction `getAllBooks(db)` qui :
- Récupère tous les livres du store
- Affiche le tableau de livres dans la console

<details>
<summary>💡 Indice</summary>

Utilisez `store.getAll()`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function getAllBooks(db) {
  const transaction = db.transaction(['books'], 'readonly');
  const store = transaction.objectStore('books');
  const request = store.getAll();

  request.onsuccess = () => {
    console.log('Tous les livres:', request.result);
  };

  request.onerror = () => {
    console.error('Erreur lecture:', request.error);
  };
}

// Utilisation
getAllBooks(db);
```
</details>

---

### Kata 6 : Mettre à Jour un Enregistrement ⭐
**Objectif :** Modifier un livre existant

**Consigne :**
Créez une fonction `updateBook(db, isbn, updates)` qui :
- Récupère le livre par ISBN
- Applique les modifications (ex: `{ title: "Nouveau titre" }`)
- Sauvegarde avec `put()`

<details>
<summary>💡 Indice</summary>

Utilisez `store.get()` puis `Object.assign()` puis `store.put()`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function updateBook(db, isbn, updates) {
  const transaction = db.transaction(['books'], 'readwrite');
  const store = transaction.objectStore('books');

  const getRequest = store.get(isbn);

  getRequest.onsuccess = () => {
    const book = getRequest.result;

    if (!book) {
      console.log('Livre non trouvé');
      return;
    }

    Object.assign(book, updates);

    const putRequest = store.put(book);

    putRequest.onsuccess = () => {
      console.log('Livre mis à jour:', book);
    };
  };
}

// Utilisation
updateBook(db, '123', { title: 'Animal Farm' });
```
</details>

---

### Kata 7 : Supprimer un Enregistrement ⭐
**Objectif :** Supprimer un livre par ISBN

**Consigne :**
Créez une fonction `deleteBook(db, isbn)` qui :
- Supprime le livre avec l'ISBN donné
- Affiche "Livre supprimé" en cas de succès

<details>
<summary>💡 Indice</summary>

Utilisez `store.delete(isbn)`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function deleteBook(db, isbn) {
  const transaction = db.transaction(['books'], 'readwrite');
  const store = transaction.objectStore('books');
  const request = store.delete(isbn);

  request.onsuccess = () => {
    console.log('Livre supprimé');
  };

  request.onerror = () => {
    console.error('Erreur suppression:', request.error);
  };
}

// Utilisation
deleteBook(db, '123');
```
</details>

---

## 🌿 Niveau Intermédiaire

### Kata 8 : Créer un Index ⭐⭐
**Objectif :** Créer un index pour rechercher par auteur

**Consigne :**
Modifiez la fonction d'ouverture de DB (version 2) pour :
- Créer un index nommé `"byAuthor"`
- Basé sur la propriété `"author"`
- Non unique (`unique: false`)

<details>
<summary>💡 Indice</summary>

Dans `onupgradeneeded`, utilisez `store.createIndex(nom, keyPath, options)`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function openDatabase() {
  const request = indexedDB.open('my-first-db', 2); // Version incrémentée

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const oldVersion = event.oldVersion;

    // Créer le store si version 0
    if (oldVersion < 1) {
      db.createObjectStore('books', { keyPath: 'isbn' });
    }

    // Ajouter l'index si version < 2
    if (oldVersion < 2) {
      const tx = event.target.transaction;
      const store = tx.objectStore('books');
      store.createIndex('byAuthor', 'author', { unique: false });
      console.log('Index "byAuthor" créé');
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    console.log('DB ouverte', db);
  };
}

openDatabase();
```
</details>

---

### Kata 9 : Rechercher par Index ⭐⭐
**Objectif :** Trouver tous les livres d'un auteur

**Consigne :**
Créez une fonction `getBooksByAuthor(db, author)` qui :
- Utilise l'index `"byAuthor"`
- Retourne tous les livres de cet auteur
- Affiche les résultats dans la console

<details>
<summary>💡 Indice</summary>

Utilisez `store.index('byAuthor')` puis `index.getAll(valeur)`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function getBooksByAuthor(db, author) {
  const transaction = db.transaction(['books'], 'readonly');
  const store = transaction.objectStore('books');
  const index = store.index('byAuthor');
  const request = index.getAll(author);

  request.onsuccess = () => {
    console.log(`Livres de ${author}:`, request.result);
  };
}

// Utilisation
getBooksByAuthor(db, 'Orwell');
```
</details>

---

### Kata 10 : Utiliser un Cursor ⭐⭐
**Objectif :** Parcourir tous les livres avec un cursor

**Consigne :**
Créez une fonction `iterateBooks(db)` qui :
- Ouvre un cursor sur le store `"books"`
- Affiche chaque livre un par un
- Affiche "Fin" quand tous les livres sont parcourus

<details>
<summary>💡 Indice</summary>

Utilisez `store.openCursor()` et `cursor.continue()`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function iterateBooks(db) {
  const transaction = db.transaction(['books'], 'readonly');
  const store = transaction.objectStore('books');
  const request = store.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;

    if (cursor) {
      console.log('Livre:', cursor.value);
      console.log('Clé:', cursor.key);
      cursor.continue();
    } else {
      console.log('Fin de l\'itération');
    }
  };
}

// Utilisation
iterateBooks(db);
```
</details>

---

### Kata 11 : Wrapper avec Promises ⭐⭐
**Objectif :** Convertir `addBook()` en Promise

**Consigne :**
Créez une fonction `addBookAsync(db, book)` qui :
- Retourne une Promise
- Resolve avec la clé générée en cas de succès
- Reject avec l'erreur en cas d'échec

<details>
<summary>💡 Indice</summary>

Wrappez le code dans `new Promise((resolve, reject) => { ... })`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function addBookAsync(db, book) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['books'], 'readwrite');
    const store = transaction.objectStore('books');
    const request = store.add(book);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Utilisation avec async/await
async function main() {
  const db = await openDatabaseAsync();
  const key = await addBookAsync(db, { isbn: '456', title: 'Brave New World', author: 'Huxley' });
  console.log('Livre ajouté avec la clé:', key);
}
```
</details>

---

### Kata 12 : Compter les Enregistrements ⭐⭐
**Objectif :** Compter le nombre total de livres

**Consigne :**
Créez une fonction `countBooks(db)` qui :
- Utilise `store.count()`
- Affiche le nombre total de livres

<details>
<summary>💡 Indice</summary>

`store.count()` retourne le nombre d'enregistrements.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function countBooks(db) {
  const transaction = db.transaction(['books'], 'readonly');
  const store = transaction.objectStore('books');
  const request = store.count();

  request.onsuccess = () => {
    console.log('Nombre de livres:', request.result);
  };
}

// Utilisation
countBooks(db);
```
</details>

---

### Kata 13 : Transaction Multi-Stores ⭐⭐
**Objectif :** Ajouter un livre et un auteur dans deux stores

**Consigne :**
1. Créez un deuxième object store `"authors"` avec `keyPath: "id"`
2. Créez une fonction `addBookAndAuthor(db, book, author)` qui :
   - Ajoute le livre dans `"books"`
   - Ajoute l'auteur dans `"authors"`
   - Dans une seule transaction

<details>
<summary>💡 Indice</summary>

Utilisez `db.transaction(['books', 'authors'], 'readwrite')`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
// D'abord, créer le store "authors" (version 3)
function openDatabase() {
  const request = indexedDB.open('my-first-db', 3);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const oldVersion = event.oldVersion;

    if (oldVersion < 1) {
      db.createObjectStore('books', { keyPath: 'isbn' });
    }

    if (oldVersion < 2) {
      const tx = event.target.transaction;
      const store = tx.objectStore('books');
      store.createIndex('byAuthor', 'author', { unique: false });
    }

    if (oldVersion < 3) {
      db.createObjectStore('authors', { keyPath: 'id', autoIncrement: true });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    console.log('DB ouverte', db);
  };
}

function addBookAndAuthor(db, book, author) {
  const transaction = db.transaction(['books', 'authors'], 'readwrite');
  const booksStore = transaction.objectStore('books');
  const authorsStore = transaction.objectStore('authors');

  booksStore.add(book);
  authorsStore.add(author);

  transaction.oncomplete = () => {
    console.log('Livre et auteur ajoutés');
  };

  transaction.onerror = () => {
    console.error('Erreur transaction:', transaction.error);
  };
}

// Utilisation
addBookAndAuthor(
  db,
  { isbn: '789', title: 'Fahrenheit 451', author: 'Bradbury' },
  { name: 'Ray Bradbury', birthYear: 1920 }
);
```
</details>

---

## 🚀 Niveau Avancé

### Kata 14 : Mise à Jour par Cursor ⭐⭐⭐
**Objectif :** Ajouter une propriété à tous les livres

**Consigne :**
Créez une fonction `addReadStatusToAll(db)` qui :
- Parcourt tous les livres avec un cursor
- Ajoute une propriété `read: false` à chaque livre (s'il ne l'a pas déjà)
- Met à jour chaque enregistrement

<details>
<summary>💡 Indice</summary>

Utilisez `cursor.update(valeur)` pour modifier l'enregistrement actuel.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function addReadStatusToAll(db) {
  const transaction = db.transaction(['books'], 'readwrite');
  const store = transaction.objectStore('books');
  const request = store.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;

    if (cursor) {
      const book = cursor.value;

      if (!book.hasOwnProperty('read')) {
        book.read = false;
        cursor.update(book);
        console.log('Propriété ajoutée à:', book.title);
      }

      cursor.continue();
    } else {
      console.log('Migration terminée');
    }
  };
}

// Utilisation
addReadStatusToAll(db);
```
</details>

---

### Kata 15 : Range Queries avec IDBKeyRange ⭐⭐⭐
**Objectif :** Récupérer les livres avec un ISBN dans une plage

**Consigne :**
Créez une fonction `getBooksByISBNRange(db, min, max)` qui :
- Utilise `IDBKeyRange.bound(min, max)`
- Récupère tous les livres dont l'ISBN est entre `min` et `max`

<details>
<summary>💡 Indice</summary>

Utilisez `store.getAll(IDBKeyRange.bound(min, max))`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function getBooksByISBNRange(db, min, max) {
  const transaction = db.transaction(['books'], 'readonly');
  const store = transaction.objectStore('books');

  const range = IDBKeyRange.bound(min, max);
  const request = store.getAll(range);

  request.onsuccess = () => {
    console.log(`Livres avec ISBN entre ${min} et ${max}:`, request.result);
  };
}

// Utilisation
getBooksByISBNRange(db, '100', '500');
```
</details>

---

### Kata 16 : Suppression Conditionnelle ⭐⭐⭐
**Objectif :** Supprimer tous les livres lus

**Consigne :**
Créez une fonction `deleteReadBooks(db)` qui :
- Parcourt tous les livres avec un cursor
- Supprime ceux dont `read === true`
- Affiche le nombre de livres supprimés

<details>
<summary>💡 Indice</summary>

Utilisez `cursor.delete()` au lieu de `cursor.update()`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
function deleteReadBooks(db) {
  const transaction = db.transaction(['books'], 'readwrite');
  const store = transaction.objectStore('books');
  const request = store.openCursor();

  let deletedCount = 0;

  request.onsuccess = (event) => {
    const cursor = event.target.result;

    if (cursor) {
      const book = cursor.value;

      if (book.read === true) {
        cursor.delete();
        deletedCount++;
        console.log('Livre supprimé:', book.title);
      }

      cursor.continue();
    } else {
      console.log(`${deletedCount} livre(s) supprimé(s)`);
    }
  };
}

// Utilisation
deleteReadBooks(db);
```
</details>

---

### Kata 17 : Classe Complète avec Async/Await ⭐⭐⭐
**Objectif :** Créer une classe `BookDatabase` avec toutes les opérations

**Consigne :**
Créez une classe `BookDatabase` avec les méthodes suivantes (toutes async) :
- `open()` : Ouvre la DB
- `add(book)` : Ajoute un livre
- `get(isbn)` : Récupère un livre
- `getAll()` : Récupère tous les livres
- `update(isbn, updates)` : Met à jour un livre
- `delete(isbn)` : Supprime un livre
- `close()` : Ferme la DB

<details>
<summary>💡 Indice</summary>

Wrappez chaque opération dans une Promise et utilisez `async/await`.
</details>

<details>
<summary>✅ Solution</summary>

```javascript
class BookDatabase {
  constructor() {
    this.db = null;
  }

  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('book-db', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('books', { keyPath: 'isbn' });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = () => reject(request.error);
    });
  }

  async add(book) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['books'], 'readwrite');
      const store = tx.objectStore('books');
      const request = store.add(book);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get(isbn) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['books'], 'readonly');
      const store = tx.objectStore('books');
      const request = store.get(isbn);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['books'], 'readonly');
      const store = tx.objectStore('books');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async update(isbn, updates) {
    const book = await this.get(isbn);
    if (!book) throw new Error('Livre non trouvé');

    Object.assign(book, updates);

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['books'], 'readwrite');
      const store = tx.objectStore('books');
      const request = store.put(book);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(isbn) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['books'], 'readwrite');
      const store = tx.objectStore('books');
      const request = store.delete(isbn);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// Utilisation
async function main() {
  const db = new BookDatabase();
  await db.open();

  await db.add({ isbn: '111', title: 'The Hobbit', author: 'Tolkien' });
  const book = await db.get('111');
  console.log(book);

  await db.update('111', { read: true });
  const allBooks = await db.getAll();
  console.log(allBooks);

  await db.delete('111');
  db.close();
}

main();
```
</details>

---

### Kata 18 : Migration Complexe ⭐⭐⭐
**Objectif :** Migrer la structure de la DB

**Consigne :**
1. Version 1 : Store `"books"` avec `keyPath: "id"`, autoIncrement
2. Version 2 : Ajouter un index `"byTitle"` sur `"title"`
3. Version 3 : Ajouter une propriété `category: "fiction"` à tous les livres existants

Créez une fonction `openDatabase()` qui gère ces 3 versions.

<details>
<summary>✅ Solution</summary>

```javascript
function openDatabase() {
  const request = indexedDB.open('book-library', 3);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const oldVersion = event.oldVersion;
    const tx = event.target.transaction;

    // Version 1 : Créer le store
    if (oldVersion < 1) {
      db.createObjectStore('books', { keyPath: 'id', autoIncrement: true });
      console.log('Store "books" créé');
    }

    // Version 2 : Ajouter l'index
    if (oldVersion < 2) {
      const store = tx.objectStore('books');
      store.createIndex('byTitle', 'title', { unique: false });
      console.log('Index "byTitle" créé');
    }

    // Version 3 : Ajouter la propriété category
    if (oldVersion < 3) {
      const store = tx.objectStore('books');
      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const book = cursor.value;
          if (!book.category) {
            book.category = 'fiction';
            cursor.update(book);
          }
          cursor.continue();
        } else {
          console.log('Migration v3 terminée');
        }
      };
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    console.log('DB ouverte, version', db.version);
  };

  request.onerror = () => {
    console.error('Erreur:', request.error);
  };
}

openDatabase();
```
</details>

---

## 🎯 Challenge Final : Todo List Persistante ⭐⭐⭐

**Objectif :** Créer une application todo list complète avec IndexedDB

### Consignes

Créez une classe `TodoApp` qui :

1. **Structure de DB :**
   - Base : `"todo-app"`, version 1
   - Store : `"todos"` avec autoIncrement
   - Propriétés : `{ id, text, done, createdAt }`
   - Index : `"byStatus"` sur `"done"`

2. **Méthodes (toutes async) :**
   - `addTodo(text)` : Ajoute un todo
   - `getTodos()` : Récupère tous les todos
   - `getTodosByStatus(done)` : Récupère par statut (via index)
   - `toggleTodo(id)` : Change le statut done/not done
   - `deleteTodo(id)` : Supprime un todo
   - `clearCompleted()` : Supprime tous les todos terminés

3. **UI (HTML/CSS minimal) :**
   - Input pour ajouter un todo
   - Liste des todos
   - Checkbox pour marquer comme fait
   - Bouton supprimer
   - Bouton "Effacer les terminés"

<details>
<summary>✅ Solution</summary>

**JavaScript:**

```javascript
class TodoApp {
  constructor() {
    this.db = null;
  }

  async init() {
    await this.openDB();
    await this.render();
  }

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('todo-app', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
        store.createIndex('byStatus', 'done', { unique: false });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  async addTodo(text) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['todos'], 'readwrite');
      const store = tx.objectStore('todos');
      const todo = {
        text,
        done: false,
        createdAt: new Date().toISOString()
      };
      const request = store.add(todo);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getTodos() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['todos'], 'readonly');
      const store = tx.objectStore('todos');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getTodosByStatus(done) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['todos'], 'readonly');
      const store = tx.objectStore('todos');
      const index = store.index('byStatus');
      const request = index.getAll(done);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async toggleTodo(id) {
    const tx = this.db.transaction(['todos'], 'readwrite');
    const store = tx.objectStore('todos');
    const getRequest = store.get(id);

    return new Promise((resolve, reject) => {
      getRequest.onsuccess = () => {
        const todo = getRequest.result;
        if (!todo) {
          reject(new Error('Todo non trouvé'));
          return;
        }

        todo.done = !todo.done;
        const putRequest = store.put(todo);

        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(putRequest.error);
      };
    });
  }

  async deleteTodo(id) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['todos'], 'readwrite');
      const store = tx.objectStore('todos');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearCompleted() {
    const tx = this.db.transaction(['todos'], 'readwrite');
    const store = tx.objectStore('todos');
    const index = store.index('byStatus');
    const request = index.openCursor(true); // done === true

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
  }

  async render() {
    const todos = await this.getTodos();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" ${todo.done ? 'checked' : ''} data-id="${todo.id}">
        <span style="${todo.done ? 'text-decoration: line-through' : ''}">${todo.text}</span>
        <button data-id="${todo.id}" class="delete-btn">Supprimer</button>
      `;
      todoList.appendChild(li);
    });

    // Event listeners
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', async (e) => {
        await this.toggleTodo(Number(e.target.dataset.id));
        await this.render();
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        await this.deleteTodo(Number(e.target.dataset.id));
        await this.render();
      });
    });
  }
}

// Initialisation
const app = new TodoApp();
app.init();

document.getElementById('add-btn').addEventListener('click', async () => {
  const input = document.getElementById('todo-input');
  if (input.value.trim()) {
    await app.addTodo(input.value);
    input.value = '';
    await app.render();
  }
});

document.getElementById('clear-completed').addEventListener('click', async () => {
  await app.clearCompleted();
  await app.render();
});
```

**HTML:**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Todo App - IndexedDB</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; }
    input[type="text"] { padding: 10px; width: 70%; }
    button { padding: 10px 20px; }
    ul { list-style: none; padding: 0; }
    li { padding: 10px; border-bottom: 1px solid #ccc; }
  </style>
</head>
<body>
  <h1>📝 Todo App (IndexedDB)</h1>

  <div>
    <input type="text" id="todo-input" placeholder="Nouvelle tâche...">
    <button id="add-btn">Ajouter</button>
  </div>

  <ul id="todo-list"></ul>

  <button id="clear-completed">Effacer les terminés</button>

  <script src="app.js"></script>
</body>
</html>
```
</details>

---

## 🎉 Félicitations !

Vous maîtrisez maintenant :
- ✅ Ouvrir et créer des bases IndexedDB
- ✅ Effectuer des opérations CRUD
- ✅ Utiliser des index et des cursors
- ✅ Gérer les transactions et les versions
- ✅ Wrapper l'API avec Promises/async-await
- ✅ Créer une application complète avec persistance locale

**Prochaine étape :** Testez vos connaissances avec `quiz.md` !
