# Entrées-Sorties - Katas

## Niveau Débutant (Entrées-Sorties de Base)

### Kata 1: Calculatrice Interactive
**Objectif:** Créer une calculatrice simple qui demande deux nombres et une opération à l'utilisateur.

**Exigences:**
- Demander le premier nombre
- Demander l'opération (+, -, *, /)
- Demander le second nombre
- Afficher le résultat

**Signature de la Fonction:**
```javascript
function calculatriceInteractive() {
    // Votre code ici
}
```

**Exemple d'Exécution:**
```
Premier nombre: 10
Opération (+, -, *, /): +
Deuxième nombre: 5
Résultat: 10 + 5 = 15
```

---

### Kata 2: Validateur d'Âge
**Objectif:** Demander l'âge à l'utilisateur et valider qu'il est correct.

**Exigences:**
- Redemander jusqu'à obtenir un âge valide (0-120)
- Classer par catégorie (enfant, adolescent, adulte, senior)
- Afficher un message personnalisé

**Signature de la Fonction:**
```javascript
function validateurAge() {
    // Votre code ici
}
```

**Cas de Test:**
```
Âge invalide (texte, négatif, >120) → "Veuillez entrer un âge valide"
0-12 → "Vous êtes un enfant"
13-17 → "Vous êtes un adolescent"  
18-64 → "Vous êtes un adulte"
65+ → "Vous êtes un senior"
```

---

### Kata 3: Journal Personnel
**Objectif:** Créer un système pour sauvegarder et afficher des entrées de journal.

**Exigences:**
- Demander une entrée de journal
- Sauvegarder avec timestamp en localStorage
- Permettre d'afficher toutes les entrées
- Option pour effacer le journal

**Signature de la Fonction:**
```javascript
function journalPersonnel() {
    // Votre code ici
}
```

**Fonctionnalités:**
- Écrire une entrée
- Lire toutes les entrées
- Effacer le journal
- Quitter

---

### Kata 4: Générateur de Mots de Passe
**Objectif:** Générer des mots de passe selon les préférences utilisateur.

**Exigences:**
- Demander la longueur souhaitée
- Demander les types de caractères (majuscules, minuscules, chiffres, symboles)
- Générer et afficher le mot de passe
- Demander si l'utilisateur veut sauvegarder

**Signature de la Fonction:**
```javascript
function generateurMotDePasse() {
    // Votre code ici
}
```

**Options:**
```
Longueur: 8-50 caractères
Inclure majuscules: o/n
Inclure minuscules: o/n
Inclure chiffres: o/n
Inclure symboles: o/n
```

---

## Niveau Intermédiaire (Formulaires et Validation)

### Kata 5: Formulaire d'Inscription Complet
**Objectif:** Créer un formulaire d'inscription avec validation complète.

**Exigences HTML:**
```html
<form id="inscription">
    <input type="text" id="nom" placeholder="Nom complet" required>
    <input type="email" id="email" placeholder="Email" required>
    <input type="password" id="motdepasse" placeholder="Mot de passe" required>
    <input type="password" id="confirmer" placeholder="Confirmer mot de passe" required>
    <input type="date" id="naissance" required>
    <select id="pays" required>
        <option value="">Sélectionner un pays</option>
        <option value="fr">France</option>
        <option value="be">Belgique</option>
        <option value="ch">Suisse</option>
    </select>
    <input type="checkbox" id="conditions" required>
    <label for="conditions">J'accepte les conditions</label>
    <button type="submit">S'inscrire</button>
</form>
<div id="erreurs"></div>
```

**Signature de la Fonction:**
```javascript
function configurerFormulaireInscription() {
    // Votre code ici - validation en temps réel et à la soumission
}
```

**Validations:**
- Nom: minimum 2 caractères
- Email: format valide
- Mot de passe: minimum 8 caractères, 1 majuscule, 1 chiffre
- Confirmation: identique au mot de passe
- Date: âge minimum 13 ans
- Conditions: acceptées

---

### Kata 6: Système de Recherche en Temps Réel
**Objectif:** Implémenter une recherche avec suggestions et debouncing.

**Données d'Exemple:**
```javascript
const utilisateurs = [
    {id: 1, nom: "Alice Dubois", email: "alice@example.com", ville: "Paris"},
    {id: 2, nom: "Bob Martin", email: "bob@example.com", ville: "Lyon"},
    {id: 3, nom: "Claire Bernard", email: "claire@example.com", ville: "Marseille"},
    // ... plus d'utilisateurs
];
```

**HTML de Base:**
```html
<input type="text" id="recherche" placeholder="Rechercher un utilisateur...">
<div id="suggestions"></div>
<div id="resultats"></div>
```

**Signature de la Fonction:**
```javascript
function systemeRecherche(donnees) {
    // Implémenter recherche avec debouncing
    // Afficher suggestions pendant la frappe
    // Permettre sélection avec clavier (flèches + Enter)
}
```

**Fonctionnalités:**
- Debouncing 300ms
- Recherche par nom, email, ville
- Maximum 5 suggestions
- Navigation au clavier
- Mise en surbrillance du terme recherché

---

### Kata 7: Gestionnaire de Tâches Local
**Objectif:** Créer un gestionnaire de tâches avec persistance localStorage.

**Fonctionnalités:**
- Ajouter des tâches
- Marquer comme terminées
- Supprimer des tâches
- Filtrer (toutes, actives, terminées)
- Persistance locale

**HTML de Base:**
```html
<input type="text" id="nouvelleTache" placeholder="Nouvelle tâche...">
<button id="ajouter">Ajouter</button>
<div id="filtres">
    <button data-filtre="toutes">Toutes</button>
    <button data-filtre="actives">Actives</button>
    <button data-filtre="terminees">Terminées</button>
</div>
<ul id="listeTaches"></ul>
<div id="stats"></div>
```

**Signature de la Fonction:**
```javascript
function gestionnaireTaches() {
    // Votre implémentation complète
}
```

**Statistiques à Afficher:**
- Nombre total de tâches
- Tâches actives
- Tâches terminées
- Pourcentage de completion

---

### Kata 8: Lecteur/Exporteur de CSV
**Objectif:** Lire et traiter des fichiers CSV, permettre l'exportation.

**Fonctionnalités:**
- Lecture de fichier CSV sélectionné
- Affichage des données dans un tableau
- Filtrage et tri
- Export des données filtrées

**HTML de Base:**
```html
<input type="file" id="fichierCSV" accept=".csv">
<div id="controles">
    <input type="text" id="filtrer" placeholder="Filtrer les données...">
    <select id="trier">
        <option value="">Trier par...</option>
    </select>
    <button id="exporter">Exporter CSV</button>
</div>
<table id="tableau"></table>
```

**Signature de la Fonction:**
```javascript
function lecteurCSV() {
    // Parser CSV
    // Afficher dans tableau
    // Implémenter filtrage et tri
    // Permettre export
}
```

**Format CSV d'Exemple:**
```csv
nom,email,age,ville
Alice Dubois,alice@example.com,25,Paris
Bob Martin,bob@example.com,30,Lyon
```

---

## Niveau Avancé (APIs et Node.js)

### Kata 9: Client API Météo
**Objectif:** Créer un client pour une API météo avec cache et gestion d'erreurs.

**Fonctionnalités:**
- Recherche par ville
- Affichage des conditions actuelles
- Prévisions sur 5 jours
- Cache des résultats (localStorage)
- Gestion des erreurs réseau

**HTML de Base:**
```html
<input type="text" id="ville" placeholder="Nom de la ville">
<button id="rechercher">Rechercher</button>
<div id="chargement" style="display: none;">Chargement...</div>
<div id="erreur" style="display: none;"></div>
<div id="meteo"></div>
```

**Signature de la Fonction:**
```javascript
async function clientMeteo() {
    // Utiliser une API comme OpenWeatherMap
    // Implémenter cache avec expiration
    // Gestion d'erreurs robuste
    // Interface utilisateur responsive
}
```

**Gestion du Cache:**
- Durée de vie: 10 minutes
- Stockage par ville
- Invalidation automatique

---

### Kata 10: Outil CLI Node.js - Analyseur de Logs
**Objectif:** Créer un outil en ligne de commande pour analyser des fichiers de logs.

**Utilisation:**
```bash
node analyseur-logs.js fichier.log --format=apache --top=10
```

**Fonctionnalités:**
- Lecture de fichiers de logs volumineux
- Parsing de différents formats (Apache, Nginx, custom)
- Statistiques (IPs plus fréquentes, codes d'erreur, etc.)
- Export en JSON/CSV

**Signature de la Fonction:**
```javascript
function analyseurLogs() {
    // Parser arguments ligne de commande
    // Lire fichier par streams
    // Analyser et calculer statistiques
    // Afficher résultats formatés
}
```

**Statistiques à Générer:**
- Top 10 des IPs
- Codes de statut HTTP
- Pages les plus visitées
- Erreurs 404
- Trafic par heure

---

### Kata 11: Synchronisateur de Données
**Objectif:** Synchroniser des données entre localStorage et une API REST.

**Fonctionnalités:**
- Détection des changements locaux
- Synchronisation bidirectionnelle
- Gestion des conflits
- Mode hors ligne

**Signature de la Fonction:**
```javascript
class SynchronisateurDonnees {
    constructor(apiUrl, endpoint) {
        // Configuration
    }
    
    async synchroniser() {
        // Logique de synchronisation
    }
    
    async envoyerChangements() {
        // Push des modifications locales
    }
    
    async recevoirChangements() {
        // Pull des modifications serveur
    }
    
    resoudreConflits(local, distant) {
        // Stratégie de résolution
    }
}
```

**Cas d'Usage:**
- Application de notes
- Liste de tâches collaborative
- Contacts partagés

---

### Kata 12: Générateur de Rapports
**Objectif:** Générer des rapports personnalisés à partir de données JSON.

**Fonctionnalités:**
- Import de données JSON
- Sélection de champs
- Calculs automatiques (somme, moyenne, etc.)
- Export en CSV, PDF, ou affichage web

**Structure de Données d'Exemple:**
```json
{
  "ventes": [
    {"date": "2023-01-01", "produit": "Laptop", "quantite": 2, "prix": 1200},
    {"date": "2023-01-02", "produit": "Souris", "quantite": 5, "prix": 25},
    {"date": "2023-01-03", "produit": "Laptop", "quantite": 1, "prix": 1200}
  ]
}
```

**HTML de Base:**
```html
<input type="file" id="donnees" accept=".json">
<div id="configuration">
    <h3>Champs à inclure:</h3>
    <div id="champsDispo"></div>
    <h3>Calculs:</h3>
    <div id="calculs"></div>
</div>
<button id="generer">Générer Rapport</button>
<div id="rapport"></div>
```

**Signature de la Fonction:**
```javascript
function generateurRapports() {
    // Parser JSON
    // Interface configuration
    // Calculs dynamiques
    // Export multiple formats
}
```

---

## Niveau Expert (Applications Complexes)

### Kata 13: Éditeur de Configuration JSON
**Objectif:** Créer un éditeur visuel pour fichiers de configuration JSON.

**Fonctionnalités:**
- Interface graphique pour éditer JSON
- Validation en temps réel
- Autocomplétion des propriétés
- Historique des modifications
- Export/Import

**Exemple de Configuration:**
```json
{
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "myapp",
    "credentials": {
      "username": "user",
      "password": "pass"
    }
  },
  "features": {
    "auth": true,
    "logging": "debug",
    "caching": false
  }
}
```

**Interface:**
- Arbre des propriétés
- Éditeur de valeurs typées
- Ajout/suppression de propriétés
- Validation de schéma

---

### Kata 14: Système de Chat en Temps Réel
**Objectif:** Implémenter un chat avec WebSockets et persistance.

**Fonctionnalités:**
- Messages en temps réel
- Salles multiples
- Historique des messages
- Notifications
- États de présence

**Architecture:**
- Frontend: Interface chat
- Backend: Serveur WebSocket (Node.js)
- Persistance: Fichiers JSON ou base de données

**Signature Frontend:**
```javascript
class ChatClient {
    constructor(serverUrl) {}
    
    connecter(pseudo) {}
    rejoindreSalle(salle) {}
    envoyerMessage(message) {}
    recevoirMessage(callback) {}
    deconnecter() {}
}
```

**Signature Backend:**
```javascript
class ChatServer {
    constructor(port) {}
    
    demarrer() {}
    gererConnexion(socket) {}
    diffuserMessage(salle, message) {}
    sauvegarderMessage(message) {}
}
```

---

### Kata 15: Outil de Backup et Restore
**Objectif:** Créer un système de sauvegarde et restauration de données.

**Fonctionnalités Node.js:**
- Sauvegarde de dossiers
- Compression des archives
- Planification automatique
- Restauration sélective
- Vérification d'intégrité

**Utilisation:**
```bash
node backup-tool.js backup --source=/home/user --dest=/backups --compress
node backup-tool.js restore --archive=backup-2023-12-25.tar.gz --dest=/restore
node backup-tool.js schedule --cron="0 2 * * *" --source=/data
```

**Signature de la Fonction:**
```javascript
class BackupTool {
    backup(source, destination, options) {}
    restore(archive, destination, options) {}
    schedule(cronExpr, backupConfig) {}
    verify(archive) {}
    list(archive) {}
}
```

**Options Avancées:**
- Backup incrémentiel
- Exclusion de fichiers
- Chiffrement
- Notification par email

---

### Kata 16: Moniteur de Performance Web
**Objectif:** Analyser et surveiller les performances d'un site web.

**Métriques à Collecter:**
- Temps de chargement des pages
- Taille des ressources
- Erreurs JavaScript
- Interactions utilisateur
- Performance réseau

**Fonctionnalités:**
- Collecte automatique de métriques
- Tableau de bord en temps réel
- Alertes sur seuils
- Export des données
- Comparaisons historiques

**Structure des Données:**
```javascript
const metriques = {
    timestamp: Date.now(),
    page: window.location.pathname,
    loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
    resources: performance.getEntriesByType('resource'),
    errors: [],
    interactions: []
};
```

**Signature de la Fonction:**
```javascript
class MoniteurPerformance {
    constructor(config) {}
    
    demarrerCollecte() {}
    enregistrerMetrique(type, data) {}
    genererRapport(periode) {}
    configurerAlertes(seuils) {}
    exporterDonnees(format) {}
}
```

---

## Conseils de Pratique

### Pour les Débutants
1. **Maîtrisez les bases** : prompt, alert, console.log
2. **Validez toujours** : Vérifiez les entrées utilisateur
3. **Gérez les erreurs** : Que se passe-t-il si l'utilisateur annule ?
4. **Testez les cas limites** : Chaînes vides, valeurs nulles

### Pour les Intermédiaires
1. **Explorez les événements** : input, change, submit
2. **Pratiquez localStorage** : Persistance des données
3. **Implémentez la validation** : Temps réel et à la soumission
4. **Débogguez efficacement** : Console, Network tab, breakpoints

### Pour les Avancés
1. **Maîtrisez les APIs** : fetch, async/await, gestion d'erreurs
2. **Optimisez les performances** : debouncing, caching, streams
3. **Sécurisez les entrées** : validation, échappement, sanitisation
4. **Architecture modulaire** : Classes, modules, séparation des responsabilités

### Stratégies de Test
1. **Test des entrées** : Valides, invalides, limites
2. **Test des interfaces** : Différents navigateurs, tailles d'écran
3. **Test de performance** : Grandes quantités de données
4. **Test d'erreur** : Réseau coupé, serveur indisponible

### Parcours d'Apprentissage
- **Semaine 1** : Katas 1-4 (Bases des I/O)
- **Semaine 2** : Katas 5-8 (Formulaires et validation)
- **Semaine 3** : Katas 9-12 (APIs et Node.js)
- **Semaine 4+** : Katas 13-16 (Applications complexes)

### Ressources Utiles
- MDN Web Docs pour les APIs navigateur
- Node.js documentation pour côté serveur
- JSONPlaceholder pour tester les APIs
- Regex101 pour tester les expressions régulières