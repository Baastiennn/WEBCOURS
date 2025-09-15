# Gestion d'Erreurs - Quiz

## Questions à Choix Multiples

### 1. Que va afficher ce code si `data` est `null` ?
```javascript
try {
    console.log(data.length);
} catch (error) {
    console.log(error.name);
} finally {
    console.log("Done");
}
```
a) `undefined`, puis "Done"  
b) `TypeError`, puis "Done"  
c) `ReferenceError`, puis "Done"  
d) Seulement "Done"  

**Réponse: b) `TypeError`, puis "Done"**

### 2. Dans quel ordre s'exécutent ces blocs ?
```javascript
try {
    return "success";
} catch (error) {
    return "error";
} finally {
    console.log("cleanup");
}
```
a) try puis finally  
b) Seulement try  
c) try, catch, finally  
d) finally puis try  

**Réponse: a) try puis finally**

### 3. Comment relancer une erreur dans un bloc catch ?
a) `return error;`  
b) `throw error;`  
c) `raise error;`  
d) `emit error;`  

**Réponse: b) `throw error;`**

### 4. Que fait `Promise.allSettled()` comparé à `Promise.all()` ?
a) Il est plus rapide  
b) Il attend que toutes les Promises soient résolues ou rejetées  
c) Il ne peut gérer qu'une Promise à la fois  
d) Il est identique à `Promise.all()`  

**Réponse: b) Il attend que toutes les Promises soient résolues ou rejetées**

### 5. Quel type d'erreur sera lancé par ce code ?
```javascript
function test() {
    console.log(variableInexistante);
}
test();
```
a) `TypeError`  
b) `SyntaxError`  
c) `ReferenceError`  
d) `RangeError`  

**Réponse: c) `ReferenceError`**

## Questions Vrai/Faux

### 6. Le bloc `finally` s'exécute même si il y a un `return` dans `try`.
**Réponse: Vrai**

### 7. `console.error()` lance une exception qui doit être capturée.
**Réponse: Faux** (console.error() affiche seulement l'erreur)

### 8. Une Promise rejetée sans `.catch()` peut planter l'application Node.js.
**Réponse: Vrai**

### 9. Le pattern "Fail Fast" encourage à cacher les erreurs.
**Réponse: Faux** (il encourage à détecter et signaler rapidement)

### 10. `async/await` élimine le besoin d'utiliser `try-catch`.
**Réponse: Faux** (try-catch reste nécessaire pour gérer les erreurs)

## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
async function test() {
    try {
        await Promise.reject("Erreur");
        console.log("Succès");
    } catch (error) {
        console.log("Capturé:", error);
        throw error;
    } finally {
        console.log("Nettoyage");
    }
}

test().catch(err => console.log("Final:", err));
```
**Réponse:**
```
Capturé: Erreur
Nettoyage
Final: Erreur
```

### 12. Quel est le problème avec ce code ?
```javascript
users.forEach(async (user) => {
    try {
        await processUser(user);
    } catch (error) {
        console.error("Erreur pour", user.id, error);
    }
});
```
**Réponse:** `forEach` n'attend pas les fonctions async. Les erreurs peuvent être perdues et l'ordre n'est pas garanti.

### 13. Comment corriger cette gestion d'erreur ?
```javascript
function divide(a, b) {
    if (b === 0) {
        console.error("Division par zéro");
        return null;
    }
    return a / b;
}
```
**Réponse:**
```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division par zéro interdite");
    }
    return a / b;
}
```

### 14. Que retourne cette fonction en cas d'erreur ?
```javascript
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        return await response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        // Pas de throw ou return
    }
}
```
**Réponse: `undefined`** (pas de return explicite dans le catch)

## Questions Pratiques

### 15. Créez une classe d'erreur personnalisée pour la validation :
```javascript
class ValidationError extends Error {
    // Votre implémentation
}
```
**Réponse:**
```javascript
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.code = 'VALIDATION_ERROR';
    }
}
```

### 16. Implémentez une fonction de retry simple :
```javascript
async function retry(operation, maxAttempts) {
    // Votre code
}
```
**Réponse:**
```javascript
async function retry(operation, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }
            await new Promise(resolve => 
                setTimeout(resolve, 1000 * attempt)
            );
        }
    }
}
```

### 17. Comment gérer plusieurs erreurs possibles dans une fonction async ?
```javascript
async function processUser(userId) {
    // Peut lancer NetworkError, ValidationError, DatabaseError
    // Votre gestion d'erreur
}
```
**Réponse:**
```javascript
async function processUser(userId) {
    try {
        const user = await fetchUser(userId);
        const processed = await validateUser(user);
        return await saveUser(processed);
    } catch (error) {
        if (error instanceof NetworkError) {
            throw new Error('Service temporairement indisponible');
        } else if (error instanceof ValidationError) {
            throw new Error(`Données invalides: ${error.field}`);
        } else if (error instanceof DatabaseError) {
            throw new Error('Erreur de sauvegarde');
        } else {
            throw new Error('Erreur interne');
        }
    }
}
```

### 18. Créez un wrapper Result pour éviter les exceptions :
```javascript
class Result {
    // Votre implémentation
}
```
**Réponse:**
```javascript
class Result {
    constructor(value = null, error = null) {
        this.value = value;
        this.error = error;
        this.isSuccess = error === null;
    }
    
    static success(value) {
        return new Result(value, null);
    }
    
    static failure(error) {
        return new Result(null, error);
    }
    
    map(fn) {
        return this.isSuccess ? Result.success(fn(this.value)) : this;
    }
    
    getOrElse(defaultValue) {
        return this.isSuccess ? this.value : defaultValue;
    }
}
```

## Questions sur les Patterns

### 19. Qu'est-ce que le Circuit Breaker pattern et quand l'utiliser ?
**Réponse:** Pattern qui "ouvre le circuit" après plusieurs échecs consécutifs pour éviter les appels inutiles à un service défaillant. Utilisé pour éviter l'effet cascade d'erreurs dans les microservices.

### 20. Comment implémenter un timeout sur une Promise ?
**Réponse:**
```javascript
function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), ms)
    );
    return Promise.race([promise, timeout]);
}
```

### 21. Expliquez la différence entre "fail fast" et "fail safe" :
**Réponse:** 
- **Fail Fast**: Échouer rapidement et visiblement dès qu'un problème est détecté
- **Fail Safe**: Continuer de fonctionner même en cas d'erreur, avec des valeurs par défaut

### 22. Comment centraliser la gestion d'erreurs dans une application Express ?
**Réponse:**
```javascript
// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
    logger.error('Erreur application', err, {
        url: req.url,
        method: req.method,
        ip: req.ip
    });
    
    if (err instanceof ValidationError) {
        return res.status(400).json({error: err.message});
    }
    
    res.status(500).json({error: 'Erreur interne'});
});
```

## Questions de Débogage

### 23. Comment déboguer une erreur qui n'a pas de stack trace ?
**Réponse:** 
- Ajouter des console.log stratégiques
- Utiliser le débogueur avec des breakpoints
- Capturer l'erreur avec `Error.captureStackTrace()`
- Reproduire avec des données de test contrôlées

### 24. Cette fonction ne capture pas correctement les erreurs. Pourquoi ?
```javascript
function processFiles(files) {
    files.forEach(file => {
        try {
            processFile(file);
        } catch (error) {
            console.error('Error:', error);
        }
    });
}
```
**Réponse:** Si `processFile` est asynchrone, les erreurs ne seront pas capturées par ce try-catch synchrone.

### 25. Comment tracer l'origine d'une erreur dans du code asynchrone complexe ?
**Réponse:** 
- Utiliser des IDs de corrélation/trace
- Logging contextuel à chaque étape
- Stack traces préservées avec `async_hooks` (Node.js)
- Tools comme async-listener ou zone.js

## Questions sur le Logging

### 26. Quelles informations essentielles inclure dans un log d'erreur ?
**Réponse:** 
- Timestamp
- Niveau de sévérité
- Message d'erreur et stack trace
- Contexte (user ID, request ID, paramètres)
- Version de l'application
- Environnement (dev, staging, prod)

### 27. Comment structurer les logs pour faciliter le monitoring ?
**Réponse:**
```javascript
const logEntry = {
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    message: error.message,
    stack: error.stack,
    context: {
        userId: req.userId,
        requestId: req.id,
        url: req.url,
        userAgent: req.headers['user-agent']
    },
    tags: ['payment', 'critical']
};
```

## Questions de Performance

### 28. Quel est l'impact des try-catch sur les performances ?
**Réponse:** Try-catch a un coût minimal si aucune erreur n'est lancée, mais capturer des erreurs est coûteux. Éviter d'utiliser try-catch pour le contrôle de flux normal.

### 29. Comment optimiser la gestion d'erreurs dans une boucle ?
**Réponse:**
```javascript
// Éviter
for (let item of items) {
    try {
        processItem(item);
    } catch (error) {
        // coûteux à chaque itération
    }
}

// Préférer
try {
    for (let item of items) {
        processItem(item); // validation en amont
    }
} catch (error) {
    // gestion globale
}
```

## Questions Avancées

### 30. Comment gérer les erreurs dans un système distribué ?
**Réponse:**
- Correlation IDs pour tracer les erreurs across services
- Circuit breakers pour éviter la propagation
- Retry avec backoff exponentiel
- Monitoring centralisé et alertes
- Graceful degradation avec fallbacks

### 31. Expliquez le concept d'"Error Boundary" et comment l'implémenter :
**Réponse:** Composant qui capture les erreurs de ses enfants pour éviter le crash total. Implémentation avec un service global qui wrappe les opérations critiques.

### 32. Comment tester la gestion d'erreurs ?
**Réponse:**
- Tests unitaires avec mocks qui lancent des erreurs
- Tests d'intégration avec services indisponibles  
- Chaos engineering en environnement de test
- Simulation de pannes réseau/timeout
- Vérification des logs et métriques d'erreur

## Notation
- **29-32 correct**: Maîtrise experte de la gestion d'erreurs
- **26-28 correct**: Excellente compréhension, quelques nuances avancées à approfondir
- **22-25 correct**: Bonne connaissance, pratiquer les patterns complexes
- **18-21 correct**: Compréhension solide des bases, développer les aspects asynchrones
- **14-17 correct**: Fondamentaux acquis, se concentrer sur les bonnes pratiques
- **Moins de 14**: Réviser les concepts de base try-catch et gestion d'erreurs async