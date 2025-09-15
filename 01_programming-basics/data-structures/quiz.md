# Structures de Données - Quiz

## Questions à Choix Multiples

### 1. Quelle méthode retourne un nouveau tableau sans modifier l'original ?
a) `push()`  
b) `map()`  
c) `splice()`  
d) `sort()`  

**Réponse: b) `map()`**

### 2. Que retourne cette expression : `[1, 2, 3].indexOf(4)` ?
a) `undefined`  
b) `null`  
c) `-1`  
d) `0`  

**Réponse: c) `-1`**

### 3. Quelle est la différence principale entre `==` et `===` pour les objets ?
a) `===` compare les valeurs, `==` compare les références  
b) `==` compare les valeurs, `===` compare les références  
c) Les deux comparent les références  
d) Les deux comparent les valeurs  

**Réponse: c) Les deux comparent les références**

### 4. Comment créer un Set à partir d'un tableau ?
a) `Set.from(array)`  
b) `new Set(array)`  
c) `Set.create(array)`  
d) `array.toSet()`  

**Réponse: b) `new Set(array)`**

### 5. Que fait `Object.keys({a: 1, b: 2})` ?
a) Retourne `[1, 2]`  
b) Retourne `["a", "b"]`  
c) Retourne `[["a", 1], ["b", 2]]`  
d) Retourne `{a: 1, b: 2}`  

**Réponse: b) Retourne `["a", "b"]`**

## Questions Vrai/Faux

### 6. `Array.isArray([])` retourne `true`.
**Réponse: Vrai**

### 7. Un Map peut avoir des objets comme clés.
**Réponse: Vrai**

### 8. `"hello".length` est une méthode.
**Réponse: Faux** (c'est une propriété)

### 9. `JSON.stringify()` peut sérialiser les fonctions.
**Réponse: Faux** (les fonctions sont ignorées)

### 10. WeakMap permet l'itération avec `for...of`.
**Réponse: Faux** (WeakMap n'est pas itérable)

## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr.length);
```
**Réponse: 4**

### 12. Quel sera le résultat ?
```javascript
const obj = {a: 1, b: 2};
delete obj.a;
console.log(Object.keys(obj));
```
**Réponse: ["b"]**

### 13. Que retourne cette expression ?
```javascript
[1, 2, 3].map(x => x * 2).filter(x => x > 4);
```
**Réponse: [6]** (2*2=4 n'est pas > 4, 3*2=6 est > 4)

### 14. Quel est le problème avec ce code ?
```javascript
const original = {a: {b: 1}};
const copie = {...original};
copie.a.b = 2;
console.log(original.a.b);
```
**Réponse: Affiche 2** - copie superficielle, l'objet imbriqué est partagé

## Questions Pratiques

### 15. Comment supprimer les doublons de ce tableau ?
```javascript
const arr = [1, 2, 2, 3, 3, 3];
// Votre solution
```
**Réponse:**
```javascript
const unique = [...new Set(arr)]; // [1, 2, 3]
```

### 16. Comment obtenir la valeur maximale dans un tableau de nombres ?
```javascript
const nombres = [5, 2, 8, 1, 9];
// Votre solution
```
**Réponse:**
```javascript
const max = Math.max(...nombres); // 9
// ou
const max = nombres.reduce((acc, curr) => Math.max(acc, curr));
```

### 17. Comment grouper un tableau d'objets par une propriété ?
```javascript
const personnes = [
    {nom: "Alice", age: 25},
    {nom: "Bob", age: 30},
    {nom: "Charlie", age: 25}
];
// Grouper par âge
```
**Réponse:**
```javascript
const groupes = personnes.reduce((acc, personne) => {
    const age = personne.age;
    if (!acc[age]) acc[age] = [];
    acc[age].push(personne);
    return acc;
}, {});
```

### 18. Comment inverser les clés et valeurs d'un objet ?
```javascript
const obj = {a: 1, b: 2, c: 3};
// Résultat souhaité: {1: 'a', 2: 'b', 3: 'c'}
```
**Réponse:**
```javascript
const inverse = Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [v, k])
);
```

## Questions sur les Structures Avancées

### 19. Quelle est la différence entre Map et WeakMap ?
**Réponse:** Map peut avoir tout type de clé et est itérable. WeakMap ne peut avoir que des objets comme clés, n'est pas itérable, et permet le garbage collection automatique des clés.

### 20. Quand utiliser un Set plutôt qu'un Array ?
**Réponse:** Quand on a besoin d'une collection de valeurs uniques et qu'on fait souvent des vérifications d'existence (`has()` est O(1) vs `includes()` qui est O(n))

### 21. Comment implémenter une pile (stack) avec un Array ?
**Réponse:**
```javascript
class Pile {
    constructor() { this.items = []; }
    push(item) { this.items.push(item); }
    pop() { return this.items.pop(); }
    peek() { return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
}
```

### 22. Comment implémenter une file (queue) avec un Array ?
**Réponse:**
```javascript
class File {
    constructor() { this.items = []; }
    enqueue(item) { this.items.push(item); }
    dequeue() { return this.items.shift(); }
    front() { return this.items[0]; }
    isEmpty() { return this.items.length === 0; }
}
```

## Questions de Performance

### 23. Quelle opération est la plus rapide sur un grand tableau ?
a) `array[index]` (accès par index)  
b) `array.includes(value)` (recherche)  
c) `array.push(value)` (ajout à la fin)  
d) `array.splice(0, 1)` (suppression au début)  

**Réponse: a) `array[index]`** - O(1) vs O(n) pour les autres

### 24. Pourquoi éviter de modifier un tableau pendant son itération avec `forEach` ?
**Réponse:** Cela peut causer des comportements imprévisibles : éléments manqués, index décalés, ou boucles infinies selon le type de modification.

### 25. Comment optimiser la recherche fréquente d'éléments dans une grande collection ?
**Réponse:** Utiliser un Map ou Set pour un accès O(1) au lieu d'un Array avec `includes()` qui est O(n).

## Questions de Manipulation de Chaînes

### 26. Comment vérifier si une chaîne contient uniquement des chiffres ?
```javascript
function estNumerique(str) {
    // Votre code
}
```
**Réponse:**
```javascript
function estNumerique(str) {
    return /^\d+$/.test(str) && str.length > 0;
}
```

### 27. Comment capitaliser chaque mot d'une phrase ?
```javascript
const phrase = "bonjour le monde";
// Résultat: "Bonjour Le Monde"
```
**Réponse:**
```javascript
const capitalise = phrase.replace(/\b\w/g, l => l.toUpperCase());
// ou
const capitalise = phrase.split(' ')
    .map(mot => mot.charAt(0).toUpperCase() + mot.slice(1))
    .join(' ');
```

### 28. Comment compter les occurrences de chaque caractère dans une chaîne ?
**Réponse:**
```javascript
function compterCaracteres(str) {
    return [...str].reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
}
```

## Questions Avancées

### 29. Comment faire un clonage profond d'un objet sans JSON.stringify ?
**Réponse:**
```javascript
function cloneProfond(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(cloneProfond);
    
    const clone = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = cloneProfond(obj[key]);
        }
    }
    return clone;
}
```

### 30. Comment créer un objet immutable en JavaScript ?
**Réponse:**
```javascript
// Niveau 1 : Object.freeze()
const obj = Object.freeze({a: 1, b: 2});

// Clonage immutable pour modifications
const nouvelObj = {...obj, c: 3};

// Pour immutabilité profonde
function freezeProfond(obj) {
    Object.getOwnPropertyNames(obj).forEach(prop => {
        if (obj[prop] !== null && typeof obj[prop] === 'object') {
            freezeProfond(obj[prop]);
        }
    });
    return Object.freeze(obj);
}
```

### 31. Comment implémenter un cache LRU (Least Recently Used) ?
**Réponse:**
```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }
}
```

## Questions de Débogage

### 32. Pourquoi ce code ne fonctionne-t-il pas comme attendu ?
```javascript
const arr = [1, 2, 3];
const newArr = arr;
newArr.push(4);
console.log(arr); // [1, 2, 3, 4] - pourquoi ?
```
**Réponse:** `newArr` et `arr` référencent le même objet tableau. Pour une copie indépendante : `const newArr = [...arr];`

### 33. Que ne va pas dans cette fonction ?
```javascript
function ajouterElement(arr, element) {
    return arr.push(element);
}
```
**Réponse:** `push()` retourne la nouvelle longueur, pas le tableau. Correct : `return [...arr, element];` ou modifier et retourner `arr`.

## Notation
- **30-33 correct**: Maîtrise experte des structures de données
- **27-29 correct**: Excellente compréhension, quelques détails avancés à consolider
- **24-26 correct**: Bonne connaissance, pratiquer les cas complexes
- **20-23 correct**: Compréhension solide des bases, développer l'expertise
- **16-19 correct**: Fondamentaux acquis, se concentrer sur les méthodes avancées
- **Moins de 16**: Réviser les concepts de base et pratiquer la manipulation d'arrays/objets