# Programmation Orientée Objet - Katas

## Niveau Débutant (Classes et Objets de Base)

### Kata 1: Créateur de Personnages
**Objectif:** Créer une classe de base pour représenter un personnage.

**Exigences:**
- Classe `Personnage` avec nom, age, et points de vie
- Méthode `sePresenter()` qui retourne une description
- Méthode `vieillir()` qui incrémente l'âge
- Méthode `subirDegats(montant)` qui réduit les points de vie

**Signature de la Fonction:**
```javascript
class Personnage {
    constructor(nom, age, pointsDeVie = 100) {
        // Votre code ici
    }

    sePresenter() {
        // Retourner "Je suis [nom], j'ai [age] ans et [pointsDeVie] points de vie"
    }

    vieillir() {
        // Incrémenter l'âge de 1
    }

    subirDegats(montant) {
        // Réduire les points de vie (minimum 0)
    }
}
```

**Cas de Test:**
```javascript
const hero = new Personnage("Arthur", 25, 120);
console.log(hero.sePresenter()); // "Je suis Arthur, j'ai 25 ans et 120 points de vie"
hero.vieillir();
hero.subirDegats(30);
console.log(hero.age); // 26
console.log(hero.pointsDeVie); // 90
```

---

### Kata 2: Gestionnaire de Comptes Bancaires
**Objectif:** Implémenter un système de compte bancaire simple avec encapsulation.

**Exigences:**
- Classe `CompteBancaire` avec numéro de compte et solde privé
- Méthodes `deposer()`, `retirer()`, et getter pour le solde
- Validation des montants (positifs, type number)
- Interdiction des retraits supérieurs au solde

**Signature de la Fonction:**
```javascript
class CompteBancaire {
    constructor(numeroCompte, soldeInitial = 0) {
        // Votre code ici (utilisez des propriétés privées avec #)
    }

    deposer(montant) {
        // Valider et ajouter au solde
    }

    retirer(montant) {
        // Valider et retirer du solde si suffisant
    }

    get solde() {
        // Retourner le solde actuel
    }

    get numeroCompte() {
        // Retourner le numéro de compte
    }
}
```

**Cas de Test:**
```javascript
const compte = new CompteBancaire("FR123456789", 1000);
console.log(compte.solde); // 1000
compte.deposer(500);
console.log(compte.solde); // 1500
compte.retirer(200);
console.log(compte.solde); // 1300
compte.retirer(2000); // Ne doit pas fonctionner
console.log(compte.solde); // 1300 (inchangé)
```

---

### Kata 3: Calculatrice à Instances
**Objectif:** Créer une calculatrice qui garde un historique et permet le chaînage.

**Exigences:**
- Classe `Calculatrice` avec valeur courante et historique
- Méthodes `ajouter()`, `soustraire()`, `multiplier()`, `diviser()`
- Méthodes chainables (retournent `this`)
- Méthode `obtenirHistorique()` et `reinitialiser()`

**Signature de la Fonction:**
```javascript
class Calculatrice {
    constructor(valeurInitiale = 0) {
        // Votre code ici
    }

    ajouter(nombre) {
        // Ajouter et retourner this
    }

    soustraire(nombre) {
        // Soustraire et retourner this
    }

    multiplier(nombre) {
        // Multiplier et retourner this
    }

    diviser(nombre) {
        // Diviser (vérifier division par zéro) et retourner this
    }

    get valeur() {
        // Retourner la valeur courante
    }

    obtenirHistorique() {
        // Retourner l'historique des opérations
    }

    reinitialiser() {
        // Remettre à zéro
    }
}
```

**Cas de Test:**
```javascript
const calc = new Calculatrice(10);
calc.ajouter(5).multiplier(2).soustraire(3);
console.log(calc.valeur); // 27
console.log(calc.obtenirHistorique()); // ['10 + 5 = 15', '15 * 2 = 30', '30 - 3 = 27']
```

---

## Niveau Intermédiaire (Héritage et Méthodes Statiques)

### Kata 4: Hiérarchie d'Animaux
**Objectif:** Implémenter un système d'héritage avec classes parent et enfant.

**Exigences:**
- Classe `Animal` de base avec nom, type, age
- Classes `Chien` et `Chat` qui héritent d'Animal
- Chaque classe enfant a des méthodes spécifiques
- Override de la méthode `faireDuBruit()`

**Signature de la Fonction:**
```javascript
class Animal {
    constructor(nom, age) {
        // Votre code ici
    }

    manger() {
        // "[nom] mange"
    }

    dormir() {
        // "[nom] dort"
    }

    faireDuBruit() {
        // "L'animal fait du bruit"
    }
}

class Chien extends Animal {
    constructor(nom, age, race) {
        // Votre code ici
    }

    faireDuBruit() {
        // "[nom] aboie: Woof!"
    }

    rapporterBalle() {
        // "[nom] rapporte la balle"
    }
}

class Chat extends Animal {
    constructor(nom, age, couleur) {
        // Votre code ici
    }

    faireDuBruit() {
        // "[nom] miaule: Miaou!"
    }

    grimperArbre() {
        // "[nom] grimpe à l'arbre"
    }
}
```

**Cas de Test:**
```javascript
const rex = new Chien("Rex", 5, "Labrador");
const minou = new Chat("Minou", 3, "gris");

console.log(rex.faireDuBruit()); // "Rex aboie: Woof!"
console.log(minou.faireDuBruit()); // "Minou miaule: Miaou!"
rex.rapporterBalle(); // "Rex rapporte la balle"
minou.grimperArbre(); // "Minou grimpe à l'arbre"
```

---

### Kata 5: Système d'Employés avec Statiques
**Objectif:** Gérer des employés avec compteur automatique et méthodes statiques.

**Exigences:**
- Classe `Employe` avec ID auto-incrémenté et liste statique
- Méthodes statiques pour gérer tous les employés
- Calcul automatique du salaire selon le type d'employé
- Méthodes de recherche statiques

**Signature de la Fonction:**
```javascript
class Employe {
    static #prochainId = 1;
    static #employes = [];

    constructor(nom, poste, salaireBase) {
        // Votre code ici
    }

    calculerSalaire() {
        // Retourner le salaire de base
    }

    static obtenirNombreEmployes() {
        // Retourner le nombre total d'employés
    }

    static trouverParId(id) {
        // Trouver un employé par son ID
    }

    static obtenirTousLesEmployes() {
        // Retourner copie de la liste des employés
    }

    static calculerMasseSalariale() {
        // Calculer le total des salaires
    }
}

class Manager extends Employe {
    constructor(nom, salaireBase, prime) {
        // Votre code ici
    }

    calculerSalaire() {
        // Salaire de base + prime
    }
}

class Developpeur extends Employe {
    constructor(nom, salaireBase, langage) {
        // Votre code ici
    }

    coder() {
        // "[nom] code en [langage]"
    }
}
```

**Cas de Test:**
```javascript
const dev1 = new Developpeur("Alice", 50000, "JavaScript");
const manager1 = new Manager("Bob", 60000, 10000);

console.log(Employe.obtenirNombreEmployes()); // 2
console.log(manager1.calculerSalaire()); // 70000
console.log(Employe.calculerMasseSalariale()); // 120000
```

---

### Kata 6: Gestionnaire de Tâches avec Priorités
**Objectif:** Système de gestion de tâches avec différents types et priorités.

**Exigences:**
- Classe de base `Tache` avec titre, description, statut
- Classes `TacheUrgente`, `TacheNormale`, `TacheOptionnelle`
- Getters/setters pour la priorité avec validation
- Méthodes pour changer le statut

**Signature de la Fonction:**
```javascript
class Tache {
    constructor(titre, description) {
        // Votre code ici
    }

    marquerTerminee() {
        // Changer statut à "terminée"
    }

    marquerEnCours() {
        // Changer statut à "en cours"
    }

    get priorite() {
        // Retourner la priorité
    }

    get estTerminee() {
        // Retourner true si terminée
    }
}

class TacheUrgente extends Tache {
    constructor(titre, description, delai) {
        // Priorité = "urgente"
    }

    get tempsRestant() {
        // Calculer temps restant jusqu'au délai
    }
}

class TacheNormale extends Tache {
    constructor(titre, description) {
        // Priorité = "normale"
    }
}

class TacheOptionnelle extends Tache {
    constructor(titre, description) {
        // Priorité = "optionnelle"
    }
}
```

**Cas de Test:**
```javascript
const urgente = new TacheUrgente("Bug critique", "Corriger le bug", new Date(Date.now() + 86400000));
const normale = new TacheNormale("Feature", "Ajouter nouvelle fonctionnalité");

console.log(urgente.priorite); // "urgente"
urgente.marquerEnCours();
console.log(urgente.estTerminee); // false
```

---

## Niveau Avancé (Composition et Patterns)

### Kata 7: Système de E-commerce
**Objectif:** Modéliser un système de e-commerce complet avec composition.

**Exigences:**
- Classes `Produit`, `Panier`, `Commande`, `Client`
- Gestion des stocks et des prix
- Calcul automatique des totaux avec taxes
- Historique des commandes

**Signature de la Fonction:**
```javascript
class Produit {
    constructor(id, nom, prix, stock) {
        // Votre code ici
    }

    reduireStock(quantite) {
        // Réduire le stock si suffisant
    }

    get estEnStock() {
        // Vérifier si en stock
    }
}

class Panier {
    constructor() {
        // Votre code ici
    }

    ajouterProduit(produit, quantite) {
        // Ajouter si stock suffisant
    }

    retirerProduit(produitId) {
        // Retirer du panier
    }

    calculerTotal() {
        // Calculer le total du panier
    }

    vider() {
        // Vider le panier
    }
}

class Client {
    constructor(nom, email) {
        // Votre code ici
    }

    passerCommande(panier) {
        // Créer une commande à partir du panier
    }

    get historique() {
        // Retourner l'historique des commandes
    }
}

class Commande {
    static #prochainNumero = 1;

    constructor(client, panier) {
        // Votre code ici
    }

    calculerTotalAvecTaxes(tauxTaxe = 0.20) {
        // Calculer total avec taxes
    }

    get statut() {
        // Retourner le statut de la commande
    }
}
```

**Cas de Test:**
```javascript
const produit1 = new Produit(1, "Laptop", 999, 5);
const client1 = new Client("Alice", "alice@example.com");
const panier = new Panier();

panier.ajouterProduit(produit1, 2);
console.log(panier.calculerTotal()); // 1998

const commande = client1.passerCommande(panier);
console.log(commande.calculerTotalAvecTaxes()); // 2397.6
```

---

### Kata 8: Gestionnaire d'Événements Personnalisé
**Objectif:** Créer un système d'événements avec observateurs.

**Exigences:**
- Classe `EventEmitter` pour gérer les événements
- Méthodes pour s'abonner, se désabonner, émettre
- Support des événements une seule fois (`once`)
- Gestion des erreurs dans les callbacks

**Signature de la Fonction:**
```javascript
class EventEmitter {
    constructor() {
        // Votre code ici
    }

    on(eventName, callback) {
        // S'abonner à un événement
    }

    once(eventName, callback) {
        // S'abonner une seule fois
    }

    off(eventName, callback) {
        // Se désabonner
    }

    emit(eventName, ...args) {
        // Émettre un événement avec des arguments
    }

    removeAllListeners(eventName) {
        // Supprimer tous les listeners d'un événement
    }

    listenerCount(eventName) {
        // Nombre de listeners pour un événement
    }
}

class Utilisateur extends EventEmitter {
    constructor(nom) {
        super();
        // Votre code ici
    }

    seConnecter() {
        // Émettre événement 'login'
    }

    seDeconnecter() {
        // Émettre événement 'logout'
    }

    publierMessage(message) {
        // Émettre événement 'message' avec le message
    }
}
```

**Cas de Test:**
```javascript
const user = new Utilisateur("Alice");

user.on('login', () => console.log('Utilisateur connecté'));
user.once('message', (msg) => console.log('Premier message:', msg));

user.seConnecter(); // "Utilisateur connecté"
user.publierMessage("Bonjour!"); // "Premier message: Bonjour!"
user.publierMessage("Salut!"); // Pas d'affichage (once)
```

---

## Niveau Expert (Patterns Avancés)

### Kata 9: Factory Pattern avec Validation
**Objectif:** Implémenter le pattern Factory pour créer différents types d'objets.

**Exigences:**
- Factory pour créer différents types de véhicules
- Validation des paramètres avant création
- Registry des types supportés
- Méthodes de configuration avancées

**Signature de la Fonction:**
```javascript
class Vehicule {
    constructor(marque, modele) {
        // Votre code ici
    }

    demarrer() {
        // Méthode abstraite à redéfinir
    }

    arreter() {
        // Méthode abstraite à redéfinir
    }
}

class Voiture extends Vehicule {
    constructor(marque, modele, nombrePortes) {
        // Votre code ici
    }

    demarrer() {
        // "La voiture [marque] [modele] démarre"
    }
}

class Moto extends Vehicule {
    constructor(marque, modele, cylindree) {
        // Votre code ici
    }

    demarrer() {
        // "La moto [marque] [modele] démarre"
    }
}

class VehiculeFactory {
    static #types = new Map();

    static enregistrerType(nom, classe, validateur) {
        // Enregistrer un nouveau type de véhicule
    }

    static creer(type, options) {
        // Créer un véhicule du type spécifié
    }

    static getTypesSupported() {
        // Retourner la liste des types supportés
    }
}
```

**Cas de Test:**
```javascript
VehiculeFactory.enregistrerType('voiture', Voiture, (opts) => opts.nombrePortes > 0);
VehiculeFactory.enregistrerType('moto', Moto, (opts) => opts.cylindree > 0);

const voiture = VehiculeFactory.creer('voiture', {
    marque: 'Toyota',
    modele: 'Corolla',
    nombrePortes: 4
});

console.log(voiture.demarrer()); // "La voiture Toyota Corolla démarre"
```

---

### Kata 10: Singleton Pattern avec Configuration
**Objectif:** Implémenter un singleton pour la configuration globale de l'application.

**Exigences:**
- Une seule instance possible de la classe Configuration
- Méthodes pour get/set des valeurs de configuration
- Sauvegarde/chargement depuis localStorage
- Validation des types de configuration

**Signature de la Fonction:**
```javascript
class Configuration {
    static #instance = null;

    constructor() {
        // Empêcher la création directe
    }

    static getInstance() {
        // Retourner l'instance unique
    }

    set(key, value) {
        // Définir une valeur de configuration
    }

    get(key, defaultValue = null) {
        // Obtenir une valeur de configuration
    }

    has(key) {
        // Vérifier si une clé existe
    }

    remove(key) {
        // Supprimer une clé
    }

    sauvegarder() {
        // Sauvegarder dans localStorage
    }

    charger() {
        // Charger depuis localStorage
    }

    reset() {
        // Remettre aux valeurs par défaut
    }
}
```

**Cas de Test:**
```javascript
const config1 = Configuration.getInstance();
const config2 = Configuration.getInstance();

console.log(config1 === config2); // true (même instance)

config1.set('theme', 'dark');
console.log(config2.get('theme')); // 'dark'

config1.sauvegarder();
// Relancer l'application...
config1.charger();
console.log(config1.get('theme')); // 'dark'
```

---

## Conseils de Pratique

### Pour les Débutants
1. **Classes d'abord** : Maîtrisez la syntaxe de base des classes
2. **this clairement** : Comprenez le contexte et les problèmes courants
3. **Encapsulation simple** : Utilisez des propriétés privées basiques
4. **Méthodes chainables** : Pratiquez le retour de `this`

### Pour les Intermédiaires
1. **Héritage méthodique** : `extends`, `super`, et override
2. **Méthodes statiques** : Distinction instance vs classe
3. **Getters/Setters** : Contrôle d'accès et validation
4. **Composition** : Préférer à l'héritage complexe

### Pour les Avancés
1. **Design Patterns** : Factory, Singleton, Observer
2. **Validation robuste** : Types, contraintes, erreurs
3. **Encapsulation forte** : Propriétés vraiment privées
4. **Architecture** : Séparation des responsabilités

### Parcours d'Apprentissage
- **Semaine 1** : Katas 1-3 (Classes de base, encapsulation)
- **Semaine 2** : Katas 4-6 (Héritage, statiques, getters/setters)
- **Semaine 3** : Katas 7-8 (Composition, événements)
- **Semaine 4** : Katas 9-10 (Patterns avancés)

### Outils de Debug OOP
- **console.dir()** : Examiner la structure des objets
- **instanceof** : Vérifier le type d'instance
- **Object.getOwnPropertyNames()** : Voir toutes les propriétés
- **this dans debugger** : Inspecter le contexte

Une fois ces exercices maîtrisés, vous aurez une base solide en POO pour structurer vos applications JavaScript de manière professionnelle et maintenable.