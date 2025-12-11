# 📝 Micro-Project 2 : Notes Collaboratives

**Durée estimée :** 90-120 minutes
**Modules combinés :** OPFS + CRDT + Offline UX
**Niveau :** ⭐⭐⭐ Avancé

---

## 🎯 Objectif

Créer un éditeur de notes qui sauvegarde dans OPFS et utilise des CRDTs pour fusionner des modifications concurrentes.

---

## 📋 Fonctionnalités

- [ ] Créer/Éditer/Supprimer des notes
- [ ] Sauvegarde automatique dans OPFS
- [ ] Liste de notes persistantes
- [ ] Simulation de 2 instances (2 onglets)
- [ ] Fusion automatique avec LWW-Register
- [ ] Export/Import manuel (copier-coller JSON)

---

## 🏗️ Architecture

```
NotesApp
  ├─ OPFS (stockage fichiers)
  ├─ LWWMap (CRDT pour métadonnées)
  ├─ UI (éditeur + liste)
  └─ Sync Manual (export/import JSON)
```

---

## 💡 Concept

Chaque note a :
- **Contenu** sauvegardé dans OPFS (fichier .md)
- **Métadonnées** dans un LWW-Map (titre, timestamp, auteur)

---

## 🚀 Template de Démarrage

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Notes Collaboratives</title>
  <style>
    body {
      font-family: Arial;
      display: grid;
      grid-template-columns: 250px 1fr;
      height: 100vh;
      margin: 0;
    }
    .sidebar {
      background: #f5f5f5;
      padding: 20px;
      border-right: 1px solid #ccc;
      overflow-y: auto;
    }
    .main {
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
    .note-item {
      padding: 10px;
      margin: 5px 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    .note-item:hover {
      background: #e9ecef;
    }
    .note-item.active {
      background: #007bff;
      color: white;
    }
    textarea {
      flex: 1;
      padding: 10px;
      font-family: monospace;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="sidebar">
    <h2>📝 Notes</h2>
    <button id="new-note-btn">+ Nouvelle note</button>
    <div id="notes-list"></div>

    <hr>
    <h3>🔄 Sync</h3>
    <button id="export-btn">📤 Exporter</button>
    <button id="import-btn">📥 Importer</button>
    <textarea id="sync-data" rows="5" placeholder="Coller JSON ici pour importer"></textarea>
  </div>

  <div class="main">
    <input type="text" id="note-title" placeholder="Titre de la note" style="padding: 10px; margin-bottom: 10px;">
    <textarea id="note-content" placeholder="Commencez à écrire..."></textarea>
    <div style="margin-top: 10px;">
      <button id="save-btn">💾 Sauvegarder</button>
      <button id="delete-btn" style="background: #dc3545; color: white;">🗑️ Supprimer</button>
      <span id="save-status" style="margin-left: 20px; color: #666;"></span>
    </div>
  </div>

  <script type="module" src="app.js"></script>
</body>
</html>
```

---

## 📝 Structure de Code

### Classe OPFS Helper

```javascript
class NotesStorage {
  async init() {
    this.root = await navigator.storage.getDirectory();
    this.notesDir = await this.root.getDirectoryHandle('notes', { create: true });
  }

  async saveNote(id, content) {
    const fileHandle = await this.notesDir.getFileHandle(`${id}.md`, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  }

  async loadNote(id) {
    const fileHandle = await this.notesDir.getFileHandle(`${id}.md`);
    const file = await fileHandle.getFile();
    return await file.text();
  }

  async deleteNote(id) {
    await this.notesDir.removeEntry(`${id}.md`);
  }

  async listNotes() {
    const notes = [];
    for await (const [name, handle] of this.notesDir.entries()) {
      if (handle.kind === 'file') {
        notes.push(name.replace('.md', ''));
      }
    }
    return notes;
  }
}
```

### Classe CRDT pour Métadonnées

```javascript
class NoteMetadata {
  constructor(clientId) {
    this.clientId = clientId;
    this.notes = new LWWMap(clientId); // { id: { title, author, timestamp } }
  }

  createNote(id, title) {
    this.notes.set(id, {
      title,
      author: this.clientId,
      createdAt: Date.now()
    });
  }

  updateNote(id, title) {
    this.notes.set(id, {
      title,
      author: this.clientId,
      updatedAt: Date.now()
    });
  }

  deleteNote(id) {
    this.notes.set(id, { deleted: true });
  }

  getAllNotes() {
    const allNotes = [];
    for (const [id, metadata] of this.notes.map.entries()) {
      const data = this.notes.get(id);
      if (!data.deleted) {
        allNotes.push({ id, ...data });
      }
    }
    return allNotes;
  }

  merge(otherMetadata) {
    this.notes.merge(otherMetadata.notes);
  }

  toJSON() {
    return this.notes.toJSON();
  }

  fromJSON(data) {
    this.notes.fromJSON(data);
  }
}
```

---

## 🎯 Étapes de Développement

1. **Implémenter OPFS** (20 min) : Sauvegarde/chargement de fichiers .md
2. **Implémenter LWW-Map** (20 min) : Métadonnées des notes
3. **UI** (30 min) : Créer/Éditer/Supprimer
4. **Export/Import** (20 min) : Copier-coller JSON pour sync manuelle
5. **Test** (10 min) : Ouvrir 2 onglets, modifier, fusionner

---

## ✅ Critères de Réussite

- Les notes persistent dans OPFS après rechargement
- Deux onglets peuvent éditer et fusionner leurs métadonnées
- Export/Import JSON fonctionne correctement
- Pas de perte de données lors de la fusion

---

## 🎉 Challenge Bonus

Remplacez le sync manuel par du **P2P automatique** avec Trystero !

---

**Bon code ! 🚀**
