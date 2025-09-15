# Gestion d'Erreurs - Notes

## Qu'est-ce que la Gestion d'Erreurs ?

La gestion d'erreurs est l'art d'anticiper, capturer, traiter et récupérer des situations exceptionnelles qui peuvent survenir lors de l'exécution d'un programme. Elle permet de créer des applications robustes qui continuent de fonctionner même en présence d'événements inattendus.

## Pourquoi est-elle Cruciale ?

### Robustesse
- **Continuité** : L'application continue de fonctionner malgré les erreurs
- **Graceful Degradation** : Dégradation élégante des fonctionnalités
- **Récupération** : Capacité à se remettre d'une erreur

### Expérience Utilisateur
- **Messages Clairs** : Informer l'utilisateur de manière compréhensible
- **Pas de Plantages** : Éviter les arrêts brutaux
- **Feedback Approprié** : Guider l'utilisateur vers une solution

### Maintenance et Debug
- **Logs Détaillés** : Faciliter le débogage
- **Traçabilité** : Comprendre l'origine des problèmes
- **Monitoring** : Surveiller la santé de l'application

## Types d'Erreurs

### Erreurs de Syntaxe
```javascript
// SyntaxError - détectée à l'analyse
console.log("Hello World"; // Parenthèse manquante
const = x; // Nom de variable manquant
function() { } // Nom de fonction manquant
```

### Erreurs de Type (TypeError)
```javascript
// Opérations sur types incompatibles
const nombre = 5;
nombre.push(10); // TypeError: nombre.push is not a function

const obj = null;
console.log(obj.propriete); // TypeError: Cannot read property 'propriete' of null

const func = undefined;
func(); // TypeError: func is not a function
```

### Erreurs de Référence (ReferenceError)
```javascript
// Variables non déclarées
console.log(variableInexistante); // ReferenceError

// Utilisation avant déclaration (TDZ - Temporal Dead Zone)
console.log(maVariable); // ReferenceError
let maVariable = 5;
```

### Erreurs de Plage (RangeError)
```javascript
// Valeurs en dehors de la plage valide
const arr = new Array(-1); // RangeError: Invalid array length
const nombre = (10).toString(37); // RangeError: radix must be an integer between 2 and 36

// Récursion infinie
function recursionInfinie() {
    return recursionInfinie(); // RangeError: Maximum call stack size exceeded
}
```

### Erreurs de Réseau et I/O
```javascript
// Requêtes réseau
fetch('https://api-inexistante.com/data')
    .catch(error => {
        // Network error, timeout, CORS, etc.
        console.error('Erreur réseau:', error);
    });

// Lecture de fichiers (Node.js)
const fs = require('fs');
fs.readFile('fichier-inexistant.txt', (err, data) => {
    if (err) {
        // ENOENT: file not found
        console.error('Erreur fichier:', err.code);
    }
});
```

## Mécanismes de Base

### Try-Catch-Finally

#### Structure Basique
```javascript
try {
    // Code potentiellement problématique
    const resultat = operationRisquee();
    console.log('Succès:', resultat);
} catch (error) {
    // Gestion de l'erreur
    console.error('Erreur capturée:', error.message);
} finally {
    // Code toujours exécuté (nettoyage)
    console.log('Nettoyage effectué');
}
```

#### Capture de Types Spécifiques
```javascript
try {
    JSON.parse(jsonInvalide);
} catch (error) {
    if (error instanceof SyntaxError) {
        console.error('JSON invalide:', error.message);
    } else if (error instanceof TypeError) {
        console.error('Type incorrect:', error.message);
    } else {
        console.error('Erreur inattendue:', error);
        throw error; // Re-lancer si non gérée
    }
}
```

#### Finally et Nettoyage
```javascript
let ressource;
try {
    ressource = ouvrirRessource();
    traiterRessource(ressource);
} catch (error) {
    console.error('Erreur de traitement:', error);
} finally {
    // Toujours exécuté, même si return ou throw dans try/catch
    if (ressource) {
        fermerRessource(ressource);
        console.log('Ressource fermée');
    }
}
```

### Throw - Lancer des Erreurs

#### Erreurs Personnalisées
```javascript
function validerAge(age) {
    if (typeof age !== 'number') {
        throw new TypeError('L\'âge doit être un nombre');
    }
    if (age < 0 || age > 150) {
        throw new RangeError('L\'âge doit être entre 0 et 150');
    }
    if (!Number.isInteger(age)) {
        throw new Error('L\'âge doit être un nombre entier');
    }
    return age;
}

try {
    const age = validerAge('25'); // TypeError
} catch (error) {
    console.error(error.name + ':', error.message);
}
```

#### Classes d'Erreurs Personnalisées
```javascript
class ErreurValidation extends Error {
    constructor(message, champ) {
        super(message);
        this.name = 'ErreurValidation';
        this.champ = champ;
        this.code = 'VALIDATION_ERROR';
    }
}

class ErreurReseau extends Error {
    constructor(message, statusCode, url) {
        super(message);
        this.name = 'ErreurReseau';
        this.statusCode = statusCode;
        this.url = url;
        this.code = 'NETWORK_ERROR';
    }
}

// Utilisation
function validerEmail(email) {
    if (!email.includes('@')) {
        throw new ErreurValidation('Format email invalide', 'email');
    }
}

try {
    validerEmail('email-invalide');
} catch (error) {
    if (error instanceof ErreurValidation) {
        console.error(`Erreur sur le champ ${error.champ}: ${error.message}`);
    }
}
```

## Gestion Asynchrone

### Promises et Catch
```javascript
// Promise avec gestion d'erreur
function recupererDonnees(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new ErreurReseau(
                    `Requête échouée: ${response.status}`,
                    response.status,
                    url
                );
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erreur récupération:', error);
            // Option: retourner valeur par défaut
            return { donnees: [], erreur: error.message };
        });
}

// Chaînage avec gestion d'erreurs
recupererDonnees('/api/users')
    .then(data => traiterDonnees(data))
    .then(resultat => afficherResultat(resultat))
    .catch(error => {
        // Capture toutes les erreurs de la chaîne
        console.error('Erreur dans la chaîne:', error);
        afficherMessageErreur(error);
    });
```

### Async/Await avec Try-Catch
```javascript
async function traiterUtilisateur(id) {
    try {
        // Opérations asynchrones séquentielles
        const utilisateur = await recupererUtilisateur(id);
        const profil = await recupererProfil(utilisateur.profileId);
        const permissions = await recupererPermissions(utilisateur.role);

        return {
            utilisateur,
            profil,
            permissions
        };
    } catch (error) {
        // Gestion centralisée des erreurs async
        if (error instanceof ErreurReseau) {
            console.error('Problème réseau:', error.message);
            // Retry logic possible ici
            throw new Error('Service temporairement indisponible');
        } else if (error.statusCode === 404) {
            throw new Error('Utilisateur non trouvé');
        } else {
            console.error('Erreur inattendue:', error);
            throw new Error('Erreur interne du serveur');
        }
    }
}

// Utilisation
async function main() {
    try {
        const donnees = await traiterUtilisateur(123);
        console.log('Données utilisateur:', donnees);
    } catch (error) {
        console.error('Erreur finale:', error.message);
        // Affichage à l'utilisateur
        afficherErreur(error.message);
    }
}
```

### Promise.all et Gestion d'Erreurs
```javascript
async function recupererDonneesParalleles() {
    try {
        // Toutes les promesses doivent réussir
        const [utilisateurs, produits, commandes] = await Promise.all([
            fetch('/api/users').then(r => r.json()),
            fetch('/api/products').then(r => r.json()),
            fetch('/api/orders').then(r => r.json())
        ]);

        return { utilisateurs, produits, commandes };
    } catch (error) {
        // Une seule erreur fait échouer tout
        console.error('Erreur dans récupération parallèle:', error);
        throw error;
    }
}

// Alternative: Promise.allSettled pour résultats partiels
async function recupererDonneesPartielles() {
    const resultats = await Promise.allSettled([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/orders').then(r => r.json())
    ]);

    const donnees = {};
    const erreurs = [];

    resultats.forEach((resultat, index) => {
        const noms = ['utilisateurs', 'produits', 'commandes'];
        if (resultat.status === 'fulfilled') {
            donnees[noms[index]] = resultat.value;
        } else {
            erreurs.push(`Erreur ${noms[index]}: ${resultat.reason.message}`);
        }
    });

    if (erreurs.length > 0) {
        console.warn('Erreurs partielles:', erreurs);
    }

    return donnees;
}
```

## Patterns de Gestion d'Erreurs

### Early Return Pattern
```javascript
function traiterCommande(commande) {
    // Validations avec early return
    if (!commande) {
        throw new Error('Commande requise');
    }

    if (!commande.items || commande.items.length === 0) {
        throw new Error('Commande vide');
    }

    if (!commande.clientId) {
        throw new Error('Client requis');
    }

    // Logique principale seulement si tout est valide
    return processCommande(commande);
}
```

### Wrapper Result Pattern
```javascript
class Resultat {
    constructor(valeur = null, erreur = null) {
        this.valeur = valeur;
        this.erreur = erreur;
        this.succes = erreur === null;
    }

    static succes(valeur) {
        return new Resultat(valeur, null);
    }

    static echec(erreur) {
        return new Resultat(null, erreur);
    }

    map(fn) {
        return this.succes ? Resultat.succes(fn(this.valeur)) : this;
    }

    flatMap(fn) {
        return this.succes ? fn(this.valeur) : this;
    }

    ou(valeurDefaut) {
        return this.succes ? this.valeur : valeurDefaut;
    }
}

// Utilisation
function diviser(a, b) {
    if (b === 0) {
        return Resultat.echec(new Error('Division par zéro'));
    }
    return Resultat.succes(a / b);
}

const resultat = diviser(10, 2)
    .map(x => x * 2)
    .map(x => x + 1);

if (resultat.succes) {
    console.log('Résultat:', resultat.valeur); // 11
} else {
    console.error('Erreur:', resultat.erreur.message);
}
```

### Circuit Breaker Pattern
```javascript
class CircuitBreaker {
    constructor(options = {}) {
        this.seuilEchecs = options.seuilEchecs || 5;
        this.timeoutRecuperation = options.timeoutRecuperation || 60000;
        this.etat = 'FERME'; // FERME, OUVERT, DEMI_OUVERT
        this.compteurEchecs = 0;
        this.dernierEchec = null;
    }

    async executer(operation) {
        if (this.etat === 'OUVERT') {
            if (Date.now() - this.dernierEchec > this.timeoutRecuperation) {
                this.etat = 'DEMI_OUVERT';
            } else {
                throw new Error('Circuit breaker ouvert - service indisponible');
            }
        }

        try {
            const resultat = await operation();
            this.onSucces();
            return resultat;
        } catch (error) {
            this.onEchec();
            throw error;
        }
    }

    onSucces() {
        this.compteurEchecs = 0;
        this.etat = 'FERME';
    }

    onEchec() {
        this.compteurEchecs++;
        this.dernierEchec = Date.now();

        if (this.compteurEchecs >= this.seuilEchecs) {
            this.etat = 'OUVERT';
        }
    }
}

// Utilisation
const circuitBreaker = new CircuitBreaker({
    seuilEchecs: 3,
    timeoutRecuperation: 30000
});

async function appelAPI() {
    try {
        return await circuitBreaker.executer(() =>
            fetch('/api/service-instable').then(r => r.json())
        );
    } catch (error) {
        console.error('Service indisponible:', error.message);
        return donneesCache || donneesParDefaut;
    }
}
```

### Retry Pattern
```javascript
async function avecRetry(operation, options = {}) {
    const maxTentatives = options.maxTentatives || 3;
    const delaiBase = options.delaiBase || 1000;
    const facteurBackoff = options.facteurBackoff || 2;
    const jitter = options.jitter || true;

    for (let tentative = 0; tentative < maxTentatives; tentative++) {
        try {
            return await operation();
        } catch (error) {
            const estDernier = tentative === maxTentatives - 1;

            if (estDernier || !estErreurRetryable(error)) {
                throw error;
            }

            // Calcul du délai avec backoff exponentiel
            let delai = delaiBase * Math.pow(facteurBackoff, tentative);

            // Jitter pour éviter la synchronisation
            if (jitter) {
                delai += Math.random() * 1000;
            }

            console.log(`Tentative ${tentative + 1} échouée, retry dans ${delai}ms`);
            await new Promise(resolve => setTimeout(resolve, delai));
        }
    }
}

function estErreurRetryable(error) {
    // Errors temporaires vs permanentes
    const codesRetryables = [408, 429, 500, 502, 503, 504];
    return error.statusCode && codesRetryables.includes(error.statusCode);
}

// Utilisation
async function recupererDonneesAvecRetry() {
    return avecRetry(
        () => fetch('/api/data').then(r => {
            if (!r.ok) throw new ErreurReseau('Request failed', r.status);
            return r.json();
        }),
        {
            maxTentatives: 3,
            delaiBase: 1000,
            facteurBackoff: 2
        }
    );
}
```

## Logging et Monitoring

### Système de Logs Structurés
```javascript
class Logger {
    constructor(niveau = 'INFO') {
        this.niveau = niveau;
        this.niveaux = {
            ERROR: 0,
            WARN: 1,
            INFO: 2,
            DEBUG: 3
        };
    }

    log(niveau, message, contexte = {}) {
        if (this.niveaux[niveau] <= this.niveaux[this.niveau]) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                niveau,
                message,
                contexte,
                stack: niveau === 'ERROR' ? new Error().stack : undefined
            };

            console.log(JSON.stringify(logEntry, null, 2));

            // Envoi vers service de monitoring
            this.envoyerVersMonitoring(logEntry);
        }
    }

    error(message, error, contexte = {}) {
        this.log('ERROR', message, {
            ...contexte,
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            }
        });
    }

    warn(message, contexte = {}) {
        this.log('WARN', message, contexte);
    }

    info(message, contexte = {}) {
        this.log('INFO', message, contexte);
    }

    debug(message, contexte = {}) {
        this.log('DEBUG', message, contexte);
    }

    envoyerVersMonitoring(logEntry) {
        // Implémentation spécifique au service de monitoring
        // ex: Sentry, DataDog, CloudWatch, etc.
    }
}

const logger = new Logger('INFO');

// Utilisation dans la gestion d'erreurs
async function traiterRequete(req) {
    try {
        logger.info('Début traitement requête', {
            url: req.url,
            method: req.method,
            userId: req.userId
        });

        const resultat = await processRequete(req);

        logger.info('Requête traitée avec succès', {
            url: req.url,
            duration: Date.now() - req.startTime
        });

        return resultat;
    } catch (error) {
        logger.error('Erreur traitement requête', error, {
            url: req.url,
            userId: req.userId,
            params: req.params
        });

        throw error;
    }
}
```

### Métriques et Alertes
```javascript
class MetriquesErreurs {
    constructor() {
        this.compteurs = new Map();
        this.historique = [];
    }

    enregistrerErreur(type, details = {}) {
        const cle = `${type}_${details.code || 'unknown'}`;

        this.compteurs.set(cle, (this.compteurs.get(cle) || 0) + 1);

        this.historique.push({
            timestamp: Date.now(),
            type,
            details
        });

        // Vérifier les seuils d'alerte
        this.verifierAlertes(type, cle);
    }

    verifierAlertes(type, cle) {
        const compte = this.compteurs.get(cle);
        const seuils = {
            'ErreurReseau': 10,
            'ErreurValidation': 50,
            'ErreurInterne': 5
        };

        if (compte && compte >= (seuils[type] || 20)) {
            this.declencherAlerte(type, cle, compte);
        }
    }

    declencherAlerte(type, cle, compte) {
        console.warn(`🚨 ALERTE: ${compte} erreurs de type ${type} (${cle})`);

        // Envoyer notification (email, Slack, etc.)
        this.envoyerNotification({
            type: 'ALERTE_ERREUR',
            message: `Seuil d'erreurs dépassé: ${compte} ${type}`,
            severite: 'HIGH',
            timestamp: new Date().toISOString()
        });
    }

    obtenirStatistiques(periode = 3600000) { // 1h par défaut
        const maintenant = Date.now();
        const errorsRecentes = this.historique.filter(
            e => maintenant - e.timestamp < periode
        );

        const parType = {};
        errorsRecentes.forEach(error => {
            parType[error.type] = (parType[error.type] || 0) + 1;
        });

        return {
            total: errorsRecentes.length,
            parType,
            tauxErreur: errorsRecentes.length / (periode / 1000), // erreurs/seconde
            periode
        };
    }

    envoyerNotification(alerte) {
        // Implémentation notification
        // Slack, email, SMS, etc.
    }
}

const metriques = new MetriquesErreurs();

// Intégration dans error handling
function gererErreur(error, contexte = {}) {
    // Log de l'erreur
    logger.error('Erreur applicative', error, contexte);

    // Métrique pour monitoring
    metriques.enregistrerErreur(error.constructor.name, {
        code: error.code,
        url: contexte.url,
        userId: contexte.userId
    });

    // Response appropriée selon le type d'erreur
    if (error instanceof ErreurValidation) {
        return {
            status: 400,
            message: error.message,
            champ: error.champ
        };
    } else if (error instanceof ErreurReseau) {
        return {
            status: 502,
            message: 'Service temporairement indisponible'
        };
    } else {
        return {
            status: 500,
            message: 'Erreur interne du serveur'
        };
    }
}
```

## Bonnes Pratiques

### 1. Fail Fast - Échouer Rapidement
```javascript
function traiterPaiement(paiement) {
    // Validation immédiate
    if (!paiement) throw new Error('Paiement requis');
    if (!paiement.montant || paiement.montant <= 0) {
        throw new ErreurValidation('Montant invalide', 'montant');
    }
    if (!paiement.methodePaiement) {
        throw new ErreurValidation('Méthode de paiement requise', 'methodePaiement');
    }

    // Traitement seulement si tout est valide
    return processarPaiement(paiement);
}
```

### 2. Logging Contextuel
```javascript
async function traiterCommande(commandeId, userId) {
    const contexte = { commandeId, userId };

    try {
        logger.info('Début traitement commande', contexte);

        const commande = await recupererCommande(commandeId);
        contexte.montant = commande.total;

        const paiement = await traiterPaiement(commande.paiement);
        contexte.paiementId = paiement.id;

        logger.info('Commande traitée avec succès', contexte);
        return commande;
    } catch (error) {
        logger.error('Échec traitement commande', error, contexte);
        throw error;
    }
}
```

### 3. Graceful Degradation
```javascript
async function afficherPageProduit(produitId) {
    const donnees = {
        produit: null,
        avis: [],
        recommandations: [],
        erreurs: []
    };

    try {
        // Données critiques
        donnees.produit = await recupererProduit(produitId);
    } catch (error) {
        logger.error('Impossible de récupérer le produit', error);
        throw new Error('Produit non disponible');
    }

    // Données optionnelles avec fallback
    try {
        donnees.avis = await recupererAvis(produitId);
    } catch (error) {
        logger.warn('Impossible de récupérer les avis', error);
        donnees.erreurs.push('Avis temporairement indisponibles');
    }

    try {
        donnees.recommandations = await recupererRecommandations(produitId);
    } catch (error) {
        logger.warn('Impossible de récupérer les recommandations', error);
        // Fallback vers recommandations par défaut
        donnees.recommandations = recommandationsParDefaut;
    }

    return donnees;
}
```

### 4. Error Boundaries (React-like concept)
```javascript
class GestionnaireErreurs {
    constructor() {
        this.gestionnaires = new Map();
        this.gestionnaireGlobal = null;
    }

    enregistrer(type, gestionnaire) {
        this.gestionnaires.set(type, gestionnaire);
    }

    definirGlobal(gestionnaire) {
        this.gestionnaireGlobal = gestionnaire;
    }

    gerer(error, contexte = {}) {
        const gestionnaire = this.gestionnaires.get(error.constructor.name);

        if (gestionnaire) {
            return gestionnaire(error, contexte);
        } else if (this.gestionnaireGlobal) {
            return this.gestionnaireGlobal(error, contexte);
        } else {
            // Fallback par défaut
            console.error('Erreur non gérée:', error);
            throw error;
        }
    }
}

const gestionnaireErreurs = new GestionnaireErreurs();

// Configuration des gestionnaires spécifiques
gestionnaireErreurs.enregistrer('ErreurValidation', (error, contexte) => {
    return {
        type: 'validation',
        message: error.message,
        champ: error.champ,
        action: 'corriger'
    };
});

gestionnaireErreurs.enregistrer('ErreurReseau', (error, contexte) => {
    return {
        type: 'network',
        message: 'Problème de connexion',
        action: 'retry'
    };
});

// Gestionnaire global
gestionnaireErreurs.definirGlobal((error, contexte) => {
    return {
        type: 'unknown',
        message: 'Une erreur inattendue s\'est produite',
        action: 'contact_support'
    };
});
```

## Techniques de Débogage

### Outils de Débogage Natifs

#### Console et Logging
```javascript
// Logging de base
console.log('Valeur:', variable);
console.error('Erreur:', error.message);
console.warn('Attention:', message);

// Logging avancé
console.table(arrayOfObjects); // Affichage en tableau
console.group('Groupe de logs');
console.log('Message dans le groupe');
console.groupEnd();

// Logging conditionnel
console.assert(condition, 'Message si condition false');

// Timing
console.time('Operation');
// ... code à mesurer
console.timeEnd('Operation');
```

#### Débogueur Navigateur
```javascript
function problematicFunction(data) {
    debugger; // Point d'arrêt forcé

    let result = data.map(item => {
        // Inspecter les variables ici
        return item.value * 2;
    });

    return result;
}

// Inspection dynamique
function analyzeError(error) {
    console.log('Error properties:', Object.getOwnPropertyNames(error));
    console.log('Error prototype:', Object.getPrototypeOf(error));
    console.dir(error); // Structure complète de l'objet
}
```

### Techniques de Debug Avancées

#### Stack Trace Analysis
```javascript
function getDetailedStackTrace() {
    const error = new Error();
    const stack = error.stack.split('\n');

    return stack.map((line, index) => ({
        level: index,
        function: line.match(/at\s+([^\s]+)/)?.[1] || 'anonymous',
        location: line.match(/\(([^)]+)\)/)?.[1] || 'unknown',
        line: line.trim()
    }));
}

// Utilisation
function deepFunction() {
    function middleFunction() {
        function problemFunction() {
            console.table(getDetailedStackTrace());
            throw new Error('Debug trace');
        }
        problemFunction();
    }
    middleFunction();
}
```

#### Logging Intelligent
```javascript
class DebugLogger {
    constructor(level = 'info') {
        this.levels = { error: 0, warn: 1, info: 2, debug: 3 };
        this.currentLevel = this.levels[level];
    }

    log(level, message, data = null) {
        if (this.levels[level] <= this.currentLevel) {
            const timestamp = new Date().toISOString();
            const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

            if (data) {
                console.log(`${prefix} ${message}`, data);
            } else {
                console.log(`${prefix} ${message}`);
            }
        }
    }

    error(message, data) { this.log('error', message, data); }
    warn(message, data) { this.log('warn', message, data); }
    info(message, data) { this.log('info', message, data); }
    debug(message, data) { this.log('debug', message, data); }
}

const logger = new DebugLogger('debug');
logger.debug('Variable state:', { user: userData, config: appConfig });
```

#### Monitoring en Temps Réel
```javascript
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    startTimer(name) {
        this.metrics[name] = performance.now();
    }

    endTimer(name) {
        if (this.metrics[name]) {
            const duration = performance.now() - this.metrics[name];
            console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
            delete this.metrics[name];
            return duration;
        }
    }

    trackMemory() {
        if (performance.memory) {
            const memory = performance.memory;
            console.table({
                'Heap utilisé': `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
                'Heap total': `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
                'Limite': `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
            });
        }
    }
}

const monitor = new PerformanceMonitor();

// Utilisation
monitor.startTimer('data-processing');
await processLargeDataset();
monitor.endTimer('data-processing');
monitor.trackMemory();
```

### Stratégies de Debug par Type d'Erreur

#### Erreurs Asynchrones
```javascript
// Debug avec Promise.allSettled
async function debugAsyncOperations() {
    const operations = [
        fetch('/api/users'),
        fetch('/api/posts'),
        fetch('/api/comments')
    ];

    const results = await Promise.allSettled(operations);

    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            console.error(`Operation ${index} failed:`, result.reason);
        } else {
            console.log(`Operation ${index} succeeded`);
        }
    });
}

// Debug avec timeout
function withTimeout(promise, timeoutMs) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs)
        )
    ]);
}
```

#### Erreurs de State Management
```javascript
class StateDebugger {
    constructor(initialState) {
        this.history = [{ ...initialState }];
        this.currentState = { ...initialState };
    }

    setState(newState) {
        const previousState = { ...this.currentState };
        this.currentState = { ...this.currentState, ...newState };
        this.history.push({ ...this.currentState });

        console.group(`🔄 State Change`);
        console.log('Previous:', previousState);
        console.log('Changes:', newState);
        console.log('New State:', this.currentState);
        console.groupEnd();
    }

    getHistory() {
        return this.history;
    }

    revertToState(index) {
        if (index >= 0 && index < this.history.length) {
            this.currentState = { ...this.history[index] };
            console.log(`⏪ Reverted to state ${index}:`, this.currentState);
        }
    }
}
```

#### Erreurs DOM et Événements
```javascript
// Debug des event listeners
function debugEventListener(element, eventType, listener) {
    const wrappedListener = function(event) {
        console.group(`🎯 Event: ${eventType}`);
        console.log('Target:', event.target);
        console.log('Current Target:', event.currentTarget);
        console.log('Event Object:', event);

        try {
            const result = listener.call(this, event);
            console.log('✅ Listener executed successfully');
            return result;
        } catch (error) {
            console.error('❌ Error in listener:', error);
            throw error;
        } finally {
            console.groupEnd();
        }
    };

    element.addEventListener(eventType, wrappedListener);
    return wrappedListener;
}

// Debug des mutations DOM
if (typeof MutationObserver !== 'undefined') {
    const domDebugger = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            console.log('DOM Mutation:', {
                type: mutation.type,
                target: mutation.target,
                addedNodes: mutation.addedNodes,
                removedNodes: mutation.removedNodes
            });
        });
    });

    // Activer en mode debug seulement
    if (process.env.NODE_ENV === 'development') {
        domDebugger.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });
    }
}
```

### Outils et Extensions Utiles

#### Console Avancée
```javascript
// Styles dans la console
console.log('%c Debug Info ', 'background: #007bff; color: white; padding: 2px 5px;');
console.log('%c Error! ', 'background: #dc3545; color: white; padding: 2px 5px;');

// Groupage conditionnel
function conditionalGroup(condition, label, callback) {
    if (condition) {
        console.group(label);
        callback();
        console.groupEnd();
    }
}

// Trace des appels de fonction
function traceFunction(fn, name) {
    return function(...args) {
        console.log(`🔍 Calling ${name} with args:`, args);
        const result = fn.apply(this, args);
        console.log(`✅ ${name} returned:`, result);
        return result;
    };
}
```

### Debugging en Production

#### Error Reporting
```javascript
class ProductionErrorHandler {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
        this.setupGlobalHandlers();
    }

    setupGlobalHandlers() {
        window.addEventListener('error', (event) => {
            this.reportError({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.reportError({
                type: 'promise',
                message: event.reason?.message || 'Unhandled Promise Rejection',
                stack: event.reason?.stack
            });
        });
    }

    async reportError(errorInfo) {
        try {
            await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...errorInfo,
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (e) {
            console.error('Failed to report error:', e);
        }
    }
}
```

## Applications du Monde Réel

- **APIs REST** : Codes de statut HTTP appropriés
- **Applications Frontend** : Error boundaries, fallbacks UI
- **Microservices** : Circuit breakers, monitoring distribué
- **Bases de Données** : Transactions, rollbacks, contraintes
- **Systèmes Distribués** : Retry logic, timeouts, bulkheads
- **Production** : Monitoring, alertes, recovery automatique
- **Tests** : Tests d'erreurs, chaos engineering