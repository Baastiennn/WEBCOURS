# Test de Positionnement

## Durée Estimée : 45-60 minutes

---

## **PARTIE 1 : FONCTIONS & LOGIQUE**

### Test 1 : Fonction Simple
```javascript
// Écrivez une fonction qui prend un tableau de nombres
// et retourne la moyenne (sans utiliser reduce)
function calculerMoyenne(nombres) {
    // Votre code ici
}

// Test : calculerMoyenne([1, 2, 3, 4, 5]) doit retourner 3
```

### Test 2 : Logique Conditionnelle Complexe
```javascript
// Fonction qui détermine le prix d'un ticket de cinéma :
// - Enfant (<12) : 8€
// - Étudiant (12-25) : 10€
// - Adulte (26-64) : 15€
// - Senior (65+) : 12€
// + Réduction de 2€ si c'est mardi
function prixTicket(age, estMardi) {
    // Votre code ici
}
```

### Test 3 : Récursion Simple
```javascript
// Écrivez une fonction récursive pour calculer 2^n
function puissance2(n) {
    // Votre code ici
}
```

**🚨 Indicateurs de lacunes :**
- ❌ Difficulté avec les boucles (Test 1)
- ❌ Logique conditionnelle confuse (Test 2)
- ❌ Incompréhension de la récursion (Test 3)

---

## 📋 **PARTIE 2 : STRUCTURES DE DONNÉES**

### Test 4 : Manipulation d'Objets
```javascript
// Créez un objet "étudiant" avec nom, âge, notes (tableau)
// Ajoutez une méthode calculerMoyenne() à cet objet
const etudiant = {
    // Votre code ici
};
```

### Test 5 : Arrays Avancés
```javascript
// Triez ce tableau d'objets par âge (sans sort)
const personnes = [
    {nom: "Alice", age: 25},
    {nom: "Bob", age: 30},
    {nom: "Charlie", age: 20}
];

function trierParAge(tableau) {
    // Votre code ici - algorithme de tri manuel
}
```

**🚨 Indicateurs de lacunes :**
- ❌ Confusion entre propriétés et méthodes
- ❌ Difficulté avec les algorithmes de base

---

## 📋 **PARTIE 3 : INTÉGRATION FRONT/BACK**

### Test 6 : Communication API Simple
```javascript
// Simulez un appel API qui récupère une liste d'utilisateurs
// et les affiche dans une liste HTML
async function afficherUtilisateurs() {
    // Simulation API :
    const donnees = [{nom: "Jean", email: "jean@test.com"}];

    // Votre code ici :
    // 1. Créer les éléments HTML
    // 2. Les ajouter au DOM
    // 3. Gérer les erreurs potentielles
}
```

### Test 7 : Logique Métier
```javascript
// Système de panier e-commerce :
// Calculez le total avec TVA (20%) et frais de port
// (gratuit si total > 50€, sinon 5€)
class Panier {
    constructor() {
        this.articles = [];
    }

    // Ajoutez les méthodes nécessaires
}
```

**🚨 Indicateurs de lacunes :**
- ❌ Gestion d'erreurs inexistante
- ❌ Confusion entre logique métier et présentation
- ❌ Difficultés avec l'asynchrone

---

## 🎯 **GRILLE D'ÉVALUATION**

### Niveau 1 : **Débutant Complet** (Score < 30%)
- [ ] Syntaxe JavaScript incertaine
- [ ] Logique conditionnelle basique difficile
- [ ] Pas de compréhension des fonctions

**→ Recommandation : Reprendre depuis Variables**

### Niveau 2 : **Bases Fragiles** (Score 30-60%)
- [ ] Syntaxe OK mais logique complexe difficile
- [ ] Récursion incomprise
- [ ] Structures de données basiques

**→ Recommandation : Focus sur Functions + Recursion + Data-Structures**

### Niveau 3 : **Intermédiaire avec Lacunes** (Score 60-80%)
- [ ] Bases solides mais intégration difficile
- [ ] Gestion d'erreurs inexistante
- [ ] Organisation du code à améliorer

**→ Recommandation : Error-Handling + OOP + Architecture**

### Niveau 4 : **Prêt pour l'Avancé** (Score 80%+)
- [ ] Logique solide
- [ ] Code bien organisé
- [ ] Comprend l'asynchrone

**→ Recommandation : Modules avancés + Frameworks**

---

## 📊 **ANALYSE COMPLÉMENTAIRE**

### Questions de Discussion

1. **"Comment ferais-tu pour debugger une fonction qui ne donne pas le bon résultat ?"**
   - ✅ Mentionne console.log, breakpoints, tests unitaires
   - ❌ "Je refais tout" ou "je demande de l'aide"

2. **"Explique la différence entre let et var"**
   - ✅ Scope, hoisting, temporal dead zone
   - ❌ "Pas de différence" ou explications confuses

3. **"Comment organiserais-tu le code d'une application de todo list ?"**
   - ✅ Séparation des responsabilités, modules, classes
   - ❌ "Tout dans un fichier" ou pas d'idées

---

## 🎯 **RÉSULTAT ATTENDU**

À la fin de cette évaluation, vous devriez avoir :

1. **Score global** sur les 7 tests pratiques
2. **Profil de lacunes** spécifiques identifiées
3. **Plan de remédiation** personnalisé
4. **Estimation du temps** nécessaire pour solidifier les bases

---

## 📝 **TEMPLATE DE COMPTE-RENDU**

```
ÉVALUATION DIAGNOSTIQUE - [Nom de l'étudiante]
Date : ___________

SCORES PAR SECTION :
□ Fonctions & Logique : ___/21 points
□ Structures de Données : ___/14 points
□ Intégration Front/Back : ___/14 points
□ Discussion : ___/15 points

TOTAL : ___/64 points (___%)

LACUNES IDENTIFIÉES :
□ Récursion
□ Gestion d'erreurs
□ Manipulation DOM
□ Logique algorithmique
□ Organisation du code
□ Autre : _____________

NIVEAU DÉTERMINÉ : ________________

PLAN RECOMMANDÉ :
□ Reprendre depuis : ___________
□ Focus prioritaire sur : ___________
□ Durée estimée : ___________
□ Méthode d'accompagnement : ___________
```

---

*Cette évaluation doit être faite dans un environnement bienveillant, en expliquant que l'objectif est d'identifier les points à renforcer pour maximiser les progrès.*