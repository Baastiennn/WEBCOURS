# Programmation Orientée Objet - Notes

## Qu'est-ce que la Programmation Orientée Objet (POO) ?

La Programmation Orientée Objet est un paradigme de programmation qui organise le code autour d'objets plutôt que de fonctions et de logique. Elle permet de modéliser des concepts du monde réel et de créer du code plus organisé, réutilisable et maintenable.

> 💡 **Liens avec d'autres modules :**
> - [**Variables ←**](../variables/) Les propriétés d'objets sont des variables encapsulées
> - [**Functions ←**](../functions/) Les méthodes de classe sont des fonctions liées à des objets
> - [**Error-handling →**](../error-handling/) Les classes doivent gérer les erreurs et valider les données
> - [**Modules-imports →**](../modules-imports/) Les classes sont souvent organisées en modules séparés

## Concepts Fondamentaux

### 1. Objet
Un objet est une entité qui combine données (propriétés) et comportements (méthodes). C'est une instance concrète d'une classe.

```javascript
// Objet littéral simple
const personne = {
    nom: "Alice",
    age: 25,
    saluer() {
        return `Bonjour, je suis ${this.nom}`;
    }
};

console.log(personne.saluer()); // "Bonjour, je suis Alice"
```

### 2. Classe
Une classe est un modèle ou un plan pour créer des objets. Elle définit les propriétés et méthodes que les objets de ce type auront.

```javascript
class Personne {
    constructor(nom, age) {
        this.nom = nom;
        this.age = age;
    }

    saluer() {
        return `Bonjour, je suis ${this.nom}`;
    }

    vieillir() {
        this.age++;
    }
}

// Création d'instances
const alice = new Personne("Alice", 25);
const bob = new Personne("Bob", 30);
```

## Classes en JavaScript (ES6+)

### Syntaxe de Base
```javascript
class NomDeLaClasse {
    constructor(parametres) {
        // Initialisation des propriétés
        this.propriete = valeur;
    }

    methode() {
        // Code de la méthode
    }
}
```

### Constructeur
Le constructeur est une méthode spéciale qui s'exécute automatiquement lors de la création d'un nouvel objet.

```javascript
class Voiture {
    constructor(marque, modele, annee) {
        this.marque = marque;
        this.modele = modele;
        this.annee = annee;
        this.vitesse = 0; // Valeur par défaut
    }

    demarrer() {
        console.log(`${this.marque} ${this.modele} démarre`);
    }

    accelerer(vitesse) {
        this.vitesse += vitesse;
        console.log(`Vitesse actuelle: ${this.vitesse} km/h`);
    }

    freiner() {
        this.vitesse = 0;
        console.log("La voiture s'arrête");
    }
}

const maVoiture = new Voiture("Toyota", "Corolla", 2023);
maVoiture.demarrer(); // "Toyota Corolla démarre"
maVoiture.accelerer(50); // "Vitesse actuelle: 50 km/h"
```

## Le Mot-clé `this`

### Qu'est-ce que `this` ?
`this` fait référence à l'objet courant dans lequel le code s'exécute. Son comportement dépend du contexte d'appel.

### `this` dans les Classes
```javascript
class Compteur {
    constructor(valeurInitiale = 0) {
        this.valeur = valeurInitiale;
    }

    incrementer() {
        this.valeur++; // this fait référence à l'instance courante
        return this; // Permet le chaînage de méthodes
    }

    decrementer() {
        this.valeur--;
        return this;
    }

    afficher() {
        console.log(`Valeur: ${this.valeur}`);
        return this;
    }
}

const compteur = new Compteur(5);
compteur.incrementer().incrementer().afficher(); // Valeur: 7
```

### Problèmes Courants avec `this`
```javascript
class Utilisateur {
    constructor(nom) {
        this.nom = nom;
    }

    direBonjour() {
        console.log(`Bonjour, je suis ${this.nom}`);
    }
}

const user = new Utilisateur("Marie");

// ✅ Fonctionne
user.direBonjour(); // "Bonjour, je suis Marie"

// ❌ Problème : this est perdu
const methode = user.direBonjour;
methode(); // Erreur ou comportement inattendu

// ✅ Solutions
// 1. bind()
const methodeBindee = user.direBonjour.bind(user);
methodeBindee(); // "Bonjour, je suis Marie"

// 2. Arrow function dans la classe
class UtilisateurAmeliore {
    constructor(nom) {
        this.nom = nom;
    }

    direBonjour = () => {
        console.log(`Bonjour, je suis ${this.nom}`);
    }
}
```

## Héritage avec `extends`

### Concept de Base
L'héritage permet à une classe de hériter des propriétés et méthodes d'une autre classe.

```javascript
class Animal {
    constructor(nom, type) {
        this.nom = nom;
        this.type = type;
    }

    manger() {
        console.log(`${this.nom} mange`);
    }

    dormir() {
        console.log(`${this.nom} dort`);
    }
}

class Chien extends Animal {
    constructor(nom, race) {
        super(nom, "chien"); // Appel du constructeur parent
        this.race = race;
    }

    aboyer() {
        console.log(`${this.nom} aboie: Woof!`);
    }

    // Redéfinition (override) d'une méthode
    manger() {
        console.log(`${this.nom} mange ses croquettes`);
    }
}

const monChien = new Chien("Rex", "Labrador");
monChien.manger(); // "Rex mange ses croquettes"
monChien.aboyer(); // "Rex aboie: Woof!"
monChien.dormir(); // "Rex dort" (hérité de Animal)
```

### Le Mot-clé `super`
```javascript
class Employe {
    constructor(nom, salaire) {
        this.nom = nom;
        this.salaire = salaire;
    }

    travailler() {
        console.log(`${this.nom} travaille`);
    }

    obtenirSalaire() {
        return this.salaire;
    }
}

class Developpeur extends Employe {
    constructor(nom, salaire, langage) {
        super(nom, salaire); // Appel constructeur parent
        this.langage = langage;
    }

    coder() {
        console.log(`${this.nom} code en ${this.langage}`);
    }

    // Extension d'une méthode parent
    travailler() {
        super.travailler(); // Appel méthode parent
        this.coder();
    }
}

const dev = new Developpeur("Alice", 60000, "JavaScript");
dev.travailler();
// "Alice travaille"
// "Alice code en JavaScript"
```

## Encapsulation et Propriétés Privées

### Propriétés Privées (ES2022)
```javascript
class CompteBancaire {
    // Propriété privée (préfixe #)
    #solde;
    #numeroCompte;

    constructor(numeroCompte, soldeInitial = 0) {
        this.#numeroCompte = numeroCompte;
        this.#solde = soldeInitial;
        this.titulaire = null; // Propriété publique
    }

    // Méthode privée
    #validerMontant(montant) {
        return montant > 0 && typeof montant === 'number';
    }

    deposer(montant) {
        if (this.#validerMontant(montant)) {
            this.#solde += montant;
            console.log(`Dépôt de ${montant}€. Nouveau solde: ${this.#solde}€`);
        } else {
            console.log("Montant invalide");
        }
    }

    retirer(montant) {
        if (this.#validerMontant(montant) && montant <= this.#solde) {
            this.#solde -= montant;
            console.log(`Retrait de ${montant}€. Nouveau solde: ${this.#solde}€`);
        } else {
            console.log("Retrait impossible");
        }
    }

    // Getter pour accéder au solde (lecture seule)
    get solde() {
        return this.#solde;
    }

    // Getter pour le numéro de compte
    get numeroCompte() {
        return this.#numeroCompte;
    }
}

const compte = new CompteBancaire("FR123456789", 1000);
console.log(compte.solde); // 1000
compte.deposer(500); // "Dépôt de 500€. Nouveau solde: 1500€"

// ❌ Impossible d'accéder directement
// console.log(compte.#solde); // SyntaxError
```

### Getters et Setters
```javascript
class Temperature {
    constructor(celsius = 0) {
        this._celsius = celsius; // Convention: _ pour "privé"
    }

    // Getter
    get celsius() {
        return this._celsius;
    }

    // Setter avec validation
    set celsius(valeur) {
        if (valeur < -273.15) {
            throw new Error("Température impossible (en dessous du zéro absolu)");
        }
        this._celsius = valeur;
    }

    get fahrenheit() {
        return (this._celsius * 9/5) + 32;
    }

    set fahrenheit(valeur) {
        this.celsius = (valeur - 32) * 5/9;
    }

    get kelvin() {
        return this._celsius + 273.15;
    }
}

const temp = new Temperature(25);
console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // 77
console.log(temp.kelvin); // 298.15

temp.fahrenheit = 86;
console.log(temp.celsius); // 30
```

## Méthodes Statiques

### Qu'est-ce qu'une Méthode Statique ?
Les méthodes statiques appartiennent à la classe elle-même, pas aux instances.

```javascript
class Utilitaires {
    static calculerDistance(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static genererId() {
        return Math.random().toString(36).substr(2, 9);
    }

    static formaterDate(date) {
        return date.toLocaleDateString('fr-FR');
    }
}

// Appel direct sur la classe
const distance = Utilitaires.calculerDistance({x: 0, y: 0}, {x: 3, y: 4});
console.log(distance); // 5

const id = Utilitaires.genererId();
console.log(id); // ex: "kd8j3k2l1"
```

### Combinaison Instance + Statique
```javascript
class Utilisateur {
    static #compteurUtilisateurs = 0;
    static #utilisateurs = [];

    constructor(nom, email) {
        this.id = ++Utilisateur.#compteurUtilisateurs;
        this.nom = nom;
        this.email = email;
        this.dateCreation = new Date();

        Utilisateur.#utilisateurs.push(this);
    }

    // Méthode d'instance
    obtenirAge() {
        return Math.floor((Date.now() - this.dateCreation) / 1000);
    }

    // Méthodes statiques
    static obtenirNombreUtilisateurs() {
        return Utilisateur.#compteurUtilisateurs;
    }

    static obtenirTousLesUtilisateurs() {
        return [...Utilisateur.#utilisateurs]; // Copie pour protection
    }

    static trouverParId(id) {
        return Utilisateur.#utilisateurs.find(user => user.id === id);
    }
}

const alice = new Utilisateur("Alice", "alice@example.com");
const bob = new Utilisateur("Bob", "bob@example.com");

console.log(Utilisateur.obtenirNombreUtilisateurs()); // 2
console.log(Utilisateur.trouverParId(1)); // Alice
```

## Bonnes Pratiques POO

### 1. Nommage
```javascript
// ✅ Bonnes pratiques
class UtilisateurPremium {  // PascalCase pour les classes
    constructor(nom) {
        this.nom = nom;        // camelCase pour propriétés
        this._statut = 'actif'; // _ pour propriétés "privées"
    }

    obtenirStatut() {         // camelCase pour méthodes
        return this._statut;
    }

    static creerVIP(nom) {    // camelCase pour méthodes statiques
        const user = new UtilisateurPremium(nom);
        user._statut = 'VIP';
        return user;
    }
}
```

### 2. Single Responsibility Principle
```javascript
// ✅ Chaque classe a une responsabilité claire
class Email {
    constructor(destinataire, sujet, corps) {
        this.destinataire = destinataire;
        this.sujet = sujet;
        this.corps = corps;
    }

    valider() {
        return this.destinataire.includes('@') && this.sujet.length > 0;
    }
}

class ServiceEmail {
    static envoyer(email) {
        if (email.valider()) {
            console.log(`Email envoyé à ${email.destinataire}`);
            return true;
        }
        return false;
    }
}

// Utilisation
const email = new Email("user@example.com", "Bonjour", "Comment allez-vous ?");
ServiceEmail.envoyer(email);
```

### 3. Composition vs Héritage
```javascript
// ✅ Préférer la composition quand possible
class Moteur {
    constructor(puissance) {
        this.puissance = puissance;
    }

    demarrer() {
        console.log(`Moteur de ${this.puissance}cv démarre`);
    }
}

class GPS {
    constructor() {
        this.destination = null;
    }

    naviguerVers(lieu) {
        this.destination = lieu;
        console.log(`Navigation vers ${lieu}`);
    }
}

class VoitureModerne {
    constructor(marque, moteur) {
        this.marque = marque;
        this.moteur = moteur;     // Composition
        this.gps = new GPS();     // Composition
    }

    demarrer() {
        this.moteur.demarrer();
    }

    naviguer(destination) {
        this.gps.naviguerVers(destination);
    }
}

const moteur = new Moteur(150);
const voiture = new VoitureModerne("BMW", moteur);
voiture.demarrer();
voiture.naviguer("Paris");
```

## Applications Pratiques

### Exemple Complet : Système de Gestion de Bibliothèque
```javascript
class Livre {
    constructor(titre, auteur, isbn) {
        this.titre = titre;
        this.auteur = auteur;
        this.isbn = isbn;
        this.estEmprunte = false;
        this.dateEmprunt = null;
    }

    emprunter() {
        if (!this.estEmprunte) {
            this.estEmprunte = true;
            this.dateEmprunt = new Date();
            return true;
        }
        return false;
    }

    retourner() {
        this.estEmprunte = false;
        this.dateEmprunt = null;
    }

    get statutEmprunt() {
        return this.estEmprunte ? `Emprunté le ${this.dateEmprunt.toLocaleDateString()}` : 'Disponible';
    }
}

class Bibliotheque {
    constructor(nom) {
        this.nom = nom;
        this.livres = [];
        this.membres = [];
    }

    ajouterLivre(livre) {
        this.livres.push(livre);
        console.log(`Livre "${livre.titre}" ajouté à la bibliothèque`);
    }

    rechercherLivre(terme) {
        return this.livres.filter(livre =>
            livre.titre.toLowerCase().includes(terme.toLowerCase()) ||
            livre.auteur.toLowerCase().includes(terme.toLowerCase())
        );
    }

    emprunterLivre(isbn, membreId) {
        const livre = this.livres.find(l => l.isbn === isbn);
        const membre = this.membres.find(m => m.id === membreId);

        if (livre && membre && livre.emprunter()) {
            membre.ajouterEmprunt(livre);
            return true;
        }
        return false;
    }
}

class Membre {
    static #prochainId = 1;

    constructor(nom, email) {
        this.id = Membre.#prochainId++;
        this.nom = nom;
        this.email = email;
        this.emprunts = [];
    }

    ajouterEmprunt(livre) {
        this.emprunts.push(livre);
    }

    get nombreEmprunts() {
        return this.emprunts.length;
    }
}

// Utilisation
const bibliotheque = new Bibliotheque("Bibliothèque Centrale");
const livre1 = new Livre("1984", "George Orwell", "978-0-452-28423-4");
const membre1 = new Membre("Alice Dupont", "alice@example.com");

bibliotheque.ajouterLivre(livre1);
bibliotheque.membres.push(membre1);
bibliotheque.emprunterLivre("978-0-452-28423-4", 1);

console.log(livre1.statutEmprunt);
console.log(`${membre1.nom} a emprunté ${membre1.nombreEmprunts} livre(s)`);
```

La Programmation Orientée Objet en JavaScript offre des outils puissants pour organiser et structurer votre code de manière claire et maintenable. Elle permet de modéliser des concepts complexes et de créer des applications robustes et évolutives.