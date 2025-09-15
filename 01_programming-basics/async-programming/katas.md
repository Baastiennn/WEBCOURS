# Programmation Asynchrone - Katas

## Niveau Débutant (Promises et Async/Await Basique)

### Kata 1: Simulateur de Retards
**Objectif:** Créer des fonctions utilitaires pour simuler des opérations asynchrones.

**Fonctionnalités:**
- Délai configurable
- Simulation d'échecs aléatoires
- Messages de progression
- Annulation possible

**Signature de la Fonction:**
```javascript
class SimulateurRetards {
    static delay(ms) {
        // Créer une Promise qui se résout après ms millisecondes
    }

    static delayWithValue(ms, value) {
        // Retourner une valeur après un délai
    }

    static randomDelay(minMs, maxMs) {
        // Délai aléatoire entre min et max
    }

    static unreliableOperation(successRate = 0.7, ms = 1000) {
        // Opération qui échoue parfois selon le taux de succès
    }

    static operationWithProgress(totalMs, intervalMs, onProgress) {
        // Opération avec callbacks de progression
    }

    static cancellableDelay(ms) {
        // Retourner {promise, cancel} pour annulation
    }
}
```

**Cas de Test:**
```javascript
// Délai simple
await SimulateurRetards.delay(1000);
console.log('1 seconde écoulée');

// Opération non fiable
try {
    const resultat = await SimulateurRetards.unreliableOperation(0.5, 500);
    console.log('Succès:', resultat);
} catch (error) {
    console.log('Échec:', error.message);
}

// Avec progression
const operation = SimulateurRetards.operationWithProgress(3000, 500, (progress) => {
    console.log(`Progression: ${progress}%`);
});
await operation;
```

---

### Kata 2: Gestionnaire de Promesses
**Objectif:** Créer un gestionnaire pour orchestrer des Promises complexes.

**Fonctionnalités:**
- Exécution en série ou parallèle
- Gestion des échecs partiels
- Timeout globaux
- Retry automatique

**Signature de la Fonction:**
```javascript
class GestionnairePromises {
    constructor(options = {}) {
        this.timeout = options.timeout || 30000;
        this.maxRetries = options.maxRetries || 3;
    }

    async serie(promises) {
        // Exécuter les Promises en séquence
    }

    async parallele(promises) {
        // Exécuter les Promises en parallèle
    }

    async partiellementParallele(promises, concurrency = 3) {
        // Limiter le nombre de Promises simultanées
    }

    async avecTimeout(promise, timeoutMs = this.timeout) {
        // Ajouter un timeout à une Promise
    }

    async avecRetry(promiseFactory, maxRetries = this.maxRetries) {
        // Retry automatique en cas d'échec
    }

    async mapAvecConcurrence(items, asyncFn, concurrency = 3) {
        // Map asynchrone avec limitation de concurrence
    }
}
```

**Cas de Test:**
```javascript
const gestionnaire = new GestionnairePromises({timeout: 5000, maxRetries: 2});

// Série
const resultatsS = await gestionnaire.serie([
    () => fetch('/api/users'),
    () => fetch('/api/posts'),
    () => fetch('/api/comments')
]);

// Parallèle avec limitation
const items = [1, 2, 3, 4, 5];
const resultats = await gestionnaire.mapAvecConcurrence(
    items,
    async (item) => await traiterItem(item),
    2 // Max 2 éléments simultanément
);
```

---

### Kata 3: Client HTTP Simple
**Objectif:** Créer un client HTTP avec gestion d'erreurs et options configurables.

**Signature de la Fonction:**
```javascript
class ClientHTTP {
    constructor(baseURL = '', options = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        this.timeout = options.timeout || 10000;
    }

    async get(endpoint, options = {}) {
        // Requête GET
    }

    async post(endpoint, data, options = {}) {
        // Requête POST
    }

    async put(endpoint, data, options = {}) {
        // Requête PUT
    }

    async delete(endpoint, options = {}) {
        // Requête DELETE
    }

    async request(method, endpoint, options = {}) {
        // Méthode générique pour toutes les requêtes
    }

    setDefaultHeader(name, value) {
        // Modifier les headers par défaut
    }

    createAbortController() {
        // Créer un AbortController pour annulation
    }
}
```

**Cas de Test:**
```javascript
const client = new ClientHTTP('https://api.example.com');

// GET simple
const utilisateurs = await client.get('/users');

// POST avec données
const nouvelUtilisateur = await client.post('/users', {
    nom: 'Alice',
    email: 'alice@example.com'
});

// Avec timeout personnalisé
const donnees = await client.get('/slow-endpoint', {timeout: 15000});
```

---

### Kata 4: Système de Notifications Asynchrones
**Objectif:** Créer un système de notifications qui gère les messages en temps réel.

**Signature de la Fonction:**
```javascript
class SystemeNotifications {
    constructor() {
        this.notifications = [];
        this.listeners = new Map();
        this.queue = [];
        this.isProcessing = false;
    }

    ajouter(notification) {
        // Ajouter une notification à la queue
    }

    async traiter() {
        // Traiter toutes les notifications en queue
    }

    async envoyerEmail(notification) {
        // Simuler envoi email
    }

    async envoyerPush(notification) {
        // Simuler notification push
    }

    async envoyerSMS(notification) {
        // Simuler envoi SMS
    }

    abonner(type, callback) {
        // S'abonner à un type de notification
    }

    desabonner(type, callback) {
        // Se désabonner
    }

    emettre(type, data) {
        // Émettre une notification
    }

    async attendreNotification(type, timeout = 5000) {
        // Attendre une notification spécifique
    }
}
```

**Cas de Test:**
```javascript
const notifs = new SystemeNotifications();

// Ajouter des notifications
notifs.ajouter({
    type: 'email',
    destinataire: 'user@example.com',
    sujet: 'Bienvenue',
    message: 'Merci de vous être inscrit'
});

// S'abonner aux événements
notifs.abonner('email_sent', (data) => {
    console.log('Email envoyé:', data);
});

// Traiter toutes les notifications
await notifs.traiter();
```

---

## Niveau Intermédiaire (APIs et DOM)

### Kata 5: Gestionnaire de Cache Intelligent
**Objectif:** Système de cache avec TTL, invalidation et fallbacks.

**Signature de la Fonction:**
```javascript
class CacheIntelligent {
    constructor(options = {}) {
        this.ttl = options.ttl || 300000; // 5 minutes
        this.maxSize = options.maxSize || 100;
        this.cache = new Map();
        this.timers = new Map();
    }

    async get(key, factory, options = {}) {
        // Récupérer ou créer une valeur
    }

    set(key, value, ttl = this.ttl) {
        // Stocker une valeur avec TTL
    }

    delete(key) {
        // Supprimer une entrée
    }

    clear() {
        // Vider le cache
    }

    has(key) {
        // Vérifier l'existence d'une clé
    }

    keys() {
        // Retourner toutes les clés valides
    }

    size() {
        // Taille actuelle du cache
    }

    stats() {
        // Statistiques hits/miss
    }

    invalidatePattern(pattern) {
        // Invalider selon un pattern RegExp
    }
}
```

**Cas de Test:**
```javascript
const cache = new CacheIntelligent({ttl: 60000, maxSize: 50});

// Récupérer avec factory
const userData = await cache.get('user_123', async () => {
    return await fetch('/api/users/123').then(r => r.json());
});

// Cache hit sur deuxième appel
const userData2 = await cache.get('user_123'); // Depuis cache

// Invalider pattern
cache.invalidatePattern(/^user_/); // Supprime tous les users
```

---

### Kata 6: Loader de Ressources Asynchrone
**Objectif:** Charger différents types de ressources (images, scripts, styles) de manière asynchrone.

**Signature de la Fonction:**
```javascript
class LoaderRessources {
    constructor() {
        this.cache = new Map();
        this.loading = new Map();
    }

    async chargerImage(url) {
        // Charger une image de manière asynchrone
    }

    async chargerScript(url) {
        // Charger un script JavaScript
    }

    async chargerStyle(url) {
        // Charger une feuille de style CSS
    }

    async chargerJSON(url) {
        // Charger des données JSON
    }

    async chargerPlusieurs(ressources) {
        // Charger plusieurs ressources en parallèle
    }

    async precharger(urls) {
        // Précharger des ressources pour le cache
    }

    estCharge(url) {
        // Vérifier si une ressource est déjà chargée
    }

    obtenirProgres(urls) {
        // Retourner le progrès de chargement
    }
}
```

**Cas de Test:**
```javascript
const loader = new LoaderRessources();

// Charger une image
const img = await loader.chargerImage('/assets/hero.jpg');
document.body.appendChild(img);

// Charger plusieurs ressources
const ressources = await loader.chargerPlusieurs([
    {type: 'script', url: '/js/charts.js'},
    {type: 'style', url: '/css/dashboard.css'},
    {type: 'json', url: '/api/config.json'}
]);

console.log('Toutes les ressources chargées:', ressources);
```

---

### Kata 7: Interface de Recherche Temps Réel
**Objectif:** Créer une interface de recherche avec debouncing, cache et gestion d'états.

**Signature de la Fonction:**
```javascript
class RechercheTempsReel {
    constructor(inputSelector, resultsSelector, options = {}) {
        this.input = document.querySelector(inputSelector);
        this.resultsContainer = document.querySelector(resultsSelector);
        this.debounceDelay = options.debounceDelay || 300;
        this.minLength = options.minLength || 2;
        this.cache = new Map();
        this.abortController = null;
    }

    init() {
        // Initialiser les event listeners
    }

    async rechercher(terme) {
        // Effectuer la recherche
    }

    afficherResultats(resultats, terme) {
        // Afficher les résultats dans le DOM
    }

    afficherChargement(visible) {
        // Gérer l'indicateur de chargement
    }

    afficherErreur(message) {
        // Afficher un message d'erreur
    }

    afficherVide(terme) {
        // Afficher "aucun résultat"
    }

    debounce(func, delay) {
        // Implémenter debouncing
    }

    surlignerTerme(texte, terme) {
        // Surligner le terme recherché
    }

    nettoyer() {
        // Nettoyage des resources
    }
}
```

**Cas de Test:**
```javascript
const recherche = new RechercheTempsReel('#search-input', '#search-results', {
    debounceDelay: 250,
    minLength: 3
});

recherche.init();

// HTML requis :
// <input type="text" id="search-input" placeholder="Rechercher...">
// <div id="search-results"></div>
// <div id="loading" style="display:none">Recherche en cours...</div>
```

---

### Kata 8: Gestionnaire d'Upload de Fichiers
**Objectif:** Système d'upload avec progress, preview, et gestion des erreurs.

**Signature de la Fonction:**
```javascript
class GestionnaireUpload {
    constructor(options = {}) {
        this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // 10MB
        this.acceptedTypes = options.acceptedTypes || ['image/*'];
        this.maxConcurrent = options.maxConcurrent || 3;
        this.uploads = new Map();
    }

    async uploaderFichier(file, options = {}) {
        // Uploader un fichier unique
    }

    async uploaderPlusieurs(files, options = {}) {
        // Uploader plusieurs fichiers
    }

    validerFichier(file) {
        // Valider taille, type, nom
    }

    creerPreview(file) {
        // Créer une prévisualisation
    }

    calculerProgres(uploadId) {
        // Calculer le progrès d'un upload
    }

    annulerUpload(uploadId) {
        // Annuler un upload en cours
    }

    obtenirStatut(uploadId) {
        // Obtenir le statut d'un upload
    }

    nettoyer() {
        // Nettoyer les uploads terminés
    }

    redimensionnerImage(file, maxWidth, maxHeight) {
        // Redimensionner une image avant upload
    }
}
```

**Cas de Test:**
```javascript
const uploader = new GestionnaireUpload({
    maxFileSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['image/jpeg', 'image/png'],
    maxConcurrent: 2
});

// Upload simple avec progression
const file = document.getElementById('file-input').files[0];
const uploadId = await uploader.uploaderFichier(file, {
    onProgress: (progress) => {
        console.log(`Progression: ${progress}%`);
        updateProgressBar(progress);
    },
    onComplete: (result) => {
        console.log('Upload terminé:', result);
    },
    onError: (error) => {
        console.error('Erreur upload:', error);
    }
});
```

---

## Conseils de Pratique

### Pour les Débutants
1. **Maîtrisez les Promises** : Comprenez les états et le chaînage
2. **async/await d'abord** : Plus lisible que les callbacks
3. **Gestion d'erreurs** : Toujours try-catch avec async/await
4. **Event Loop** : Comprenez micro vs macro-tâches

### Pour les Intermédiaires
1. **APIs REST** : Fetch, méthodes HTTP, gestion statuts
2. **Intégration DOM** : États de chargement, mise à jour asynchrone
3. **Performance** : Parallélisme vs séquentiel, debouncing
4. **Patterns** : Retry, timeout, cache

### Parcours d'Apprentissage
- **Semaine 1** : Katas 1-2 (Foundations: Promises et simulateurs)
- **Semaine 2** : Katas 3-4 (HTTP et événements)
- **Semaine 3** : Katas 5-6 (Cache et ressources)
- **Semaine 4** : Katas 7-8 (UI avancée et uploads)

### Avant de Passer aux Concepts Avancés
Assurez-vous de maîtriser parfaitement :
- Promesses et async/await
- Fetch API avec toutes les options
- Gestion d'erreurs robuste
- Patterns de base (retry, timeout, debouncing)
- Intégration DOM fluide

**Next Step:** Une fois ces concepts maîtrisés, vous aurez une base solide en programmation asynchrone pour construire des applications web modernes et interactives.

---

## Conseils de Pratique

### Pour les Débutants
1. **Maîtrisez les Promises** : Comprenez les états et le chaînage
2. **async/await d'abord** : Plus lisible que les callbacks
3. **Gestion d'erreurs** : Toujours try-catch avec async/await
4. **Event Loop** : Comprenez micro vs macro-tâches

### Pour les Intermédiaires
1. **APIs REST** : Fetch, méthodes HTTP, gestion statuts
2. **Intégration DOM** : États de chargement, mise à jour asynchrone
3. **Performance** : Parallélisme vs séquentiel, debouncing
4. **Patterns** : Retry, timeout, cache

### Tests et Debugging
1. **Mocks** pour APIs externes
2. **Timers** pour tester les timeouts
3. **Network throttling** pour tester la robustesse
4. **Console.log** stratégique pour tracer les flux

### Parcours d'Apprentissage
- **Semaine 1** : Katas 1-2 (Foundations: Promises et simulateurs)
- **Semaine 2** : Katas 3-4 (HTTP et événements)
- **Semaine 3** : Katas 5-6 (Cache et ressources)
- **Semaine 4** : Katas 7-8 (UI avancée et uploads)

### Outils Recommandés pour Bootcamp
- **Testing** : Jest (basics), Browser DevTools
- **Development** : Chrome DevTools, VSCode
- **APIs** : Postman, JSONPlaceholder pour tests
- **Debugging** : Console, Network tab, Sources

### Checklist de Maîtrise
Assurez-vous de maîtriser parfaitement :
- Promesses et async/await dans tous les contextes
- Fetch API avec toutes les options (headers, methods, error handling)
- Gestion d'erreurs robuste avec try-catch et fallbacks
- Patterns essentiels (retry, timeout, debouncing)
- Intégration DOM fluide avec états de chargement

**Félicitations !** Une fois ces concepts maîtrisés, vous avez toutes les bases pour créer des applications web modernes et interactives avec du JavaScript asynchrone professionnel.