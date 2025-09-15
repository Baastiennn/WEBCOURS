# Variables - Quiz

## Questions à Choix Multiples

### 1. Que se passe-t-il avec ce code ?
```javascript
console.log(maVariable);
var maVariable = "Bonjour";
```
a) Affiche "Bonjour"
b) Affiche `undefined`
c) Lève une ReferenceError
d) Affiche `null`

**Réponse : b) Affiche `undefined`**

### 2. Quelle déclaration provoquera une erreur ?
a) `let nom = "Alice";`
b) `const age = 25;`
c) `const ville;`
d) `var pays = "France";`

**Réponse : c) `const ville;`** (const doit être initialisé)

### 3. Quelle est la portée de la variable `x` ?
```javascript
function test() {
    if (true) {
        let x = 10;
    }
    console.log(x);
}
```
a) Globale
b) Fonction
c) Bloc
d) Cette variable n'est pas accessible

**Réponse : d) Cette variable n'est pas accessible** (portée limitée au bloc if)

### 4. Que retourne `typeof null` ?
a) `"null"`
b) `"undefined"`
c) `"object"`
d) `"boolean"`

**Réponse : c) `"object"`** (quirk historique de JavaScript)

### 5. Quelle sera la valeur de `b` après ce code ?
```javascript
let a = { nom: "Alice" };
let b = a;
a.nom = "Bob";
```
a) `{ nom: "Alice" }`
b) `{ nom: "Bob" }`
c) `undefined`
d) Une erreur sera levée

**Réponse : b) `{ nom: "Bob" }`** (référence partagée)

## Questions Vrai/Faux

### 6. Une variable déclarée avec `let` peut être redéclarée dans le même scope.
**Réponse : Faux** (SyntaxError si on tente de redéclarer)

### 7. Les variables `const` ne peuvent jamais être modifiées.
**Réponse : Faux** (les objets/tableaux const peuvent être mutés)

### 8. `var` a une portée de bloc comme `let`.
**Réponse : Faux** (var a une portée de fonction)

### 9. Une variable non déclarée devient automatiquement globale.
**Réponse : Vrai** (en mode non-strict, mais c'est une mauvaise pratique)

### 10. Le hissage affecte les expressions de fonction.
**Réponse : Faux** (seules les déclarations de variables sont hissées, pas les assignations)

## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
let x = 1;
{
    console.log(x);
    let x = 2;
}
```
**Réponse : ReferenceError** (Temporal Dead Zone - x est hissé mais pas accessible avant sa déclaration)

### 12. Quelle est la valeur de `compteur` après l'exécution ?
```javascript
var compteur = 0;
for (var i = 0; i < 3; i++) {
    setTimeout(() => compteur += i, 0);
}
```
**Réponse : 9** (i vaut 3 à la fin de la boucle, 3 callbacks ajoutent chacun 3)

### 13. Que contient le tableau `resultats` ?
```javascript
const resultats = [];
for (let i = 0; i < 3; i++) {
    resultats.push(() => i);
}
```
**Réponse : Trois fonctions qui retournent respectivement 0, 1, et 2** (let crée une nouvelle variable à chaque itération)

### 14. Complétez cette destructuration :
```javascript
const personne = { nom: "Alice", age: 25, ville: "Paris" };
const { nom, _____ = "Inconnue" } = personne;
```
**Réponse : `profession`** (pour assigner une valeur par défaut à une propriété manquante)

## Questions Pratiques

### 15. Écrivez une fonction qui vérifie si une variable est déclarée :
```javascript
function estDeclare(nomVariable) {
    // Votre code ici
}
```
**Réponse :**
```javascript
function estDeclare(nomVariable) {
    try {
        eval(nomVariable);
        return true;
    } catch (e) {
        return e instanceof ReferenceError ? false : true;
    }
}
```

### 16. Créez une fonction qui échange deux variables en utilisant la destructuration :
```javascript
function echanger(a, b) {
    // Votre code ici
}
```
**Réponse :**
```javascript
function echanger(a, b) {
    [a, b] = [b, a];
    return [a, b];
}
```

### 17. Implémentez une fonction qui clone profondément un objet :
```javascript
function cloneProfond(obj) {
    // Votre code ici
}
```
**Réponse :**
```javascript
function cloneProfond(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => cloneProfond(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = cloneProfond(obj[key]);
            }
        }
        return clonedObj;
    }
}
```

### 18. Créez une fonction qui retourne le type précis d'une variable :
```javascript
function typePrecis(variable) {
    // Votre code ici - gérer null, array, date, etc.
}
```
**Réponse :**
```javascript
function typePrecis(variable) {
    if (variable === null) return 'null';
    if (Array.isArray(variable)) return 'array';
    if (variable instanceof Date) return 'date';
    if (variable instanceof RegExp) return 'regexp';
    return typeof variable;
}
```

## Questions Avancées

### 19. Expliquez la différence entre ces deux déclarations :
```javascript
// Version A
function test() {
    var resultat = [];
    for (var i = 0; i < 3; i++) {
        resultat.push(function() { return i; });
    }
    return resultat;
}

// Version B
function test() {
    const resultat = [];
    for (let i = 0; i < 3; i++) {
        resultat.push(function() { return i; });
    }
    return resultat;
}
```
**Réponse :** Version A : toutes les fonctions retournent 3 (var partage la même variable). Version B : les fonctions retournent 0, 1, 2 respectivement (let crée une nouvelle variable à chaque itération).

### 20. Que fait ce code et pourquoi ?
```javascript
const obj = Object.freeze({ a: { b: 1 } });
obj.a.b = 2;
console.log(obj.a.b);
```
**Réponse :** Affiche 2. `Object.freeze()` gèle seulement le premier niveau. L'objet imbriqué `obj.a` reste mutable.

### 21. Analysez ce pattern de variable privée :
```javascript
const MonModule = (function() {
    let variablePrivee = 0;
    return {
        incrementer() { variablePrivee++; },
        obtenirValeur() { return variablePrivee; }
    };
})();
```
**Réponse :** Pattern module avec IIFE créant une variable privée `variablePrivee` accessible uniquement via les méthodes publiques retournées.

### 22. Corrigez ce code pour éviter la pollution globale :
```javascript
function maFonction() {
    resultat = "valeur"; // Variable globale accidentelle
    return resultat;
}
```
**Réponse :**
```javascript
function maFonction() {
    const resultat = "valeur"; // Variable locale
    return resultat;
}
```

## Questions de Débogage

### 23. Pourquoi ce code lève-t-il une erreur ?
```javascript
const utilisateurs = [];
utilisateurs = ["Alice", "Bob"];
```
**Réponse :** TypeError - impossible de réassigner une variable const. Utiliser `utilisateurs.push()` ou déclarer avec `let`.

### 24. Quel est le problème avec cette boucle ?
```javascript
const fonctions = [];
for (var i = 0; i < 3; i++) {
    fonctions.push(function() {
        console.log("Index: " + i);
    });
}
fonctions.forEach(fn => fn());
```
**Réponse :** Toutes les fonctions affichent "Index: 3" car elles partagent la même variable `i`. Corriger avec `let i` ou une fermeture.

### 25. Comment résoudre cette Temporal Dead Zone ?
```javascript
function probleme() {
    console.log(temp); // ReferenceError
    let temp = "valeur";
}
```
**Réponse :** Déplacer `console.log(temp)` après la déclaration, ou initialiser `temp` avant de l'utiliser.

## Questions de Performance

### 26. Quelle approche est la plus efficace pour créer de nombreuses variables similaires ?
a) Variables individuelles : `let a1, a2, a3...`
b) Objet : `const obj = {a1: val1, a2: val2...}`
c) Tableau : `const arr = [val1, val2, val3...]`
d) Map : `const map = new Map([['a1', val1]...])`

**Réponse : c) Tableau** (pour l'accès séquentiel et la compacité mémoire)

### 27. Quelle déclaration utilise le moins de mémoire ?
```javascript
// Option A
const CONSTANTES = {
    API_URL: "https://api.com",
    TIMEOUT: 5000
};

// Option B
const API_URL = "https://api.com";
const TIMEOUT = 5000;
```
**Réponse : Option B** (évite la création d'un objet supplémentaire)

## Questions Conceptuelles

### 28. Qu'est-ce qui différencie une variable d'une propriété d'objet ?
**Réponse :** Variables : stockées dans l'environnement lexical, portée définie. Propriétés : attachées à un objet, accessibles via l'objet, peuvent être ajoutées/supprimées dynamiquement.

### 29. Expliquez le concept de "variable shadow" :
**Réponse :** Quand une variable locale a le même nom qu'une variable dans une portée supérieure, elle "masque" la variable externe dans sa portée.

### 30. Quelle est la différence entre déclaration, définition et initialisation ?
**Réponse :**
- **Déclaration** : annonce l'existence de la variable (`let x;`)
- **Définition** : alloue la mémoire (automatique en JS)
- **Initialisation** : assigne la première valeur (`x = 5;`)

## Notation
- **28-30 correctes** : Maîtrise experte des variables JavaScript
- **25-27 correctes** : Excellente compréhension, quelques détails à approfondir
- **22-24 correctes** : Bonne maîtrise, réviser les concepts avancés
- **18-21 correctes** : Bases solides, pratiquer les scénarios complexes
- **15-17 correctes** : Compréhension de base, renforcer les fondamentaux
- **Moins de 15** : Revoir les concepts fondamentaux des variables

## Conseils d'Étude

1. **Expérimentez dans la Console** : Testez différents scénarios de variables
2. **Utilisez le Debugger** : Observez les valeurs et la portée en temps réel
3. **Pratiquez la Destructuration** : Exercez-vous avec des objets complexes
4. **Comprenez le Hissage** : Créez des exemples pour visualiser le comportement
5. **Maîtrisez les Portées** : Créez des fonctions imbriquées pour pratiquer