# Boucles - Katas

## Niveau Débutant (Boucles de Base)

### Kata 1: Compteur Simple
**Objectif:** Afficher les nombres de 1 à N.

**Signature de la Fonction:**
```javascript
function compterJusqua(n) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
compterJusqua(5) // Affiche: 1, 2, 3, 4, 5
compterJusqua(3) // Affiche: 1, 2, 3
compterJusqua(0) // N'affiche rien
```

---

### Kata 2: Table de Multiplication
**Objectif:** Afficher la table de multiplication d'un nombre.

**Signature de la Fonction:**
```javascript
function tableMultiplication(nombre, limite = 10) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
tableMultiplication(3, 5) 
// Affiche: 3x1=3, 3x2=6, 3x3=9, 3x4=12, 3x5=15
tableMultiplication(7, 3)
// Affiche: 7x1=7, 7x2=14, 7x3=21
```

---

### Kata 3: Somme des Nombres
**Objectif:** Calculer la somme de tous les nombres de 1 à N.

**Signature de la Fonction:**
```javascript
function sommeNombres(n) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
sommeNombres(5) // 15 (1+2+3+4+5)
sommeNombres(10) // 55
sommeNombres(1) // 1
sommeNombres(0) // 0
```

---

### Kata 4: Compter les Caractères
**Objectif:** Compter le nombre de fois qu'un caractère apparaît dans une chaîne.

**Signature de la Fonction:**
```javascript
function compterCaractere(texte, caractere) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
compterCaractere("hello", "l") // 2
compterCaractere("programming", "m") // 2
compterCaractere("javascript", "x") // 0
compterCaractere("aaaaaa", "a") // 6
```

---

## Niveau Intermédiaire (Boucles avec Conditions)

### Kata 5: Nombres Pairs et Impairs
**Objectif:** Séparer les nombres pairs et impairs d'un tableau.

**Signature de la Fonction:**
```javascript
function separerPairsImpairs(nombres) {
    // Retourner un objet avec propriétés "pairs" et "impairs"
}
```

**Cas de Test:**
```javascript
separerPairsImpairs([1, 2, 3, 4, 5, 6])
// {pairs: [2, 4, 6], impairs: [1, 3, 5]}
separerPairsImpairs([1, 3, 5])
// {pairs: [], impairs: [1, 3, 5]}
separerPairsImpairs([2, 4, 6])
// {pairs: [2, 4, 6], impairs: []}
```

---

### Kata 6: Recherche dans un Tableau
**Objectif:** Trouver la première occurrence d'une valeur dans un tableau.

**Signature de la Fonction:**
```javascript
function trouverIndex(tableau, valeur) {
    // Retourner l'index ou -1 si non trouvé
}
```

**Cas de Test:**
```javascript
trouverIndex([1, 2, 3, 4], 3) // 2
trouverIndex(["a", "b", "c"], "b") // 1
trouverIndex([1, 2, 3], 5) // -1
trouverIndex([], 1) // -1
```

---

### Kata 7: Factorielle
**Objectif:** Calculer la factorielle d'un nombre avec une boucle.

**Signature de la Fonction:**
```javascript
function factorielle(n) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
factorielle(5) // 120 (5*4*3*2*1)
factorielle(0) // 1
factorielle(1) // 1
factorielle(4) // 24
```

---

### Kata 8: Valider un Mot de Passe
**Objectif:** Vérifier si un mot de passe respecte des critères.

**Exigences:**
- Au moins 8 caractères
- Contient au moins une majuscule
- Contient au moins une minuscule  
- Contient au moins un chiffre

**Signature de la Fonction:**
```javascript
function validerMotDePasse(motDePasse) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
validerMotDePasse("Password123") // true
validerMotDePasse("password123") // false (pas de majuscule)
validerMotDePasse("PASSWORD123") // false (pas de minuscule)
validerMotDePasse("Password") // false (pas de chiffre)
validerMotDePasse("Pass123") // false (trop court)
```

---

## Niveau Avancé (Boucles Imbriquées)

### Kata 9: Motifs d'Étoiles
**Objectif:** Créer différents motifs avec des étoiles.

**Signatures des Fonctions:**
```javascript
function triangleEtoiles(hauteur) {
    // Triangle croissant
}

function carreEtoiles(taille) {
    // Carré d'étoiles
}

function pyramideEtoiles(hauteur) {
    // Pyramide centrée
}
```

**Cas de Test:**
```javascript
triangleEtoiles(4)
// *
// **
// ***
// ****

carreEtoiles(3)
// ***
// ***
// ***

pyramideEtoiles(3)
//  *
// ***
//*****
```

---

### Kata 10: Matrice Spirale
**Objectif:** Parcourir une matrice en spirale.

**Signature de la Fonction:**
```javascript
function parcourirSpirale(matrice) {
    // Retourner un tableau des éléments dans l'ordre spiral
}
```

**Cas de Test:**
```javascript
parcourirSpirale([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])
// [1, 2, 3, 6, 9, 8, 7, 4, 5]

parcourirSpirale([
    [1, 2],
    [3, 4]
])
// [1, 2, 4, 3]
```

---

### Kata 11: Jeu de la Vie (Conway)
**Objectif:** Implémenter une génération du Jeu de la Vie.

**Règles:**
- Cellule vivante avec 2-3 voisins survit
- Cellule morte avec exactement 3 voisins naît
- Sinon, la cellule meurt ou reste morte

**Signature de la Fonction:**
```javascript
function prochainEtat(grille) {
    // Retourner la nouvelle grille
}
```

**Cas de Test:**
```javascript
const grille = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
];
prochainEtat(grille)
// [
//   [0, 0, 0],
//   [1, 1, 1],
//   [0, 0, 0]
// ]
```

---

### Kata 12: Sudoku Validator
**Objectif:** Valider si une grille de Sudoku 9x9 est correcte.

**Signature de la Fonction:**
```javascript
function validerSudoku(grille) {
    // Retourner true si valide, false sinon
}
```

**Cas de Test:**
```javascript
const grilleValide = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
];
validerSudoku(grilleValide) // true
```

---

## Niveau Expert (Méthodes de Tableau)

### Kata 13: Transformateur de Données
**Objectif:** Utiliser map, filter, reduce pour transformer des données.

**Signature de la Fonction:**
```javascript
function traiterEmployes(employes) {
    // Filtrer les employés actifs
    // Augmenter leur salaire de 10%
    // Calculer la masse salariale totale
    // Retourner un objet avec les résultats
}
```

**Cas de Test:**
```javascript
const employes = [
    {nom: "Alice", salaire: 50000, actif: true},
    {nom: "Bob", salaire: 60000, actif: false},
    {nom: "Charlie", salaire: 55000, actif: true}
];

traiterEmployes(employes)
// {
//   employesActifs: [
//     {nom: "Alice", salaire: 55000, actif: true},
//     {nom: "Charlie", salaire: 60500, actif: true}
//   ],
//   masseSalarialeTotal: 115500
// }
```

---

### Kata 14: Grouper par Propriété
**Objectif:** Grouper un tableau d'objets par une propriété.

**Signature de la Fonction:**
```javascript
function grouperPar(tableau, propriete) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
const personnes = [
    {nom: "Alice", age: 25, ville: "Paris"},
    {nom: "Bob", age: 30, ville: "Lyon"},
    {nom: "Charlie", age: 25, ville: "Paris"}
];

grouperPar(personnes, "ville")
// {
//   "Paris": [
//     {nom: "Alice", age: 25, ville: "Paris"},
//     {nom: "Charlie", age: 25, ville: "Paris"}
//   ],
//   "Lyon": [
//     {nom: "Bob", age: 30, ville: "Lyon"}
//   ]
// }
```

---

### Kata 15: Pipeline de Données
**Objectif:** Créer un pipeline de transformation de données.

**Signature de la Fonction:**
```javascript
function pipeline(donnees, ...transformations) {
    // Appliquer toutes les transformations en séquence
}
```

**Cas de Test:**
```javascript
const donnees = [1, 2, 3, 4, 5, 6];
const doublerPairs = x => x % 2 === 0 ? x * 2 : x;
const filtrerSuperieurCinq = x => x > 5;
const additionnerUn = x => x + 1;

pipeline(
    donnees,
    arr => arr.map(doublerPairs),
    arr => arr.filter(filtrerSuperieurCinq),
    arr => arr.map(additionnerUn)
)
// [5, 9, 13] -> [4*2, 6*2] + 1 -> [9, 13]
```

---

## Niveau Challenge (Algorithmes Complexes)

### Kata 16: Tri à Bulles Optimisé
**Objectif:** Implémenter le tri à bulles avec optimisations.

**Signature de la Fonction:**
```javascript
function triABulles(tableau) {
    // Trier le tableau en place et retourner les statistiques
    // Retourner {tableau: [...], comparaisons: X, echanges: Y}
}
```

**Cas de Test:**
```javascript
triABulles([64, 34, 25, 12, 22, 11, 90])
// {
//   tableau: [11, 12, 22, 25, 34, 64, 90],
//   comparaisons: 21,
//   echanges: 12
// }
```

---

### Kata 17: Recherche de Motifs
**Objectif:** Trouver tous les indices où un motif apparaît dans un texte.

**Signature de la Fonction:**
```javascript
function rechercherMotif(texte, motif) {
    // Retourner un tableau des indices de début
}
```

**Cas de Test:**
```javascript
rechercherMotif("ababcababa", "aba") // [0, 2, 5, 7]
rechercherMotif("hello world", "lo") // [3, 9]
rechercherMotif("aaaaaa", "aa") // [0, 1, 2, 3, 4]
rechercherMotif("test", "xyz") // []
```

---

### Kata 18: Générateur de Labyrinthe
**Objectif:** Générer un labyrinthe aléatoire et trouver un chemin.

**Signature de la Fonction:**
```javascript
function genererLabyrinthe(largeur, hauteur) {
    // Générer un labyrinthe avec un chemin de l'entrée à la sortie
    // 0 = passage, 1 = mur
}

function resoudreLabyrinthe(labyrinthe, debut, fin) {
    // Trouver un chemin du début à la fin
    // Retourner le chemin ou null si impossible
}
```

**Cas de Test:**
```javascript
const labyrinthe = genererLabyrinthe(5, 5);
const chemin = resoudreLabyrinthe(labyrinthe, [0, 0], [4, 4]);
// Retourne un tableau de coordonnées représentant le chemin
```

---

### Kata 19: Analyseur de Fréquence
**Objectif:** Analyser la fréquence des mots dans un texte.

**Signature de la Fonction:**
```javascript
function analyserFrequence(texte, options = {}) {
    // Options: ignoreCase, ignorePunctuation, minLength
    // Retourner un objet avec statistiques complètes
}
```

**Cas de Test:**
```javascript
analyserFrequence("Hello world! Hello universe!", {
    ignoreCase: true,
    ignorePunctuation: true
})
// {
//   frequences: {hello: 2, world: 1, universe: 1},
//   motPlusFrequent: "hello",
//   nombreMotsUniques: 3,
//   nombreMotsTotal: 4
// }
```

---

### Kata 20: Simulateur de Trafic
**Objectif:** Simuler un système de feux de circulation sur plusieurs intersections.

**Exigences:**
- Gérer plusieurs intersections
- Optimiser les temps de cycle
- Calculer les statistiques de trafic

**Signature de la Fonction:**
```javascript
function simulerTrafic(intersections, dureeSimulation) {
    // Simuler le trafic pendant la durée spécifiée
    // Retourner les statistiques de performance
}
```

**Cas de Test:**
```javascript
const intersections = [
    {id: 1, cycleDuree: 60, traficNiveau: "élevé"},
    {id: 2, cycleDuree: 45, traficNiveau: "moyen"},
    {id: 3, cycleDuree: 30, traficNiveau: "faible"}
];

simulerTrafic(intersections, 3600) // Simuler 1 heure
// {
//   tempsAttenteMoyen: 45.2,
//   nombreVehicules: 1250,
//   efficacite: 0.85,
//   gouletsEtranglement: [1]
// }
```

---

## Conseils de Pratique

### Pour les Débutants
1. **Maîtrisez la syntaxe** : for, while, do-while
2. **Comprenez les conditions** : quand s'arrêter, quand continuer
3. **Évitez les boucles infinies** : toujours incrémenter/décrémenter
4. **Testez avec de petites valeurs** : 0, 1, 2, 3

### Pour les Intermédiaires  
1. **Pratiquez break et continue** : contrôle de flux avancé
2. **Explorez les boucles imbriquées** : matrices, motifs
3. **Utilisez les méthodes de tableau** : map, filter, reduce
4. **Optimisez vos boucles** : évitez les calculs répétés

### Pour les Avancés
1. **Analysez la complexité** : Big O notation
2. **Comparez les approches** : itératif vs récursif
3. **Profilez vos performances** : mesurez le temps d'exécution
4. **Étudiez les algorithmes** : tri, recherche, graphes

### Stratégies de Débogage
1. **Ajoutez des logs** : console.log dans les boucles
2. **Vérifiez les conditions** : limites et cas spéciaux
3. **Testez étape par étape** : une itération à la fois
4. **Utilisez le débogueur** : points d'arrêt et inspection

### Parcours d'Apprentissage Recommandé
- **Semaine 1** : Katas 1-4 (Boucles de base)
- **Semaine 2** : Katas 5-8 (Conditions et contrôle)
- **Semaine 3** : Katas 9-12 (Boucles imbriquées)
- **Semaine 4** : Katas 13-15 (Méthodes de tableau)
- **Semaine 5+** : Katas 16-20 (Algorithmes complexes)