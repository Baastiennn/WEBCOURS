# Boucles - Notes

## Que sont les Boucles ?

Les boucles sont des structures de contrôle qui permettent d'exécuter répétitivement un bloc de code tant qu'une condition spécifique est vraie. Elles sont essentielles pour automatiser les tâches répétitives et traiter des collections de données.

## Concepts Fondamentaux

### Pourquoi Utiliser des Boucles ?
- **Éviter la Répétition** : Réduire le code dupliqué
- **Traitement de Collections** : Parcourir des tableaux, objets, etc.
- **Automatisation** : Répéter des actions jusqu'à une condition
- **Efficacité** : Code plus court et maintenable

### Composants d'une Boucle
1. **Initialisation** : Définir les variables de départ
2. **Condition** : Critère pour continuer ou arrêter la boucle
3. **Itération** : Modification des variables à chaque tour
4. **Corps de Boucle** : Code à exécuter à chaque itération

## Types de Boucles

### 1. Boucle For Classique

La plus utilisée pour un nombre déterminé d'itérations.

```javascript
for (initialisation; condition; incrémentation) {
    // Code à répéter
}
```

**Exemple :**
```javascript
for (let i = 0; i < 5; i++) {
    console.log("Itération : " + i);
}
// Affiche : 0, 1, 2, 3, 4
```

**Cas d'Usage :**
- Compter de 1 à N
- Parcourir un tableau avec indices
- Répéter une action un nombre fixe de fois

### 2. Boucle While

Continue tant que la condition est vraie.

```javascript
while (condition) {
    // Code à répéter
    // Modifier la condition pour éviter la boucle infinie
}
```

**Exemple :**
```javascript
let compteur = 0;
while (compteur < 3) {
    console.log("Compteur : " + compteur);
    compteur++;
}
```

**Cas d'Usage :**
- Nombre d'itérations inconnu à l'avance
- Attendre qu'une condition soit remplie
- Traitement basé sur des données dynamiques

### 3. Boucle Do...While

Exécute le code au moins une fois, puis vérifie la condition.

```javascript
do {
    // Code à répéter (exécuté au moins une fois)
} while (condition);
```

**Exemple :**
```javascript
let nombre;
do {
    nombre = parseInt(prompt("Entrez un nombre positif :"));
} while (nombre <= 0);
```

**Cas d'Usage :**
- Validation d'entrée utilisateur
- Menus interactifs
- Garantir au moins une exécution

### 4. Boucle For...In

Parcourt les propriétés énumérables d'un objet.

```javascript
for (propriété in objet) {
    // Traiter chaque propriété
}
```

**Exemple :**
```javascript
const personne = {nom: "Alice", âge: 30, ville: "Paris"};
for (let clé in personne) {
    console.log(clé + ": " + personne[clé]);
}
```

**Cas d'Usage :**
- Parcourir les propriétés d'objets
- Traitement dynamique de données
- Inspection d'objets

### 5. Boucle For...Of

Parcourt les valeurs d'objets itérables.

```javascript
for (valeur of itérable) {
    // Traiter chaque valeur
}
```

**Exemple :**
```javascript
const fruits = ["pomme", "banane", "orange"];
for (let fruit of fruits) {
    console.log("Fruit : " + fruit);
}
```

**Cas d'Usage :**
- Parcourir des tableaux, chaînes, Sets, Maps
- Focus sur les valeurs plutôt que les indices
- Syntaxe plus claire et moderne

## Instructions de Contrôle

### Break - Sortir de la Boucle
```javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break; // Sort de la boucle quand i = 5
    }
    console.log(i);
}
// Affiche : 0, 1, 2, 3, 4
```

### Continue - Passer à l'Itération Suivante
```javascript
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue; // Passe l'itération quand i = 2
    }
    console.log(i);
}
// Affiche : 0, 1, 3, 4
```

### Étiquettes (Labels)
```javascript
extérieure: for (let i = 0; i < 3; i++) {
    intérieure: for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break extérieure; // Sort de la boucle extérieure
        }
        console.log(i, j);
    }
}
```

## Boucles Imbriquées

### Boucles For Imbriquées
```javascript
// Matrice 3x3
for (let ligne = 0; ligne < 3; ligne++) {
    for (let colonne = 0; colonne < 3; colonne++) {
        console.log(`Position [${ligne}][${colonne}]`);
    }
}
```

### Applications Courantes
- **Tables de Multiplication** : `i * j`
- **Matrices/Grilles** : Parcours 2D
- **Combinaisons** : Tester toutes les paires
- **Algorithmes de Tri** : Bubble sort, selection sort

## Méthodes d'Itération de Tableaux

### forEach()
```javascript
const nombres = [1, 2, 3, 4, 5];
nombres.forEach(function(nombre, index) {
    console.log(`Index ${index}: ${nombre}`);
});
```

### map()
```javascript
const nombres = [1, 2, 3, 4];
const doublés = nombres.map(nombre => nombre * 2);
// [2, 4, 6, 8]
```

### filter()
```javascript
const nombres = [1, 2, 3, 4, 5, 6];
const pairs = nombres.filter(nombre => nombre % 2 === 0);
// [2, 4, 6]
```

### reduce()
```javascript
const nombres = [1, 2, 3, 4];
const somme = nombres.reduce((total, nombre) => total + nombre, 0);
// 10
```

### find() et findIndex()
```javascript
const utilisateurs = [{nom: "Alice", âge: 25}, {nom: "Bob", âge: 30}];
const utilisateur = utilisateurs.find(u => u.âge > 25);
const index = utilisateurs.findIndex(u => u.nom === "Alice");
```

## Performances et Optimisations

### Optimisation des Boucles For
```javascript
// Moins efficace
const tableau = [1, 2, 3, 4, 5];
for (let i = 0; i < tableau.length; i++) {
    // tableau.length est évalué à chaque itération
}

// Plus efficace
const longueur = tableau.length;
for (let i = 0; i < longueur; i++) {
    // Longueur calculée une seule fois
}
```

### Éviter les Boucles Infinies
```javascript
// Dangereuse - boucle infinie
let i = 0;
while (i < 10) {
    console.log(i);
    // Oubli d'incrémenter i
}

// Correcte
let j = 0;
while (j < 10) {
    console.log(j);
    j++; // N'oubliez jamais l'incrémentation
}
```

## Cas d'Usage Avancés

### Parcours d'Objets Complexes
```javascript
const entreprise = {
    nom: "TechCorp",
    employés: [
        {nom: "Alice", département: "IT"},
        {nom: "Bob", département: "RH"}
    ]
};

// Parcourir tous les employés
for (let employé of entreprise.employés) {
    console.log(`${employé.nom} travaille en ${employé.département}`);
}
```

### Traitement de Chaînes
```javascript
const texte = "Bonjour";
for (let caractère of texte) {
    console.log(caractère);
}
// Affiche chaque lettre séparément
```

### Génération de Séquences
```javascript
// Nombres pairs de 0 à 20
for (let i = 0; i <= 20; i += 2) {
    console.log(i);
}

// Compte à rebours
for (let i = 10; i >= 0; i--) {
    console.log(i);
}
```

## Bonnes Pratiques

### 1. Choisir la Bonne Boucle
- **For** : Nombre d'itérations connu
- **While** : Condition complexe ou inconnue
- **For...Of** : Parcourir des valeurs
- **For...In** : Parcourir des propriétés d'objet
- **Méthodes de tableau** : Transformations fonctionnelles

### 2. Nommer les Variables Clairement
```javascript
// Mauvais
for (let i = 0; i < users.length; i++) {
    // Que représente 'i' ?
}

// Bon
for (let utilisateurIndex = 0; utilisateurIndex < utilisateurs.length; utilisateurIndex++) {
    // Clair et explicite
}

// Encore mieux avec for...of
for (let utilisateur of utilisateurs) {
    // Focus sur la valeur, pas l'index
}
```

### 3. Éviter la Modification Pendant l'Itération
```javascript
// Dangereux
const éléments = [1, 2, 3, 4];
for (let i = 0; i < éléments.length; i++) {
    if (éléments[i] === 2) {
        éléments.splice(i, 1); // Modifie le tableau pendant l'itération
    }
}

// Sûr
const éléments = [1, 2, 3, 4];
const élémentsFiltés = éléments.filter(élément => élément !== 2);
```

### 4. Gérer la Performance
```javascript
// Éviter les calculs répétés
const utilisateurs = getUtilisateurs(); // Fonction coûteuse
for (let i = 0; i < utilisateurs.length; i++) {
    // Traitement
}

// Plutôt que
for (let i = 0; i < getUtilisateurs().length; i++) {
    // getUtilisateurs() appelé à chaque itération
}
```

### 5. Utiliser les Méthodes Modernes
```javascript
// Style ancien
const résultats = [];
for (let i = 0; i < données.length; i++) {
    if (données[i].actif) {
        résultats.push(données[i].nom.toUpperCase());
    }
}

// Style moderne et fonctionnel
const résultats = données
    .filter(donnée => donnée.actif)
    .map(donnée => donnée.nom.toUpperCase());
```

## Erreurs Communes

### 1. Boucles Infinies
```javascript
// Erreur : condition jamais fausse
let i = 0;
while (i >= 0) {
    console.log(i);
    i++; // i sera toujours positif
}
```

### 2. Off-by-One Errors
```javascript
// Erreur : accès hors limites
const tableau = [1, 2, 3];
for (let i = 0; i <= tableau.length; i++) {
    console.log(tableau[i]); // undefined à la dernière itération
}

// Correct
for (let i = 0; i < tableau.length; i++) {
    console.log(tableau[i]);
}
```

### 3. Confusion entre For...In et For...Of
```javascript
const tableau = ['a', 'b', 'c'];

// For...in donne les indices
for (let index in tableau) {
    console.log(index); // "0", "1", "2" (chaînes !)
}

// For...of donne les valeurs
for (let valeur of tableau) {
    console.log(valeur); // "a", "b", "c"
}
```

## Applications du Monde Réel

- **Interface Utilisateur** : Affichage de listes dynamiques
- **Traitement de Données** : Analyse et transformation de datasets
- **Jeux** : Boucles de jeu, animations
- **Algorithmes** : Tri, recherche, calculs mathématiques
- **Validation** : Vérification de formulaires
- **APIs** : Traitement de réponses JSON
- **Files d'Attente** : Traitement séquentiel de tâches