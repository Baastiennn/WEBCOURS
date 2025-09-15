# Récursion - Notes

## Qu'est-ce que la Récursion ?

La récursion est une technique de programmation où une fonction s'appelle elle-même pour résoudre un problème en le décomposant en sous-problèmes plus petits et similaires.

## Concepts Fondamentaux

### Anatomie d'une Fonction Récursive

Une fonction récursive doit toujours contenir deux éléments essentiels :

1. **Cas de Base** : La condition d'arrêt qui empêche l'appel infini
2. **Cas Récursif** : L'appel de la fonction à elle-même avec des paramètres modifiés

### Structure Générale
```javascript
function fonctionRecursive(paramètres) {
    // Cas de base
    if (conditionDArret) {
        return valeurDeBase;
    }
    
    // Cas récursif
    return fonctionRecursive(paramètresModifiés);
}
```

## Principes Clés

### 1. Décomposition du Problème
- Diviser un problème complexe en sous-problèmes similaires mais plus petits
- Chaque appel récursif traite une version simplifiée du problème original

### 2. Convergence vers le Cas de Base
- Les paramètres doivent évoluer vers la condition d'arrêt
- Sans convergence, on obtient une récursion infinie (stack overflow)

### 3. Pile d'Appels (Call Stack)
- Chaque appel récursif est empilé en mémoire
- Les appels se dépilent dans l'ordre inverse (LIFO)
- Important pour comprendre l'ordre d'exécution

## Exemples Classiques

### Factorielle
```javascript
function factorielle(n) {
    // Cas de base
    if (n <= 1) {
        return 1;
    }
    
    // Cas récursif
    return n * factorielle(n - 1);
}
```

### Suite de Fibonacci
```javascript
function fibonacci(n) {
    // Cas de base
    if (n <= 1) {
        return n;
    }
    
    // Cas récursif
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### Somme d'un Tableau
```javascript
function sommeTableau(arr, index = 0) {
    // Cas de base
    if (index >= arr.length) {
        return 0;
    }
    
    // Cas récursif
    return arr[index] + sommeTableau(arr, index + 1);
}
```

## Types de Récursion

### 1. Récursion Linéaire
- Un seul appel récursif par exécution
- Exemple : factorielle, somme d'un tableau

### 2. Récursion Arborescente
- Plusieurs appels récursifs par exécution
- Exemple : Fibonacci, parcours d'arbre binaire

### 3. Récursion Mutuelle
- Deux ou plusieurs fonctions s'appellent mutuellement
- Exemple : pair/impair mutuellement récursif

### 4. Récursion de Queue (Tail Recursion)
- L'appel récursif est la dernière opération
- Peut être optimisée par le compilateur

```javascript
// Récursion de queue
function factorielleQueue(n, acc = 1) {
    if (n <= 1) {
        return acc;
    }
    return factorielleQueue(n - 1, n * acc);
}
```

## Avantages de la Récursion

1. **Élégance et Lisibilité** : Code plus proche de la définition mathématique
2. **Simplicité** : Résout naturellement les problèmes auto-similaires
3. **Puissance** : Permet de résoudre des problèmes complexes avec peu de code
4. **Structures de Données** : Idéale pour les arbres, graphes, listes liées

## Inconvénients et Limites

1. **Performance** : Plus lente que l'itération (overhead des appels)
2. **Mémoire** : Risque de débordement de pile (stack overflow)
3. **Débogage** : Plus difficile à tracer et déboguer
4. **Recalculs** : Certaines récursions refont les mêmes calculs

## Optimisations

### Mémoïsation
```javascript
function fibonacciMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}
```

### Conversion Itérative
```javascript
// Version itérative de Fibonacci
function fibonacciIteratif(n) {
    if (n <= 1) return n;
    
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
```

## Cas d'Usage Appropriés

### Quand Utiliser la Récursion
- Structures de données hiérarchiques (arbres, graphes)
- Problèmes de division et conquête
- Algorithmes de backtracking
- Problèmes avec définition récursive naturelle
- Parcours de structures imbriquées

### Exemples d'Applications
- Parcours d'arbre de fichiers
- Recherche dans un labyrinthe
- Calculs mathématiques (factorielle, puissance)
- Algorithmes de tri (quicksort, mergesort)
- Validation de structures imbriquées (JSON, XML)

## Bonnes Pratiques

1. **Toujours Définir le Cas de Base** : Premier élément à implémenter
2. **Vérifier la Convergence** : S'assurer que les paramètres évoluent vers le cas de base
3. **Limiter la Profondeur** : Ajouter des garde-fous contre la récursion infinie
4. **Considérer les Alternatives** : Évaluer si l'itération serait plus appropriée
5. **Tester avec Petites Valeurs** : Commencer par des cas simples
6. **Documenter la Logique** : Expliquer clairement le cas de base et récursif

## Déboguer la Récursion

### Techniques de Débogage
1. **Ajout de Logs** : Tracer les appels et retours
2. **Visualisation** : Dessiner l'arbre des appels
3. **Cas Simples** : Tester avec les plus petites valeurs possibles
4. **Vérification Manuelle** : Suivre quelques itérations à la main

### Exemple avec Logs
```javascript
function factorielleDebug(n, profondeur = 0) {
    const indent = "  ".repeat(profondeur);
    console.log(`${indent}→ factorielle(${n})`);
    
    if (n <= 1) {
        console.log(`${indent}← retourne 1 (cas de base)`);
        return 1;
    }
    
    const résultat = n * factorielleDebug(n - 1, profondeur + 1);
    console.log(`${indent}← retourne ${résultat}`);
    return résultat;
}
```

## Erreurs Communes

1. **Oublier le Cas de Base** : Cause une récursion infinie
2. **Cas de Base Incorrect** : Ne couvre pas tous les scénarios d'arrêt
3. **Pas de Progression** : Les paramètres n'évoluent pas vers le cas de base
4. **Modification des Paramètres** : Altérer les paramètres de façon inattendue
5. **Gestion Incorrecte des Valeurs de Retour** : Oublier de retourner ou combiner les résultats