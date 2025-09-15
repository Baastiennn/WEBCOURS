# Modules et Imports - Quiz

## Questions à Choix Multiples

### 1. Quelle est la syntaxe correcte pour exporter une fonction nommée ?
a) `export function myFunction() { }`
b) `exports myFunction = function() { }`
c) `module.exports.myFunction = function() { }`
d) `export { myFunction }`

**Réponse: a) `export function myFunction() { }`**

### 2. Comment importer une fonction spécifique depuis un module ?
a) `import myFunction from './module.js'`
b) `import { myFunction } from './module.js'`
c) `import * as myFunction from './module.js'`
d) `import('./module.js').myFunction`

**Réponse: b) `import { myFunction } from './module.js'`**

### 3. Que fait ce code ?
```javascript
import { add as addition, multiply as mult } from './math.js';
```
a) Importe add et multiply avec leurs noms originaux
b) Importe add en le renommant addition, et multiply en mult
c) Crée des alias pour les fonctions dans le module
d) Les réponses b et c sont correctes

**Réponse: d) Les réponses b et c sont correctes**

### 4. Comment créer un export par défaut ?
a) `export default myFunction;`
b) `export { myFunction as default };`
c) `export default function myFunction() { }`
d) Toutes les réponses sont correctes

**Réponse: d) Toutes les réponses sont correctes**

### 5. Qu'est-ce qu'un "barrel export" ?
a) Un export qui contient beaucoup de données
b) Un fichier index.js qui re-exporte des modules
c) Un export par défaut très volumineux
d) Une technique d'optimisation

**Réponse: b) Un fichier index.js qui re-exporte des modules**

## Questions Vrai/Faux

### 6. Un module peut avoir plusieurs exports par défaut.
**Réponse: Faux** (Un seul export par défaut par module)

### 7. Les modules ES6 sont chargés de manière synchrone.
**Réponse: Faux** (Les modules sont chargés de manière asynchrone)

### 8. Il faut toujours inclure l'extension .js dans les imports en mode natif.
**Réponse: Vrai**

### 9. Les variables déclarées dans un module sont automatiquement globales.
**Réponse: Faux** (Les modules ont leur propre scope)

### 10. L'import dynamique retourne une Promise.
**Réponse: Vrai**

## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
// math.js
export const PI = 3.14;
export function double(x) { return x * 2; }

// main.js
import { PI, double } from './math.js';
import * as math from './math.js';

console.log(PI);
console.log(math.PI);
console.log(double(5));
console.log(math.double(5));
```
**Réponse:**
```
3.14
3.14
10
10
```

### 12. Quel est le problème avec ce code ?
```javascript
// user.js
import { validateRole } from './auth.js';
export class User { }

// auth.js
import { User } from './user.js';
export function validateRole(user) { }
```
**Réponse:** Import circulaire - les deux modules s'importent mutuellement

### 13. Comment corriger cet export ?
```javascript
// config.js
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

// Tentative d'export
export { API_URL, MAX_RETRIES };
export default { API_URL, MAX_RETRIES };
```
**Réponse:** Le code est correct ! On peut avoir des exports nommés ET un export par défaut

### 14. Que fait ce barrel export ?
```javascript
// components/index.js
export { default as Button } from './Button.js';
export { default as Modal } from './Modal.js';
export { Menu, MenuItem } from './Menu.js';
```
**Réponse:** Re-exporte Button et Modal (exports par défaut) et Menu/MenuItem (exports nommés)

## Questions Pratiques

### 15. Écrivez un module utilitaire qui exporte des fonctions de manipulation de chaînes :
```javascript
// string-utils.js
// Exportez capitalize, reverse, et slugify
```
**Réponse:**
```javascript
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverse(str) {
    return str.split('').reverse().join('');
}

export function slugify(str) {
    return str.toLowerCase().replace(/\s+/g, '-');
}
```

### 16. Créez un barrel export pour un dossier de composants :
```javascript
// components/index.js
// Button.js exporte par défaut une classe Button
// Input.js exporte par défaut une classe Input
// Modal.js exporte par défaut Modal et nommé MODAL_SIZES
```
**Réponse:**
```javascript
export { default as Button } from './Button.js';
export { default as Input } from './Input.js';
export { default as Modal, MODAL_SIZES } from './Modal.js';
```

### 17. Implémentez un import dynamique conditionnel :
```javascript
// Charger le module 'charts.js' seulement si l'utilisateur clique sur un bouton
document.getElementById('show-chart').addEventListener('click', async () => {
    // Votre code ici
});
```
**Réponse:**
```javascript
document.getElementById('show-chart').addEventListener('click', async () => {
    try {
        const chartModule = await import('./charts.js');
        const chart = new chartModule.Chart();
        chart.render();
    } catch (error) {
        console.error('Erreur lors du chargement du module:', error);
    }
});
```

### 18. Organisez cette structure de modules pour une API :
```javascript
// Créez la structure pour :
// - Client API de base
// - Services pour users et posts
// - Gestion d'erreurs
// - Point d'entrée unique
```
**Réponse:**
```javascript
// api/client.js
export default class ApiClient {
    async get(url) { /* ... */ }
    async post(url, data) { /* ... */ }
}

// api/errors.js
export class ApiError extends Error { /* ... */ }

// api/users.js
import ApiClient from './client.js';
const client = new ApiClient();
export const getUsers = () => client.get('/users');

// api/posts.js
import ApiClient from './client.js';
const client = new ApiClient();
export const getPosts = () => client.get('/posts');

// api/index.js
export * from './users.js';
export * from './posts.js';
export { ApiError } from './errors.js';
```

## Questions sur l'Organisation

### 19. Quelle est la meilleure organisation pour ce projet ?
```
Option A:
├── js/
├── css/
└── html/

Option B:
├── components/
├── services/
├── utils/
└── pages/
```
**Réponse: Option B** (Organisation par fonctionnalité plutôt que par type de fichier)

### 20. Comment éviter les imports circulaires ?
**Réponse:**
- Créer un module intermédiaire avec les types/constantes partagés
- Refactoriser pour inverser la dépendance
- Utiliser l'injection de dépendance
- Revoir l'architecture pour réduire le couplage

### 21. Qu'est-ce que le "tree shaking" ?
**Réponse:** Technique d'optimisation qui élimine le code mort (non utilisé) lors du bundling, possible grâce aux imports/exports statiques

### 22. Avantages des modules ES6 vs scripts traditionnels ?
**Réponse:**
- Scope isolé (pas de pollution globale)
- Imports/exports explicites
- Chargement asynchrone
- Meilleure optimisation possible
- Tree shaking
- Support natif des navigateurs modernes

## Questions Avancées

### 23. Qu'est-ce que `import.meta` ?
**Réponse:** Objet contenant des métadonnées sur le module actuel (ex: `import.meta.url` pour l'URL du module)

### 24. Comment implémenter un système de plugins avec modules ?
**Réponse:**
```javascript
class PluginManager {
    async loadPlugin(name, path) {
        const pluginModule = await import(path);
        const plugin = new pluginModule.default();
        this.plugins.set(name, plugin);
        return plugin;
    }
}
```

### 25. Différence entre import statique et dynamique ?
**Réponse:**
- **Statique** : `import { func } from './module.js'` - résolu au build time
- **Dynamique** : `import('./module.js')` - résolu au runtime, retourne une Promise

### 26. Comment partager des constantes entre modules ?
**Réponse:**
```javascript
// constants/index.js
export const API_ENDPOINTS = {
    USERS: '/users',
    POSTS: '/posts'
};

// Puis importer dans chaque module qui en a besoin
import { API_ENDPOINTS } from '../constants/index.js';
```

### 27. Qu'est-ce qu'un module wrapper ?
**Réponse:** Module qui encapsule une bibliothèque externe pour fournir une interface personnalisée et faciliter les tests/mocking

### 28. Comment gérer la configuration d'environnement avec modules ?
**Réponse:**
```javascript
// config/index.js
const isProd = process.env.NODE_ENV === 'production';

export default {
    apiUrl: isProd ? 'https://api.prod.com' : 'http://localhost:3000',
    debugMode: !isProd
};
```

### 29. Bonnes pratiques pour nommer les modules ?
**Réponse:**
- Fichiers : kebab-case (`user-service.js`)
- Classes : PascalCase dans le nom du fichier (`UserService.js`)
- Utilitaires : descriptifs (`string-utils.js`)
- Index : `index.js` pour les barrel exports
- Tests : `module-name.test.js`

### 30. Comment débugger les problèmes de modules ?
**Réponse:**
- Developer Tools > Network : vérifier le chargement
- Console : erreurs d'import/export
- `import.meta.url` : identifier le module actuel
- Sources tab : explorer la structure des modules
- `console.log(Object.keys(module))` : voir les exports disponibles

## Notation
- **27-30 correct**: Expert en organisation modulaire JavaScript
- **23-26 correct**: Très bonne maîtrise, prêt pour projets complexes
- **19-22 correct**: Bonne compréhension, continuer la pratique
- **15-18 correct**: Bases solides, approfondir l'organisation avancée
- **11-14 correct**: Comprend les concepts, se concentrer sur les patterns
- **Moins de 11**: Réviser les concepts de base des modules ES6