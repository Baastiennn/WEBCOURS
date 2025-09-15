# Structures de Données - Notes

## Qu'est-ce que les Structures de Données ?

Les structures de données sont des moyens d'organiser, de stocker et de gérer des données de manière efficace. Elles définissent comment les données sont arrangées en mémoire et quelles opérations peuvent être effectuées sur ces données.

## Pourquoi sont-elles Importantes ?

### Efficacité
- **Performance** : Améliorer la vitesse des opérations
- **Mémoire** : Optimiser l'utilisation de l'espace
- **Complexité** : Réduire la complexité algorithmique

### Organisation
- **Logique Métier** : Refléter la structure du problème
- **Maintenance** : Code plus lisible et maintenable
- **Réutilisabilité** : Composants réutilisables

## Types de Données Primitifs en JavaScript

### Number
```javascript
const entier = 42;
const decimal = 3.14159;
const scientific = 1.5e10;
const infini = Infinity;
const nonNombre = NaN;

// Opérations mathématiques
console.log(Math.max(10, 5)); // 10
console.log(Math.round(3.7)); // 4
console.log(Math.random()); // nombre aléatoire 0-1
```

### String (Chaînes de Caractères)
```javascript
const simple = 'Bonjour';
const double = "Hello";
const template = `Salut ${nom}`;

// Propriétés et méthodes utiles
const texte = "JavaScript";
console.log(texte.length); // 10
console.log(texte.toUpperCase()); // "JAVASCRIPT"
console.log(texte.substring(0, 4)); // "Java"
console.log(texte.includes('Script')); // true
console.log(texte.split('')); // ['J','a','v','a','S','c','r','i','p','t']

// Manipulation de chaînes
const phrase = "  Bonjour le monde  ";
console.log(phrase.trim()); // "Bonjour le monde"
console.log(phrase.replace('monde', 'univers')); // "Bonjour l'univers"

// Template literals avancés
const nom = "Alice";
const age = 25;
const message = `
Nom: ${nom}
Âge: ${age}
Status: ${age >= 18 ? 'Majeur' : 'Mineur'}
`;
```

### Boolean
```javascript
const vrai = true;
const faux = false;

// Conversion en booléen
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean([])); // true
console.log(Boolean({})); // true

// Opérateurs logiques
const a = true, b = false;
console.log(a && b); // false
console.log(a || b); // true
console.log(!a); // false
```

### Null et Undefined
```javascript
let nonDefini; // undefined
const rien = null; // null intentionnel

console.log(nonDefini == null); // true (comparaison lâche)
console.log(nonDefini === null); // false (comparaison stricte)
```

## Tableaux (Arrays)

### Création et Accès
```javascript
// Différentes façons de créer des tableaux
const vide = [];
const nombres = [1, 2, 3, 4, 5];
const mixte = [1, "hello", true, null];
const avecConstructeur = new Array(5); // tableau de 5 éléments vides

// Accès aux éléments
console.log(nombres[0]); // 1 (premier élément)
console.log(nombres[nombres.length - 1]); // 5 (dernier élément)
console.log(nombres[-1]); // undefined (pas supporté en JS)
```

### Méthodes de Modification
```javascript
const fruits = ['pomme', 'banane'];

// Ajouter des éléments
fruits.push('orange'); // Ajoute à la fin
fruits.unshift('fraise'); // Ajoute au début
fruits.splice(2, 0, 'kiwi'); // Insère à l'index 2

// Supprimer des éléments
const dernier = fruits.pop(); // Supprime le dernier
const premier = fruits.shift(); // Supprime le premier
fruits.splice(1, 1); // Supprime 1 élément à l'index 1

// Remplacer des éléments
fruits[0] = 'mangue';
fruits.splice(1, 1, 'ananas'); // Remplace 1 élément à l'index 1
```

### Méthodes de Transformation
```javascript
const nombres = [1, 2, 3, 4, 5];

// Map - transformation
const doubles = nombres.map(n => n * 2); // [2, 4, 6, 8, 10]
const chaines = nombres.map(n => `numéro ${n}`);

// Filter - filtrage
const pairs = nombres.filter(n => n % 2 === 0); // [2, 4]
const grands = nombres.filter(n => n > 3); // [4, 5]

// Reduce - réduction
const somme = nombres.reduce((acc, n) => acc + n, 0); // 15
const produit = nombres.reduce((acc, n) => acc * n, 1); // 120
const max = nombres.reduce((acc, n) => Math.max(acc, n), -Infinity); // 5

// Find et FindIndex
const utilisateurs = [
    {nom: 'Alice', age: 25},
    {nom: 'Bob', age: 30}
];
const alice = utilisateurs.find(u => u.nom === 'Alice');
const indexBob = utilisateurs.findIndex(u => u.nom === 'Bob'); // 1
```

### Méthodes Utilitaires
```javascript
const arr = [1, 2, 3];

// Vérifications
console.log(Array.isArray(arr)); // true
console.log(arr.includes(2)); // true
console.log(arr.indexOf(3)); // 2
console.log(arr.lastIndexOf(1)); // 0

// Tri et ordre
const mots = ['banana', 'apple', 'cherry'];
mots.sort(); // ['apple', 'banana', 'cherry']
mots.reverse(); // ['cherry', 'banana', 'apple']

const nombres = [10, 5, 20, 15];
nombres.sort((a, b) => a - b); // [5, 10, 15, 20] croissant
nombres.sort((a, b) => b - a); // [20, 15, 10, 5] décroissant

// Concaténation et division
const arr1 = [1, 2];
const arr2 = [3, 4];
const combine = arr1.concat(arr2); // [1, 2, 3, 4]
const spread = [...arr1, ...arr2]; // [1, 2, 3, 4]

const chaine = arr.join('-'); // "1-2-3"
const tranche = arr.slice(0, 2); // [1, 2]
```

## Objets

### Création et Accès
```javascript
// Création d'objets
const objet1 = {}; // objet vide
const objet2 = new Object(); // équivalent

const personne = {
    nom: 'Alice',
    age: 25,
    ville: 'Paris',
    hobbies: ['lecture', 'natation'],
    adresse: {
        rue: '123 rue de la Paix',
        codePostal: 75001
    }
};

// Accès aux propriétés
console.log(personne.nom); // 'Alice'
console.log(personne['age']); // 25
console.log(personne.adresse.rue); // '123 rue de la Paix'

// Accès dynamique
const propriete = 'ville';
console.log(personne[propriete]); // 'Paris'
```

### Manipulation des Propriétés
```javascript
const obj = {a: 1, b: 2};

// Ajouter/modifier des propriétés
obj.c = 3;
obj['d'] = 4;
Object.assign(obj, {e: 5, f: 6});

// Supprimer des propriétés
delete obj.b;

// Vérifier l'existence
console.log('a' in obj); // true
console.log(obj.hasOwnProperty('a')); // true
console.log(obj.b === undefined); // true
```

### Méthodes Utilitaires
```javascript
const personne = {nom: 'Alice', age: 25, ville: 'Paris'};

// Clés, valeurs, entrées
const cles = Object.keys(personne); // ['nom', 'age', 'ville']
const valeurs = Object.values(personne); // ['Alice', 25, 'Paris']
const entrees = Object.entries(personne); // [['nom', 'Alice'], ['age', 25], ['ville', 'Paris']]

// Reconstruction
const objetReconstruit = Object.fromEntries(entrees);

// Copie et fusion
const copie = Object.assign({}, personne);
const copieSpread = {...personne};
const fusion = Object.assign({}, personne, {profession: 'Développeur'});

// Propriétés et descripteurs
Object.defineProperty(obj, 'proprieteSpeciale', {
    value: 'valeur',
    writable: false,
    enumerable: true,
    configurable: false
});
```

### Itération sur les Objets
```javascript
const personne = {nom: 'Alice', age: 25, ville: 'Paris'};

// For...in - parcourt les propriétés énumérables
for (let cle in personne) {
    console.log(cle, personne[cle]);
}

// For...of avec Object.entries()
for (let [cle, valeur] of Object.entries(personne)) {
    console.log(cle, valeur);
}

// forEach avec Object.keys()
Object.keys(personne).forEach(cle => {
    console.log(cle, personne[cle]);
});
```

## Structures de Données Avancées

### Map
```javascript
// Création
const map = new Map();
const mapInitiale = new Map([
    ['cle1', 'valeur1'],
    ['cle2', 'valeur2']
]);

// Opérations de base
map.set('nom', 'Alice');
map.set('age', 25);
map.set(42, 'nombre comme clé');
map.set({}, 'objet comme clé');

console.log(map.get('nom')); // 'Alice'
console.log(map.has('age')); // true
console.log(map.size); // 4

map.delete('age');
map.clear(); // Supprime tout

// Itération
for (let [cle, valeur] of map) {
    console.log(cle, valeur);
}

for (let cle of map.keys()) {
    console.log(cle);
}

for (let valeur of map.values()) {
    console.log(valeur);
}
```

### Set
```javascript
// Création
const set = new Set();
const setInitial = new Set([1, 2, 3, 2, 1]); // {1, 2, 3}

// Opérations de base
set.add('valeur1');
set.add('valeur2');
set.add('valeur1'); // Ignoré car déjà présent

console.log(set.has('valeur1')); // true
console.log(set.size); // 2

set.delete('valeur2');
set.clear(); // Supprime tout

// Cas d'usage: supprimer les doublons
const tableauAvecDoublons = [1, 2, 2, 3, 3, 3];
const sansDoublons = [...new Set(tableauAvecDoublons)]; // [1, 2, 3]

// Opérations sur les ensembles
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// Union
const union = new Set([...setA, ...setB]); // {1, 2, 3, 4, 5}

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x))); // {3}

// Différence
const difference = new Set([...setA].filter(x => !setB.has(x))); // {1, 2}
```

### WeakMap et WeakSet
```javascript
// WeakMap - clés doivent être des objets
const weakMap = new WeakMap();
const obj1 = {};
const obj2 = {};

weakMap.set(obj1, 'valeur pour obj1');
weakMap.set(obj2, 'valeur pour obj2');

console.log(weakMap.get(obj1)); // 'valeur pour obj1'
console.log(weakMap.has(obj2)); // true

// WeakSet - valeurs doivent être des objets
const weakSet = new WeakSet();
weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1)); // true

// Avantage: garbage collection automatique
// Quand obj1 n'est plus référencé ailleurs, il est automatiquement supprimé
```

## Manipulation de Chaînes de Caractères (Intégration)

### Opérations Avancées
```javascript
const texte = "JavaScript est formidable !";

// Recherche et extraction
console.log(texte.charAt(0)); // "J"
console.log(texte.charCodeAt(0)); // 74 (code ASCII)
console.log(texte.indexOf('Script')); // 4
console.log(texte.lastIndexOf('a')); // 21
console.log(texte.search(/script/i)); // 4 (avec regex insensible à la casse)

// Division et jointure
const mots = texte.split(' '); // ["JavaScript", "est", "formidable", "!"]
const rejointe = mots.join('-'); // "JavaScript-est-formidable-!"

// Expressions régulières
const email = "user@example.com";
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(regexEmail.test(email)); // true

const texteAvecNombres = "J'ai 25 ans et je mesure 1.75m";
const nombres = texteAvecNombres.match(/\d+\.?\d*/g); // ["25", "1.75"]

// Formatage et padding
const nombre = 5;
console.log(nombre.toString().padStart(3, '0')); // "005"
console.log("hello".padEnd(10, '.')); // "hello....."

// Internationalisation
const prix = 1234.56;
console.log(prix.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR'
})); // "1 234,56 €"
```

### Templates et Interpolation
```javascript
const utilisateur = {nom: 'Alice', score: 95};

// Template literals avancés
const rapport = `
Rapport d'Utilisateur
====================
Nom: ${utilisateur.nom}
Score: ${utilisateur.score}
Grade: ${utilisateur.score >= 90 ? 'A' : 'B'}
Barre de progression: ${'█'.repeat(Math.floor(utilisateur.score/10))}${'░'.repeat(10 - Math.floor(utilisateur.score/10))}
`;

// Fonctions de template
function html(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        const value = values[i] ? String(values[i]).replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
        return acc + str + value;
    }, '');
}

const nom = '<script>alert("XSS")</script>';
const safeHTML = html`<div>Bonjour ${nom}!</div>`;
// "<div>Bonjour &lt;script&gt;alert("XSS")&lt;/script&gt;!</div>"
```

## Choix de Structure de Données

### Critères de Sélection

#### Performance (Complexité Big O)
```javascript
// Array
// Accès: O(1), Recherche: O(n), Insertion/Suppression: O(n)
const arr = [1, 2, 3, 4, 5];
console.log(arr[2]); // O(1)
arr.includes(3); // O(n)
arr.splice(2, 1); // O(n)

// Object/Map pour accès rapide par clé
// Accès: O(1), Insertion: O(1), Suppression: O(1)
const map = new Map();
map.set('cle', 'valeur'); // O(1)
map.get('cle'); // O(1)
map.delete('cle'); // O(1)

// Set pour unicité
// Ajout: O(1), Vérification: O(1), Suppression: O(1)
const set = new Set();
set.add('valeur'); // O(1)
set.has('valeur'); // O(1)
```

#### Cas d'Usage Typiques
```javascript
// Liste ordonnée avec index: Array
const taches = ['Tâche 1', 'Tâche 2', 'Tâche 3'];

// Données clé-valeur: Object ou Map
const utilisateurs = new Map([
    ['u1', {nom: 'Alice', age: 25}],
    ['u2', {nom: 'Bob', age: 30}]
]);

// Collection unique: Set
const tagsUniques = new Set(['javascript', 'web', 'programmation']);

// Structure hiérarchique: Objects imbriqués
const arbreFichiers = {
    src: {
        components: {
            'App.js': 'contenu...',
            'Header.js': 'contenu...'
        },
        utils: {
            'helpers.js': 'contenu...'
        }
    },
    public: {
        'index.html': 'contenu...'
    }
};
```

## Structures de Données Personnalisées

### Pile (Stack)
```javascript
class Pile {
    constructor() {
        this.elements = [];
    }
    
    empiler(element) {
        this.elements.push(element);
    }
    
    depiler() {
        return this.elements.pop();
    }
    
    sommet() {
        return this.elements[this.elements.length - 1];
    }
    
    estVide() {
        return this.elements.length === 0;
    }
    
    taille() {
        return this.elements.length;
    }
}

// Utilisation
const pile = new Pile();
pile.empiler(1);
pile.empiler(2);
console.log(pile.depiler()); // 2
console.log(pile.sommet()); // 1
```

### File (Queue)
```javascript
class File {
    constructor() {
        this.elements = [];
    }
    
    enfiler(element) {
        this.elements.push(element);
    }
    
    defiler() {
        return this.elements.shift();
    }
    
    premier() {
        return this.elements[0];
    }
    
    estVide() {
        return this.elements.length === 0;
    }
    
    taille() {
        return this.elements.length;
    }
}
```

### Liste Chaînée Simple
```javascript
class Noeud {
    constructor(donnee) {
        this.donnee = donnee;
        this.suivant = null;
    }
}

class ListeChainee {
    constructor() {
        this.tete = null;
        this.taille = 0;
    }
    
    ajouter(donnee) {
        const nouveauNoeud = new Noeud(donnee);
        if (!this.tete) {
            this.tete = nouveauNoeud;
        } else {
            let courant = this.tete;
            while (courant.suivant) {
                courant = courant.suivant;
            }
            courant.suivant = nouveauNoeud;
        }
        this.taille++;
    }
    
    supprimer(donnee) {
        if (!this.tete) return false;
        
        if (this.tete.donnee === donnee) {
            this.tete = this.tete.suivant;
            this.taille--;
            return true;
        }
        
        let courant = this.tete;
        while (courant.suivant && courant.suivant.donnee !== donnee) {
            courant = courant.suivant;
        }
        
        if (courant.suivant) {
            courant.suivant = courant.suivant.suivant;
            this.taille--;
            return true;
        }
        
        return false;
    }
    
    trouver(donnee) {
        let courant = this.tete;
        while (courant) {
            if (courant.donnee === donnee) {
                return courant;
            }
            courant = courant.suivant;
        }
        return null;
    }
    
    toArray() {
        const resultat = [];
        let courant = this.tete;
        while (courant) {
            resultat.push(courant.donnee);
            courant = courant.suivant;
        }
        return resultat;
    }
}
```

## Sérialisation et Désérialisation

### JSON
```javascript
const objet = {
    nom: 'Alice',
    age: 25,
    hobbies: ['lecture', 'natation'],
    actif: true,
    date: new Date()
};

// Sérialisation
const json = JSON.stringify(objet);
console.log(json); // chaîne JSON

// Avec formatage
const jsonFormate = JSON.stringify(objet, null, 2);

// Avec fonction de remplacement
const jsonPersonnalise = JSON.stringify(objet, (cle, valeur) => {
    if (cle === 'age') return undefined; // Exclure l'âge
    if (typeof valeur === 'string') return valeur.toUpperCase();
    return valeur;
});

// Désérialisation
const objetRestore = JSON.parse(json);

// Avec fonction de révision
const objetPersonnalise = JSON.parse(json, (cle, valeur) => {
    if (cle === 'date') return new Date(valeur);
    return valeur;
});
```

### Clonage Profond
```javascript
// Clonage superficiel
const original = {a: 1, b: {c: 2}};
const cloneSuperficiel = {...original};
cloneSuperficiel.b.c = 3; // Modifie aussi l'original !

// Clonage profond avec JSON (limité)
const cloneProfond = JSON.parse(JSON.stringify(original));

// Clonage profond personnalisé
function cloneProfond(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => cloneProfond(item));
    if (typeof obj === 'object') {
        const clone = {};
        for (let cle in obj) {
            if (obj.hasOwnProperty(cle)) {
                clone[cle] = cloneProfond(obj[cle]);
            }
        }
        return clone;
    }
}
```

## Bonnes Pratiques

### Performance
1. **Choisir la bonne structure** selon l'usage
2. **Éviter les mutations** inutiles sur de grandes collections
3. **Utiliser des méthodes natives** optimisées
4. **Mise en cache** des calculs coûteux

### Lisibilité
1. **Noms explicites** pour les variables et propriétés
2. **Structure cohérente** dans les objets
3. **Documentation** des structures complexes
4. **Validation** des types et formats

### Sécurité
1. **Validation des entrées** avant traitement
2. **Échappement** des données pour l'affichage
3. **Limites de taille** pour éviter les dénis de service
4. **Sérialisation sécurisée** sans code exécutable

## Applications Pratiques

- **Gestion d'État** : Redux, MobX
- **Cache et Optimisation** : Mémoisation, indexation
- **Structures de Données d'UI** : Arbres de composants, listes virtuelles
- **Algorithmes** : Tri, recherche, graphes
- **Base de Données** : Index, relations
- **Réseaux** : Buffers, queues de messages
- **Jeux** : Grilles, graphes de scène, inventaires