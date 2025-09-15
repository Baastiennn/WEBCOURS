# Récursion - Katas

## Niveau Débutant (Récursion de Base)

### Kata 1: Factorielle
**Objectif:** Calculer la factorielle d'un nombre (n! = n × (n-1) × ... × 1).

**Exigences:**
- 0! = 1 (cas de base)
- n! = n × (n-1)! pour n > 0

**Signature de la Fonction:**
```javascript
function factorielle(n) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
factorielle(0) // 1
factorielle(1) // 1
factorielle(5) // 120
factorielle(3) // 6
```

---

### Kata 2: Somme des N Premiers Nombres
**Objectif:** Calculer la somme de 1 + 2 + 3 + ... + n.

**Signature de la Fonction:**
```javascript
function sommeNombres(n) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
sommeNombres(0) // 0
sommeNombres(1) // 1
sommeNombres(5) // 15 (1+2+3+4+5)
sommeNombres(10) // 55
```

---

### Kata 3: Puissance
**Objectif:** Calculer base^exposant de façon récursive.

**Exigences:**
- base^0 = 1
- base^n = base × base^(n-1)

**Signature de la Fonction:**
```javascript
function puissance(base, exposant) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
puissance(2, 0) // 1
puissance(2, 3) // 8
puissance(5, 2) // 25
puissance(3, 4) // 81
```

---

### Kata 4: Compter les Éléments d'un Tableau
**Objectif:** Compter récursivement le nombre d'éléments dans un tableau.

**Signature de la Fonction:**
```javascript
function compterElements(arr, index = 0) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
compterElements([]) // 0
compterElements([1]) // 1
compterElements([1, 2, 3, 4]) // 4
compterElements(['a', 'b', 'c']) // 3
```

---

## Niveau Intermédiaire (Récursion avec Traitement)

### Kata 5: Inverser une Chaîne
**Objectif:** Inverser une chaîne de caractères récursivement.

**Signature de la Fonction:**
```javascript
function inverserChaine(str) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
inverserChaine("") // ""
inverserChaine("a") // "a"
inverserChaine("hello") // "olleh"
inverserChaine("récursion") // "noisrucér"
```

---

### Kata 6: Somme d'un Tableau
**Objectif:** Calculer la somme de tous les éléments d'un tableau.

**Signature de la Fonction:**
```javascript
function sommeTableau(arr, index = 0) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
sommeTableau([]) // 0
sommeTableau([5]) // 5
sommeTableau([1, 2, 3, 4]) // 10
sommeTableau([10, -5, 3]) // 8
```

---

### Kata 7: Maximum d'un Tableau
**Objectif:** Trouver le plus grand élément d'un tableau récursivement.

**Signature de la Fonction:**
```javascript
function maxTableau(arr, index = 0) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
maxTableau([5]) // 5
maxTableau([1, 9, 3]) // 9
maxTableau([100, 50, 200, 10]) // 200
maxTableau([-1, -5, -2]) // -1
```

---

### Kata 8: PGCD (Plus Grand Commun Diviseur)
**Objectif:** Calculer le PGCD de deux nombres avec l'algorithme d'Euclide.

**Exigences:**
- PGCD(a, 0) = a
- PGCD(a, b) = PGCD(b, a % b)

**Signature de la Fonction:**
```javascript
function pgcd(a, b) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
pgcd(12, 8) // 4
pgcd(15, 25) // 5
pgcd(17, 13) // 1
pgcd(48, 18) // 6
```

---

## Niveau Avancé (Récursion Complexe)

### Kata 9: Suite de Fibonacci
**Objectif:** Calculer le n-ième terme de la suite de Fibonacci.

**Exigences:**
- F(0) = 0, F(1) = 1
- F(n) = F(n-1) + F(n-2) pour n > 1

**Signature de la Fonction:**
```javascript
function fibonacci(n) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
fibonacci(0) // 0
fibonacci(1) // 1
fibonacci(5) // 5
fibonacci(8) // 21
```

---

### Kata 10: Fibonacci Optimisé (Mémoïsation)
**Objectif:** Optimiser Fibonacci avec la mémoïsation pour éviter les recalculs.

**Signature de la Fonction:**
```javascript
function fibonacciMemo(n, memo = {}) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
fibonacciMemo(40) // 102334155 (rapide grâce à la mémoïsation)
fibonacciMemo(50) // 12586269025
```

---

### Kata 11: Palindrome
**Objectif:** Vérifier si une chaîne est un palindrome récursivement.

**Signature de la Fonction:**
```javascript
function estPalindrome(str, debut = 0, fin = str.length - 1) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
estPalindrome("") // true
estPalindrome("a") // true
estPalindrome("racecar") // true
estPalindrome("hello") // false
estPalindrome("kayak") // true
```

---

### Kata 12: Tours de Hanoï
**Objectif:** Résoudre le problème classique des Tours de Hanoï.

**Exigences:**
- Déplacer n disques de la source vers la destination
- Utiliser un pilier auxiliaire
- Un disque plus grand ne peut pas être sur un plus petit

**Signature de la Fonction:**
```javascript
function toursHanoi(n, source, destination, auxiliaire) {
    // Retourner un tableau des mouvements
    // Chaque mouvement: {de: 'A', vers: 'B'}
}
```

**Cas de Test:**
```javascript
toursHanoi(1, 'A', 'C', 'B') 
// [{de: 'A', vers: 'C'}]

toursHanoi(2, 'A', 'C', 'B')
// [{de: 'A', vers: 'B'}, {de: 'A', vers: 'C'}, {de: 'B', vers: 'C'}]
```

---

## Niveau Expert (Récursion sur Structures)

### Kata 13: Aplatir un Tableau Imbriqué
**Objectif:** Aplatir récursivement un tableau qui peut contenir d'autres tableaux.

**Signature de la Fonction:**
```javascript
function aplatirTableau(arr) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
aplatirTableau([1, 2, 3]) // [1, 2, 3]
aplatirTableau([1, [2, 3], 4]) // [1, 2, 3, 4]
aplatirTableau([1, [2, [3, 4]], 5]) // [1, 2, 3, 4, 5]
aplatirTableau([[1, 2], [3, [4, 5]]]) // [1, 2, 3, 4, 5]
```

---

### Kata 14: Parcours d'Arbre Binaire
**Objectif:** Implémenter le parcours en profondeur d'un arbre binaire.

**Structure de Nœud:**
```javascript
class Noeud {
    constructor(valeur, gauche = null, droite = null) {
        this.valeur = valeur;
        this.gauche = gauche;
        this.droite = droite;
    }
}
```

**Signature de la Fonction:**
```javascript
function parcoursPreordre(noeud) {
    // Parcours: racine → gauche → droite
    // Retourner un tableau des valeurs
}
```

**Cas de Test:**
```javascript
//       1
//      / \
//     2   3
//    / \
//   4   5

const arbre = new Noeud(1, 
    new Noeud(2, new Noeud(4), new Noeud(5)), 
    new Noeud(3)
);
parcoursPreordre(arbre) // [1, 2, 4, 5, 3]
```

---

### Kata 15: Génération de Permutations
**Objectif:** Générer toutes les permutations possibles d'un tableau.

**Signature de la Fonction:**
```javascript
function genererPermutations(arr) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
genererPermutations([1]) // [[1]]
genererPermutations([1, 2]) // [[1, 2], [2, 1]]
genererPermutations([1, 2, 3]) 
// [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

---

## Défis Bonus (Récursion Avancée)

### Kata 16: Tri Rapide (QuickSort)
**Objectif:** Implémenter l'algorithme de tri rapide récursivement.

**Signature de la Fonction:**
```javascript
function triRapide(arr) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
triRapide([3, 6, 8, 10, 1, 2, 1]) // [1, 1, 2, 3, 6, 8, 10]
triRapide([5, 2, 8, 1, 9]) // [1, 2, 5, 8, 9]
```

---

### Kata 17: Labyrinthe (Backtracking)
**Objectif:** Trouver un chemin dans un labyrinthe en utilisant le backtracking.

**Représentation:**
- 0 = chemin libre
- 1 = mur
- 2 = destination

**Signature de la Fonction:**
```javascript
function resoudreLabyrinthe(maze, x = 0, y = 0, chemin = []) {
    // Retourner le chemin vers la destination ou null
}
```

**Cas de Test:**
```javascript
const labyrinthe = [
    [0, 0, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 2]
];
resoudreLabyrinthe(labyrinthe) 
// [[0,0], [0,1], [1,1], [2,1], [2,2], [2,3], [3,3]]
```

## Conseils de Pratique

1. **Commencez Simple** : Maîtrisez les katas débutant avant de progresser
2. **Tracez l'Exécution** : Dessinez ou écrivez les appels récursifs
3. **Cas de Base d'Abord** : Toujours commencer par identifier le cas de base
4. **Testez Progressivement** : Utilisez de petites valeurs pour déboguer
5. **Optimisez Ensuite** : Faites fonctionner avant d'optimiser
6. **Comparez avec l'Itératif** : Essayez aussi les versions itératives
7. **Mémoïsation** : Appliquez la mémoïsation aux problèmes avec recalculs

## Ressources Supplémentaires

> 💡 **Visualisation** : Utilisez des outils en ligne pour visualiser les appels récursifs
> 
> 🔧 **Débogage** : Ajoutez des console.log avec indentation pour tracer l'exécution
>
> 📊 **Performance** : Mesurez le temps d'exécution pour comparer les optimisations