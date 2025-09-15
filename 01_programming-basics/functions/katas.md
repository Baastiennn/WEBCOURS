# Fonctions - Katas

## Niveau Débutant (Fonctions de Base)

### Kata 1 : Calculatrice de Base
**Objectif :** Créer quatre fonctions pour les opérations arithmétiques de base.

**Exigences :**
- Additionner deux nombres
- Soustraire deux nombres
- Multiplier deux nombres
- Diviser deux nombres (gérer la division par zéro)

**Signatures des Fonctions :**
```javascript
function additionner(a, b) {
    // Votre code ici
}

function soustraire(a, b) {
    // Votre code ici
}

function multiplier(a, b) {
    // Votre code ici
}

function diviser(a, b) {
    // Votre code ici
}
```

**Cas de Test :**
```javascript
additionner(5, 3) // 8
soustraire(10, 4) // 6
multiplier(6, 7) // 42
diviser(15, 3) // 5
diviser(10, 0) // "Impossible de diviser par zéro" ou lever une erreur
```

---

### Kata 2 : Convertisseur de Température
**Objectif :** Convertir les températures entre Celsius et Fahrenheit.

**Exigences :**
- Celsius vers Fahrenheit : (C × 9/5) + 32
- Fahrenheit vers Celsius : (F - 32) × 5/9

**Signatures des Fonctions :**
```javascript
function celsiusVersFahrenheit(celsius) {
    // Votre code ici
}

function fahrenheitVersCelsius(fahrenheit) {
    // Votre code ici
}
```

**Cas de Test :**
```javascript
celsiusVersFahrenheit(0) // 32
celsiusVersFahrenheit(100) // 212
fahrenheitVersCelsius(32) // 0
fahrenheitVersCelsius(212) // 100
```

---

### Kata 3 : Utilitaires de Chaînes
**Objectif :** Créer des fonctions utilitaires pour la manipulation de chaînes.

**Signatures des Fonctions :**
```javascript
function capitaliser(str) {
    // Mettre en majuscule la première lettre
}

function inverser(str) {
    // Inverser la chaîne
}

function compterVoyelles(str) {
    // Compter les voyelles (a, e, i, o, u)
}

function estPalindrome(str) {
    // Vérifier si la chaîne se lit de la même façon dans les deux sens
}
```

**Cas de Test :**
```javascript
capitaliser("bonjour") // "Bonjour"
inverser("monde") // "ednom"
compterVoyelles("bonjour") // 3
estPalindrome("kayak") // true
estPalindrome("bonjour") // false
```

---

### Kata 4 : Statistiques de Tableau
**Objectif :** Créer des fonctions pour calculer les statistiques d'un tableau.

**Signatures des Fonctions :**
```javascript
function trouverMax(nombres) {
    // Trouver la valeur maximale
}

function trouverMin(nombres) {
    // Trouver la valeur minimale
}

function calculerMoyenne(nombres) {
    // Calculer la moyenne
}

function calculerSomme(nombres) {
    // Calculer la somme
}
```

**Cas de Test :**
```javascript
trouverMax([1, 5, 3, 9, 2]) // 9
trouverMin([1, 5, 3, 9, 2]) // 1
calculerMoyenne([2, 4, 6]) // 4
calculerSomme([1, 2, 3, 4]) // 10
```

---

## Niveau Intermédiaire (Expressions de Fonction et Paramètres)

### Kata 5 : Usine à Fonctions
**Objectif :** Créer une fonction qui retourne d'autres fonctions.

**Exigences :**
- Créer une usine de multiplicateurs
- Créer une usine d'addition
- Créer une usine de puissance

**Signatures des Fonctions :**
```javascript
function creerMultiplicateur(facteur) {
    // Retourner une fonction qui multiplie par le facteur
}

function creerAdditionnaire(addende) {
    // Retourner une fonction qui ajoute l'addende
}

function creerPuissance(exposant) {
    // Retourner une fonction qui élève à la puissance exposant
}
```

**Cas de Test :**
```javascript
const doubler = creerMultiplicateur(2);
doubler(5) // 10

const ajouterDix = creerAdditionnaire(10);
ajouterDix(7) // 17

const carre = creerPuissance(2);
carre(4) // 16
```

---

### Kata 6 : Transformateurs de Tableau
**Objectif :** Créer des fonctions utilisant les méthodes de tableau (map, filter, reduce).

**Signatures des Fonctions :**
```javascript
function doublerNombres(nombres) {
    // Doubler chaque nombre avec map
}

function filtrerPairs(nombres) {
    // Filtrer les nombres pairs
}

function sommerTableau(nombres) {
    // Sommer avec reduce
}

function trouverMotsLongs(mots, longueurMin) {
    // Trouver les mots plus longs que longueurMin
}
```

**Cas de Test :**
```javascript
doublerNombres([1, 2, 3]) // [2, 4, 6]
filtrerPairs([1, 2, 3, 4, 5, 6]) // [2, 4, 6]
sommerTableau([1, 2, 3, 4]) // 10
trouverMotsLongs(["chat", "éléphant", "chien", "papillon"], 5) // ["éléphant", "papillon"]
```

---

### Kata 7 : Fonctions Callback
**Objectif :** Créer des fonctions qui acceptent et utilisent des fonctions callback.

**Signatures des Fonctions :**
```javascript
function traiterTableau(arr, callback) {
    // Appliquer le callback à chaque élément
}

function executionConditionnelle(condition, callbackSucces, callbackEchec) {
    // Exécuter le callback approprié selon la condition
}

function repeter(fois, callback) {
    // Exécuter le callback le nombre de fois spécifié
}
```

**Cas de Test :**
```javascript
traiterTableau([1, 2, 3], x => x * 2) // [2, 4, 6]
executionConditionnelle(true, () => "Succès", () => "Échec") // "Succès"
repeter(3, () => console.log("Bonjour")) // Affiche "Bonjour" trois fois
```

---

### Kata 8 : Paramètres par Défaut et Rest
**Objectif :** Pratiquer les paramètres par défaut et la syntaxe rest.

**Signatures des Fonctions :**
```javascript
function saluerUtilisateur(nom = "Invité", salutation = "Bonjour") {
    // Retourner une salutation personnalisée
}

function calculerTotal(tauxTaxe = 0.1, ...prix) {
    // Calculer le total avec taxe
}

function trouverMeilleur(critere = "max", ...nombres) {
    // Trouver le max ou min selon le critère
}
```

**Cas de Test :**
```javascript
saluerUtilisateur() // "Bonjour, Invité !"
saluerUtilisateur("Alice") // "Bonjour, Alice !"
calculerTotal(0.08, 10, 20, 30) // 64.8 (60 + 8% de taxe)
trouverMeilleur("max", 5, 2, 9, 1) // 9
trouverMeilleur("min", 5, 2, 9, 1) // 1
```

---

## Niveau Avancé (Fonctions d'Ordre Supérieur et Fermetures)

### Kata 9 : Composition de Fonctions
**Objectif :** Créer une fonction qui compose plusieurs fonctions.

**Signature de Fonction :**
```javascript
function composer(...fonctions) {
    // Retourner une fonction qui applique toutes les fonctions de droite à gauche
}

// Fonctions d'aide pour les tests
const ajouter5 = x => x + 5;
const multiplierPar2 = x => x * 2;
const carre = x => x * x;
```

**Cas de Test :**
```javascript
const composee = composer(carre, multiplierPar2, ajouter5);
composee(3) // ((3 + 5) * 2)² = (8 * 2)² = 16² = 256
```

---

### Kata 10 : Mémorisation
**Objectif :** Créer une fonction de mémorisation pour mettre en cache les résultats.

**Signature de Fonction :**
```javascript
function memoriser(fn) {
    // Retourner une version mémorisée de fn
}

// Test avec une fonction coûteuse
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

**Cas de Test :**
```javascript
const fibMemorise = memoriser(fibonacci);
fibMemorise(40) // Devrait être beaucoup plus rapide lors d'appels répétés
```

---

### Kata 11 : Application Partielle
**Objectif :** Créer une fonction d'application partielle.

**Signature de Fonction :**
```javascript
function partiel(fn, ...argsPredefinis) {
    // Retourner une fonction avec certains arguments prédéfinis
}
```

**Cas de Test :**
```javascript
function multiplier(a, b, c) {
    return a * b * c;
}

const multiplierPar2 = partiel(multiplier, 2);
const multiplierPar2Et3 = partiel(multiplier, 2, 3);

multiplierPar2(5, 10) // 2 * 5 * 10 = 100
multiplierPar2Et3(4) // 2 * 3 * 4 = 24
```

---

### Kata 12 : Fonction Debounce
**Objectif :** Créer une fonction debounce pour limiter les appels de fonction.

**Signature de Fonction :**
```javascript
function debounce(func, delai) {
    // Retourner une version debouncée de func
}
```

**Exemple d'Utilisation :**
```javascript
const logDebounce = debounce(console.log, 300);
logDebounce("Bonjour"); // Ne s'exécutera qu'après 300ms sans nouveaux appels
```

---

## Niveau Expert (Motifs Avancés)

### Kata 13 : Motif Module
**Objectif :** Créer un module utilisant le motif de module révélateur.

**Exigences :**
- Créer un module compteur avec état privé
- Exposer les méthodes : incrementer, decrementer, obtenirValeur, reinitialiser

**Signature de Fonction :**
```javascript
function creerCompteur(valeurInitiale = 0) {
    // Retourner un objet avec des méthodes publiques
}
```

**Cas de Test :**
```javascript
const compteur = creerCompteur(5);
compteur.incrementer() // 6
compteur.decrementer() // 5
compteur.obtenirValeur() // 5
compteur.reinitialiser() // 0
```

---

### Kata 14 : Motif Observateur
**Objectif :** Implémenter un motif observateur simple avec des fonctions.

**Signature de Fonction :**
```javascript
function creerObservable() {
    // Retourner un objet avec les méthodes subscribe, unsubscribe, notify
}
```

**Cas de Test :**
```javascript
const observable = creerObservable();
const observateur1 = donnees => console.log("Observateur 1:", donnees);
const observateur2 = donnees => console.log("Observateur 2:", donnees);

observable.subscribe(observateur1);
observable.subscribe(observateur2);
observable.notify("Bonjour"); // Les deux observateurs reçoivent "Bonjour"
observable.unsubscribe(observateur1);
observable.notify("Monde"); // Seul observateur2 reçoit "Monde"
```

---

### Kata 15 : Curryfication
**Objectif :** Créer une fonction de curryfication qui transforme les fonctions multi-arguments.

**Signature de Fonction :**
```javascript
function curryfier(fn) {
    // Retourner une version curryfiée de fn
}
```

**Cas de Test :**
```javascript
function additionner(a, b, c) {
    return a + b + c;
}

const additionCurryfiee = curryfier(additionner);
additionCurryfiee(1)(2)(3) // 6
additionCurryfiee(1, 2)(3) // 6
additionCurryfiee(1)(2, 3) // 6
```

---

### Kata 16 : Pipeline Fonctionnel
**Objectif :** Créer une fonction pipeline qui chaîne les opérations.

**Signature de Fonction :**
```javascript
function pipeline(...fonctions) {
    // Retourner une fonction qui applique toutes les fonctions de gauche à droite
}
```

**Cas de Test :**
```javascript
const ajouter1 = x => x + 1;
const multiplierPar2 = x => x * 2;
const carre = x => x * x;

const traiter = pipeline(ajouter1, multiplierPar2, carre);
traiter(3) // ((3 + 1) * 2)² = (4 * 2)² = 8² = 64
```

---

### Kata 17 : Wrapper de Fonction Async
**Objectif :** Créer des utilitaires pour travailler avec les opérations asynchrones.

**Signatures de Fonctions :**
```javascript
function promisifier(fn) {
    // Convertir une fonction callback en promesse
}

function mapAsync(tableau, fonctionAsync) {
    // Mapper un tableau avec une fonction async, retourner une promesse
}

function reessayer(fn, tentativesMax = 3) {
    // Réessayer une fonction async en cas d'échec
}
```

**Cas de Test :**
```javascript
// Fonction style callback
function recupererDonnees(callback) {
    setTimeout(() => callback(null, "données"), 100);
}

const recuperationPromisifiee = promisifier(recupererDonnees);
recuperationPromisifiee().then(donnees => console.log(donnees)); // "données"
```

---

## Niveau Challenge (Scénarios Complexes)

### Kata 18 : Calculatrice Intelligente
**Objectif :** Créer une calculatrice avancée avec chaînage de méthodes et mémoire.

**Exigences :**
- Support du chaînage : `calc.additionner(5).multiplier(2).soustraire(3)`
- Fonctions mémoire : stocker, rappeler, effacer
- Historique des opérations

**Signature de Fonction :**
```javascript
function creerCalculatrice(valeurInitiale = 0) {
    // Votre implémentation
}
```

**Cas de Test :**
```javascript
const calc = creerCalculatrice();
calc.additionner(10).multiplier(2).diviser(4).obtenirValeur() // 5
calc.stocker().effacer().additionner(100).multiplier(calc.rappeler()).obtenirValeur() // 500
```

---

### Kata 19 : Système d'Événements
**Objectif :** Créer un système d'événements complet avec des fonctions.

**Exigences :**
- Enregistrer des écouteurs d'événements
- Émettre des événements avec des données
- Écouteurs uniques (s'exécutent une seule fois)
- Supprimer des écouteurs
- Événements génériques

**Signature de Fonction :**
```javascript
function creerSystemeEvenements() {
    // Votre implémentation
}
```

**Cas de Test :**
```javascript
const evenements = creerSystemeEvenements();
const ecouteur = donnees => console.log("Reçu:", donnees);

evenements.on("test", ecouteur);
evenements.emit("test", "Bonjour"); // Affiche : "Reçu: Bonjour"
evenements.off("test", ecouteur);
evenements.emit("test", "Monde"); // Rien n'est affiché
```

---

### Kata 20 : Machine à États Fonctionnelle
**Objectif :** Implémenter une machine à états utilisant des fonctions.

**Exigences :**
- Définir des états et des transitions
- Exécuter des actions lors des changements d'état
- Conditions de garde pour les transitions

**Signature de Fonction :**
```javascript
function creerMachineEtats(etatInitial, transitions) {
    // Votre implémentation
}
```

**Cas de Test :**
```javascript
const machine = creerMachineEtats("inactif", {
    inactif: { demarrer: "en_cours" },
    en_cours: { arreter: "inactif", pause: "en_pause" },
    en_pause: { reprendre: "en_cours", arreter: "inactif" }
});

machine.transition("demarrer") // "en_cours"
machine.transition("pause") // "en_pause"
machine.obtenirEtat() // "en_pause"
```

## Directives de Pratique

1. **Commencer Simple** : Maîtriser les fonctions de base avant de passer aux concepts avancés
2. **Tester Rigoureusement** : Écrire des cas de test complets pour les cas limites
3. **Refactoriser** : Améliorer vos solutions pour la lisibilité et les performances
4. **Expérimenter** : Essayer différentes approches (déclarations vs expressions de fonction)
5. **Déboguer** : Utiliser console.log et les outils de débogage pour comprendre l'exécution
6. **Lire du Code** : Étudier les implémentations de fonctions d'autres personnes
7. **Performance** : Considérer la complexité temporelle et spatiale de vos solutions

## Parcours d'Apprentissage

- **Semaine 1-2** : Fonctions de base (Katas 1-4)
- **Semaine 3-4** : Expressions de fonction et paramètres (Katas 5-8)
- **Semaine 5-6** : Fonctions d'ordre supérieur (Katas 9-12)
- **Semaine 7-8** : Motifs avancés (Katas 13-16)
- **Semaine 9+** : Problèmes de challenge (Katas 17-20)