# Modules et Imports - Notes

## Qu'est-ce que les Modules ?

Les modules sont un système d'organisation du code qui permet de diviser une application en fichiers séparés, chacun ayant ses propres responsabilités. Ils facilitent la réutilisabilité, la maintenance et la collaboration en équipe.

> 💡 **Liens avec d'autres modules :**
> - [**Functions ←**](../functions/) Les fonctions sont les principales entités exportées/importées
> - [**OOP-basics ←**](../oop-basics/) Les classes sont souvent organisées en modules
> - [**Error-handling →**](../error-handling/) Les modules doivent gérer les erreurs d'import/export
> - [**Data-structures ←**](../data-structures/) Les structures complexes peuvent être modularisées

## Pourquoi Utiliser des Modules ?

### Organisation du Code
- **Séparation des responsabilités** : Chaque module a un rôle spécifique
- **Lisibilité** : Code plus facile à comprendre et naviguer
- **Maintenance** : Modifications isolées dans des fichiers spécifiques

### Réutilisabilité
- **Partage de code** : Utiliser le même module dans plusieurs projets
- **Éviter la duplication** : DRY (Don't Repeat Yourself)
- **Composants modulaires** : Créer des bibliothèques réutilisables

### Gestion des Dépendances
- **Contrôle des imports** : Savoir exactement ce qui est utilisé
- **Éviter la pollution globale** : Pas de variables globales accidentelles
- **Résolution claire** : Dépendances explicites entre fichiers

## Syntaxe des Modules ES6

### Export (Exporter depuis un module)

#### Export Nommé
```javascript
// math-utils.js
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// Export multiple en une fois
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;

export { subtract, divide };
```

#### Export par Défaut
```javascript
// calculator.js
class Calculator {
    add(a, b) { return a + b; }
    multiply(a, b) { return a * b; }
}

export default Calculator;

// Ou directement
export default class Calculator {
    add(a, b) { return a + b; }
    multiply(a, b) { return a * b; }
}
```

#### Combinaison Export Nommé + Défaut
```javascript
// user-service.js
class UserService {
    // ... méthodes
}

export const USER_ROLES = ['admin', 'user', 'guest'];
export const MAX_LOGIN_ATTEMPTS = 3;

export default UserService;
```

### Import (Importer dans un module)

#### Import Nommé
```javascript
// main.js
import { add, multiply, PI } from './math-utils.js';

console.log(add(5, 3)); // 8
console.log(multiply(PI, 2)); // 6.28318
```

#### Import avec Alias
```javascript
import { add as addition, multiply as mult } from './math-utils.js';

console.log(addition(5, 3)); // 8
console.log(mult(4, 7)); // 28
```

#### Import par Défaut
```javascript
import Calculator from './calculator.js';

const calc = new Calculator();
console.log(calc.add(10, 5)); // 15
```

#### Import Mixte
```javascript
import UserService, { USER_ROLES, MAX_LOGIN_ATTEMPTS } from './user-service.js';

const userService = new UserService();
console.log(USER_ROLES); // ['admin', 'user', 'guest']
```

#### Import Tout (Namespace)
```javascript
import * as MathUtils from './math-utils.js';

console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.PI); // 3.14159
```

## Organisation Pratique des Modules

### Structure de Fichiers Recommandée
```
src/
├── components/
│   ├── Button.js
│   ├── Modal.js
│   └── index.js          // Barrel export
├── utils/
│   ├── math.js
│   ├── string.js
│   ├── date.js
│   └── index.js
├── services/
│   ├── api.js
│   ├── auth.js
│   └── storage.js
├── constants/
│   └── config.js
└── main.js               // Point d'entrée
```

### Barrel Exports (index.js)
```javascript
// components/index.js
export { default as Button } from './Button.js';
export { default as Modal } from './Modal.js';

// Permet d'importer depuis utils/index.js
// import { Button, Modal } from './components';
```

### Exemples de Modules Pratiques

#### Module Utilitaires Mathématiques
```javascript
// utils/math.js
export const GOLDEN_RATIO = 1.618;

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

export function roundToDecimals(number, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}

export function isEven(number) {
    return number % 2 === 0;
}

// Export par défaut : objet contenant toutes les fonctions
export default {
    GOLDEN_RATIO,
    clamp,
    randomBetween,
    roundToDecimals,
    isEven
};
```

#### Module Service API
```javascript
// services/api.js
const API_BASE_URL = 'https://api.example.com';

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

async function makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Network error', 0);
    }
}

export async function getUsers() {
    return makeRequest('/users');
}

export async function getUserById(id) {
    return makeRequest(`/users/${id}`);
}

export async function createUser(userData) {
    return makeRequest('/users', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

export async function updateUser(id, userData) {
    return makeRequest(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
    });
}

export async function deleteUser(id) {
    return makeRequest(`/users/${id}`, {
        method: 'DELETE'
    });
}

export { ApiError };
```

#### Module Configuration
```javascript
// constants/config.js
export const APP_CONFIG = {
    name: 'Mon Application',
    version: '1.0.0',
    apiUrl: process.env.NODE_ENV === 'production'
        ? 'https://api.monapp.com'
        : 'http://localhost:3000/api'
};

export const UI_CONFIG = {
    theme: {
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        successColor: '#28a745',
        errorColor: '#dc3545'
    },
    animation: {
        duration: 300,
        easing: 'ease-in-out'
    }
};

export const VALIDATION_RULES = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: {
        minLength: 8,
        requireUppercase: true,
        requireNumbers: true,
        requireSymbols: false
    }
};

// Export par défaut combinant toute la config
export default {
    app: APP_CONFIG,
    ui: UI_CONFIG,
    validation: VALIDATION_RULES
};
```

#### Module Composant Réutilisable
```javascript
// components/Button.js
export const BUTTON_TYPES = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUCCESS: 'success',
    DANGER: 'danger'
};

export const BUTTON_SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
};

export class Button {
    constructor(text, type = BUTTON_TYPES.PRIMARY, size = BUTTON_SIZES.MEDIUM) {
        this.text = text;
        this.type = type;
        this.size = size;
        this.element = this.createElement();
    }

    createElement() {
        const button = document.createElement('button');
        button.textContent = this.text;
        button.className = `btn btn-${this.type} btn-${this.size}`;
        return button;
    }

    onClick(callback) {
        this.element.addEventListener('click', callback);
        return this; // Chaînage
    }

    appendTo(parent) {
        parent.appendChild(this.element);
        return this;
    }

    setText(text) {
        this.text = text;
        this.element.textContent = text;
        return this;
    }

    setType(type) {
        this.element.className = this.element.className.replace(/btn-\w+(?=\s|$)/, `btn-${type}`);
        return this;
    }
}

export default Button;
```

## Utilisation Pratique

### Point d'Entrée Principal
```javascript
// main.js
import config from './constants/config.js';
import { getUsers, createUser } from './services/api.js';
import { Button, BUTTON_TYPES } from './components/Button.js';
import { clamp, randomBetween } from './utils/math.js';

// Initialisation de l'application
console.log(`Démarrage de ${config.app.name} v${config.app.version}`);

// Utilisation des services
async function loadUsers() {
    try {
        const users = await getUsers();
        console.log('Utilisateurs chargés:', users);
    } catch (error) {
        console.error('Erreur chargement utilisateurs:', error.message);
    }
}

// Utilisation des composants
const addButton = new Button('Ajouter Utilisateur', BUTTON_TYPES.PRIMARY)
    .onClick(async () => {
        const newUser = {
            name: 'Nouvel Utilisateur',
            email: 'user@example.com'
        };

        try {
            await createUser(newUser);
            loadUsers(); // Recharger la liste
        } catch (error) {
            console.error('Erreur création utilisateur:', error.message);
        }
    })
    .appendTo(document.body);

// Utilisation des utilitaires
const randomValue = clamp(randomBetween(0, 100), 10, 90);
console.log('Valeur aléatoire contrainte:', randomValue);

// Démarrage
loadUsers();
```

## Modules dans le Navigateur

### Type="module" dans HTML
```html
<!DOCTYPE html>
<html>
<head>
    <title>Mon App avec Modules</title>
</head>
<body>
    <!-- Charger le module principal -->
    <script type="module" src="./src/main.js"></script>
</body>
</html>
```

### Import Dynamique
```javascript
// Chargement conditionnel de modules
async function loadAdvancedFeatures() {
    if (user.isPremium) {
        const { AdvancedChart } = await import('./components/AdvancedChart.js');
        const chart = new AdvancedChart();
        chart.render();
    }
}

// Chargement basé sur une action utilisateur
document.getElementById('load-charts').addEventListener('click', async () => {
    const chartModule = await import('./utils/charts.js');
    chartModule.createBarChart(data);
});
```

## Bonnes Pratiques

### 1. Nommage des Fichiers
```javascript
// ✅ Bonnes pratiques
user-service.js     // kebab-case pour les fichiers
UserService.js      // PascalCase pour les classes
utils.js           // lowercase pour les utilitaires
constants.js       // descriptif et clair
```

### 2. Organisation par Fonctionnalité
```
features/
├── auth/
│   ├── AuthService.js
│   ├── LoginForm.js
│   └── index.js
├── dashboard/
│   ├── DashboardView.js
│   ├── widgets/
│   └── index.js
└── shared/
    ├── components/
    └── utils/
```

### 3. Exports Clairs et Consistants
```javascript
// ✅ Export clair
export class UserService { }
export const USER_ROLES = ['admin', 'user'];
export default UserService;

// ❌ Export confus
export { UserService as default, USER_ROLES as roles };
```

### 4. Imports Groupés
```javascript
// ✅ Imports organisés
// Libraries externes
import React from 'react';
import axios from 'axios';

// Modules internes
import { UserService } from './services/UserService.js';
import { Button } from './components/Button.js';

// Utilitaires
import { formatDate } from './utils/date.js';
```

### 5. Éviter les Imports Circulaires
```javascript
// ❌ Éviter : A importe B, B importe A
// user.js
import { validateRole } from './auth.js';

// auth.js
import { User } from './user.js'; // ❌ Circulaire

// ✅ Solution : module intermédiaire
// shared/types.js
export const USER_ROLES = ['admin', 'user'];

// user.js
import { USER_ROLES } from './shared/types.js';

// auth.js
import { USER_ROLES } from './shared/types.js';
```

## Debugging des Modules

### Techniques de Debug
```javascript
// 1. Vérifier les exports
console.log('Exports disponibles:', import.meta.url);

// 2. Debug des imports
import * as MathUtils from './math-utils.js';
console.log('MathUtils:', Object.keys(MathUtils));

// 3. Import conditionnel pour debug
if (process.env.NODE_ENV === 'development') {
    import('./debug-tools.js').then(({ enableDebug }) => {
        enableDebug();
    });
}
```

### Erreurs Communes
```javascript
// ❌ Oubli d'extension de fichier
import { add } from './math-utils'; // Erreur en mode natif

// ✅ Avec extension
import { add } from './math-utils.js';

// ❌ Import inexistant
import { nonExistentFunction } from './math-utils.js'; // Erreur

// ✅ Vérifier les exports disponibles
import * as MathUtils from './math-utils.js';
console.log(Object.keys(MathUtils));
```

Les modules ES6 transforment la façon dont nous organisons et partageons le code JavaScript, rendant nos applications plus maintenables, testables et réutilisables.