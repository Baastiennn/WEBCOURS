# Variables - Katas

## Niveau Débutant (Déclaration et Types de Base)

### Kata 1: Déclarateur de Variables
**Objectif:** Pratiquer les différentes façons de déclarer des variables.

**Exigences:**
- Déclarer une variable `nom` avec `let` et l'initialiser avec votre nom
- Déclarer une constante `AGE_MAJORITE` avec la valeur 18
- Déclarer une variable `estMajeur` sans l'initialiser
- Retourner un objet avec ces trois variables

**Signature de la Fonction:**
```javascript
function declarerVariables() {
    // Votre code ici
    return { nom, AGE_MAJORITE, estMajeur };

    let nom 
    let AGE_MAJORITE 18
    let estMajeur 
}
```

**Cas de Test:**
```javascript
const resultat = declarerVariables();
console.log(typeof resultat.nom === 'string'); // true
console.log(resultat.AGE_MAJORITE === 18); // true
console.log(resultat.estMajeur === undefined); // true
```

---

### Kata 2: Détecteur de Type
**Objectif:** Identifier les types de différentes variables.

**Exigences:**
- Prendre une variable en paramètre
- Retourner une chaîne décrivant son type de manière descriptive
- Gérer les cas spéciaux comme `null` et les tableaux

**Signature de la Fonction:**
```javascript
function detecterType(variable) {
    function 
}
```

**Cas de Test:**
```javascript
detecterType("hello") // "chaîne de caractères"
detecterType(42) // "nombre"
detecterType(true) // "booléen"
detecterType(null) // "null"
detecterType([1,2,3]) // "tableau"
detecterType({}) // "objet"
detecterType(undefined) // "indéfini"
```

---

### Kata 3: Initialiseur de Profil
**Objectif:** Créer et initialiser des variables pour un profil utilisateur.

**Exigences:**
- Créer des variables pour nom, âge, email, actif
- Utiliser les bons mots-clés (`let`, `const`) selon la mutabilité
- Initialiser avec des valeurs par défaut appropriées

**Signature de la Fonction:**
```javascript
function creerProfil(nom, age, email) {
    const
}
```

**Cas de Test:**
```javascript
const profil = creerProfil("Alice", 25, "alice@email.com");
console.log(profil.actif === true); // défaut
console.log(profil.dateCreation instanceof Date); // true
```

---

## Niveau Intermédiaire (Portée et Manipulation)

### Kata 4: Gestionnaire de Portée
**Objectif:** Démontrer la compréhension des différentes portées.

**Exigences:**
- Créer une fonction avec une variable locale
- Cette fonction doit contenir une sous-fonction qui accède à la variable locale
- Gérer une variable globale et une variable de bloc
- Retourner un objet avec des méthodes pour tester les portées

**Signature de la Fonction:**
```javascript
function gestionnaireFortee() {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
const gestionnaire = gestionnaireFortee();
gestionnaire.testerLocale(); // doit fonctionner
gestionnaire.testerBloc(); // doit démontrer la portée de bloc
```

---

### Kata 5: Convertisseur de Types
**Objectif:** Convertir des variables entre différents types.

**Exigences:**
- Prendre une valeur et un type cible
- Convertir la valeur vers le type demandé
- Gérer les conversions impossibles
- Types supportés: "string", "number", "boolean"

**Signature de la Fonction:**
```javascript
function convertirType(valeur, typeCible) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
convertirType("123", "number") // 123
convertirType(42, "string") // "42"
convertirType("", "boolean") // false
convertirType(0, "boolean") // false
convertirType("hello", "number") // NaN
```

---

### Kata 6: Échangeur de Variables
**Objectif:** Implémenter différentes méthodes pour échanger des variables.

**Exigences:**
- Méthode traditionnelle avec variable temporaire
- Méthode avec destructuration
- Méthode arithmétique (pour les nombres)
- Retourner les valeurs échangées

**Signature de la Fonction:**
```javascript
function echangerVariables(a, b, methode) {
    // méthode: "temporaire", "destructuration", "arithmetique"
    // Votre code ici
}
```

**Cas de Test:**
```javascript
echangerVariables(1, 2, "temporaire") // [2, 1]
echangerVariables("a", "b", "destructuration") // ["b", "a"]
echangerVariables(10, 5, "arithmetique") // [5, 10]
```

---

## Niveau Avancé (Concepts Avancés)

### Kata 7: Analyseur de Hissage
**Objectif:** Prédire le comportement du hissage avec différents types de déclarations.

**Exigences:**
- Créer une fonction qui démontre le hissage avec `var`
- Montrer la Temporal Dead Zone avec `let`/`const`
- Retourner un rapport sur les comportements observés

**Signature de la Fonction:**
```javascript
function analyserHissage() {
    // Votre code ici
    return {
        varHissage: /* résultat du test var */,
        letTDZ: /* résultat du test let */,
        constTDZ: /* résultat du test const */
    };
}
```

---

### Kata 8: Gestionnaire d'Immutabilité
**Objectif:** Créer des versions immutables d'objets et de tableaux.

**Exigences:**
- Créer une copie profonde d'un objet/tableau
- Implémenter une fonction qui "gèle" récursivement un objet
- Tester que les modifications ne fonctionnent pas sur les copies

**Signature de la Fonction:**
```javascript
function rendrImmutable(donnees) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
const original = { nom: "Alice", scores: [1, 2, 3] };
const immutable = rendrImmutable(original);
// Tentative de modification doit échouer ou être ignorée
```

---

### Kata 9: Destructureur Avancé
**Objectif:** Utiliser la destructuration dans des scénarios complexes.

**Exigences:**
- Destructurer des objets imbriqués
- Utiliser des valeurs par défaut
- Renommer des variables lors de la destructuration
- Gérer les tableaux avec des éléments manquants

**Signature de la Fonction:**
```javascript
function destructurerDonnees(donnees) {
    // Utiliser la destructuration pour extraire:
    // - nom et prénom depuis donnees.utilisateur
    // - premier et dernier élément de donnees.scores
    // - ville avec valeur par défaut "Non spécifiée"
    // Votre code ici
}
```

**Cas de Test:**
```javascript
const donnees = {
    utilisateur: { nom: "Doe", prenom: "John" },
    scores: [95, 87, 92],
    adresse: { pays: "France" }
};
destructurerDonnees(donnees); // doit retourner les valeurs extraites
```

---

### Kata 10: Cache Intelligent
**Objectif:** Créer un système de cache utilisant des variables dans une fermeture.

**Exigences:**
- Utiliser des variables privées pour stocker le cache
- Implémenter get, set, clear, et stats
- Limiter la taille du cache (LRU - Least Recently Used)
- Gérer l'expiration des entrées

**Signature de la Fonction:**
```javascript
function creerCache(tailleMax = 10, ttl = 60000) {
    // Votre code ici
    return {
        get: function(cle) { /* ... */ },
        set: function(cle, valeur) { /* ... */ },
        clear: function() { /* ... */ },
        stats: function() { /* ... */ }
    };
}
```

---

## Niveau Défi (Projets Complexes)

### Kata 11: Gestionnaire d'État Global
**Objectif:** Créer un gestionnaire d'état comme Redux mais simplifié.

**Exigences:**
- Variables privées pour stocker l'état
- Système d'abonnement aux changements
- Actions pour modifier l'état
- Historique des changements
- Possibilité d'annuler/refaire

**Signature de la Fonction:**
```javascript
function creerGestionnaireEtat(etatInitial) {
    // Votre code ici
    return {
        obtenirEtat: function() { /* ... */ },
        dispatch: function(action) { /* ... */ },
        sabonner: function(callback) { /* ... */ },
        annuler: function() { /* ... */ },
        refaire: function() { /* ... */ }
    };
}
```

**Cas de Test:**
```javascript
const store = creerGestionnaireEtat({ compteur: 0 });
store.dispatch({ type: 'INCREMENT' });
console.log(store.obtenirEtat().compteur); // 1
store.annuler();
console.log(store.obtenirEtat().compteur); // 0
```

---

### Kata 12: Proxy de Variables Dynamiques
**Objectif:** Créer un système qui intercepte l'accès aux variables.

**Exigences:**
- Utiliser des Proxy pour intercepter get/set
- Logger tous les accès aux propriétés
- Valider les types lors de l'assignation
- Calculer des propriétés dérivées automatiquement
- Gérer les propriétés en lecture seule

**Signature de la Fonction:**
```javascript
function creerProxyVariables(schema, donnees = {}) {
    // schema définit les types et contraintes
    // Votre code ici
}
```

**Cas de Test:**
```javascript
const schema = {
    nom: { type: 'string', readonly: false },
    age: { type: 'number', readonly: false },
    majeur: { type: 'boolean', computed: (obj) => obj.age >= 18 }
};

const proxy = creerProxyVariables(schema, { nom: "Alice", age: 17 });
console.log(proxy.majeur); // false (calculé automatiquement)
proxy.age = 18;
console.log(proxy.majeur); // true
```

---

### Kata 13: Système de Modules avec Variables Privées
**Objectif:** Créer un système de modules qui gère les dépendances et les variables privées.

**Exigences:**
- Chaque module a ses variables privées
- Système d'import/export entre modules
- Résolution des dépendances circulaires
- Namespacing automatique
- Hot reload des modules

**Signature de la Fonction:**
```javascript
function creerSystemeModules() {
    // Votre code ici
    return {
        definirModule: function(nom, dependances, factory) { /* ... */ },
        chargerModule: function(nom) { /* ... */ },
        rechargerModule: function(nom) { /* ... */ },
        listerModules: function() { /* ... */ }
    };
}
```

---

### Kata 14: Observateur de Variables Reactive
**Objectif:** Implémenter un système réactif qui observe les changements de variables.

**Exigences:**
- Observer les changements profonds dans les objets/tableaux
- Déclencher des callbacks sur modification
- Optimiser pour éviter les notifications inutiles
- Gérer les dépendances entre observables
- Batch des mises à jour

**Signature de la Fonction:**
```javascript
function creerObservable(valeurInitiale) {
    // Votre code ici
    return {
        valeur: /* getter/setter */,
        observer: function(callback) { /* ... */ },
        computed: function(fn) { /* ... */ },
        batch: function(fn) { /* ... */ }
    };
}
```

**Cas de Test:**
```javascript
const observable = creerObservable({ nom: "Alice", age: 25 });
observable.observer((nouvelleValeur, ancienneValeur) => {
    console.log('Changement détecté');
});
observable.valeur.age = 26; // déclenche l'observateur
```

---

## Kata Final: Éditeur de Code avec Variables
**Objectif:** Créer un mini-éditeur qui gère les variables dans le code.

**Exigences:**
- Parser le code pour identifier les variables
- Détécter les erreurs de portée
- Auto-complétion basée sur les variables en scope
- Refactoring (renommer des variables)
- Analyse statique (variables non utilisées, etc.)

```javascript
function creerEditeurCode() {
    return {
        analyserCode: function(code) { /* ... */ },
        obtenirVariables: function(position) { /* ... */ },
        renommerVariable: function(ancienNom, nouveauNom) { /* ... */ },
        detecterErreurs: function() { /* ... */ }
    };
}
```

## Solutions Disponibles

> 💡 **Progression Recommandée:**
> 1. Maîtrisez les katas Débutant avant de progresser
> 2. Les katas Intermédiaire introduisent des concepts de portée
> 3. Les katas Avancé explorent les patterns modernes
> 4. Les katas Défi sont des projets complets réels

## Conseils pour la Pratique

1. **Testez dans la Console** : Utilisez la console du navigateur pour expérimenter
2. **Debugger avec des Points d'Arrêt** : Observez les valeurs des variables
3. **Utilisez `console.log()`** : Pour tracer les changements de variables
4. **Écrivez des Tests** : Vérifiez vos attentes sur le comportement des variables
5. **Expérimentez avec la Portée** : Créez des exemples pour comprendre les scopes