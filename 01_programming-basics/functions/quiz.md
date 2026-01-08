# Fonctions - Quiz

## Questions à Choix Multiples

### 1. Que retourne cette fonction ?
```javascript
function mystere() {
    console.log("Bonjour");
}
console.log(mystere());
```
a) `"Bonjour"`
b) `undefined`
c) `null`
d) Erreur



### 2. Quelle déclaration de fonction fonctionnera grâce au hissage ?
a) `const func = function() { };`
b) `let func = function() { };`
c) `function func() { }`
d) `var func = () => { }`



### 3. Quelle est la valeur de `x` après l'exécution de ce code ?
```javascript
function additionner(a, b = 5) {
    return a + b;
}
let x = additionner(3);
```
a) `3`
b) `5`
c) `8`
d) `undefined`



### 4. Que retourne cette fonction fléchée ?
```javascript
const doubler = x => x * 2;
```
a) `undefined`
b) `x * 2`
c) C'est une erreur de syntaxe
d) Le résultat de `x * 2`



### 5. Quelle est la sortie de ce code ?
```javascript
const nombres = [1, 2, 3];
const doubles = nombres.map(n => n * 2);
console.log(doubles);
```
a) `[1, 2, 3]`
b) `[2, 4, 6]`
c) `6`
d) `undefined`



## Questions Vrai/Faux

### 6. Les fonctions fléchées ont leur propre liaison `this`.
 (Les fonctions fléchées héritent du `this` de la portée englobante)

### 7. Une fonction peut retourner une autre fonction en JavaScript.


### 8. Les expressions de fonction sont hissées de la même manière que les déclarations de fonction.
 (Seules les déclarations de fonction sont entièrement hissées)

### 9. L'objet `arguments` est disponible dans les fonctions fléchées.
 (Disponible uniquement dans les fonctions régulières)

### 10. Les fonctions pures retournent toujours la même sortie pour la même entrée.


## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
function externe(x) {
    return function interne(y) {
        return x + y;
    };
}
const ajouterDix = externe(10);
console.log(ajouterDix(5));
```
 (La fermeture permet à la fonction interne d'accéder à `x`)

### 12. Qu'est-ce qui ne va pas avec cet appel de fonction ?
```javascript
function saluer(nom, salutation = "Bonjour") {
    return salutation + ", " + nom + " !";
}
saluer();
```
 (résultera en "Bonjour, undefined !")

### 13. Que retournera cette fonction reduce ?
```javascript
const nombres = [1, 2, 3, 4];
const resultat = nombres.reduce((acc, curr) => acc + curr, 0);
```
 (Somme de tous les nombres : 1+2+3+4)

### 14. Complétez cette fonction d'ordre supérieur :
```javascript
function operation(a, b, callback) {
    return _______;
}
```


## Questions Pratiques

### 15. Écrivez une fonction qui prend un nom et retourne une fonction de salutation :
```javascript
function creerSalueur(nom) {
    // Votre code ici
}
const saluerJean = creerSalueur("Jean");
saluerJean(); // Devrait retourner "Bonjour, Jean !"
```
**Réponse :**
```javascript
function creerSalueur(nom) {
    return function() {
        return "Bonjour, " + nom + " !";
    };
}
```

### 16. Convertissez cette fonction pour utiliser la syntaxe fléchée :
```javascript
function multiplier(a, b) {
    return a * b;
}
```


### 17. Écrivez une fonction qui filtre les nombres pairs d'un tableau :
```javascript
function filtrerPairs(nombres) {
    // Votre code ici
}
```
**Réponse :**
```javascript
function filtrerPairs(nombres) {
    return nombres.filter(num => num % 2 === 0);
}
```

### 18. Créez une fonction avec des paramètres rest qui additionne tous les arguments :
```javascript
function somme(/* vos paramètres */) {
    // Votre code ici
}
```
**Réponse :**
```javascript
function somme(...nombres) {
    return nombres.reduce((total, num) => total + num, 0);
}
```

## Questions Avancées

### 19. Quelle est la différence entre ces deux appels de fonction ?
```javascript
// Appel 1
setTimeout(function() { console.log("A"); }, 100);

// Appel 2
setTimeout(() => console.log("B"), 100);
```
**Réponse :** Les deux sont fonctionnellement équivalents dans ce contexte. Le premier utilise une expression de fonction régulière, le second utilise une fonction fléchée. La principale différence serait la liaison `this` si utilisé dans un contexte différent.

### 20. Expliquez ce qui se passe dans cette IIFE :
```javascript
(function(x) {
    console.log(x * 2);
})(5);
```
**Réponse :** C'est une Expression de Fonction Immédiatement Invoquée qui prend 5 comme argument, le multiplie par 2, et affiche 10 dans la console.

### 21. Quel motif ce code démontre-t-il ?
```javascript
const calculatrice = (function() {
    let resultat = 0;
    return {
        additionner: function(x) { resultat += x; return this; },
        obtenirResultat: function() { return resultat; }
    };
})();
```
**Réponse :** Motif module avec chaînage de méthodes. Crée une variable privée `resultat` avec des méthodes publiques pour la manipuler.

### 22. Corrigez cette fonction pour gérer correctement le contexte `this` :
```javascript
const obj = {
    nom: "Test",
    salutationDifferee: function() {
        setTimeout(function() {
            console.log("Bonjour, " + this.nom);
        }, 1000);
    }
};
```
**Réponse :**
```javascript
const obj = {
    nom: "Test",
    salutationDifferee: function() {
        setTimeout(() => {
            console.log("Bonjour, " + this.nom);
        }, 1000);
    }
};
```

## Questions de Débogage

### 23. Pourquoi ceci ne fonctionne-t-il pas comme prévu ?
```javascript
direBonjour(); // Erreur

var direBonjour = function() {
    console.log("Bonjour !");
};
```
**Réponse :** Les expressions de fonction ne sont pas hissées. La variable `direBonjour` est hissée mais sa valeur (`function() {...}`) ne l'est pas, donc elle est `undefined` quand appelée.

### 24. Quel est le problème avec cette boucle ?
```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 100);
}
```
**Réponse :** Tous les callbacks afficheront `3` car ils partagent la même variable `i`. Corriger avec `let` au lieu de `var`, ou utiliser une fermeture/bind.

### 25. Comment rendriez-vous cette fonction pure ?
```javascript
let total = 0;
function ajouterAuTotal(x) {
    total += x;
    return total;
}
```
**Réponse :**
```javascript
function additionner(totalActuel, x) {
    return totalActuel + x;
}
```

## Questions de Performance

### 26. Quelle est la plus efficace pour les opérations simples ?
a) `function additionner(a, b) { return a + b; }`
b) `const additionner = (a, b) => a + b;`
c) Les deux sont également efficaces
d) Cela dépend du moteur JavaScript

 (Les moteurs modernes optimisent les deux de manière similaire)

### 27. Quelle technique peut optimiser les fonctions récursives avec des calculs répétés ?
**Réponse :** Mémorisation - mise en cache des résultats précédents pour éviter les recalculs

## Notation
- **25-27 correctes** : Compréhension experte des fonctions
- **22-24 correctes** : Connaissances avancées, lacunes mineures à combler
- **18-21 correctes** : Bonne maîtrise, réviser les concepts avancés
- **15-17 correctes** : Bases solides, pratiquer davantage les scénarios complexes
- **Moins de 15** : Réviser les fondamentaux et pratiquer les concepts de base des fonctions