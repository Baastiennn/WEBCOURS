# 🧠 Flashcards : Persistance Locale avec IndexedDB

## 📋 Instructions

Ces flashcards utilisent la méthode de **répétition espacée** pour renforcer votre mémoire.

**Comment les utiliser :**
1. Lisez la question
2. Essayez de répondre mentalement
3. Vérifiez la réponse
4. Révisez quotidiennement (5-10 minutes)

---

## 🎴 Concepts Fondamentaux

### Flashcard 1
**Q:** Qu'est-ce qu'IndexedDB ?

<details>
<summary>Réponse</summary>

**R:** Une API de base de données NoSQL asynchrone côté client pour stocker de grandes quantités de données structurées (objets, blobs, files) directement dans le navigateur.
</details>

---

### Flashcard 2
**Q:** Quelle est la capacité typique d'IndexedDB ?

<details>
<summary>Réponse</summary>

**R:** ~50 MB minimum à plusieurs GB selon le navigateur et les permissions utilisateur, bien plus que localStorage (~5-10 MB).
</details>

---

### Flashcard 3
**Q:** Quels types de données peut-on stocker dans IndexedDB ?

<details>
<summary>Réponse</summary>

**R:** Objets JavaScript, Arrays, Blobs, Files, et types structurés (pas uniquement des strings comme localStorage).
</details>

---

### Flashcard 4
**Q:** Qu'est-ce qu'un Object Store ?

<details>
<summary>Réponse</summary>

**R:** Une collection d'enregistrements dans IndexedDB, équivalent d'une table en SQL. Exemple : un store "todos" contient plusieurs objets todo.
</details>

---

### Flashcard 5
**Q:** Qu'est-ce qu'une transaction dans IndexedDB ?

<details>
<summary>Réponse</summary>

**R:** Un groupe d'opérations atomiques qui garantit l'intégrité des données. Si une opération échoue, toute la transaction est annulée (rollback).
</details>

---

## 🛠️ Opérations de Base

### Flashcard 6
**Q:** Comment ouvre-t-on une base de données ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
const request = indexedDB.open('nom-db', version);
```
Retourne un IDBRequest avec les événements : `onsuccess`, `onerror`, `onupgradeneeded`.
</details>

---

### Flashcard 7
**Q:** Quand `onupgradeneeded` est-il déclenché ?

<details>
<summary>Réponse</summary>

**R:** Lors de la création initiale de la DB ou quand le numéro de version est incrémenté. C'est là qu'on crée/modifie les object stores et index.
</details>

---

### Flashcard 8
**Q:** Comment crée-t-on un object store ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
db.createObjectStore('nom', { keyPath: 'id', autoIncrement: true });
```
Dans l'événement `onupgradeneeded` uniquement.
</details>

---

### Flashcard 9
**Q:** Quelle est la différence entre `keyPath` et `autoIncrement` ?

<details>
<summary>Réponse</summary>

**R:**
- **keyPath**: La clé est une propriété de l'objet (ex: `{ id: 1, text: "..." }`)
- **autoIncrement**: IndexedDB génère automatiquement des IDs séquentiels
</details>

---

### Flashcard 10
**Q:** Comment crée-t-on une transaction ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
const tx = db.transaction(['storeName'], 'readwrite');
```
Modes : `readonly` (défaut) ou `readwrite`.
</details>

---

## 📝 Opérations CRUD

### Flashcard 11
**Q:** Comment ajoute-t-on un enregistrement ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
const tx = db.transaction(['store'], 'readwrite');
const store = tx.objectStore('store');
store.add(objet);
```
`add()` échoue si la clé existe déjà.
</details>

---

### Flashcard 12
**Q:** Quelle est la différence entre `add()` et `put()` ?

<details>
<summary>Réponse</summary>

**R:**
- **add()**: Échoue si la clé existe (insert uniquement)
- **put()**: Remplace si la clé existe, crée sinon (upsert)
</details>

---

### Flashcard 13
**Q:** Comment lit-on un enregistrement par clé ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
const tx = db.transaction(['store'], 'readonly');
const store = tx.objectStore('store');
const request = store.get(clé);
request.onsuccess = () => console.log(request.result);
```
</details>

---

### Flashcard 14
**Q:** Comment récupère-t-on tous les enregistrements ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
store.getAll();
```
Retourne un tableau avec tous les enregistrements du store.
</details>

---

### Flashcard 15
**Q:** Comment met-on à jour un enregistrement ?

<details>
<summary>Réponse</summary>

**R:**
1. Lire avec `get(clé)`
2. Modifier l'objet
3. Sauvegarder avec `put(objet)`
</details>

---

### Flashcard 16
**Q:** Comment supprime-t-on un enregistrement ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
store.delete(clé);
```
</details>

---

### Flashcard 17
**Q:** Comment supprime-t-on tous les enregistrements ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
store.clear();
```
Vide complètement le store.
</details>

---

## 🔍 Index et Cursors

### Flashcard 18
**Q:** À quoi sert un index ?

<details>
<summary>Réponse</summary>

**R:** Permet de chercher des enregistrements par une propriété non-clé. Exemple : chercher des livres par auteur au lieu de par ISBN.
</details>

---

### Flashcard 19
**Q:** Comment crée-t-on un index ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
store.createIndex('nomIndex', 'propriété', { unique: false });
```
Dans `onupgradeneeded` uniquement.
</details>

---

### Flashcard 20
**Q:** Comment utilise-t-on un index pour chercher ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
const index = store.index('nomIndex');
const request = index.getAll(valeur);
```
</details>

---

### Flashcard 21
**Q:** À quoi sert un cursor ?

<details>
<summary>Réponse</summary>

**R:** Permet d'itérer séquentiellement sur plusieurs enregistrements, de les modifier ou de les supprimer pendant le parcours.
</details>

---

### Flashcard 22
**Q:** Comment ouvre-t-on un cursor ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
const request = store.openCursor();
request.onsuccess = (e) => {
  const cursor = e.target.result;
  if (cursor) {
    console.log(cursor.value);
    cursor.continue(); // Passer au suivant
  }
};
```
</details>

---

### Flashcard 23
**Q:** Comment modifie-t-on un enregistrement avec un cursor ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
const todo = cursor.value;
todo.done = true;
cursor.update(todo);
```
</details>

---

### Flashcard 24
**Q:** Comment supprime-t-on avec un cursor ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
cursor.delete();
```
Supprime l'enregistrement courant.
</details>

---

## 🔄 Asynchronisme et Promises

### Flashcard 25
**Q:** IndexedDB est-il synchrone ou asynchrone ?

<details>
<summary>Réponse</summary>

**R:** Entièrement **asynchrone** (sauf version Web Worker). Utilise des événements : `onsuccess`, `onerror`.
</details>

---

### Flashcard 26
**Q:** Comment convertir IndexedDB en Promises ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
function addAsync(store, data) {
  return new Promise((resolve, reject) => {
    const req = store.add(data);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
```
</details>

---

### Flashcard 27
**Q:** Peut-on utiliser async/await directement avec IndexedDB ?

<details>
<summary>Réponse</summary>

**R:** Non, l'API native utilise des callbacks. Il faut wrapper dans des Promises ou utiliser une bibliothèque comme Dexie.js.
</details>

---

## 🔒 Transactions et Intégrité

### Flashcard 28
**Q:** Quels sont les modes de transaction ?

<details>
<summary>Réponse</summary>

**R:**
- **readonly**: Lecture seule (défaut)
- **readwrite**: Lecture + écriture
- **versionchange**: Modification de structure (automatique)
</details>

---

### Flashcard 29
**Q:** Que se passe-t-il si une transaction échoue ?

<details>
<summary>Réponse</summary>

**R:** Rollback automatique : tous les changements de la transaction sont annulés, garantissant l'intégrité des données.
</details>

---

### Flashcard 30
**Q:** Comment accéder à plusieurs stores dans une transaction ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
const tx = db.transaction(['store1', 'store2'], 'readwrite');
const s1 = tx.objectStore('store1');
const s2 = tx.objectStore('store2');
```
</details>

---

### Flashcard 31
**Q:** Les transactions ont-elles une durée de vie limitée ?

<details>
<summary>Réponse</summary>

**R:** Oui ! Elles se ferment automatiquement à la fin du tour d'événement. Éviter les opérations asynchrones longues pendant une transaction.
</details>

---

## 📊 Versions et Migrations

### Flashcard 32
**Q:** Comment gère-t-on les migrations de schéma ?

<details>
<summary>Réponse</summary>

**R:**
1. Incrémenter le numéro de version
2. Dans `onupgradeneeded`, tester `event.oldVersion`
3. Appliquer les migrations nécessaires selon la version
</details>

---

### Flashcard 33
**Q:** Exemple de migration de version 1 à 2 ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
request.onupgradeneeded = (e) => {
  const db = e.target.result;
  if (e.oldVersion < 1) {
    db.createObjectStore('todos', { keyPath: 'id' });
  }
  if (e.oldVersion < 2) {
    const store = e.target.transaction.objectStore('todos');
    store.createIndex('byStatus', 'done');
  }
};
```
</details>

---

### Flashcard 34
**Q:** Que faire si on veut ajouter une propriété à tous les enregistrements existants ?

<details>
<summary>Réponse</summary>

**R:** Utiliser un cursor dans `onupgradeneeded` pour parcourir et modifier chaque enregistrement.
</details>

---

## 🎯 Méthodes Utiles

### Flashcard 35
**Q:** Comment compte-t-on le nombre d'enregistrements ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
store.count();
```
Retourne le nombre total d'enregistrements.
</details>

---

### Flashcard 36
**Q:** Comment ferme-t-on une base de données ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
db.close();
```
Bonne pratique : toujours fermer quand la DB n'est plus nécessaire.
</details>

---

### Flashcard 37
**Q:** Qu'est-ce que `IDBKeyRange` ?

<details>
<summary>Réponse</summary>

**R:** Permet de faire des **range queries** : récupérer des enregistrements dont la clé est dans une certaine plage.

Exemple :
```javascript
const range = IDBKeyRange.bound(10, 50);
store.getAll(range);
```
</details>

---

### Flashcard 38
**Q:** Comment vérifie-t-on si IndexedDB est supporté ?

<details>
<summary>Réponse</summary>

**R:**
```javascript
if (!window.indexedDB) {
  console.error('IndexedDB non supporté');
}
```
</details>

---

## ⚠️ Erreurs Courantes

### Flashcard 39
**Q:** Que signifie l'erreur `QuotaExceededError` ?

<details>
<summary>Réponse</summary>

**R:** Le quota de stockage du navigateur est dépassé. L'utilisateur doit libérer de l'espace ou accorder plus de permissions.
</details>

---

### Flashcard 40
**Q:** Que signifie l'événement `onblocked` ?

<details>
<summary>Réponse</summary>

**R:** La mise à jour de version est bloquée car d'autres onglets ont la DB ouverte. Il faut les fermer.
</details>

---

## 🎨 Bonnes Pratiques

### Flashcard 41
**Q:** Faut-il utiliser `readonly` ou `readwrite` par défaut ?

<details>
<summary>Réponse</summary>

**R:** **readonly** par défaut. N'utilisez `readwrite` que quand vous devez modifier des données. C'est plus performant et évite les blocages.
</details>

---

### Flashcard 42
**Q:** Pourquoi créer des index ?

<details>
<summary>Réponse</summary>

**R:** Pour accélérer les recherches fréquentes par propriété non-clé. Sans index, il faudrait parcourir tous les enregistrements avec un cursor (lent).
</details>

---

### Flashcard 43
**Q:** Quand utiliser un cursor vs `getAll()` ?

<details>
<summary>Réponse</summary>

**R:**
- **getAll()**: Quand on veut tous les enregistrements en un coup
- **Cursor**: Quand on veut itérer un par un (modification, filtrage, gros volumes)
</details>

---

### Flashcard 44
**Q:** Peut-on modifier la structure de la DB en dehors de `onupgradeneeded` ?

<details>
<summary>Réponse</summary>

**R:** Non ! Créer/supprimer des object stores et indexes est uniquement possible dans `onupgradeneeded`.
</details>

---

### Flashcard 45
**Q:** Quelle bibliothèque simplifie IndexedDB ?

<details>
<summary>Réponse</summary>

**R:** **Dexie.js** - wrapper moderne avec API Promise/async-await, syntaxe simplifiée, et fonctionnalités additionnelles.
</details>

---

## 🧩 Cas d'Usage

### Flashcard 46
**Q:** Quand utiliser IndexedDB vs localStorage ?

<details>
<summary>Réponse</summary>

**R:**
- **localStorage**: Données simples, petites (~5 MB), synchrone
- **IndexedDB**: Données structurées, volumineuses (>50 MB), requêtes complexes
</details>

---

### Flashcard 47
**Q:** Quand utiliser IndexedDB vs OPFS ?

<details>
<summary>Réponse</summary>

**R:**
- **IndexedDB**: Objets structurés, requêtes, index
- **OPFS**: Fichiers binaires, médias, gros volumes, accès fichier
</details>

---

### Flashcard 48
**Q:** Exemples d'applications utilisant IndexedDB ?

<details>
<summary>Réponse</summary>

**R:**
- Applications offline-first (todo lists, notes)
- Mise en cache de données API
- Éditeurs de texte/code
- Applications de messagerie
- PWA avec synchronisation
</details>

---

## 🎓 Résumé

### Flashcard 49
**Q:** Résumé : les 5 étapes pour utiliser IndexedDB ?

<details>
<summary>Réponse</summary>

**R:**
1. Ouvrir la DB avec `indexedDB.open()`
2. Créer les stores dans `onupgradeneeded`
3. Créer une transaction (`readonly` ou `readwrite`)
4. Accéder à l'object store
5. Effectuer l'opération (`add`, `get`, `put`, `delete`)
</details>

---

### Flashcard 50
**Q:** Quels sont les 4 concepts clés d'IndexedDB ?

<details>
<summary>Réponse</summary>

**R:**
1. **Object Store**: Collection d'enregistrements
2. **Transaction**: Opérations atomiques
3. **Index**: Recherche par propriété
4. **Cursor**: Itération séquentielle
</details>

---

## 🎯 Conseils de Révision

**Fréquence recommandée :**
- Jour 1 : Toutes les flashcards
- Jour 3 : Celles que vous avez ratées
- Jour 7 : Toutes à nouveau
- Jour 14 : Révision finale
- Ensuite : 1x/mois pour maintenir

**Technique de mémorisation :**
- Ne lisez pas la réponse immédiatement
- Essayez de répondre à voix haute
- Si vous échouez, relisez les notes correspondantes
- Marquez les cartes difficiles pour révision ciblée

---

**🎉 Vous êtes prêt pour le prochain module : OPFS !**
