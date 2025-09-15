# Récursion - Quiz

## Questions à Choix Multiples

### 1. Que se passe-t-il si une fonction récursive n'a pas de cas de base ?
a) Elle retourne undefined  
b) Elle provoque une erreur de syntaxe  
c) Elle cause un débordement de pile (stack overflow)  
d) Elle s'arrête automatiquement  

**Réponse: c) Elle cause un débordement de pile (stack overflow)**

### 2. Dans l'ordre d'exécution de la pile d'appels, lequel est correct ?
a) FIFO (First In, First Out)  
b) LIFO (Last In, First Out)  
c) Ordre aléatoire  
d) Ordre alphabétique  

**Réponse: b) LIFO (Last In, First Out)**

### 3. Quelle est la complexité temporelle de Fibonacci récursif naïf ?
a) O(n)  
b) O(n²)  
c) O(2^n)  
d) O(log n)  

**Réponse: c) O(2^n)**

### 4. Qu'est-ce que la récursion de queue (tail recursion) ?
a) Une récursion qui utilise une queue au lieu d'une pile  
b) Une récursion où l'appel récursif est la dernière opération  
c) Une récursion qui s'arrête automatiquement  
d) Une récursion qui n'a pas de cas de base  

**Réponse: b) Une récursion où l'appel récursif est la dernière opération**

### 5. Que calcule factorielle(0) ?
a) 0  
b) 1  
c) undefined  
d) Erreur  

**Réponse: b) 1**

## Questions Vrai/Faux

### 6. La récursion est toujours plus rapide que l'itération.
**Réponse: Faux** (La récursion a généralement plus d'overhead due aux appels de fonction)

### 7. Toute fonction récursive peut être convertie en version itérative.
**Réponse: Vrai**

### 8. La mémoïsation peut améliorer les performances de certaines fonctions récursives.
**Réponse: Vrai**

### 9. Une fonction récursive doit toujours avoir exactement un cas de base.
**Réponse: Faux** (Elle peut avoir plusieurs cas de base)

### 10. La récursion mutuelle implique qu'une fonction s'appelle elle-même.
**Réponse: Faux** (La récursion mutuelle implique que deux ou plusieurs fonctions s'appellent mutuellement)

## Questions d'Analyse de Code

### 11. Que retourne ce code pour puissance(2, 3) ?
```javascript
function puissance(base, exposant) {
    if (exposant === 0) {
        return 1;
    }
    return base * puissance(base, exposant - 1);
}
```
**Réponse: 8** (2 × 2 × 2 = 8)

### 12. Combien d'appels récursifs sont effectués pour factorielle(4) ?
```javascript
function factorielle(n) {
    if (n <= 1) return 1;
    return n * factorielle(n - 1);
}
```
**Réponse: 4 appels** (factorielle(4), factorielle(3), factorielle(2), factorielle(1))

### 13. Que retourne cette fonction pour compterElements([1, 2, 3]) ?
```javascript
function compterElements(arr, index = 0) {
    if (index >= arr.length) {
        return 0;
    }
    return 1 + compterElements(arr, index + 1);
}
```
**Réponse: 3** (compte le nombre d'éléments dans le tableau)

### 14. Quel est le problème avec ce code ?
```javascript
function mauvaiseFonction(n) {
    return n + mauvaiseFonction(n - 1);
}
```
**Réponse: Pas de cas de base** (provoquera un débordement de pile)

## Questions Pratiques

### 15. Complétez le cas de base pour cette fonction qui calcule la somme des n premiers nombres :
```javascript
function sommeNombres(n) {
    if (_______) {
        return 0;
    }
    return n + sommeNombres(n - 1);
}
```
**Réponse: `n <= 0` ou `n === 0`**

### 16. Écrivez une fonction récursive qui inverse une chaîne de caractères :
```javascript
function inverserChaine(str) {
    if (_______) {
        return _______;
    }
    return _______ + inverserChaine(_______);
}
```
**Réponse:** 
```javascript
if (str.length <= 1) {
    return str;
}
return str[str.length - 1] + inverserChaine(str.slice(0, -1));
```

### 17. Optimisez cette fonction Fibonacci avec la mémoïsation :
```javascript
function fibonacci(n, memo = {}) {
    if (n <= 1) return n;
    if (_______) return _______;
    
    memo[n] = _______;
    return memo[n];
}
```
**Réponse:**
```javascript
if (memo[n] !== undefined) return memo[n];
memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
```

## Questions Conceptuelles

### 18. Expliquez la différence entre récursion directe et indirecte.
**Réponse:** La récursion directe est quand une fonction s'appelle elle-même directement. La récursion indirecte est quand une fonction A appelle une fonction B qui rappelle la fonction A.

### 19. Quels sont les trois critères pour qu'un problème soit adapté à la récursion ?
**Réponse:** 
1. Le problème peut être décomposé en sous-problèmes similaires plus petits
2. Il existe un cas de base clairement défini
3. Les paramètres convergent vers le cas de base

### 20. Comment déboguer efficacement une fonction récursive ?
**Réponse:** 
- Ajouter des logs avec indentation pour tracer les appels
- Tester avec de petites valeurs
- Vérifier que le cas de base est correct
- S'assurer que les paramètres progressent vers le cas de base
- Visualiser l'arbre des appels

## Questions de Comparaison

### 21. Comparez ces deux versions de Fibonacci - laquelle est plus efficace et pourquoi ?

**Version A (Récursive):**
```javascript
function fibA(n) {
    if (n <= 1) return n;
    return fibA(n - 1) + fibA(n - 2);
}
```

**Version B (Itérative):**
```javascript
function fibB(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
```
**Réponse:** Version B est plus efficace. Version A a une complexité O(2^n) car elle recalcule les mêmes valeurs. Version B a une complexité O(n) et utilise O(1) d'espace.

## Exercices de Trace

### 22. Tracez l'exécution de factorielle(3) en montrant la pile d'appels :
**Réponse:**
```
1. factorielle(3) → 3 * factorielle(2)
2. factorielle(2) → 2 * factorielle(1)  
3. factorielle(1) → 1 (cas de base)
4. Retour: 2 * 1 = 2
5. Retour: 3 * 2 = 6
```

## Notation
- **20-22 correct**: Excellente maîtrise de la récursion
- **17-19 correct**: Bonne compréhension, quelques révisions nécessaires
- **14-16 correct**: Compréhension de base, pratiquer les concepts avancés
- **11-13 correct**: Bases acquises, approfondir les optimisations
- **Moins de 11**: Revoir les fondamentaux et pratiquer les exemples simples