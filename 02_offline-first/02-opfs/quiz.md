# 📝 Quiz : OPFS (Origin Private File System)

## Questions (15 au total)

### Question 1
**Que signifie OPFS ?**
A) Open Private File Storage
B) Origin Private File System
C) Offline Persistent File System
D) Open Protocol for File Synchronization

<details><summary>Réponse</summary>
**B** - Origin Private File System : système de fichiers privé à l'origine (domaine).
</details>

---

### Question 2
**OPFS vs IndexedDB : quelle est la différence principale ?**
A) OPFS est synchrone, IndexedDB asynchrone
B) OPFS pour fichiers, IndexedDB pour objets structurés
C) Pas de différence
D) OPFS est plus lent

<details><summary>Réponse</summary>
**B** - OPFS est optimisé pour les fichiers binaires, IndexedDB pour les objets structurés avec requêtes.
</details>

---

### Question 3
**Comment accède-t-on au répertoire racine OPFS ?**
A) `navigator.storage.getDirectory()`
B) `navigator.filesystem.root()`
C) `window.OPFS.getRoot()`
D) `FileSystem.open()`

<details><summary>Réponse</summary>
**A** - `await navigator.storage.getDirectory()` retourne le répertoire racine.
</details>

---

### Question 4
**Les fichiers OPFS sont-ils accessibles à l'utilisateur ?**
A) Oui, via l'explorateur de fichiers
B) Non, ils sont privés à l'origine
C) Oui, mais seulement en mode développeur
D) Oui, dans le dossier Downloads

<details><summary>Réponse</summary>
**B** - OPFS est **privé** : les fichiers ne sont accessibles que via l'API, pas par l'explorateur système.
</details>

---

### Question 5
**Comment crée-t-on un fichier ?**
A) `root.createFile(name)`
B) `root.getFileHandle(name, { create: true })`
C) `root.addFile(name)`
D) `new File(name)`

<details><summary>Réponse</summary>
**B** - `getFileHandle(name, { create: true })` crée ou obtient un fichier.
</details>

---

### Question 6
**Comment écrit-on dans un fichier ?**
A) Utiliser `createWritable()`, `write()`, `close()`
B) Utiliser `write()` directement
C) Utiliser `save()`
D) Utiliser `append()`

<details><summary>Réponse</summary>
**A** - Créer un stream writable, écrire, puis fermer :
```javascript
const writable = await fileHandle.createWritable();
await writable.write(content);
await writable.close();
```
</details>

---

### Question 7
**Pourquoi est-il important de fermer un stream writable ?**
A) Pour libérer les ressources
B) Pour sauvegarder les changements
C) Pour éviter les fuites mémoire
D) Toutes les réponses

<details><summary>Réponse</summary>
**D** - Fermer le stream est crucial pour libérer les ressources, sauvegarder les données, et éviter les fuites.
</details>

---

### Question 8
**Comment lit-on un fichier texte ?**
A) `fileHandle.read()`
B) `await (await fileHandle.getFile()).text()`
C) `fileHandle.getText()`
D) `fileHandle.readText()`

<details><summary>Réponse</summary>
**B** - Obtenir l'objet File puis lire avec `.text()`.
</details>

---

### Question 9
**Comment liste-t-on les fichiers ?**
A) `root.getFiles()`
B) `root.listAll()`
C) `for await (const [name, handle] of root.entries())`
D) `root.entries().toArray()`

<details><summary>Réponse</summary>
**C** - Utiliser `for await...of` sur `root.entries()`.
</details>

---

### Question 10
**Comment supprime-t-on un fichier ?**
A) `root.delete(name)`
B) `root.removeEntry(name)`
C) `root.remove(name)`
D) `fileHandle.delete()`

<details><summary>Réponse</summary>
**B** - `root.removeEntry(fileName)` supprime un fichier ou répertoire.
</details>

---

### Question 11
**Quelle est la différence entre `handle.kind === 'file'` et `'directory'` ?**
A) Aucune
B) `file` pour fichier, `directory` pour répertoire
C) `file` est obsolète
D) `directory` n'existe pas

<details><summary>Réponse</summary>
**B** - `handle.kind` indique le type : `'file'` ou `'directory'`.
</details>

---

### Question 12
**L'accès synchrone OPFS fonctionne où ?**
A) Partout
B) Uniquement dans les Web Workers
C) Uniquement dans le thread principal
D) Uniquement en mode développeur

<details><summary>Réponse</summary>
**B** - L'accès synchrone (`createSyncAccessHandle()`) n'est disponible que dans les Web Workers pour des raisons de performance.
</details>

---

### Question 13
**Avantage de l'accès synchrone OPFS ?**
A) Plus simple
B) Performance maximale
C) Fonctionne partout
D) Moins de code

<details><summary>Réponse</summary>
**B** - L'accès synchrone offre des performances ultra-rapides sans overhead asynchrone.
</details>

---

### Question 14
**Comment obtenir la taille d'un fichier ?**
A) `fileHandle.size`
B) `(await fileHandle.getFile()).size`
C) `fileHandle.getSize()`
D) `fileHandle.length`

<details><summary>Réponse</summary>
**B** - Obtenir l'objet File puis accéder à `.size`.
</details>

---

### Question 15
**Meilleur cas d'usage pour OPFS ?**
A) Base de données structurée
B) Cache d'objets JSON
C) Éditeur de code/texte
D) Stockage de préférences

<details><summary>Réponse</summary>
**C** - OPFS excelle pour manipuler des fichiers (texte, code, médias), pas pour des objets structurés.
</details>

---

## 📊 Score

- **13-15** : Excellent ! 🎉
- **10-12** : Très bien !
- **7-9** : Relisez les notes
- **< 7** : Refaites le module

**Prochaine étape : flashcards.md**
