# 🥋 Katas : OPFS (Origin Private File System)

## 📋 Instructions

Progressez du niveau Débutant ⭐ vers Avancé ⭐⭐⭐ pour maîtriser OPFS.

---

## 🌱 Niveau Débutant

### Kata 1 : Accéder au Répertoire Racine ⭐
**Consigne :** Créez une fonction async `getRoot()` qui retourne le répertoire racine OPFS.

<details>
<summary>✅ Solution</summary>

```javascript
async function getRoot() {
  const root = await navigator.storage.getDirectory();
  console.log('Répertoire racine:', root);
  return root;
}

getRoot();
```
</details>

---

### Kata 2 : Créer un Fichier ⭐
**Consigne :** Créez une fonction `createFile(fileName)` qui crée un fichier dans OPFS.

<details>
<summary>✅ Solution</summary>

```javascript
async function createFile(fileName) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName, { create: true });
  console.log('Fichier créé:', fileHandle.name);
  return fileHandle;
}

createFile('hello.txt');
```
</details>

---

### Kata 3 : Écrire dans un Fichier ⭐
**Consigne :** Créez `writeFile(fileName, content)` pour écrire du texte dans un fichier.

<details>
<summary>✅ Solution</summary>

```javascript
async function writeFile(fileName, content) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
  console.log('Fichier écrit');
}

writeFile('hello.txt', 'Hello OPFS!');
```
</details>

---

### Kata 4 : Lire un Fichier ⭐
**Consigne :** Créez `readFile(fileName)` pour lire le contenu d'un fichier.

<details>
<summary>✅ Solution</summary>

```javascript
async function readFile(fileName) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName);
  const file = await fileHandle.getFile();
  const content = await file.text();
  console.log('Contenu:', content);
  return content;
}

readFile('hello.txt');
```
</details>

---

### Kata 5 : Supprimer un Fichier ⭐
**Consigne :** Créez `deleteFile(fileName)` pour supprimer un fichier.

<details>
<summary>✅ Solution</summary>

```javascript
async function deleteFile(fileName) {
  const root = await navigator.storage.getDirectory();
  await root.removeEntry(fileName);
  console.log('Fichier supprimé');
}

deleteFile('hello.txt');
```
</details>

---

## 🌿 Niveau Intermédiaire

### Kata 6 : Créer un Répertoire ⭐⭐
**Consigne :** Créez `createDirectory(dirName)` et `createFileInDir(dirName, fileName, content)`.

<details>
<summary>✅ Solution</summary>

```javascript
async function createDirectory(dirName) {
  const root = await navigator.storage.getDirectory();
  const dirHandle = await root.getDirectoryHandle(dirName, { create: true });
  console.log('Répertoire créé:', dirName);
  return dirHandle;
}

async function createFileInDir(dirName, fileName, content) {
  const root = await navigator.storage.getDirectory();
  const dirHandle = await root.getDirectoryHandle(dirName, { create: true });
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });

  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();

  console.log(`Créé: ${dirName}/${fileName}`);
}

createFileInDir('notes', 'note1.txt', 'Ma note');
```
</details>

---

### Kata 7 : Lister les Fichiers ⭐⭐
**Consigne :** Créez `listFiles()` qui retourne un tableau de noms de fichiers.

<details>
<summary>✅ Solution</summary>

```javascript
async function listFiles() {
  const root = await navigator.storage.getDirectory();
  const files = [];

  for await (const [name, handle] of root.entries()) {
    if (handle.kind === 'file') {
      files.push(name);
    }
  }

  console.log('Fichiers:', files);
  return files;
}

listFiles();
```
</details>

---

### Kata 8 : Vérifier l'Existence ⭐⭐
**Consigne :** Créez `fileExists(fileName)` qui retourne true/false.

<details>
<summary>✅ Solution</summary>

```javascript
async function fileExists(fileName) {
  const root = await navigator.storage.getDirectory();
  try {
    await root.getFileHandle(fileName);
    return true;
  } catch {
    return false;
  }
}

// Utilisation
if (await fileExists('config.json')) {
  console.log('Config existe');
}
```
</details>

---

## 🚀 Niveau Avancé

### Kata 9 : Classe OPFSManager ⭐⭐⭐
**Consigne :** Créez une classe complète avec toutes les opérations.

<details>
<summary>✅ Solution</summary>

```javascript
class OPFSManager {
  constructor() {
    this.root = null;
  }

  async init() {
    this.root = await navigator.storage.getDirectory();
  }

  async write(path, content) {
    const fileHandle = await this.root.getFileHandle(path, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  }

  async read(path) {
    const fileHandle = await this.root.getFileHandle(path);
    const file = await fileHandle.getFile();
    return await file.text();
  }

  async delete(path) {
    await this.root.removeEntry(path);
  }

  async list() {
    const files = [];
    for await (const [name, handle] of this.root.entries()) {
      if (handle.kind === 'file') {
        files.push(name);
      }
    }
    return files;
  }

  async exists(path) {
    try {
      await this.root.getFileHandle(path);
      return true;
    } catch {
      return false;
    }
  }
}

// Utilisation
const opfs = new OPFSManager();
await opfs.init();
await opfs.write('test.txt', 'Hello');
console.log(await opfs.read('test.txt'));
```
</details>

---

### Challenge Final : Éditeur de Notes ⭐⭐⭐

Créez une application d'éditeur de notes avec :
- Liste de notes
- Créer/Éditer/Supprimer
- Sauvegarde automatique dans OPFS
- Interface HTML/CSS

<details>
<summary>✅ Solution HTML</summary>

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Éditeur OPFS</title>
  <style>
    body { font-family: Arial; max-width: 800px; margin: 50px auto; }
    textarea { width: 100%; height: 300px; }
    button { padding: 10px; margin: 5px; }
  </style>
</head>
<body>
  <h1>📝 Éditeur de Notes (OPFS)</h1>

  <input type="text" id="note-title" placeholder="Titre de la note">
  <textarea id="note-content" placeholder="Contenu..."></textarea>

  <button id="save-btn">Sauvegarder</button>
  <button id="new-btn">Nouvelle note</button>

  <h2>Mes notes</h2>
  <ul id="notes-list"></ul>

  <script src="app.js"></script>
</body>
</html>
```
</details>

<details>
<summary>✅ Solution JavaScript</summary>

```javascript
class NoteApp {
  constructor() {
    this.opfs = null;
    this.currentNote = null;
  }

  async init() {
    this.opfs = await navigator.storage.getDirectory();
    await this.opfs.getDirectoryHandle('notes', { create: true });
    await this.loadNotesList();
  }

  async saveNote() {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;

    if (!title) {
      alert('Titre requis');
      return;
    }

    const notesDir = await this.opfs.getDirectoryHandle('notes');
    const fileHandle = await notesDir.getFileHandle(`${title}.txt`, { create: true });

    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();

    console.log('Note sauvegardée:', title);
    await this.loadNotesList();
  }

  async loadNote(title) {
    const notesDir = await this.opfs.getDirectoryHandle('notes');
    const fileHandle = await notesDir.getFileHandle(`${title}.txt`);
    const file = await fileHandle.getFile();
    const content = await file.text();

    document.getElementById('note-title').value = title;
    document.getElementById('note-content').value = content;
    this.currentNote = title;
  }

  async deleteNote(title) {
    const notesDir = await this.opfs.getDirectoryHandle('notes');
    await notesDir.removeEntry(`${title}.txt`);
    await this.loadNotesList();
  }

  async loadNotesList() {
    const notesDir = await this.opfs.getDirectoryHandle('notes');
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    for await (const [name, handle] of notesDir.entries()) {
      if (handle.kind === 'file') {
        const li = document.createElement('li');
        const title = name.replace('.txt', '');

        li.innerHTML = `
          <span style="cursor: pointer" data-title="${title}">${title}</span>
          <button data-delete="${title}">Supprimer</button>
        `;

        notesList.appendChild(li);
      }
    }

    // Event listeners
    document.querySelectorAll('[data-title]').forEach(el => {
      el.addEventListener('click', () => this.loadNote(el.dataset.title));
    });

    document.querySelectorAll('[data-delete]').forEach(el => {
      el.addEventListener('click', () => this.deleteNote(el.dataset.delete));
    });
  }

  newNote() {
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    this.currentNote = null;
  }
}

// Initialisation
const app = new NoteApp();
app.init();

document.getElementById('save-btn').addEventListener('click', () => app.saveNote());
document.getElementById('new-btn').addEventListener('click', () => app.newNote());
```
</details>

---

**🎉 Vous maîtrisez OPFS ! Passez au quiz.**
