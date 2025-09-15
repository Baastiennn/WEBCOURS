# Modules et Imports - Katas

## Niveau Débutant (Exports et Imports de Base)

### Kata 1: Module Utilitaires Mathématiques
**Objectif:** Créer un module d'utilitaires mathématiques avec exports nommés.

**Exigences:**
- Créer `math-utils.js` avec constantes et fonctions mathématiques
- Exporter PI, fonctions add, multiply, subtract, divide
- Créer `main.js` qui importe et utilise ces fonctions
- Gérer la division par zéro

**Fichiers à créer:**

`math-utils.js`:
```javascript
// Votre code ici
// Exporter PI, add, multiply, subtract, divide
```

`main.js`:
```javascript
// Votre code ici
// Importer et utiliser les fonctions
// Tester toutes les opérations
```

**Cas de Test:**
```javascript
// Dans main.js, devrait afficher :
console.log(add(5, 3)); // 8
console.log(multiply(PI, 2)); // 6.28318...
console.log(divide(10, 0)); // Gestion d'erreur
```

---

### Kata 2: Module de Configuration
**Objectif:** Organiser la configuration de l'application dans un module séparé.

**Exigences:**
- Module `config.js` avec configuration par défaut et export par défaut
- Exports nommés pour des constantes spécifiques
- Fonction pour valider la configuration
- Import et utilisation dans l'application

**Fichiers à créer:**

`config.js`:
```javascript
// Votre code ici
// APP_CONFIG, API_ENDPOINTS, VALIDATION_RULES
// Export par défaut combinant tout
// Fonction validateConfig()
```

`app.js`:
```javascript
// Votre code ici
// Importer config et constantes
// Valider et utiliser la configuration
```

**Fonctionnalités:**
- Configuration d'environnement (dev/prod)
- Endpoints API configurables
- Règles de validation exportées
- Validation de la config complète

---

### Kata 3: Système de Composants
**Objectif:** Créer des composants réutilisables avec exports par défaut.

**Exigences:**
- Module `Button.js` avec classe Button et constantes
- Module `Modal.js` avec classe Modal
- Barrel export `components/index.js`
- Application utilisant les composants

**Fichiers à créer:**

`components/Button.js`:
```javascript
// Votre code ici
// Classe Button avec méthodes chainables
// Constantes BUTTON_TYPES et BUTTON_SIZES
// Export par défaut + exports nommés
```

`components/Modal.js`:
```javascript
// Votre code ici
// Classe Modal avec show/hide
// Export par défaut
```

`components/index.js`:
```javascript
// Votre code ici
// Barrel exports pour Button et Modal
```

`main.js`:
```javascript
// Votre code ici
// Importer depuis components/index.js
// Créer et utiliser Button et Modal
```

---

## Niveau Intermédiaire (Organisation Avancée)

### Kata 4: Service API Modulaire
**Objectif:** Créer un service API organisé en modules avec gestion d'erreurs.

**Exigences:**
- Module `api-client.js` pour la logique de base (fetch, headers, erreurs)
- Modules spécialisés `users.js`, `posts.js` utilisant le client
- Classes d'erreur personnalisées
- Module `index.js` exposant toutes les API

**Structure:**
```
services/
├── api-client.js
├── users.js
├── posts.js
├── errors.js
└── index.js
```

**Fichiers à implémenter:**

`services/api-client.js`:
```javascript
// Votre code ici
// Classe ApiClient avec méthodes get, post, put, delete
// Gestion centralisée des headers et erreurs
// Export par défaut
```

`services/errors.js`:
```javascript
// Votre code ici
// Classes ApiError, NetworkError, ValidationError
// Exports nommés
```

`services/users.js`:
```javascript
// Votre code ici
// Fonctions getUsers, createUser, updateUser, deleteUser
// Utilisant ApiClient
// Exports nommés
```

**Cas de Test:**
```javascript
import { getUsers, createUser } from './services/index.js';

const users = await getUsers();
const newUser = await createUser({ name: 'Test', email: 'test@example.com' });
```

---

### Kata 5: État Global avec Modules
**Objectif:** Gérer l'état de l'application avec un pattern module singleton.

**Exigences:**
- Module `store.js` gérant l'état global
- Modules `reducers/` pour les différents types de données
- Système d'abonnement aux changements
- Actions typées avec validation

**Structure:**
```
store/
├── store.js
├── actions.js
├── reducers/
│   ├── users.js
│   ├── posts.js
│   └── index.js
└── types.js
```

**Fonctionnalités:**
- Store singleton avec state immutable
- Actions typées et dispatchées
- Reducers purs pour chaque domaine
- Système de souscription aux changements
- Middleware pour logging

**Exemple d'utilisation:**
```javascript
import store from './store/store.js';
import { addUser, removeUser } from './store/actions.js';

store.subscribe('users', (users) => {
    console.log('Users updated:', users);
});

store.dispatch(addUser({ name: 'Alice', email: 'alice@example.com' }));
```

---

### Kata 6: Système de Plugins
**Objectif:** Architecture de plugins avec chargement dynamique.

**Exigences:**
- Module `plugin-manager.js` pour gérer les plugins
- Interface standard pour les plugins
- Chargement dynamique avec `import()`
- Gestion du cycle de vie des plugins

**Structure:**
```
plugins/
├── plugin-manager.js
├── base-plugin.js
├── analytics-plugin.js
├── theme-plugin.js
└── validation-plugin.js
```

**Fonctionnalités:**
- Classe abstraite BasePlugin
- Interface standardisée (init, destroy, getName)
- Chargement/déchargement dynamique
- Système d'événements entre plugins
- Configuration par plugin

**Exemple d'utilisation:**
```javascript
const pluginManager = new PluginManager();

// Chargement dynamique
await pluginManager.loadPlugin('analytics', './plugins/analytics-plugin.js');
await pluginManager.loadPlugin('theme', './plugins/theme-plugin.js');

// Communication entre plugins
pluginManager.broadcast('user-login', { userId: 123 });
```

---

## Niveau Avancé (Patterns et Architecture)

### Kata 7: Micro-frontends avec Modules
**Objectif:** Architecture micro-frontend avec modules autonomes.

**Exigences:**
- Modules autonomes pour différentes fonctionnalités
- Communication inter-modules via événements
- Partage de dépendances communes
- Lazy loading des modules

**Structure:**
```
modules/
├── core/
│   ├── event-bus.js
│   ├── shared-dependencies.js
│   └── module-loader.js
├── user-management/
│   ├── index.js
│   ├── components/
│   └── services/
├── dashboard/
│   ├── index.js
│   ├── widgets/
│   └── data/
└── reporting/
    ├── index.js
    ├── charts/
    └── exports/
```

**Fonctionnalités:**
- Chaque module est indépendant
- Communication via EventBus partagé
- Dépendances communes (utils, UI kit)
- Chargement à la demande
- Isolation des styles et états

---

### Kata 8: Module Testing Framework
**Objectif:** Framework de tests modulaire pour valider les modules.

**Exigences:**
- Runner de tests avec découverte automatique
- Assertions et matchers personnalisés
- Mocking des modules et dépendances
- Rapports de couverture par module

**Structure:**
```
testing/
├── test-runner.js
├── assertions.js
├── mocks/
│   ├── module-mocker.js
│   ├── fetch-mock.js
│   └── dom-mock.js
├── reporters/
│   ├── console-reporter.js
│   └── html-reporter.js
└── utils/
    ├── test-discovery.js
    └── coverage.js
```

**Fonctionnalités:**
- Auto-découverte des fichiers `*.test.js`
- Assertions chainables et expressives
- Mocking automatique des imports
- Isolation des tests par module
- Rapports détaillés avec métriques

**Exemple d'utilisation:**
```javascript
// math-utils.test.js
import { test, expect, mock } from '../testing/test-runner.js';
import { add, multiply } from '../utils/math-utils.js';

test('math operations', () => {
    expect(add(2, 3)).toEqual(5);
    expect(multiply(4, 5)).toEqual(20);
});

test('with mocked dependencies', () => {
    const mockLogger = mock('./logger.js');
    // Test avec dépendance mockée
});
```

---

## Conseils de Pratique

### Pour les Débutants
1. **Commencer simple** : Un module = un fichier avec une responsabilité
2. **Exports clairs** : Préférer les exports nommés pour la clarté
3. **Extensions** : Toujours inclure `.js` dans les imports
4. **Barrel exports** : Utiliser `index.js` pour regrouper les exports

### Pour les Intermédiaires
1. **Organisation** : Grouper par fonctionnalité, pas par type de fichier
2. **Dépendances** : Éviter les imports circulaires
3. **Naming** : Conventions cohérentes pour fichiers et exports
4. **Documentation** : Documenter les interfaces des modules

### Pour les Avancés
1. **Architecture** : Penser en termes de domaines métier
2. **Performance** : Lazy loading et code splitting
3. **Testing** : Tests d'intégration entre modules
4. **Monitoring** : Métriques sur l'utilisation des modules

### Parcours d'Apprentissage
- **Semaine 1** : Katas 1-3 (Exports/imports de base)
- **Semaine 2** : Katas 4-6 (Organisation et patterns)
- **Semaine 3** : Katas 7-8 (Architecture avancée)

### Outils de Debug
- **Network tab** : Vérifier le chargement des modules
- **Sources** : Explorer la structure des modules
- **Console** : `import.meta.url` pour debugging
- **Performance** : Analyser l'impact du module loading

Une fois ces concepts maîtrisés, vous saurez organiser efficacement vos applications JavaScript en modules maintenables et réutilisables.