# Variables - Notes

## Qu'est-ce que les Variables ?

🎯 **Vision d'ensemble :** Imaginez que vous créez un **tracker d'habitudes personnel**. Vous devez mémoriser votre humeur du jour (`let humeur = 8`), compter vos jours de sport consécutifs (`let streakSport = 12`), et garder la liste de vos objectifs (`const objectifs = ["courir", "méditer"]`). **Les variables sont vos boîtes mémoire** qui permettent à votre programme de se "souvenir" et de manipuler toutes ces informations.

Les variables sont des conteneurs nommés qui stockent des données dans un programme. Elles constituent l'un des concepts fondamentaux de la programmation, permettant de stocker, récupérer et manipuler des informations tout au long de l'exécution du programme.

> 🌟 **Fil conducteur - Votre Assistant Personnel :**  
> Tout au long de ce parcours, nous construisons progressivement un **assistant personnel intelligent**. Les variables sont la première pierre : elles permettent de mémoriser votre nom, vos préférences, vos données. Plus tard, les conditions décideront quoi vous suggérer, les loops analyseront vos patterns, et les functions organiseront le tout !

> 💡 **Liens avec d'autres modules :**
> - [**Conditions →**](../conditions/) Testeront vos variables pour personnaliser l'expérience : `if (humeur < 5) suggererMusique()`
> - [**Loops →**](../loops/) Parcourront vos listes de données : analyser 30 jours d'humeur
> - [**Functions →**](../functions/) Organiseront vos variables en actions réutilisables : `calculerMoyenneHumeur()`
> - [**Data-Structures →**](../data-structures/) Structureront vos données complexes : historique, profils, statistiques
> - [**OOP-basics →**](../oop-basics/) Transformeront vos variables en propriétés d'objets intelligents

## Concepts Fondamentaux

### Déclaration de Variable
🎯 **Cas concret :** Vous commencez à créer votre tracker d'habitudes. D'abord, vous "réservez des cases mémoire" pour vos futures données :

```javascript
let nomUtilisateur;        // Case réservée pour votre nom
let objectifQuotidien;     // Case pour votre objectif du jour
let habitRealisee;         // Case pour savoir si c'est fait
// const SECRET_API;       // Erreur ! Les constantes doivent être remplies immédiatement
```

### Initialisation de Variable
🎯 **En action :** Maintenant vous remplissez vos cases mémoire avec vos vraies données :

```javascript
let nomUtilisateur = "Alex";              // Votre nom dans l'app
let objectifQuotidien = "Méditer 10 min"; // Votre objectif aujourd'hui
let habitRealisee = false;                // Pas encore fait ce matin
const COULEUR_SUCCES = "#4CAF50";         // Couleur verte pour les succès (ne change jamais)
```

💡 **Pourquoi c'est utile :** Sans variables, votre app devrait redemander votre nom à chaque fois ! Avec, elle se "souvient" de vous et personnalise l'expérience.

### Assignation
Modifier la valeur d'une variable existante :

```javascript
nom = "Bob";     // Nouvelle valeur
age = 26;        // Modification
// ville = "Lyon"; // Erreur ! const ne peut pas être réassigné
```

## Mots-clés de Déclaration

### 1. var (Ancienne Syntaxe)
```javascript
var message = "Bonjour";
var compteur = 0;
```

**Caractéristiques :**
- Portée de fonction ou globale
- Hissage (hoisting) complet
- Peut être redéclarée
- Peut être réassignée

### 2. let (ES6+)
```javascript
let nom = "Marie";
let score = 100;
```

**Caractéristiques :**
- Portée de bloc
- Hissage sans initialisation (Temporal Dead Zone)
- Ne peut pas être redéclarée dans le même scope
- Peut être réassignée

### 3. const (ES6+)
```javascript
const PI = 3.14159;
const utilisateurs = ["Alice", "Bob"];
```

**Caractéristiques :**
- Portée de bloc
- Doit être initialisée à la déclaration
- Ne peut pas être redéclarée
- Ne peut pas être réassignée
- Les objets/tableaux restent mutables

## Types de Données

### Types Primitifs

#### 1. String (Chaîne de caractères)
```javascript
let nom = "Alice";
let citation = 'Bonjour tout le monde';
let template = `Mon nom est ${nom}`;
```

#### 2. Number (Nombre)
```javascript
let entier = 42;
let decimal = 3.14;
let negatif = -10;
let infini = Infinity;
let pasUnNombre = NaN;
```

#### 3. Boolean (Booléen)
```javascript
let estVrai = true;
let estFaux = false;
let actif = Boolean(1); // true
```

#### 4. Undefined
```javascript
let variable; // undefined par défaut
let resultat = undefined;
```

#### 5. Null
```javascript
let donnees = null; // Absence intentionnelle de valeur
```

#### 6. Symbol (ES6+)
```javascript
let sym1 = Symbol('description');
let sym2 = Symbol('description');
// sym1 !== sym2 (toujours uniques)
```

#### 7. BigInt (ES2020)
```javascript
let grandNombre = 123456789012345678901234567890n;
let autreBigInt = BigInt(123);
```

### Types Non-Primitifs (Objets)

#### 1. Object
```javascript
let personne = {
    nom: "Alice",
    age: 30
};
```

#### 2. Array
```javascript
let fruits = ["pomme", "banane", "orange"];
let nombres = [1, 2, 3, 4, 5];
```

#### 3. Function
```javascript
let saluer = function(nom) {
    return "Bonjour " + nom;
};
```

## Portée des Variables (Scope)

### Portée Globale
Variables déclarées en dehors de toute fonction ou bloc :

```javascript
var variableGlobale = "Accessible partout";
let autreGlobale = "Aussi accessible partout";

function maFonction() {
    console.log(variableGlobale); // Accessible
}
```

### Portée de Fonction
Variables déclarées à l'intérieur d'une fonction :

```javascript
function exemplePorteeFonction() {
    var locale = "Seulement dans cette fonction";
    let aussiLocale = "Pareil ici";

    if (true) {
        var varDansBloc = "Accessible dans toute la fonction";
        let letDansBloc = "Seulement dans ce bloc";
    }

    console.log(varDansBloc); // Accessible
    // console.log(letDansBloc); // Erreur !
}
```

### Portée de Bloc
Variables déclarées à l'intérieur d'un bloc `{}` :

```javascript
if (true) {
    let variableBloc = "Seulement dans ce bloc";
    const autreVariableBloc = "Aussi limitée au bloc";
    var variableFonction = "Disponible dans toute la fonction";
}

// console.log(variableBloc); // Erreur !
// console.log(autreVariableBloc); // Erreur !
console.log(variableFonction); // Accessible
```

### Chaîne de Portée (Scope Chain)
```javascript
let global = "Variable globale";

function externe() {
    let externe = "Variable externe";

    function interne() {
        let interne = "Variable interne";
        console.log(interne);  // Variable interne
        console.log(externe);  // Variable externe
        console.log(global);   // Variable globale
    }

    interne();
}
```

## Hissage (Hoisting)

### Hissage avec var
```javascript
console.log(maVariable); // undefined (pas d'erreur)
var maVariable = "Bonjour";

// Équivalent à :
var maVariable;
console.log(maVariable); // undefined
maVariable = "Bonjour";
```

### Hissage avec let et const
```javascript
// console.log(maLet); // ReferenceError
let maLet = "Valeur";

// console.log(maConst); // ReferenceError
const maConst = "Constante";
```

### Temporal Dead Zone
```javascript
function exempleTemporalDeadZone() {
    // TDZ pour 'temp' commence ici
    console.log(typeof temp); // ReferenceError

    let temp = "Valeur"; // TDZ se termine ici
    console.log(temp); // "Valeur"
}
```

## Mutabilité et Immutabilité

### Variables Primitives (Immutables)
```javascript
let texte = "Bonjour";
texte.toUpperCase(); // Retourne "BONJOUR" mais ne modifie pas texte
console.log(texte); // Toujours "Bonjour"

texte = texte.toUpperCase(); // Réassignation nécessaire
console.log(texte); // Maintenant "BONJOUR"
```

### Objets et Tableaux (Mutables)
```javascript
const personne = { nom: "Alice", age: 30 };
personne.age = 31; // Modification autorisée
personne.ville = "Paris"; // Ajout autorisé
// personne = {}; // Erreur ! Réassignation interdite

const fruits = ["pomme", "banane"];
fruits.push("orange"); // Modification autorisée
// fruits = []; // Erreur ! Réassignation interdite
```

### Copie Profonde vs Superficielle
```javascript
// Copie superficielle
const original = { nom: "Alice", scores: [1, 2, 3] };
const copie = { ...original };
copie.scores.push(4); // Modifie aussi l'original !

// Copie profonde
const copieProfonde = JSON.parse(JSON.stringify(original));
copieProfonde.scores.push(5); // N'affecte pas l'original
```

## Conventions de Nommage

### Styles de Casse
```javascript
// camelCase (recommandé en JavaScript)
let nomUtilisateur = "Alice";
let ageUtilisateur = 30;

// snake_case (moins courant en JS)
let nom_utilisateur = "Bob";

// PascalCase (pour les constructeurs/classes)
let MonConstructeur = function() {};

// SCREAMING_SNAKE_CASE (pour les constantes)
const API_URL = "https://api.exemple.com";
const MAX_TENTATIVES = 3;
```

### Noms Descriptifs
```javascript
// Mauvais
let d = new Date();
let u = getUser();
let x = calculateTotal();

// Bon
let dateActuelle = new Date();
let utilisateurActuel = getUser();
let totalCommande = calculateTotal();
```

### Préfixes et Suffixes Utiles
```javascript
// Booléens
let isActive = true;
let hasPermission = false;
let canEdit = true;

// Tableaux
let userList = [];
let itemArray = [];
let scores = [];

// Objets
let userInfo = {};
let configObject = {};
let settings = {};
```

## Gestion Mémoire

### Variables et Références
```javascript
// Types primitifs - passage par valeur
let a = 5;
let b = a; // b est une copie de a
a = 10;
console.log(b); // 5 (inchangé)

// Objets - passage par référence
let obj1 = { valeur: 5 };
let obj2 = obj1; // obj2 référence le même objet
obj1.valeur = 10;
console.log(obj2.valeur); // 10 (modifié)
```

### Garbage Collection
```javascript
function creerObjet() {
    let objetLocal = { donnees: "importantes" };
    return objetLocal;
}

let monObjet = creerObjet();
// L'objet reste en mémoire car référencé par monObjet

monObjet = null;
// Maintenant l'objet peut être collecté par le garbage collector
```

## Types Dynamiques

### Vérification de Type
```javascript
let variable = "texte";
console.log(typeof variable); // "string"

variable = 42;
console.log(typeof variable); // "number"

variable = true;
console.log(typeof variable); // "boolean"

variable = {};
console.log(typeof variable); // "object"

variable = [];
console.log(Array.isArray(variable)); // true
```

### Conversion de Type
```javascript
// Conversion automatique (coercition)
let resultat = "5" + 3; // "53" (string)
let autre = "5" - 3; // 2 (number)

// Conversion explicite
let nombre = Number("123"); // 123
let texte = String(456); // "456"
let booleen = Boolean(0); // false
```

## Destructuration

### Destructuration de Tableau
```javascript
const couleurs = ["rouge", "vert", "bleu"];
const [premiere, deuxieme, troisieme] = couleurs;

// Avec valeurs par défaut
const [a, b, c = "jaune"] = ["rouge", "vert"];

// Ignorer des éléments
const [premier, , troisieme] = couleurs;
```

### Destructuration d'Objet
```javascript
const personne = { nom: "Alice", age: 30, ville: "Paris" };
const { nom, age, ville } = personne;

// Avec renommage
const { nom: nomUtilisateur, age: ageUtilisateur } = personne;

// Avec valeurs par défaut
const { nom, profession = "Développeur" } = personne;
```

## Patterns Avancés

### Swap de Variables
```javascript
// Méthode traditionnelle
let a = 1, b = 2, temp;
temp = a;
a = b;
b = temp;

// Avec destructuration
[a, b] = [b, a];
```

### Variables Temporaires
```javascript
function calculerStatistiques(nombres) {
    let somme = 0;
    let min = Infinity;
    let max = -Infinity;

    for (let nombre of nombres) {
        somme += nombre;
        min = Math.min(min, nombre);
        max = Math.max(max, nombre);
    }

    return {
        somme,
        moyenne: somme / nombres.length,
        min,
        max
    };
}
```

### Pattern Module avec Variables Privées
```javascript
const monModule = (function() {
    // Variables privées
    let variablePrivee = "secret";
    let compteur = 0;

    // Interface publique
    return {
        incrementer: function() {
            compteur++;
        },
        obtenirCompteur: function() {
            return compteur;
        },
        // variablePrivee n'est pas accessible de l'extérieur
    };
})();
```

## Bonnes Pratiques

### 1. Préférer const par Défaut
```javascript
// Bon - utilise const quand la valeur ne change pas
const utilisateurs = ["Alice", "Bob"];
const configuration = { theme: "sombre" };

// Utilise let quand la réassignation est nécessaire
let compteur = 0;
let message = "Initial";
```

### 2. Initialiser les Variables
```javascript
// Mauvais
let nom;
let scores;

// Bon
let nom = "";
let scores = [];
let utilisateur = null;
```

### 3. Éviter var en JavaScript Moderne
```javascript
// Évitez
var ancien = "style";

// Préférez
let moderne = "style";
const CONSTANTE = "valeur";
```

### 4. Limiter la Portée
```javascript
// Mauvais - portée trop large
let resultat;
function calculer() {
    resultat = 42;
}

// Bon - portée limitée
function calculer() {
    const resultat = 42;
    return resultat;
}
```

### 5. Noms Significatifs
```javascript
// Mauvais
let d = new Date();
let u = users.filter(x => x.active);

// Bon
let dateAujourdhui = new Date();
let utilisateursActifs = users.filter(user => user.active);
```

## Erreurs Communes

### 1. Redéclaration Accidentelle
```javascript
// Erreur avec let/const
let nom = "Alice";
// let nom = "Bob"; // SyntaxError

// Acceptable avec var (mais non recommandé)
var age = 20;
var age = 21; // Fonctionne mais prêtant à confusion
```

### 2. Temporal Dead Zone
```javascript
// Erreur
console.log(maVariable); // ReferenceError
let maVariable = "valeur";

// Correct
let maVariable = "valeur";
console.log(maVariable); // "valeur"
```

### 3. Mutation Non Intentionnelle
```javascript
// Problème
const config = { theme: "clair" };
config.theme = "sombre"; // Fonctionne mais peut être non désiré

// Solution - Object.freeze()
const config = Object.freeze({ theme: "clair" });
// config.theme = "sombre"; // Erreur en mode strict
```

### 4. Variables Globales Accidentelles
```javascript
function maFonction() {
    // Oublier let/const crée une variable globale
    variableAccidentelle = "Oups!";
}

// Correct
function maFonction() {
    let variableLocale = "Bien!";
}
```

### 5. Fuites Mémoire avec les Fermetures
```javascript
// Problème potentiel
function creerFonctions() {
    let grosseDonnee = new Array(1000000).fill("data");

    return function petiteFonction() {
        return "simple";
    };
    // grosseDonnee reste en mémoire à cause de la fermeture
}

// Meilleure approche
function creerFonctions() {
    let grosseDonnee = new Array(1000000).fill("data");
    let resultat = traiterDonnees(grosseDonnee);
    grosseDonnee = null; // Libérer la référence

    return function petiteFonction() {
        return resultat;
    };
}
```

## Applications du Monde Réel

- **Configuration d'Application** : Stocker les paramètres et options
- **État de l'Interface** : Suivre l'état des composants UI
- **Cache de Données** : Stocker temporairement des données fréquemment utilisées
- **Compteurs et Métriques** : Suivre les interactions utilisateur
- **Gestion de Session** : Informations utilisateur temporaires
- **Validation de Formulaire** : États de champs et messages d'erreur
- **Animation et Jeux** : Positions, scores, niveaux
- **API et AJAX** : Stocker les réponses du serveur

## Optimisations et Performance

### 1. Réutilisation de Variables
```javascript
// Moins efficace
function traiterDonnees(items) {
    let resultats = [];
    for (let i = 0; i < items.length; i++) {
        let processed = process(items[i]);
        resultats.push(processed);
    }
    return resultats;
}

// Plus efficace - réutiliser les variables
function traiterDonnees(items) {
    let resultats = [];
    let processed;
    let longueur = items.length;

    for (let i = 0; i < longueur; i++) {
        processed = process(items[i]);
        resultats.push(processed);
    }
    return resultats;
}
```

### 2. Éviter les Variables Inutiles
```javascript
// Moins efficace
function calculer(x, y) {
    let temp1 = x * 2;
    let temp2 = y * 3;
    let resultat = temp1 + temp2;
    return resultat;
}

// Plus efficace
function calculer(x, y) {
    return (x * 2) + (y * 3);
}
```

### 3. Mise en Cache de Calculs Coûteux
```javascript
const cache = new Map();

function calculCouteux(input) {
    if (cache.has(input)) {
        return cache.get(input);
    }

    let resultat = /* calcul complexe */;
    cache.set(input, resultat);
    return resultat;
}
```

### 4. Éviter les Variables Globales
```javascript
// Problématique
var compteurGlobal = 0;

// Meilleure approche
const MonApp = (function() {
    let compteurPrive = 0;

    return {
        incrementer() {
            compteurPrive++;
        },
        obtenirCompteur() {
            return compteurPrive;
        }
    };
})();
```