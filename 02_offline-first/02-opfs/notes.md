# 📁 OPFS : Origin Private File System

## 📋 Vue d'ensemble

**OPFS** (Origin Private File System) est une API moderne qui permet de lire et d'écrire des fichiers directement dans le navigateur avec des performances optimales. Contrairement à IndexedDB, OPFS est conçu spécifiquement pour manipuler des fichiers.

### 🎯 Objectifs d'apprentissage

- Comprendre les différences entre OPFS et IndexedDB
- Lire et écrire des fichiers avec l'API File System Access
- Gérer les répertoires et hiérarchies de fichiers
- Utiliser l'accès synchrone dans les Web Workers
- Créer un éditeur de notes local

---

## 🤔 OPFS vs IndexedDB

### Comparaison

| Critère | IndexedDB | OPFS |
|---------|-----------|------|
| **Type de données** | Objets structurés | Fichiers binaires |
| **Cas d'usage** | Bases de données, cache | Médias, documents, gros fichiers |
| **API** | Transactions, stores | Fichiers, répertoires |
| **Performance** | Bonne pour objets | Excellente pour fichiers |
| **Requêtes** | Index, ranges | Aucune (accès direct) |
| **Taille** | ~50 MB - GB | ~GB (illimité*) |

*Selon quotas du navigateur

### ✅ Quand utiliser OPFS ?

- 📝 Éditeurs de texte/code
- 🎨 Applications de dessin/design
- 📹 Traitement de médias (vidéo, audio, images)
- 📊 Export/import de gros fichiers
- 🗂️ Gestionnaires de fichiers

### ✅ Quand utiliser IndexedDB ?

- 🗃️ Données structurées (objets, tableaux)
- 🔍 Requêtes avec index
- 📦 Cache API avec métadonnées
- 🔄 Synchronisation de données

---

## 🏗️ Architecture d'OPFS

### Hiérarchie

```
Origin Private File System (privé à l'origine)
  │
  ├─ notes/
  │   ├─ note1.txt
  │   ├─ note2.md
  │   └─ drafts/
  │       └─ draft1.txt
  │
  └─ images/
      ├─ photo1.jpg
      └─ photo2.png
```

### 📚 Concepts clés

1. **FileSystemDirectoryHandle** : Référence à un répertoire
2. **FileSystemFileHandle** : Référence à un fichier
3. **FileSystemWritableFileStream** : Stream d'écriture
4. **Access synchrone** : Version synchrone dans Web Workers (ultra-rapide)

---

## 🚀 Premiers Pas : Accéder à OPFS

### Obtenir le répertoire racine

```javascript
// Accès asynchrone (thread principal)
const root = await navigator.storage.getDirectory();
console.log('Répertoire racine OPFS:', root);
```

**Important :** OPFS est **privé à l'origine**. Les données ne sont accessibles que par votre domaine, pas par l'utilisateur via l'explorateur de fichiers.

---

## 📁 Créer et Gérer des Fichiers

### Créer un fichier

```javascript
async function createFile() {
  // 1. Accéder au répertoire racine
  const root = await navigator.storage.getDirectory();

  // 2. Créer (ou obtenir) un fichier
  const fileHandle = await root.getFileHandle('note.txt', { create: true });

  console.log('Fichier créé:', fileHandle.name);
}

createFile();
```

### Écrire dans un fichier

```javascript
async function writeFile(fileName, content) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName, { create: true });

  // 1. Créer un stream d'écriture
  const writable = await fileHandle.createWritable();

  // 2. Écrire le contenu
  await writable.write(content);

  // 3. Fermer le stream (important !)
  await writable.close();

  console.log('Fichier écrit avec succès');
}

// Utilisation
await writeFile('hello.txt', 'Hello, OPFS!');
```

### Lire un fichier

```javascript
async function readFile(fileName) {
  const root = await navigator.storage.getDirectory();

  try {
    const fileHandle = await root.getFileHandle(fileName);

    // 1. Obtenir l'objet File
    const file = await fileHandle.getFile();

    // 2. Lire le contenu
    const content = await file.text();

    console.log('Contenu:', content);
    return content;
  } catch (error) {
    console.error('Fichier non trouvé:', error);
  }
}

// Utilisation
const content = await readFile('hello.txt');
```

---

## 🗂️ Gérer les Répertoires

### Créer un répertoire

```javascript
async function createDirectory(dirName) {
  const root = await navigator.storage.getDirectory();
  const dirHandle = await root.getDirectoryHandle(dirName, { create: true });

  console.log('Répertoire créé:', dirHandle.name);
  return dirHandle;
}

// Utilisation
await createDirectory('notes');
```

### Créer un fichier dans un sous-répertoire

```javascript
async function createFileInDir(dirName, fileName, content) {
  const root = await navigator.storage.getDirectory();

  // 1. Accéder au répertoire
  const dirHandle = await root.getDirectoryHandle(dirName, { create: true });

  // 2. Créer le fichier
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });

  // 3. Écrire le contenu
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();

  console.log(`Fichier créé: ${dirName}/${fileName}`);
}

// Utilisation
await createFileInDir('notes', 'note1.txt', 'Ma première note');
```

---

## 📋 Lister les Fichiers et Répertoires

### Lister le contenu d'un répertoire

```javascript
async function listDirectory(dirHandle) {
  const entries = [];

  // Itérer sur les entrées
  for await (const [name, handle] of dirHandle.entries()) {
    const type = handle.kind; // "file" ou "directory"
    entries.push({ name, type });
  }

  console.log('Contenu du répertoire:', entries);
  return entries;
}

// Utilisation
const root = await navigator.storage.getDirectory();
await listDirectory(root);
```

### Parcourir récursivement

```javascript
async function listRecursive(dirHandle, path = '') {
  for await (const [name, handle] of dirHandle.entries()) {
    const fullPath = path ? `${path}/${name}` : name;

    if (handle.kind === 'file') {
      console.log('📄', fullPath);
    } else {
      console.log('📁', fullPath);
      await listRecursive(handle, fullPath);
    }
  }
}

// Utilisation
const root = await navigator.storage.getDirectory();
await listRecursive(root);
```

---

## 🗑️ Supprimer des Fichiers et Répertoires

### Supprimer un fichier

```javascript
async function deleteFile(fileName) {
  const root = await navigator.storage.getDirectory();
  await root.removeEntry(fileName);

  console.log('Fichier supprimé:', fileName);
}

// Utilisation
await deleteFile('hello.txt');
```

### Supprimer un répertoire (récursif)

```javascript
async function deleteDirectory(dirName) {
  const root = await navigator.storage.getDirectory();
  await root.removeEntry(dirName, { recursive: true });

  console.log('Répertoire supprimé:', dirName);
}

// Utilisation
await deleteDirectory('notes');
```

---

## 📝 Opérations Avancées

### Écrire plusieurs données

```javascript
async function writeMultiple(fileName) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();

  // Écrire plusieurs morceaux
  await writable.write('Ligne 1\n');
  await writable.write('Ligne 2\n');
  await writable.write('Ligne 3\n');

  await writable.close();
}
```

### Écrire à une position spécifique (seek)

```javascript
async function writeAt(fileName, content, position) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable({ keepExistingData: true });

  // Se déplacer à la position
  await writable.seek(position);

  // Écrire
  await writable.write(content);

  await writable.close();
}

// Utilisation : écrire "HELLO" à la position 10
await writeAt('test.txt', 'HELLO', 10);
```

### Tronquer un fichier

```javascript
async function truncateFile(fileName, size) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName);
  const writable = await fileHandle.createWritable({ keepExistingData: true });

  // Tronquer à la taille spécifiée
  await writable.truncate(size);

  await writable.close();
}

// Utilisation : garder seulement les 100 premiers octets
await truncateFile('big.txt', 100);
```

---

## ⚡ Accès Synchrone (Web Workers)

Dans les **Web Workers**, OPFS offre une version **synchrone** ultra-rapide.

### Worker avec accès synchrone

```javascript
// worker.js
self.onmessage = async (event) => {
  const { fileName, content } = event.data;

  // 1. Accéder au répertoire racine
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName, { create: true });

  // 2. Créer un accès synchrone
  const syncHandle = await fileHandle.createSyncAccessHandle();

  // 3. Écrire de manière synchrone (RAPIDE!)
  const encoder = new TextEncoder();
  const data = encoder.encode(content);

  syncHandle.write(data);
  syncHandle.flush();
  syncHandle.close();

  self.postMessage({ success: true });
};
```

### Utilisation depuis le thread principal

```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({
  fileName: 'fast.txt',
  content: 'Écriture ultra-rapide!'
});

worker.onmessage = (event) => {
  console.log('Fichier écrit:', event.data);
};
```

**Avantages :**
- ⚡ Performances maximales (pas de overhead async)
- 🔒 Accès exclusif au fichier
- 🚀 Idéal pour traitement intensif

---

## 📊 Métadonnées et Tailles

### Obtenir la taille d'un fichier

```javascript
async function getFileSize(fileName) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(fileName);
  const file = await fileHandle.getFile();

  console.log('Taille:', file.size, 'octets');
  console.log('Type:', file.type);
  console.log('Dernière modification:', file.lastModified);

  return file.size;
}
```

### Vérifier si un fichier existe

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
  console.log('Fichier existe');
}
```

---

## 🎁 Classe Helper Complète

```javascript
class OPFSHelper {
  constructor() {
    this.root = null;
  }

  async init() {
    this.root = await navigator.storage.getDirectory();
  }

  async writeFile(path, content) {
    const fileHandle = await this.root.getFileHandle(path, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  }

  async readFile(path) {
    const fileHandle = await this.root.getFileHandle(path);
    const file = await fileHandle.getFile();
    return await file.text();
  }

  async deleteFile(path) {
    await this.root.removeEntry(path);
  }

  async listFiles() {
    const files = [];
    for await (const [name, handle] of this.root.entries()) {
      if (handle.kind === 'file') {
        files.push(name);
      }
    }
    return files;
  }

  async createDirectory(dirName) {
    return await this.root.getDirectoryHandle(dirName, { create: true });
  }

  async fileExists(path) {
    try {
      await this.root.getFileHandle(path);
      return true;
    } catch {
      return false;
    }
  }
}

// Utilisation
const opfs = new OPFSHelper();
await opfs.init();

await opfs.writeFile('note.txt', 'Hello OPFS!');
const content = await opfs.readFile('note.txt');
console.log(content);

const files = await opfs.listFiles();
console.log('Fichiers:', files);
```

---

## 🛡️ Gestion des Erreurs

### Erreurs courantes

```javascript
async function safeRead(fileName) {
  const root = await navigator.storage.getDirectory();

  try {
    const fileHandle = await root.getFileHandle(fileName);
    const file = await fileHandle.getFile();
    return await file.text();
  } catch (error) {
    if (error.name === 'NotFoundError') {
      console.error('Fichier inexistant');
      return null;
    } else if (error.name === 'NotAllowedError') {
      console.error('Accès refusé');
      return null;
    } else {
      throw error;
    }
  }
}
```

---

## 📦 Cas d'Usage Réels

### 1. Éditeur de Notes

```javascript
class NoteEditor {
  constructor() {
    this.opfs = new OPFSHelper();
  }

  async init() {
    await this.opfs.init();
    await this.opfs.createDirectory('notes');
  }

  async saveNote(title, content) {
    const fileName = `notes/${title}.md`;
    await this.opfs.writeFile(fileName, content);
  }

  async loadNote(title) {
    const fileName = `notes/${title}.md`;
    return await this.opfs.readFile(fileName);
  }

  async listNotes() {
    const dirHandle = await this.opfs.root.getDirectoryHandle('notes');
    const notes = [];

    for await (const [name, handle] of dirHandle.entries()) {
      if (handle.kind === 'file') {
        notes.push(name.replace('.md', ''));
      }
    }

    return notes;
  }
}
```

### 2. Cache d'Images

```javascript
async function cacheImage(url) {
  const response = await fetch(url);
  const blob = await response.blob();

  const root = await navigator.storage.getDirectory();
  const dirHandle = await root.getDirectoryHandle('images', { create: true });

  const fileName = url.split('/').pop();
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });

  const writable = await fileHandle.createWritable();
  await writable.write(blob);
  await writable.close();

  console.log('Image mise en cache:', fileName);
}

async function loadCachedImage(fileName) {
  const root = await navigator.storage.getDirectory();
  const dirHandle = await root.getDirectoryHandle('images');
  const fileHandle = await dirHandle.getFileHandle(fileName);
  const file = await fileHandle.getFile();

  return URL.createObjectURL(file);
}
```

---

## 🧹 Bonnes Pratiques

### 1. Toujours fermer les streams

```javascript
// ✅ Bon
const writable = await fileHandle.createWritable();
await writable.write(content);
await writable.close(); // Important !

// ❌ Mauvais
const writable = await fileHandle.createWritable();
await writable.write(content);
// Oubli de close() → fuite de ressources
```

### 2. Utiliser des chemins relatifs

```javascript
// ✅ Bon : hiérarchie claire
await opfs.writeFile('projects/app/src/index.js', code);

// ❌ Éviter : fichiers plats
await opfs.writeFile('projects_app_src_index.js', code);
```

### 3. Gérer les quotas

```javascript
async function checkQuota() {
  const estimate = await navigator.storage.estimate();
  const percentUsed = (estimate.usage / estimate.quota) * 100;

  console.log(`Stockage utilisé: ${percentUsed.toFixed(2)}%`);
  console.log(`Usage: ${estimate.usage} / ${estimate.quota} octets`);

  if (percentUsed > 80) {
    console.warn('Quota presque plein !');
  }
}
```

---

## 🎯 Résumé

### Concepts clés

- **OPFS** = système de fichiers privé pour l'origine
- **FileHandle** = référence à un fichier
- **DirectoryHandle** = référence à un répertoire
- **Writable Stream** = écriture asynchrone
- **SyncAccessHandle** = accès synchrone (Web Workers)

### Opérations essentielles

```javascript
// Lire
const content = await (await fileHandle.getFile()).text();

// Écrire
const writable = await fileHandle.createWritable();
await writable.write(content);
await writable.close();

// Lister
for await (const [name, handle] of dirHandle.entries()) { ... }

// Supprimer
await dirHandle.removeEntry(name);
```

---

## 🔗 Ressources

- [MDN - File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)
- [OPFS Explorer](https://opfs-explorer.vercel.app/) - Outil de debug
- [Web.dev - Origin Private File System](https://web.dev/origin-private-file-system/)

---

**Prochaine étape :** Pratiquez avec `katas.md` !
