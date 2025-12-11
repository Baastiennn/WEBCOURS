# 🧠 Flashcards : OPFS

## Concepts Fondamentaux

### Q: Qu'est-ce qu'OPFS ?
<details><summary>R</summary>
Origin Private File System - API pour manipuler des fichiers directement dans le navigateur, privés à l'origine.
</details>

### Q: OPFS vs IndexedDB ?
<details><summary>R</summary>
- **OPFS** : Fichiers binaires, médias, documents
- **IndexedDB** : Objets structurés, requêtes, index
</details>

### Q: Les fichiers OPFS sont-ils accessibles par l'utilisateur ?
<details><summary>R</summary>
Non, ils sont **privés** à l'origine. Accessibles uniquement via l'API JavaScript.
</details>

---

## Opérations de Base

### Q: Comment accéder au répertoire racine ?
<details><summary>R</summary>
```javascript
const root = await navigator.storage.getDirectory();
```
</details>

### Q: Comment créer un fichier ?
<details><summary>R</summary>
```javascript
const fileHandle = await root.getFileHandle('file.txt', { create: true });
```
</details>

### Q: Comment écrire dans un fichier ?
<details><summary>R</summary>
```javascript
const writable = await fileHandle.createWritable();
await writable.write(content);
await writable.close(); // Important !
```
</details>

### Q: Comment lire un fichier ?
<details><summary>R</summary>
```javascript
const file = await fileHandle.getFile();
const content = await file.text();
```
</details>

### Q: Comment supprimer un fichier ?
<details><summary>R</summary>
```javascript
await root.removeEntry(fileName);
```
</details>

---

## Répertoires

### Q: Comment créer un répertoire ?
<details><summary>R</summary>
```javascript
const dirHandle = await root.getDirectoryHandle('notes', { create: true });
```
</details>

### Q: Comment lister les fichiers ?
<details><summary>R</summary>
```javascript
for await (const [name, handle] of root.entries()) {
  console.log(name, handle.kind); // 'file' ou 'directory'
}
```
</details>

---

## Avancé

### Q: Qu'est-ce que l'accès synchrone OPFS ?
<details><summary>R</summary>
Version synchrone ultra-rapide disponible **uniquement dans les Web Workers** :
```javascript
const syncHandle = await fileHandle.createSyncAccessHandle();
syncHandle.write(data);
syncHandle.close();
```
</details>

### Q: Avantage de l'accès synchrone ?
<details><summary>R</summary>
⚡ Performances maximales sans overhead asynchrone, idéal pour traitement intensif.
</details>

---

## Bonnes Pratiques

### Q: Pourquoi fermer un writable stream ?
<details><summary>R</summary>
- Libérer les ressources
- Sauvegarder les changements
- Éviter les fuites mémoire
</details>

### Q: Comment vérifier l'existence d'un fichier ?
<details><summary>R</summary>
```javascript
try {
  await root.getFileHandle('file.txt');
  return true;
} catch {
  return false;
}
```
</details>

---

**🎉 Prêt pour le module CRDT !**
