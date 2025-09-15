# Boucles - Quiz

## Questions à Choix Multiples

### 1. Que va afficher ce code ?
```javascript
for (let i = 0; i < 3; i++) {
    console.log(i);
}
```
a) `0 1 2 3`  
b) `0 1 2`  
c) `1 2 3`  
d) `1 2 3 4`  

**Réponse: b) `0 1 2`**

### 2. Combien de fois s'exécute cette boucle while ?
```javascript
let compteur = 5;
while (compteur > 0) {
    compteur--;
}
```
a) 4 fois  
b) 5 fois  
c) 6 fois  
d) Boucle infinie  

**Réponse: b) 5 fois**

### 3. Quelle est la différence principale entre `for...in` et `for...of` ?
a) `for...in` est plus rapide  
b) `for...in` donne les indices, `for...of` donne les valeurs  
c) Il n'y a pas de différence  
d) `for...of` fonctionne seulement avec les objets  

**Réponse: b) `for...in` donne les indices, `for...of` donne les valeurs**

### 4. Que fait l'instruction `continue` dans une boucle ?
a) Sort de la boucle  
b) Passe à l'itération suivante  
c) Arrête le programme  
d) Recommence la boucle depuis le début  

**Réponse: b) Passe à l'itération suivante**

### 5. Combien de fois "Bonjour" sera-t-il affiché ?
```javascript
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        break;
    }
    console.log("Bonjour");
}
```
a) 3 fois  
b) 4 fois  
c) 5 fois  
d) 2 fois  

**Réponse: a) 3 fois**

## Questions Vrai/Faux

### 6. Une boucle `do...while` s'exécute toujours au moins une fois.
**Réponse: Vrai**

### 7. On peut utiliser `for...of` sur un objet simple `{a: 1, b: 2}`.
**Réponse: Faux** (seulement sur les objets itérables)

### 8. L'instruction `break` peut être utilisée dans une boucle `forEach()`.
**Réponse: Faux** (utiliser `return` pour simuler continue, pas d'équivalent pour break)

### 9. Il est possible d'avoir une boucle `for` sans condition.
**Réponse: Vrai** (`for (;;)` crée une boucle infinie)

### 10. La méthode `map()` modifie le tableau original.
**Réponse: Faux** (elle retourne un nouveau tableau)

## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
const arr = ['a', 'b', 'c'];
for (let index in arr) {
    console.log(typeof index);
}
```
**Réponse: "string" trois fois** (les indices sont des chaînes de caractères)

### 12. Combien de fois "test" sera-t-il affiché ?
```javascript
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
        console.log("test");
    }
}
```
**Réponse: 6 fois** (3 × 2 = 6)

### 13. Que retourne cette fonction ?
```javascript
function compterPairs(nombres) {
    let compte = 0;
    for (let nombre of nombres) {
        if (nombre % 2 === 0) {
            compte++;
        }
    }
    return compte;
}
compterPairs([1, 2, 3, 4, 5, 6]);
```
**Réponse: 3** (2, 4, et 6 sont pairs)

### 14. Quel est le problème avec ce code ?
```javascript
const arr = [1, 2, 3];
for (let i = 0; i <= arr.length; i++) {
    console.log(arr[i]);
}
```
**Réponse: "Off-by-one error"** - accès à `arr[3]` qui est `undefined`

## Questions Pratiques

### 15. Complétez cette boucle pour afficher les nombres pairs de 0 à 10 :
```javascript
for (let i = 0; i <= 10; _______) {
    console.log(i);
}
```
**Réponse: `i += 2`**

### 16. Écrivez une boucle while qui compte de 10 à 1 :
```javascript
let i = 10;
while (_______) {
    console.log(i);
    _______;
}
```
**Réponse:**
```javascript
let i = 10;
while (i >= 1) {
    console.log(i);
    i--;
}
```

### 17. Transformez cette boucle for en forEach :
```javascript
const fruits = ["pomme", "banane", "orange"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
```
**Réponse:**
```javascript
fruits.forEach(fruit => console.log(fruit));
```

### 18. Complétez ce code pour créer un tableau de nombres de 1 à 5 :
```javascript
const nombres = [];
for (_______ ; _______ ; _______) {
    nombres.push(_______);
}
```
**Réponse:**
```javascript
for (let i = 1; i <= 5; i++) {
    nombres.push(i);
}
```

## Questions sur les Méthodes de Tableau

### 19. Quelle méthode utiliser pour transformer chaque élément d'un tableau ?
**Réponse: `map()`**

### 20. Quelle méthode utiliser pour ne garder que certains éléments d'un tableau ?
**Réponse: `filter()`**

### 21. Que fait ce code ?
```javascript
const nombres = [1, 2, 3, 4];
const resultat = nombres.reduce((acc, curr) => acc + curr, 0);
```
**Réponse: Calcule la somme du tableau (10)**

### 22. Comment parcourir un objet avec ses clés et valeurs ?
```javascript
const obj = {a: 1, b: 2, c: 3};
for (_______ of _______) {
    console.log(cle, valeur);
}
```
**Réponse:**
```javascript
for (let [cle, valeur] of Object.entries(obj)) {
    console.log(cle, valeur);
}
```

## Questions de Performance

### 23. Laquelle de ces approches est la plus efficace pour parcourir un grand tableau ?
a) `for` classique  
b) `for...of`  
c) `forEach`  
d) Elles sont équivalentes  

**Réponse: a) `for` classique** (généralement le plus rapide)

### 24. Comment optimiser cette boucle ?
```javascript
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
    // traitement
}
```
**Réponse: Stocker `arr.length` dans une variable:**
```javascript
const longueur = arr.length;
for (let i = 0; i < longueur; i++) {
    // traitement
}
```

## Questions de Débogage

### 25. Pourquoi cette boucle ne s'arrête-t-elle jamais ?
```javascript
let i = 0;
while (i < 10) {
    console.log(i);
    // Oubli d'incrémenter i
}
```
**Réponse: Oubli d'incrémenter `i`** - ajouter `i++` dans la boucle

### 26. Corrigez ce code qui devrait afficher 1, 2, 3 après 1 seconde chacun :
```javascript
for (var i = 1; i <= 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
```
**Réponse: Utiliser `let` au lieu de `var`:**
```javascript
for (let i = 1; i <= 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
```

## Questions Conceptuelles

### 27. Dans quels cas utiliser `while` plutôt que `for` ?
**Réponse: Quand le nombre d'itérations est inconnu ou dépend d'une condition complexe**

### 28. Expliquez la différence entre ces deux approches :
```javascript
// Approche 1
arr.forEach(item => console.log(item));

// Approche 2
for (let item of arr) {
    console.log(item);
}
```
**Réponse: `forEach` est une méthode fonctionnelle sans possibilité de break/continue, `for...of` est plus flexible avec contrôle de flux complet**

### 29. Que signifie "boucle infinie" et comment l'éviter ?
**Réponse: Boucle qui ne s'arrête jamais car sa condition reste toujours vraie. L'éviter en s'assurant que la condition évolue vers false**

### 30. Pourquoi éviter de modifier un tableau pendant qu'on le parcourt ?
**Réponse: Cela peut causer des comportements imprévisibles, manquer des éléments ou accéder à des indices invalides**

## Notation
- **28-30 correct**: Excellente maîtrise des boucles
- **25-27 correct**: Très bonne compréhension, quelques révisions mineures
- **22-24 correct**: Bonne connaissance, approfondir les concepts avancés  
- **18-21 correct**: Compréhension de base solide, pratiquer davantage
- **15-17 correct**: Bases acquises, revoir les méthodes de tableau
- **Moins de 15**: Réviser les fondamentaux et pratiquer les exemples simples