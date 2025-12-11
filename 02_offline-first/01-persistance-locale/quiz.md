# 📝 Quiz : Persistance Locale avec IndexedDB

## 📋 Instructions

- **20 questions** pour tester votre compréhension d'IndexedDB
- Répondez sans regarder les notes
- Les explications sont fournies après chaque réponse
- **Score visé :** 80% (16/20) pour passer au module suivant

---

## Questions

### Question 1
**Quelle est la capacité de stockage typique d'IndexedDB ?**

A) ~5 MB maximum
B) ~50 MB à plusieurs GB selon le navigateur
C) Illimité
D) ~10 MB maximum

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

IndexedDB offre généralement 50 MB minimum, et peut aller jusqu'à plusieurs gigaoctets selon le navigateur et les permissions utilisateur. C'est bien plus que localStorage (~5-10 MB).
</details>

---

### Question 2
**Quel type de données peut-on stocker dans IndexedDB ?**

A) Uniquement des strings
B) Uniquement des nombres
C) Objects JavaScript, Blobs, Files
D) Uniquement du JSON

<details>
<summary>Voir la réponse</summary>

**Réponse : C**

IndexedDB peut stocker des objets JavaScript complexes, des Blobs, des Files, et même des types structurés. C'est un de ses grands avantages par rapport à localStorage qui ne stocke que des strings.
</details>

---

### Question 3
**Quelle méthode utilise-t-on pour ouvrir une base de données ?**

A) `indexedDB.createDatabase()`
B) `indexedDB.open()`
C) `indexedDB.connect()`
D) `new IndexedDB()`

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

`indexedDB.open(nom, version)` ouvre une base existante ou en crée une nouvelle si elle n'existe pas.
</details>

---

### Question 4
**Quand l'événement `onupgradeneeded` est-il déclenché ?**

A) À chaque ouverture de la DB
B) Uniquement lors de la création de la DB
C) Lors de la création ou quand la version change
D) Lors d'une erreur

<details>
<summary>Voir la réponse</summary>

**Réponse : C**

`onupgradeneeded` est déclenché lors de la première création de la DB, ou quand le numéro de version est incrémenté. C'est là qu'on crée ou modifie la structure (object stores, indexes).
</details>

---

### Question 5
**Qu'est-ce qu'un Object Store ?**

A) Un objet JavaScript
B) Une collection d'enregistrements (≈ table SQL)
C) Un index
D) Une transaction

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

Un **Object Store** est l'équivalent d'une table SQL en base de données relationnelle. Il contient plusieurs enregistrements (objets).
</details>

---

### Question 6
**Quelle option utilise-t-on pour générer automatiquement les clés ?**

A) `autoKey: true`
B) `autoIncrement: true`
C) `generateKey: true`
D) `autoId: true`

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

L'option `autoIncrement: true` génère automatiquement des IDs séquentiels (1, 2, 3...) pour chaque enregistrement ajouté.
</details>

---

### Question 7
**Quelle est la différence entre `add()` et `put()` ?**

A) Aucune différence
B) `add()` échoue si la clé existe, `put()` remplace
C) `put()` échoue si la clé existe, `add()` remplace
D) `add()` est asynchrone, `put()` est synchrone

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

- **`add()`** : Échoue si la clé existe déjà (insert uniquement)
- **`put()`** : Remplace si la clé existe, crée sinon (upsert)
</details>

---

### Question 8
**Quels sont les modes de transaction disponibles ?**

A) `read` et `write`
B) `readonly` et `readwrite`
C) `select` et `update`
D) `get` et `put`

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

Les deux modes principaux sont :
- **`readonly`** : Lecture seule (par défaut)
- **`readwrite`** : Lecture + écriture

Il existe aussi `versionchange` mais il est géré automatiquement dans `onupgradeneeded`.
</details>

---

### Question 9
**À quoi sert un index dans IndexedDB ?**

A) À trier les données
B) À chercher par une propriété non-clé
C) À accélérer les transactions
D) À compresser les données

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

Un **index** permet de chercher des enregistrements par n'importe quelle propriété, pas seulement la clé primaire. Par exemple, chercher des livres par auteur au lieu de par ISBN.
</details>

---

### Question 10
**Comment crée-t-on un index ?**

A) `store.createIndex(nom, propriété, options)`
B) `db.addIndex(nom)`
C) `store.addIndex(propriété)`
D) `index.create(nom)`

<details>
<summary>Voir la réponse</summary>

**Réponse : A**

Dans `onupgradeneeded`, on utilise :
```javascript
store.createIndex('byAuthor', 'author', { unique: false });
```

1er arg : nom de l'index, 2ème arg : propriété à indexer, 3ème arg : options.
</details>

---

### Question 11
**À quoi sert un cursor ?**

A) À supprimer la DB
B) À itérer sur plusieurs enregistrements
C) À créer des transactions
D) À fermer la DB

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

Un **cursor** permet de parcourir séquentiellement plusieurs enregistrements, de les modifier, ou de les supprimer pendant l'itération.
</details>

---

### Question 12
**Que retourne `store.getAll()` ?**

A) Un tableau de clés
B) Un tableau d'objets (tous les enregistrements)
C) Un cursor
D) Une Promise

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

`store.getAll()` retourne un IDBRequest qui, en cas de succès, contient un tableau avec tous les enregistrements du store.
</details>

---

### Question 13
**L'API IndexedDB est-elle synchrone ou asynchrone ?**

A) Synchrone
B) Asynchrone
C) Les deux selon la méthode
D) Synchrone uniquement dans les Web Workers

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

IndexedDB est **entièrement asynchrone** (sauf dans les Web Workers où une version synchrone existe). C'est pour éviter de bloquer le thread principal.
</details>

---

### Question 14
**Que se passe-t-il si une transaction échoue ?**

A) Rien, les données sont quand même modifiées
B) Un rollback automatique annule tous les changements
C) Seule la dernière opération est annulée
D) La DB est supprimée

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

Les transactions sont **atomiques** : si une opération échoue, toute la transaction est annulée (rollback), garantissant l'intégrité des données.
</details>

---

### Question 15
**Comment accède-t-on à plusieurs object stores dans une transaction ?**

A) Créer une transaction par store
B) `db.transaction(['store1', 'store2'], mode)`
C) Impossible
D) Utiliser `db.multiTransaction()`

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

On peut passer un tableau de noms de stores :
```javascript
const tx = db.transaction(['todos', 'tags'], 'readwrite');
```

Cela permet des opérations atomiques sur plusieurs stores.
</details>

---

### Question 16
**Quelle méthode utilise-t-on pour compter les enregistrements ?**

A) `store.length()`
B) `store.count()`
C) `store.size()`
D) `store.getCount()`

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

`store.count()` retourne le nombre total d'enregistrements dans le store.
</details>

---

### Question 17
**Comment supprime-t-on tous les enregistrements d'un store ?**

A) `store.deleteAll()`
B) `store.clear()`
C) `store.removeAll()`
D) `store.truncate()`

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

`store.clear()` vide complètement le store, supprimant tous les enregistrements.
</details>

---

### Question 18
**Que permet `IDBKeyRange.bound(min, max)` ?**

A) Limiter le nombre d'enregistrements
B) Récupérer les enregistrements dont la clé est entre min et max
C) Définir la taille du store
D) Créer un index

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

`IDBKeyRange` permet de faire des **range queries** : récupérer les enregistrements dont la clé (ou une propriété indexée) est dans une certaine plage.

Exemple :
```javascript
const range = IDBKeyRange.bound(10, 50);
store.getAll(range); // Enregistrements avec clé entre 10 et 50
```
</details>

---

### Question 19
**Quelle est la bonne pratique pour gérer les versions ?**

A) Toujours utiliser version 1
B) Incrémenter la version et tester `oldVersion` dans `onupgradeneeded`
C) Supprimer et recréer la DB
D) Ne jamais changer la version

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

La migration correcte consiste à :
1. Incrémenter le numéro de version
2. Dans `onupgradeneeded`, tester `event.oldVersion`
3. Appliquer uniquement les migrations nécessaires

```javascript
if (oldVersion < 2) {
  // Migration 1 → 2
}
if (oldVersion < 3) {
  // Migration 2 → 3
}
```
</details>

---

### Question 20
**Comment transformer une opération IndexedDB en Promise ?**

A) Utiliser `.then()` directement
B) Wrapper dans `new Promise((resolve, reject) => { ... })`
C) Utiliser `await` directement sur `store.add()`
D) IndexedDB retourne déjà des Promises

<details>
<summary>Voir la réponse</summary>

**Réponse : B**

L'API native utilise des callbacks (`onsuccess`, `onerror`). Pour utiliser async/await, on doit wrapper dans une Promise :

```javascript
function addAsync(store, data) {
  return new Promise((resolve, reject) => {
    const request = store.add(data);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

Alternativement, utiliser une bibliothèque comme **Dexie.js** qui fournit une API Promise native.
</details>

---

## 📊 Résultats

**Calculez votre score :**

- **18-20** : Excellent ! Vous maîtrisez IndexedDB 🎉
- **15-17** : Très bien ! Révisez les points faibles
- **12-14** : Bon début, relisez les notes et refaites les katas
- **< 12** : Revisitez le module complet avant de continuer

---

## 🎯 Points Clés à Retenir

Si vous ne retenez que 5 choses :

1. **IndexedDB = NoSQL asynchrone** dans le navigateur
2. **Object Stores** = collections d'objets (≈ tables)
3. **Transactions** garantissent l'intégrité (rollback automatique)
4. **Index** permettent de chercher par n'importe quelle propriété
5. **Wrapper en Promises** pour utiliser async/await

---

**Prochaine étape :** Révisez avec `flashcards.md` puis passez au module suivant !
