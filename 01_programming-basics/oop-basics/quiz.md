# Programmation Orientée Objet - Quiz

## Questions à Choix Multiples

### 1. Quelle est la syntaxe correcte pour déclarer une classe en JavaScript ?
a) `class MyClass() { }`
b) `class MyClass { }`
c) `function class MyClass { }`
d) `new class MyClass { }`

**Réponse: b) `class MyClass { }`**

### 2. Que fait le mot-clé `constructor` dans une classe ?
a) Il détruit les instances de la classe
b) Il initialise les propriétés lors de la création d'un objet
c) Il définit des méthodes statiques
d) Il hérite d'une autre classe

**Réponse: b) Il initialise les propriétés lors de la création d'un objet**

### 3. Que va afficher ce code ?
```javascript
class Test {
    constructor(valeur) {
        this.valeur = valeur;
    }

    afficher() {
        console.log(this.valeur);
    }
}

const obj = new Test(42);
const methode = obj.afficher;
methode();
```
a) 42
b) undefined
c) Une erreur
d) null

**Réponse: b) undefined** (le contexte `this` est perdu)

### 4. Comment définit-on une propriété privée en JavaScript moderne ?
a) Avec le préfixe `_`
b) Avec le préfixe `#`
c) Avec le mot-clé `private`
d) Les propriétés sont toujours publiques

**Réponse: b) Avec le préfixe `#`**

### 5. Quelle différence entre une méthode d'instance et une méthode statique ?
a) Les méthodes statiques sont plus rapides
b) Les méthodes d'instance appartiennent à la classe, pas aux objets
c) Les méthodes statiques appartiennent à la classe, pas aux instances
d) Il n'y a aucune différence

**Réponse: c) Les méthodes statiques appartiennent à la classe, pas aux instances**

## Questions Vrai/Faux

### 6. Une classe peut avoir plusieurs constructeurs en JavaScript.
**Réponse: Faux** (JavaScript ne supporte qu'un seul constructeur par classe)

### 7. Le mot-clé `super` peut être utilisé pour appeler le constructeur parent.
**Réponse: Vrai**

### 8. Les getters et setters permettent de contrôler l'accès aux propriétés.
**Réponse: Vrai**

### 9. L'héritage multiple (hériter de plusieurs classes) est possible en JavaScript.
**Réponse: Faux** (JavaScript ne supporte que l'héritage simple)

### 10. Les propriétés statiques sont partagées entre toutes les instances d'une classe.
**Réponse: Vrai**

## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
class Compteur {
    static total = 0;

    constructor() {
        Compteur.total++;
        this.id = Compteur.total;
    }
}

const c1 = new Compteur();
const c2 = new Compteur();
console.log(c1.id, c2.id, Compteur.total);
```
**Réponse: 1 2 2** (chaque instance incrémente le compteur statique)

### 12. Quel est le problème avec ce code ?
```javascript
class Animal {
    constructor(nom) {
        this.nom = nom;
    }
}

class Chien extends Animal {
    constructor(nom, race) {
        this.race = race;
        super(nom);
    }
}
```
**Réponse:** `super()` doit être appelé **avant** toute assignation à `this` dans le constructeur enfant.

### 13. Comment corriger ce getter/setter ?
```javascript
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    get fahrenheit() {
        return this.celsius * 9/5 + 32;
    }

    set fahrenheit(f) {
        this.celsius = f - 32 * 5/9;
    }
}
```
**Réponse:**
```javascript
set fahrenheit(f) {
    this.celsius = (f - 32) * 5/9; // Parenthèses pour la priorité
}
```

### 14. Que retourne cette méthode statique ?
```javascript
class Utilitaires {
    static doubler(x) {
        return this.x * 2;
    }
}

console.log(Utilitaires.doubler(5));
```
**Réponse: NaN** (`this.x` est undefined dans une méthode statique, should be `x * 2`)

## Questions Pratiques

### 15. Implémentez un getter qui calcule l'âge à partir de la date de naissance :
```javascript
class Personne {
    constructor(nom, dateNaissance) {
        this.nom = nom;
        this.dateNaissance = dateNaissance;
    }

    get age() {
        // Votre code
    }
}
```
**Réponse:**
```javascript
get age() {
    const aujourd hui = new Date();
    const naissance = new Date(this.dateNaissance);
    return Math.floor((aujourd hui - naissance) / (1000 * 60 * 60 * 24 * 365.25));
}
```

### 16. Créez une méthode statique pour créer une instance avec des valeurs par défaut :
```javascript
class Produit {
    constructor(nom, prix, stock) {
        this.nom = nom;
        this.prix = prix;
        this.stock = stock;
    }

    static creerParDefaut(nom) {
        // Votre code (prix: 0, stock: 0)
    }
}
```
**Réponse:**
```javascript
static creerParDefaut(nom) {
    return new Produit(nom, 0, 0);
}
```

### 17. Implémentez une propriété privée avec validation :
```javascript
class CompteBancaire {
    // Votre code pour solde privé

    constructor(soldeInitial) {
        // Valider et assigner le solde
    }

    deposer(montant) {
        // Valider et ajouter au solde
    }

    get solde() {
        // Retourner le solde
    }
}
```
**Réponse:**
```javascript
class CompteBancaire {
    #solde;

    constructor(soldeInitial) {
        if (soldeInitial < 0) throw new Error("Solde initial ne peut pas être négatif");
        this.#solde = soldeInitial;
    }

    deposer(montant) {
        if (montant <= 0) throw new Error("Montant doit être positif");
        this.#solde += montant;
    }

    get solde() {
        return this.#solde;
    }
}
```

### 18. Implémentez l'héritage avec super :
```javascript
class Vehicule {
    constructor(marque, annee) {
        this.marque = marque;
        this.annee = annee;
    }

    demarrer() {
        return `${this.marque} démarre`;
    }
}

class Voiture extends Vehicule {
    constructor(marque, annee, nombrePortes) {
        // Votre code
    }

    demarrer() {
        // Appeler la méthode parent + ajouter spécificité voiture
    }
}
```
**Réponse:**
```javascript
class Voiture extends Vehicule {
    constructor(marque, annee, nombrePortes) {
        super(marque, annee);
        this.nombrePortes = nombrePortes;
    }

    demarrer() {
        return super.demarrer() + ` avec ${this.nombrePortes} portes`;
    }
}
```

## Questions sur les Patterns

### 19. Qu'est-ce que le pattern Singleton ?
a) Une classe qui peut avoir plusieurs instances
b) Une classe qui garantit une seule instance
c) Une classe qui hérite de plusieurs parents
d) Une classe abstraite

**Réponse: b) Une classe qui garantit une seule instance**

### 20. Quelle est la différence principale entre héritage et composition ?
**Réponse:**
- **Héritage** : "est-un" - une classe étend une autre (ex: Chien extends Animal)
- **Composition** : "a-un" - une classe contient des instances d'autres classes (ex: Voiture a un Moteur)

### 21. Qu'est-ce que l'encapsulation en POO ?
**Réponse:** L'encapsulation consiste à cacher les détails internes d'un objet et à contrôler l'accès aux données via des méthodes publiques, en utilisant des propriétés privées.

### 22. Comment implémenter une Factory en JavaScript ?
**Réponse:**
```javascript
class AnimalFactory {
    static creer(type, nom) {
        switch(type) {
            case 'chien': return new Chien(nom);
            case 'chat': return new Chat(nom);
            default: throw new Error('Type animal inconnu');
        }
    }
}
```

## Questions Avancées

### 23. Que fait ce code avec les propriétés privées ?
```javascript
class Test {
    #valeur = 42;

    static acceder(instance) {
        return instance.#valeur;
    }
}

const t = new Test();
console.log(Test.acceder(t));
```
**Réponse:** Affiche 42. Les méthodes statiques peuvent accéder aux propriétés privées des instances de la même classe.

### 24. Comment éviter la perte du contexte `this` dans les callbacks ?
**Réponse:**
- Utiliser `bind()`: `callback.bind(this)`
- Utiliser des arrow functions: `() => this.methode()`
- Stocker `this` dans une variable: `const self = this`

### 25. Quelle est la meilleure pratique pour nommer les classes et méthodes ?
**Réponse:**
- **Classes** : PascalCase (`MaClasse`)
- **Méthodes et propriétés** : camelCase (`maMethode`)
- **Propriétés privées** : `#` prefix (`#maPropriete`)
- **Constantes** : UPPER_SNAKE_CASE (`MA_CONSTANTE`)

### 26. Comment implémenter le chaînage de méthodes ?
**Réponse:**
```javascript
class Calculator {
    constructor(value = 0) {
        this.value = value;
    }

    add(x) {
        this.value += x;
        return this; // Retourner l'instance courante
    }

    multiply(x) {
        this.value *= x;
        return this;
    }
}

// Usage: calc.add(5).multiply(2).add(3)
```

### 27. Qu'est-ce qui différencie une classe abstraite d'une interface ?
**Réponse:** JavaScript n'a pas de classes abstraites ou d'interfaces natives, mais on peut :
- Simuler une classe abstraite en lançant des erreurs dans le constructeur
- Utiliser des conventions de nommage et documentation pour les "interfaces"
- Utiliser TypeScript pour un typage plus strict

### 28. Comment gérer l'héritage multiple en JavaScript ?
**Réponse:** JavaScript ne supporte pas l'héritage multiple natif, mais on peut utiliser :
- **Mixins** : Copier des propriétés de plusieurs objets
- **Composition** : Combiner plusieurs objets dans une classe
- **Proxy** : Déléguer vers plusieurs objets

### 29. Quelle est la différence entre `Object.create()` et `new` ?
**Réponse:**
- `new Constructor()` : Crée une instance avec le prototype du constructeur
- `Object.create(prototype)` : Crée un objet avec le prototype spécifié directement

### 30. Comment déboguer efficacement du code orienté objet ?
**Réponse:**
- `console.dir(object)` : Voir la structure complète
- `object instanceof Class` : Vérifier le type
- `Object.getPrototypeOf(object)` : Examiner la chaîne de prototypes
- Debugger dans les méthodes pour examiner `this`

## Notation
- **27-30 correct**: Maîtrise experte de la POO JavaScript
- **24-26 correct**: Excellente compréhension, prêt pour projets complexes
- **20-23 correct**: Bonne maîtrise, continuer la pratique des patterns
- **16-19 correct**: Bases solides, approfondir l'héritage et l'encapsulation
- **12-15 correct**: Compréhension correcte, se concentrer sur les classes
- **Moins de 12**: Réviser les concepts fondamentaux et pratiquer les exemples de base