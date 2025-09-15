# Fonctions - Notes

## Qu'est-ce que les Fonctions ?

Les fonctions sont des blocs de code réutilisables qui effectuent des tâches spécifiques. Elles constituent l'un des éléments fondamentaux de la programmation, permettant d'organiser le code, d'éviter la répétition et de créer des programmes modulaires.

> 💡 **Liens avec d'autres modules :**
> - [**Variables ←**](../variables/) Les fonctions utilisent des variables comme paramètres et variables locales
> - [**Conditions →**](../conditions/) Les fonctions contiennent souvent de la logique conditionnelle
> - [**Loops →**](../loops/) Les fonctions peuvent itérer sur des données
> - [**Recursion →**](../recursion/) Les fonctions peuvent s'appeler elles-mêmes
> - [**Error-handling →**](../error-handling/) Les fonctions doivent gérer les erreurs
> - [**OOP-basics →**](../oop-basics/) Les méthodes de classe sont des fonctions spécialisées
> - [**Modules-imports →**](../modules-imports/) Les fonctions sont exportées/importées entre modules

## Concepts Fondamentaux

### Déclaration de Fonction
La syntaxe de base pour créer une fonction :

```javascript
function nomDeLaFonction(parametres) {
    // Corps de la fonction
    return resultat; // Optionnel
}
```

### Composants d'une Fonction
1. **Nom de la Fonction** : Identifiant pour appeler la fonction
2. **Paramètres** : Valeurs d'entrée que la fonction accepte
3. **Corps de la Fonction** : Code qui s'exécute lorsque la fonction est appelée
4. **Instruction de Retour** : Valeur de sortie (optionnelle)

## Types de Fonctions

### 1. Déclaration de Fonction
```javascript
function saluer(nom) {
    return "Bonjour, " + nom + " !";
}
```

### 2. Expression de Fonction
```javascript
const saluer = function(nom) {
    return "Bonjour, " + nom + " !";
};
```

### 3. Fonctions Fléchées (ES6+)
```javascript
const saluer = (nom) => {
    return "Bonjour, " + nom + " !";
};

// Syntaxe raccourcie pour les expressions simples
const saluer = nom => "Bonjour, " + nom + " !";
```

### 4. Fonctions Anonymes
```javascript
setTimeout(function() {
    console.log("Ceci s'exécute après 1 seconde");
}, 1000);
```

## Paramètres et Arguments

### Paramètres de Base
```javascript
function additionner(a, b) {
    return a + b;
}
additionner(5, 3); // 5 et 3 sont des arguments
```

### Paramètres par Défaut
```javascript
function saluer(nom = "Monde") {
    return "Bonjour, " + nom + " !";
}
saluer(); // "Bonjour, Monde !"
saluer("Alice"); // "Bonjour, Alice !"
```

### Paramètres Rest
```javascript
function somme(...nombres) {
    return nombres.reduce((total, num) => total + num, 0);
}
somme(1, 2, 3, 4); // 10
```

### Déstructuration des Paramètres
```javascript
function traiterUtilisateur({nom, age, email}) {
    console.log(`${nom} a ${age} ans`);
}
traiterUtilisateur({nom: "Jean", age: 30, email: "jean@email.com"});
```

## Valeurs de Retour

### Retour de Base
```javascript
function multiplier(a, b) {
    return a * b;
}
let resultat = multiplier(4, 5); // resultat = 20
```

### Pas de Retour (undefined)
```javascript
function afficherMessage(message) {
    console.log(message);
    // Pas d'instruction return = retourne undefined
}
```

### Retour Précoce
```javascript
function diviser(a, b) {
    if (b === 0) {
        return "Impossible de diviser par zéro";
    }
    return a / b;
}
```

### Valeurs de Retour Multiples
```javascript
function obtenirPartiesNom(nomComplet) {
    const parties = nomComplet.split(" ");
    return [parties[0], parties[parties.length - 1]]; // Tableau
}

function obtenirInfoUtilisateur(id) {
    return {
        nom: "Jean",
        age: 30,
        actif: true
    }; // Objet
}
```

## Portée des Fonctions

### Portée Locale
```javascript
function maFonction() {
    let variableLocale = "Je suis locale";
    console.log(variableLocale); // Accessible
}
// console.log(variableLocale); // Erreur - pas accessible à l'extérieur
```

### Portée Globale
```javascript
let variableGlobale = "Je suis globale";

function accederGlobal() {
    console.log(variableGlobale); // Accessible
}
```

### Portée de Bloc
```javascript
function exemplePortee() {
    if (true) {
        let variableBloc = "Portée de bloc";
        var variableFonction = "Portée de fonction";
    }
    // console.log(variableBloc); // Erreur
    console.log(variableFonction); // Fonctionne
}
```

## Fonctions d'Ordre Supérieur

Fonctions qui opèrent sur d'autres fonctions (prennent des fonctions comme paramètres ou retournent des fonctions).

### Fonctions comme Paramètres
```javascript
function operation(a, b, callback) {
    return callback(a, b);
}

function additionner(x, y) {
    return x + y;
}

function multiplier(x, y) {
    return x * y;
}

operation(5, 3, additionner); // 8
operation(5, 3, multiplier); // 15
```

### Fonctions Retournant des Fonctions
```javascript
function creerMultiplicateur(facteur) {
    return function(nombre) {
        return nombre * facteur;
    };
}

const doubler = creerMultiplicateur(2);
const tripler = creerMultiplicateur(3);

doubler(5); // 10
tripler(5); // 15
```

## Méthodes de Tableau Communes (Fonctions d'Ordre Supérieur)

### map()
```javascript
const nombres = [1, 2, 3, 4];
const doubles = nombres.map(num => num * 2);
// [2, 4, 6, 8]
```

### filter()
```javascript
const nombres = [1, 2, 3, 4, 5, 6];
const pairs = nombres.filter(num => num % 2 === 0);
// [2, 4, 6]
```

### reduce()
```javascript
const nombres = [1, 2, 3, 4];
const somme = nombres.reduce((total, num) => total + num, 0);
// 10
```

### forEach()
```javascript
const fruits = ["pomme", "banane", "orange"];
fruits.forEach(fruit => console.log(fruit));
```

## Concepts Avancés

### Fermetures (Closures)
Fonctions qui ont accès aux variables de leur portée externe :

```javascript
function fonctionExterne(x) {
    return function fonctionInterne(y) {
        return x + y; // A accès à 'x'
    };
}

const ajouterCinq = fonctionExterne(5);
ajouterCinq(3); // 8
```

### IIFE (Expression de Fonction Immédiatement Invoquée)
```javascript
(function() {
    console.log("Ceci s'exécute immédiatement");
})();

// IIFE avec fonction fléchée
(() => {
    console.log("IIFE fléchée");
})();
```

### Hissage (Hoisting) de Fonction
```javascript
// Ceci fonctionne grâce au hissage
direBonjour(); // "Bonjour !"

function direBonjour() {
    console.log("Bonjour !");
}

// Mais ceci ne fonctionne pas
// direAuRevoir(); // Erreur

const direAuRevoir = function() {
    console.log("Au revoir !");
};
```

## Bonnes Pratiques

### 1. Utiliser des Noms Descriptifs
```javascript
// Mauvais
function calc(x, y) {
    return x * y * 0.1;
}

// Bon
function calculerPrixAvecRemise(prixOriginal, pourcentageRemise) {
    return prixOriginal * pourcentageRemise * 0.01;
}
```

### 2. Garder les Fonctions Petites et Focalisées
```javascript
// Mauvais - fait trop de choses
function traiterDonneesUtilisateur(donneesUtilisateur) {
    // valider les données
    // formater les données
    // sauvegarder en base de données
    // envoyer un email
    // enregistrer l'activité
}

// Bon - responsabilité unique
function validerDonneesUtilisateur(donneesUtilisateur) { /* ... */ }
function formaterDonneesUtilisateur(donneesUtilisateur) { /* ... */ }
function sauvegarderUtilisateur(donneesUtilisateur) { /* ... */ }
function envoyerEmailBienvenue(utilisateur) { /* ... */ }
function enregistrerActiviteUtilisateur(activite) { /* ... */ }
```

### 3. Utiliser des Fonctions Pures Quand Possible
```javascript
// Fonction pure - pas d'effets de bord, même entrée = même sortie
function additionner(a, b) {
    return a + b;
}

// Fonction impure - a des effets de bord
let total = 0;
function ajouterAuTotal(valeur) {
    total += valeur; // Modifie l'état externe
    return total;
}
```

### 4. Gérer les Cas Limites
```javascript
function diviser(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Les deux paramètres doivent être des nombres');
    }
    if (b === 0) {
        throw new Error('La division par zéro n\'est pas autorisée');
    }
    return a / b;
}
```

### 5. Utiliser des Paramètres par Défaut
```javascript
function creerUtilisateur(nom, age = 18, actif = true) {
    return { nom, age, actif };
}
```

## Motifs Courants

### Fonctions Usines (Factory Functions)
```javascript
function creerPersonne(nom, age) {
    return {
        nom: nom,
        age: age,
        saluer: function() {
            return `Bonjour, je suis ${this.nom}`;
        }
    };
}

const personne1 = creerPersonne("Alice", 25);
```

### Motif Module
```javascript
const calculatrice = (function() {
    let resultat = 0;

    return {
        additionner: function(x) {
            resultat += x;
            return this;
        },
        multiplier: function(x) {
            resultat *= x;
            return this;
        },
        obtenirResultat: function() {
            return resultat;
        },
        reinitialiser: function() {
            resultat = 0;
            return this;
        }
    };
})();

calculatrice.additionner(5).multiplier(3).obtenirResultat(); // 15
```

### Motif Callback
```javascript
function recupererDonnees(callback) {
    setTimeout(() => {
        const donnees = { id: 1, nom: "Utilisateur" };
        callback(null, donnees);
    }, 1000);
}

recupererDonnees((erreur, donnees) => {
    if (erreur) {
        console.error("Erreur:", erreur);
    } else {
        console.log("Données:", donnees);
    }
});
```

## Applications du Monde Réel

- **Gestionnaires d'Événements** : Répondre aux interactions utilisateur
- **Appels d'API** : Traiter les réponses du serveur
- **Traitement de Données** : Transformer et filtrer les données
- **Validation** : Vérifier la validité des entrées
- **Utilitaires** : Fonctions d'aide réutilisables
- **Implémentation d'Algorithmes** : Tri, recherche, calculs
- **Gestion d'État** : Gérer l'état de l'application
- **Organisation du Code** : Architecture modulaire

## Considérations de Performance

1. **Éviter de Créer des Fonctions dans les Boucles**
2. **Utiliser les Fonctions Fléchées pour les Opérations Courtes**
3. **Considérer la Mémorisation pour les Opérations Coûteuses**
4. **Être Prudent avec l'Usage Mémoire des Fermetures**
5. **Profiler les Performances des Fonctions dans les Chemins Critiques**