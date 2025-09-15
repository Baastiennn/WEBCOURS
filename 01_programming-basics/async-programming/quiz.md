# Programmation Asynchrone - Quiz

## Questions à Choix Multiples

### 1. Que va afficher ce code ?
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
```
a) 1, 2, 3  
b) 1, 3, 2  
c) 3, 1, 2  
d) 2, 1, 3  

**Réponse: b) 1, 3, 2** (setTimeout va dans la queue des tâches)

### 2. Dans quel ordre s'exécutent ces micro et macro-tâches ?
```javascript
setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));
console.log('C');
```
a) A, B, C  
b) C, A, B  
c) C, B, A  
d) B, C, A  

**Réponse: c) C, B, A** (code synchrone, puis micro-tâche, puis macro-tâche)

### 3. Comment créer une Promise qui se résout après 2 secondes ?
a) `new Promise(resolve => setTimeout(resolve, 2000))`  
b) `Promise.resolve().then(() => setTimeout(2000))`  
c) `async () => await 2000`  
d) `Promise.delay(2000)`  

**Réponse: a) `new Promise(resolve => setTimeout(resolve, 2000))`**

### 4. Que fait `Promise.all([p1, p2, p3])` ?
a) Exécute les Promises en séquence  
b) Retourne la Promise la plus rapide  
c) Attend que toutes les Promises se résolvent  
d) Retourne seulement la première Promise  

**Réponse: c) Attend que toutes les Promises se résolvent**

### 5. Comment gérer une erreur avec async/await ?
a) `.catch()` après la fonction  
b) `try-catch` autour du code await  
c) `error` event listener  
d) `onError` callback  

**Réponse: b) `try-catch` autour du code await**

## Questions Vrai/Faux

### 6. `async function` retourne toujours une Promise.
**Réponse: Vrai**

### 7. `fetch()` rejette automatiquement pour les codes d'erreur HTTP (404, 500).
**Réponse: Faux** (fetch ne rejette que pour les erreurs réseau)

### 8. `await` peut seulement être utilisé dans une fonction `async`.
**Réponse: Vrai** (ou dans les modules ES2022+ au niveau racine)

### 9. `Promise.race()` attend que toutes les Promises se résolvent.
**Réponse: Faux** (retourne la première qui se résout)

### 10. `setTimeout(fn, 0)` s'exécute immédiatement.
**Réponse: Faux** (va dans la queue des macro-tâches)

## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
async function test() {
    console.log('1');
    await Promise.resolve();
    console.log('2');
}

console.log('3');
test();
console.log('4');
```
**Réponse:**
```
3
1
4
2
```

### 12. Quel est le problème avec ce code ?
```javascript
async function traiterUtilisateurs(users) {
    users.forEach(async (user) => {
        await processUser(user);
    });
}
```
**Réponse:** `forEach` n'attend pas les fonctions async. Utiliser `for...of` ou `Promise.all(users.map(...))`

### 13. Comment corriger cette gestion d'erreur ?
```javascript
async function getData() {
    const response = await fetch('/api/data');
    return response.json();
}
```
**Réponse:**
```javascript
async function getData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Erreur récupération données:', error);
        throw error;
    }
}
```

### 14. Que retourne cette fonction en cas d'erreur ?
```javascript
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        return await response.json();
    } catch (error) {
        console.error('Erreur:', error);
        // Pas de throw ou return
    }
}
```
**Réponse: `undefined`** (pas de return explicite dans le catch)

## Questions Pratiques

### 15. Implémentez une fonction de timeout pour Promise :
```javascript
function withTimeout(promise, ms) {
    // Votre code
}
```
**Réponse:**
```javascript
function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), ms)
    );
    return Promise.race([promise, timeout]);
}
```

### 16. Créez une fonction de retry avec maximum 3 tentatives :
```javascript
async function retry(operation) {
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

### 17. Implémentez un debounce pour fonction asynchrone :
```javascript
function debounce(fn, delay) {
    // Votre code
}
```
**Réponse:**
```javascript
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}
```

### 18. Créez un cache simple avec TTL :
```javascript
class SimpleCache {
    // Votre implémentation
}
```
**Réponse:**
```javascript
class SimpleCache {
    constructor() {
        this.cache = new Map();
    }
    
    set(key, value, ttl = 300000) {
        const expiry = Date.now() + ttl;
        this.cache.set(key, { value, expiry });
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value;
    }
}
```

## Questions sur les Patterns

### 19. Qu'est-ce que le pattern "Circuit Breaker" en programmation asynchrone ?
**Réponse:** Pattern qui "ouvre le circuit" après plusieurs échecs consécutifs pour éviter les appels inutiles à un service défaillant, permettant une récupération progressive.

### 20. Expliquez la différence entre debouncing et throttling :
**Réponse:**
- **Debouncing**: Retarde l'exécution jusqu'à ce qu'aucun nouvel appel ne soit fait pendant un délai
- **Throttling**: Limite le nombre d'exécutions dans un intervalle de temps donné

### 21. Comment implémenter du lazy loading pour des images ?
**Réponse:**
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
});
```

### 22. Qu'est-ce que le "callback hell" et comment l'éviter ?
**Réponse:** Imbrication excessive de callbacks créant une "pyramide du malheur". Solutions : Promises avec chaînage, async/await, ou découper en fonctions nommées.

## Questions sur l'Intégration DOM

### 23. Comment mettre à jour une liste d'utilisateurs de manière asynchrone ?
**Réponse:**
```javascript
async function updateUsersList() {
    try {
        showLoading(true);
        const users = await fetch('/api/users').then(r => r.json());
        
        const container = document.getElementById('users-container');
        container.innerHTML = users.map(user => 
            `<div class="user">${user.name} - ${user.email}</div>`
        ).join('');
    } catch (error) {
        showError('Impossible de charger les utilisateurs');
    } finally {
        showLoading(false);
    }
}
```

### 24. Comment gérer les états de chargement dans une interface ?
**Réponse:** Utiliser des états (loading, error, data) avec indicateurs visuels :
- Loading: spinner ou squelette
- Error: message d'erreur avec retry
- Success: afficher les données
- Empty: message "aucune donnée"

### 25. Comment implémenter une recherche en temps réel ?
**Réponse:**
```javascript
const searchWithDebounce = debounce(async (query) => {
    try {
        showSearchLoading(true);
        const results = await fetch(`/api/search?q=${query}`)
            .then(r => r.json());
        displayResults(results);
    } catch (error) {
        showSearchError('Erreur de recherche');
    } finally {
        showSearchLoading(false);
    }
}, 300);

document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length >= 2) {
        searchWithDebounce(query);
    }
});
```

## Questions sur les APIs

### 26. Comment envoyer des données JSON avec fetch ?
**Réponse:**
```javascript
const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'Alice',
        email: 'alice@example.com'
    })
});
```

### 27. Comment gérer l'authentification dans les requêtes async ?
**Réponse:**
```javascript
const apiCall = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');
    
    const config = {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers
        }
    };
    
    const response = await fetch(url, config);
    
    if (response.status === 401) {
        // Token expiré, rediriger vers login
        redirectToLogin();
        throw new Error('Non authentifié');
    }
    
    return response;
};
```

### 28. Comment implémenter un upload de fichier avec progress ?
**Réponse:**
```javascript
async function uploadFile(file, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);
        
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const progress = (e.loaded / e.total) * 100;
                onProgress(progress);
            }
        });
        
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`Upload failed: ${xhr.status}`));
            }
        });
        
        xhr.addEventListener('error', () => reject(new Error('Upload error')));
        
        xhr.open('POST', '/api/upload');
        xhr.send(formData);
    });
}
```

## Questions sur la Performance

### 29. Quelle est la différence de performance entre ces deux approches ?
```javascript
// Approche A - Séquentielle
async function loadDataA() {
    const users = await fetchUsers();
    const posts = await fetchPosts();
    const comments = await fetchComments();
    return { users, posts, comments };
}

// Approche B - Parallèle
async function loadDataB() {
    const [users, posts, comments] = await Promise.all([
        fetchUsers(),
        fetchPosts(),
        fetchComments()
    ]);
    return { users, posts, comments };
}
```
**Réponse:** Approche B est plus rapide car les requêtes s'exécutent en parallèle. Si chaque requête prend 1s, A prend 3s total, B prend 1s total.

### 30. Comment optimiser les requêtes API répétitives ?
**Réponse:** 
- Cache avec TTL pour éviter requêtes identiques
- Debouncing pour les recherches
- Pagination pour grandes listes
- Compression (gzip)
- Cache HTTP approprié (ETag, Last-Modified)

## Questions Avancées

### 31. Comment implémenter une connexion WebSocket robuste ?
**Réponse:**
```javascript
class RobustWebSocket {
    constructor(url) {
        this.url = url;
        this.reconnectInterval = 5000;
        this.maxReconnectAttempts = 5;
        this.reconnectAttempts = 0;
    }
    
    connect() {
        this.ws = new WebSocket(this.url);
        
        this.ws.onopen = () => {
            console.log('Connected');
            this.reconnectAttempts = 0;
        };
        
        this.ws.onclose = (event) => {
            if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
                setTimeout(() => {
                    this.reconnectAttempts++;
                    this.connect();
                }, this.reconnectInterval);
            }
        };
        
        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
}
```

### 32. Comment gérer les erreurs dans un système asynchrone complexe ?
**Réponse:**
- Try-catch à chaque niveau approprié
- Circuit breakers pour services externes
- Retry avec backoff exponentiel
- Logs structurés avec correlation IDs
- Fallbacks gracieux (cache, valeurs par défaut)
- Monitoring et alertes

### 33. Expliquez le concept d'Event Loop avec call stack et task queues :
**Réponse:** L'Event Loop vérifie en boucle :
1. **Call Stack** : Exécute le code synchrone
2. **Microtask Queue** : Promises, queueMicrotask (prioritaire)
3. **Macrotask Queue** : setTimeout, setInterval, I/O
4. Render si nécessaire
5. Répéter

Microtasks ont toujours priorité sur macrotasks.

## Notation
- **30-33 correct**: Maîtrise experte de la programmation asynchrone
- **27-29 correct**: Excellente compréhension, quelques nuances avancées à approfondir  
- **23-26 correct**: Bonne connaissance, pratiquer les patterns complexes
- **19-22 correct**: Compréhension solide des bases, développer l'intégration DOM
- **15-18 correct**: Fondamentaux acquis, se concentrer sur Promises et async/await
- **Moins de 15**: Réviser les concepts de base et l'Event Loop