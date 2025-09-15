# Gestion d'Erreurs - Katas

## Niveau Débutant (Try-Catch Basique)

### Kata 1: Calculatrice Sécurisée
**Objectif:** Créer une calculatrice qui gère toutes les erreurs possibles.

**Exigences:**
- Division par zéro
- Types de données invalides  
- Opérations non supportées
- Débordements de nombres

**Signature de la Fonction:**
```javascript
class CalculatriceSécurisée {
    calculer(a, b, operation) {
        // Votre code avec gestion d'erreurs complète
    }
    
    validerNombre(valeur) {
        // Valider qu'une valeur est un nombre utilisable
    }
    
    validerOperation(operation) {
        // Valider que l'opération est supportée
    }
}
```

**Cas de Test:**
```javascript
const calc = new CalculatriceSécurisée();

// Succès
calc.calculer(10, 2, '/'); // 5

// Erreurs à gérer
calc.calculer(10, 0, '/'); // Error: Division par zéro
calc.calculer('abc', 5, '+'); // Error: Premier paramètre invalide
calc.calculer(10, null, '*'); // Error: Deuxième paramètre invalide
calc.calculer(10, 5, '%'); // Error: Opération non supportée
```

---

### Kata 2: Parseur JSON Robuste
**Objectif:** Créer un parseur JSON qui gère les erreurs gracieusement.

**Fonctionnalités:**
- Parser du JSON avec fallback
- Validation de schéma simple
- Messages d'erreur détaillés
- Options de récupération

**Signature de la Fonction:**
```javascript
class ParseurJSON {
    parse(jsonString, options = {}) {
        // Options: defaultValue, schema, strict
        // Retourner { success: boolean, data: any, error: string }
    }
    
    validerSchema(data, schema) {
        // Valider que data correspond au schéma attendu
    }
    
    donnerDetailsErreur(error, jsonString) {
        // Donner position et contexte de l'erreur
    }
}
```

**Cas de Test:**
```javascript
const parser = new ParseurJSON();

// JSON valide
parser.parse('{"name": "Alice", "age": 25}');
// {success: true, data: {name: "Alice", age: 25}, error: null}

// JSON invalide avec fallback
parser.parse('{"name": "Alice"', {defaultValue: {}});
// {success: false, data: {}, error: "JSON invalide à la position 17"}

// Validation de schéma
const schema = {name: 'string', age: 'number'};
parser.parse('{"name": 123}', {schema});
// {success: false, data: null, error: "name doit être string"}
```

---

### Kata 3: Gestionnaire de Fichiers
**Objectif:** Simuler des opérations sur fichiers avec gestion d'erreurs.

**Erreurs à Simuler:**
- Fichier non trouvé
- Permissions insuffisantes
- Espace disque insuffisant
- Fichier en cours d'utilisation

**Signature de la Fonction:**
```javascript
class GestionnaireFichiers {
    constructor() {
        this.fichiers = new Map(); // Simulation du système de fichiers
        this.permissions = new Map();
    }
    
    lire(chemin) {
        // Simuler lecture avec erreurs possibles
    }
    
    ecrire(chemin, contenu) {
        // Simuler écriture avec validations
    }
    
    supprimer(chemin) {
        // Simuler suppression avec vérifications
    }
    
    copier(source, destination) {
        // Simuler copie avec gestion des conflits
    }
    
    definirPermission(chemin, permission) {
        // 'read', 'write', 'delete'
    }
}
```

**Cas de Test:**
```javascript
const gf = new GestionnaireFichiers();

// Créer et lire un fichier
gf.ecrire('/documents/test.txt', 'contenu'); // success
gf.lire('/documents/test.txt'); // 'contenu'

// Erreurs
gf.lire('/inexistant.txt'); // Error: Fichier non trouvé
gf.definirPermission('/documents/test.txt', 'read');
gf.ecrire('/documents/test.txt', 'nouveau'); // Error: Permission denied
```

---

### Kata 4: Validateur de Formulaire
**Objectif:** Valider des données de formulaire avec erreurs détaillées.

**Validations:**
- Champs requis
- Formats (email, téléphone, date)
- Longueurs min/max
- Valeurs dans des plages

**Signature de la Fonction:**
```javascript
class ValidateurFormulaire {
    constructor(schema) {
        this.schema = schema;
        this.erreurs = [];
    }
    
    valider(donnees) {
        // Retourner { valide: boolean, erreurs: Array, donnéesNettoyées: Object }
    }
    
    validerChamp(nom, valeur, regles) {
        // Valider un champ individuel
    }
    
    nettoyer(donnees) {
        // Nettoyer et normaliser les données
    }
    
    ajouterReglePersonnalisée(nom, fonction) {
        // Ajouter des validations personnalisées
    }
}
```

**Schéma d'Exemple:**
```javascript
const schema = {
    nom: {requis: true, type: 'string', longueurMin: 2},
    email: {requis: true, type: 'email'},
    age: {requis: false, type: 'number', min: 0, max: 120},
    telephone: {requis: false, type: 'phone'},
    motDePasse: {requis: true, longueurMin: 8, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/}
};

const validateur = new ValidateurFormulaire(schema);
const resultat = validateur.valider({
    nom: 'A', // Trop court
    email: 'email-invalide', // Format invalide
    age: 150 // Hors plage
});

// {
//   valide: false,
//   erreurs: [
//     {champ: 'nom', message: 'Doit contenir au moins 2 caractères'},
//     {champ: 'email', message: 'Format email invalide'},
//     {champ: 'age', message: 'Doit être entre 0 et 120'}
//   ]
// }
```

---

## Niveau Intermédiaire (Gestion Asynchrone)

### Kata 5: Client HTTP Résilient
**Objectif:** Créer un client HTTP avec retry, timeout, et circuit breaker.

**Fonctionnalités:**
- Retry automatique avec backoff
- Timeout configurable
- Circuit breaker
- Cache des réponses

**Signature de la Fonction:**
```javascript
class ClientHTTPResilient {
    constructor(options = {}) {
        this.maxRetries = options.maxRetries || 3;
        this.timeout = options.timeout || 5000;
        this.circuitBreaker = new CircuitBreaker();
        this.cache = new Map();
    }
    
    async get(url, options = {}) {
        // GET avec toutes les protections
    }
    
    async post(url, data, options = {}) {
        // POST avec gestion d'erreurs
    }
    
    async avecRetry(operation, maxTentatives) {
        // Wrapper retry générique
    }
    
    async avecTimeout(promise, timeout) {
        // Wrapper timeout
    }
    
    gererErreurHTTP(response) {
        // Convertir codes HTTP en erreurs appropriées
    }
}

class CircuitBreaker {
    constructor(options = {}) {
        this.seuilEchecs = options.seuilEchecs || 5;
        this.timeoutRecuperation = options.timeoutRecuperation || 60000;
        this.etat = 'FERME';
        this.compteurEchecs = 0;
    }
    
    async executer(operation) {
        // Logique du circuit breaker
    }
}
```

**Cas de Test:**
```javascript
const client = new ClientHTTPResilient({
    maxRetries: 2,
    timeout: 3000
});

// Succès
const data = await client.get('https://api.example.com/users');

// Gestion timeout
try {
    await client.get('https://api-lente.com/data');
} catch (error) {
    console.log(error.message); // "Request timeout after 3000ms"
}

// Circuit breaker ouvert après plusieurs échecs
for (let i = 0; i < 6; i++) {
    try {
        await client.get('https://api-defaillante.com/data');
    } catch (error) {
        if (i >= 5) {
            console.log(error.message); // "Circuit breaker ouvert"
        }
    }
}
```

---

### Kata 6: Processeur de Tâches Asynchrones
**Objectif:** Traiter des tâches async avec gestion d'erreurs et récupération.

**Fonctionnalités:**
- Queue de tâches avec priorités
- Retry des tâches échouées
- Dead letter queue
- Monitoring et statistiques

**Signature de la Fonction:**
```javascript
class ProcesseurTaches {
    constructor(options = {}) {
        this.concurrency = options.concurrency || 3;
        this.queuePrincipale = [];
        this.queueEchecs = [];
        this.deadLetter = [];
        this.statistiques = {
            traitees: 0,
            reussies: 0,
            echouees: 0,
            reprises: 0
        };
    }
    
    ajouterTache(tache, priorite = 0) {
        // Ajouter une tâche à la queue
    }
    
    async demarrer() {
        // Démarrer le traitement des tâches
    }
    
    arreter() {
        // Arrêter proprement le processeur
    }
    
    async traiterTache(tache) {
        // Traiter une tâche avec gestion d'erreurs
    }
    
    gererEchecTache(tache, erreur) {
        // Décider si retry ou dead letter
    }
    
    obtenirStatistiques() {
        // Retourner les métriques
    }
}

class Tache {
    constructor(id, fn, options = {}) {
        this.id = id;
        this.fn = fn;
        this.maxRetries = options.maxRetries || 2;
        this.currentRetries = 0;
        this.priorite = options.priorite || 0;
        this.timeout = options.timeout || 30000;
    }
}
```

**Cas de Test:**
```javascript
const processeur = new ProcesseurTaches({concurrency: 2});

// Tâches qui réussissent
processeur.ajouterTache(new Tache('task1', async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return 'success';
}));

// Tâches qui échouent puis réussissent
let tentatives = 0;
processeur.ajouterTache(new Tache('task2', async () => {
    tentatives++;
    if (tentatives < 3) {
        throw new Error('Erreur temporaire');
    }
    return 'success after retry';
}));

// Tâche qui échoue définitivement
processeur.ajouterTache(new Tache('task3', async () => {
    throw new Error('Erreur permanente');
}, {maxRetries: 1}));

await processeur.demarrer();
const stats = processeur.obtenirStatistiques();
// {traitees: 3, reussies: 2, echouees: 1, reprises: 2}
```

---

### Kata 7: Système de Cache avec Invalidation
**Objectif:** Cache intelligent avec gestion d'erreurs et fallbacks.

**Fonctionnalités:**
- Cache avec TTL
- Fallback en cas d'erreur
- Invalidation sélective
- Compression et sérialisation

**Signature de la Fonction:**
```javascript
class CacheIntelligent {
    constructor(options = {}) {
        this.ttlParDefaut = options.ttl || 300000; // 5 minutes
        this.tailleMax = options.tailleMax || 1000;
        this.compressionActivee = options.compression || false;
        this.cache = new Map();
        this.metadata = new Map();
    }
    
    async get(cle, fabricant, options = {}) {
        // Récupérer avec fallback sur fabricant si miss/expired
    }
    
    async set(cle, valeur, ttl = this.ttlParDefaut) {
        // Stocker avec gestion des erreurs de sérialisation
    }
    
    async delete(cle) {
        // Supprimer avec gestion d'erreurs
    }
    
    async invalidatePattern(pattern) {
        // Invalider toutes les clés matchant le pattern
    }
    
    async compresser(data) {
        // Compresser les données si nécessaire
    }
    
    async decompresser(data) {
        // Décompresser avec gestion d'erreurs
    }
    
    nettoyer() {
        // Nettoyer les entrées expirées
    }
    
    obtenirStatistiques() {
        // Stats de hit/miss/errors
    }
}
```

**Cas de Test:**
```javascript
const cache = new CacheIntelligent({ttl: 1000});

// Fabricant qui peut échouer
const fabricantDonnees = async (id) => {
    if (Math.random() < 0.3) {
        throw new Error('Service indisponible');
    }
    return `données-${id}`;
};

// Premier accès - miss, appel fabricant
try {
    const data1 = await cache.get('user:123', () => fabricantDonnees(123));
    console.log(data1); // "données-123"
} catch (error) {
    console.log('Fallback:', error.message);
}

// Deuxième accès - hit cache
const data2 = await cache.get('user:123', fabricantDonnees);
console.log(data2); // "données-123" (depuis cache)

// Après expiration - miss, nouveau call fabricant
await new Promise(resolve => setTimeout(resolve, 1100));
const data3 = await cache.get('user:123', fabricantDonnees);
```

---

### Kata 8: Moniteur de Santé de Services
**Objectif:** Surveiller la santé de services avec alertes et récupération.

**Fonctionnalités:**
- Health checks périodiques
- Détection de pannes
- Alertes configurables
- Tentatives de récupération

**Signature de la Fonction:**
```javascript
class MoniteurSante {
    constructor() {
        this.services = new Map();
        this.alertes = [];
        this.historique = [];
        this.intervalleCheck = 30000; // 30 secondes
        this.running = false;
    }
    
    ajouterService(nom, healthCheck, options = {}) {
        // Ajouter un service à surveiller
    }
    
    supprimerService(nom) {
        // Arrêter la surveillance d'un service
    }
    
    demarrerSurveillance() {
        // Commencer les health checks
    }
    
    arreterSurveillance() {
        // Arrêter proprement
    }
    
    async verifierService(service) {
        // Exécuter le health check avec timeout
    }
    
    gererPanneService(service, erreur) {
        // Actions en cas de panne détectée
    }
    
    gererRecuperationService(service) {
        // Actions en cas de récupération
    }
    
    declencherAlerte(type, service, details) {
        // Système d'alertes
    }
    
    obtenirRapport() {
        // Rapport de santé global
    }
}

class ServiceSurveille {
    constructor(nom, healthCheck, options = {}) {
        this.nom = nom;
        this.healthCheck = healthCheck;
        this.timeout = options.timeout || 5000;
        this.seuilEchecs = options.seuilEchecs || 3;
        this.intervalleRecuperation = options.intervalleRecuperation || 60000;
        this.etat = 'UNKNOWN';
        this.echecsConsecutifs = 0;
        this.dernierSucces = null;
        this.dernierEchec = null;
    }
}
```

**Cas de Test:**
```javascript
const moniteur = new MoniteurSante();

// Service API
moniteur.ajouterService('api-users', async () => {
    const response = await fetch('/api/health');
    if (!response.ok) throw new Error('API unhealthy');
    return {status: 'healthy', responseTime: 120};
});

// Service base de données
moniteur.ajouterService('database', async () => {
    // Simuler vérification DB
    if (Math.random() < 0.1) {
        throw new Error('Database connection failed');
    }
    return {status: 'healthy', connections: 5};
}, {seuilEchecs: 2, timeout: 3000});

moniteur.demarrerSurveillance();

// Après quelques minutes
setTimeout(() => {
    const rapport = moniteur.obtenirRapport();
    console.log(rapport);
    /*
    {
      services: {
        'api-users': {etat: 'HEALTHY', dernierCheck: '2023-...'},
        'database': {etat: 'DEGRADED', echecsConsecutifs: 1}
      },
      alertesActives: [...],
      statistiques: {totalChecks: 45, failures: 3}
    }
    */
}, 180000);
```

---

## Niveau Avancé (Patterns Complexes)

### Kata 9: Système de Sagas avec Compensation
**Objectif:** Implémenter le pattern Saga pour transactions distribuées.

**Fonctionnalités:**
- Séquence d'étapes avec compensation
- Rollback automatique en cas d'échec
- State machine pour le suivi
- Persistence des états

**Signature de la Fonction:**
```javascript
class Saga {
    constructor(nom) {
        this.nom = nom;
        this.etapes = [];
        this.etat = 'INITIAL';
        this.etapeActuelle = -1;
        this.donnees = {};
        this.historique = [];
    }
    
    ajouterEtape(nom, action, compensation) {
        // Ajouter une étape avec sa compensation
    }
    
    async executer(donneesInitiales = {}) {
        // Exécuter toutes les étapes
    }
    
    async rollback() {
        // Exécuter les compensations en ordre inverse
    }
    
    async executerEtape(etape) {
        // Exécuter une étape avec gestion d'erreurs
    }
    
    async executerCompensation(etape) {
        // Exécuter la compensation d'une étape
    }
    
    changerEtat(nouvelEtat, details = {}) {
        // Changer l'état avec historique
    }
    
    obtenirEtat() {
        // État actuel avec contexte
    }
}

class EtapeSaga {
    constructor(nom, action, compensation, options = {}) {
        this.nom = nom;
        this.action = action;
        this.compensation = compensation;
        this.timeout = options.timeout || 30000;
        this.maxRetries = options.maxRetries || 0;
        this.currentRetries = 0;
        this.statut = 'PENDING';
    }
}
```

**Cas de Test:**
```javascript
// Saga de commande e-commerce
const sagaCommande = new Saga('commande-client');

sagaCommande
    .ajouterEtape('réserver-stock', 
        async (donnees) => {
            const reservation = await reserverStock(donnees.produits);
            return {reservationId: reservation.id};
        },
        async (donnees) => {
            await libererStock(donnees.reservationId);
        }
    )
    .ajouterEtape('traiter-paiement',
        async (donnees) => {
            const paiement = await traiterPaiement(donnees.montant);
            return {paiementId: paiement.id};
        },
        async (donnees) => {
            await annulerPaiement(donnees.paiementId);
        }
    )
    .ajouterEtape('créer-commande',
        async (donnees) => {
            const commande = await creerCommande(donnees);
            return {commandeId: commande.id};
        },
        async (donnees) => {
            await supprimerCommande(donnees.commandeId);
        }
    );

try {
    const resultat = await sagaCommande.executer({
        produits: [{id: 1, quantite: 2}],
        montant: 59.99,
        clientId: 'user-123'
    });
    console.log('Commande créée:', resultat);
} catch (error) {
    console.log('Saga échouée, rollback effectué:', error.message);
}
```

---

### Kata 10: Circuit Breaker Avancé
**Objectif:** Circuit breaker avec métriques, fallbacks, et récupération progressive.

**Fonctionnalités:**
- États multiples (fermé, ouvert, demi-ouvert)
- Métriques en temps réel
- Fallbacks configurables
- Tests de récupération progressifs

**Signature de la Fonction:**
```javascript
class CircuitBreakerAvance {
    constructor(nom, options = {}) {
        this.nom = nom;
        this.seuilEchecs = options.seuilEchecs || 5;
        this.timeoutOuverture = options.timeoutOuverture || 60000;
        this.seuilSuccesRecuperation = options.seuilSuccesRecuperation || 3;
        this.fenetreTempsMétriques = options.fenetreTempsMétriques || 60000;
        
        this.etat = 'FERME';
        this.metriques = new MetriquesCircuit();
        this.fallbacks = new Map();
        this.listeners = new Map();
    }
    
    async executer(operation, cle = 'default') {
        // Exécuter avec protection circuit breaker
    }
    
    definirFallback(cle, fallback) {
        // Définir une fonction de fallback
    }
    
    ajouterListener(evenement, callback) {
        // Observer les changements d'état
    }
    
    async testRecuperation() {
        // Test progressif en mode demi-ouvert
    }
    
    changerEtat(nouvelEtat, raison = '') {
        // Transition d'état avec notifications
    }
    
    obtenirMétriques() {
        // Métriques détaillées
    }
    
    reset() {
        // Reset manuel du circuit
    }
}

class MetriquesCircuit {
    constructor(fenetreTaille = 60000) {
        this.fenetreTaille = fenetreTaille;
        this.evenements = [];
        this.compteurs = {
            succes: 0,
            echecs: 0,
            timeouts: 0,
            rejets: 0
        };
    }
    
    enregistrer(type, duree = 0) {
        // Enregistrer un événement avec TTL
    }
    
    calculerTauxEchec() {
        // Taux d'échec dans la fenêtre
    }
    
    nettoyer() {
        // Supprimer les anciens événements
    }
}
```

**Cas de Test:**
```javascript
const cb = new CircuitBreakerAvance('service-api', {
    seuilEchecs: 3,
    timeoutOuverture: 5000
});

// Définir un fallback
cb.definirFallback('getUserData', async (userId) => {
    return getCachedUserData(userId) || getDefaultUserData();
});

// Observer les changements
cb.ajouterListener('stateChange', (ancienEtat, nouvelEtat, raison) => {
    console.log(`Circuit ${ancienEtat} -> ${nouvelEtat}: ${raison}`);
});

// Utilisation
async function recupererUtilisateur(userId) {
    return cb.executer(async () => {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    }, 'getUserData');
}

// Test avec plusieurs échecs
for (let i = 0; i < 5; i++) {
    try {
        await recupererUtilisateur('user-123');
    } catch (error) {
        console.log(`Tentative ${i + 1}:`, error.message);
    }
}

// Métriques
console.log(cb.obtenirMétriques());
```

---

### Kata 11: Gestionnaire d'Erreurs Global
**Objectif:** Système centralisé de gestion d'erreurs pour une application complète.

**Fonctionnalités:**
- Classification automatique des erreurs
- Routing vers gestionnaires spécialisés
- Métriques et alertes
- Recovery actions automatisées

**Signature de la Fonction:**
```javascript
class GestionnaireErreursGlobal {
    constructor() {
        this.classifieurs = [];
        this.gestionnaires = new Map();
        this.middleware = [];
        this.metriques = new MetriquesErreurs();
        this.recuperateurs = new Map();
        this.configuration = new ConfigurationErreurs();
    }
    
    ajouterClassifieur(classifieur) {
        // Ajouter un classificateur d'erreurs
    }
    
    enregistrerGestionnaire(type, gestionnaire) {
        // Enregistrer un gestionnaire pour un type d'erreur
    }
    
    ajouterMiddleware(middleware) {
        // Pipeline de traitement d'erreurs
    }
    
    async gerer(erreur, contexte = {}) {
        // Point d'entrée principal
    }
    
    async classifierErreur(erreur, contexte) {
        // Classifier l'erreur selon les règles
    }
    
    async appliquerMiddleware(erreur, contexte) {
        // Appliquer la pipeline de middleware
    }
    
    async tenterRecuperation(erreur, contexte) {
        // Essayer de récupérer automatiquement
    }
    
    declarerAlerte(erreur, classification, contexte) {
        // Système d'alertes intelligent
    }
}

class ClassificationErreur {
    constructor() {
        this.type = null;
        this.severite = null;
        this.categorie = null;
        this.recuperable = false;
        this.action = null;
        this.contexte = {};
    }
}

class ConfigurationErreurs {
    constructor() {
        this.regles = new Map();
        this.seuils = new Map();
        this.canaux = new Map();
    }
    
    definirRegle(pattern, action) {
        // Définir règle de gestion
    }
    
    definirSeuil(type, seuil, action) {
        // Seuil pour déclenchement d'actions
    }
}
```

**Cas de Test:**
```javascript
const gestionnaire = new GestionnaireErreursGlobal();

// Classificateurs
gestionnaire.ajouterClassifieur((erreur, contexte) => {
    if (erreur.code && erreur.code.startsWith('DB_')) {
        return {
            type: 'DATABASE_ERROR',
            severite: 'HIGH',
            recuperable: true
        };
    }
});

gestionnaire.ajouterClassifieur((erreur, contexte) => {
    if (contexte.url && contexte.url.includes('/api/')) {
        return {
            type: 'API_ERROR',
            severite: erreur.status >= 500 ? 'HIGH' : 'MEDIUM',
            categorie: 'NETWORK'
        };
    }
});

// Gestionnaires spécialisés
gestionnaire.enregistrerGestionnaire('DATABASE_ERROR', async (erreur, contexte, classification) => {
    // Tentative de reconnexion DB
    await tentativeReconnexionDB();
    
    // Notification équipe DB
    await notifierEquipeDB(erreur, contexte);
    
    // Fallback vers cache
    if (contexte.operation === 'READ') {
        return recupererDepuisCache(contexte.requete);
    }
});

// Middleware de logging
gestionnaire.ajouterMiddleware(async (erreur, contexte, next) => {
    console.log(`[${new Date().toISOString()}] Erreur captée:`, {
        message: erreur.message,
        stack: erreur.stack,
        contexte
    });
    return next();
});

// Utilisation dans l'application
try {
    await operationRisquee();
} catch (erreur) {
    await gestionnaire.gerer(erreur, {
        operation: 'USER_UPDATE',
        userId: 'user-123',
        url: '/api/users/123'
    });
}
```

---

## Niveau Expert (Systèmes Distribués)

### Kata 12: Orchestrateur de Microservices
**Objectif:** Orchestrer des appels de microservices avec gestion d'erreurs distribuées.

**Fonctionnalités:**
- Correlation IDs
- Timeout distribués
- Fallbacks en cascade
- Monitoring cross-service

**Signature de la Fonction:**
```javascript
class Orchestrateur {
    constructor(options = {}) {
        this.services = new Map();
        this.circuitBreakers = new Map();
        this.correlationManager = new CorrelationManager();
        this.metriques = new MetriquesDistribuees();
        this.fallbacks = new Map();
    }
    
    enregistrerService(nom, config) {
        // Enregistrer un microservice
    }
    
    async appeler(service, operation, payload, options = {}) {
        // Appel avec toutes les protections
    }
    
    async orchestrer(workflow) {
        // Orchestrer plusieurs services
    }
    
    definirFallbackEnCascade(services, fallbacks) {
        // Fallbacks entre services
    }
    
    obtenirSanteGlobale() {
        // Vue d'ensemble de la santé
    }
}

class CorrelationManager {
    constructor() {
        this.traces = new Map();
    }
    
    demarrerTrace(correlationId = null) {
        // Commencer une nouvelle trace
    }
    
    enrichirContexte(contexte) {
        // Ajouter info de corrélation
    }
    
    obtenirTrace(correlationId) {
        // Récupérer une trace complète
    }
}
```

**Cas de Test:**
```javascript
const orchestrateur = new Orchestrateur();

// Configuration des services
orchestrateur.enregistrerService('user-service', {
    baseUrl: 'http://user-service',
    timeout: 5000,
    circuitBreaker: {seuilEchecs: 3}
});

orchestrateur.enregistrerService('order-service', {
    baseUrl: 'http://order-service',  
    timeout: 10000,
    circuitBreaker: {seuilEchecs: 2}
});

// Workflow de commande
const workflowCommande = {
    etapes: [
        {
            nom: 'valider-utilisateur',
            service: 'user-service',
            operation: 'validate',
            required: true
        },
        {
            nom: 'créer-commande',
            service: 'order-service',
            operation: 'create',
            dependsOn: ['valider-utilisateur'],
            required: true
        },
        {
            nom: 'envoyer-notification',
            service: 'notification-service',
            operation: 'send',
            dependsOn: ['créer-commande'],
            required: false // Optionnel
        }
    ]
};

try {
    const resultat = await orchestrateur.orchestrer(workflowCommande, {
        userId: 'user-123',
        produits: [{id: 1, quantite: 2}]
    });
    console.log('Workflow terminé:', resultat);
} catch (error) {
    console.error('Workflow échoué:', error);
    
    // Récupération de la trace pour debug
    const trace = orchestrateur.correlationManager
        .obtenirTrace(error.correlationId);
    console.log('Trace complète:', trace);
}
```

---

## Conseils de Pratique

### Pour les Débutants
1. **Maîtrisez try-catch-finally** : Base de toute gestion d'erreurs
2. **Validez les entrées** : Fail fast avec des validations précoces
3. **Messages clairs** : Erreurs compréhensibles pour l'utilisateur
4. **Loggez tout** : Comprendre ce qui s'est passé

### Pour les Intermédiaires  
1. **Gestion asynchrone** : async/await avec try-catch
2. **Patterns de résilience** : Retry, timeout, circuit breaker
3. **Classification** : Types d'erreurs et traitements appropriés
4. **Monitoring** : Métriques et alertes

### Pour les Avancés
1. **Systèmes distribués** : Correlation, tracing, fallbacks
2. **Recovery automatique** : Self-healing systems
3. **Chaos engineering** : Tester la résilience
4. **Observabilité** : Logs structurés, métriques, traces

### Stratégies de Test
1. **Tests de happy path** : Vérifier le fonctionnement normal
2. **Tests d'erreurs** : Forcer les erreurs pour tester la gestion
3. **Tests de charge** : Comportement sous stress
4. **Chaos testing** : Pannes aléatoires en production

### Parcours d'Apprentissage
- **Semaine 1** : Katas 1-4 (Gestion de base)
- **Semaine 2** : Katas 5-8 (Gestion asynchrone)
- **Semaine 3** : Katas 9-11 (Patterns avancés)
- **Semaine 4+** : Kata 12 (Systèmes distribués)

### Outils et Ressources
- **Logging** : Winston, Bunyan, Pino
- **Monitoring** : Prometheus, DataDog, New Relic
- **APM** : Sentry, Rollbar, Bugsnag  
- **Tracing** : Jaeger, Zipkin, AWS X-Ray