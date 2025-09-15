# Structures de Données - Katas

## Niveau Débutant (Arrays et Objets de Base)

### Kata 1: Manipulateur de Tableau
**Objectif:** Implémenter des opérations basiques sur un tableau.

**Fonctionnalités:**
- Ajouter des éléments au début et à la fin
- Supprimer des éléments à des positions spécifiques
- Trouver et remplacer des éléments
- Calculer des statistiques (min, max, moyenne)

**Signature de la Fonction:**
```javascript
class ManipulateurTableau {
    constructor(tableau = []) {
        this.data = [...tableau];
    }
    
    ajouter(element) {
        // Ajouter à la fin
    }
    
    ajouterDebut(element) {
        // Ajouter au début
    }
    
    supprimer(index) {
        // Supprimer à l'index donné
    }
    
    trouver(element) {
        // Retourner l'index ou -1
    }
    
    remplacer(ancien, nouveau) {
        // Remplacer toutes les occurrences
    }
    
    statistiques() {
        // Retourner {min, max, moyenne, somme}
    }
}
```

**Cas de Test:**
```javascript
const manip = new ManipulateurTableau([1, 2, 3]);
manip.ajouter(4); // [1, 2, 3, 4]
manip.ajouterDebut(0); // [0, 1, 2, 3, 4]
manip.supprimer(2); // [0, 1, 3, 4]
manip.trouver(3); // 2
manip.statistiques(); // {min: 0, max: 4, moyenne: 2, somme: 8}
```

---

### Kata 2: Gestionnaire de Contacts
**Objectif:** Créer un système de gestion de contacts avec objets.

**Structure de Contact:**
```javascript
const contact = {
    nom: 'Alice Dubois',
    email: 'alice@example.com',
    telephone: '0123456789',
    adresse: {
        rue: '123 rue de la Paix',
        ville: 'Paris',
        codePostal: '75001'
    },
    tags: ['ami', 'travail']
};
```

**Signature de la Fonction:**
```javascript
class GestionnaireContacts {
    constructor() {
        this.contacts = [];
    }
    
    ajouter(contact) {
        // Ajouter un nouveau contact avec validation
    }
    
    rechercher(terme) {
        // Chercher dans nom, email, tags
    }
    
    filtrerParTag(tag) {
        // Retourner tous les contacts avec ce tag
    }
    
    modifier(email, nouveauDonnees) {
        // Modifier un contact existant
    }
    
    supprimer(email) {
        // Supprimer un contact
    }
    
    exporter() {
        // Retourner au format JSON
    }
}
```

**Cas de Test:**
```javascript
const gestionnaire = new GestionnaireContacts();
gestionnaire.ajouter(contact);
gestionnaire.rechercher('Alice'); // [contact]
gestionnaire.filtrerParTag('ami'); // [contact]
```

---

### Kata 3: Analyseur de Texte
**Objectif:** Analyser et traiter des chaînes de caractères.

**Fonctionnalités:**
- Compter les mots, caractères, phrases
- Analyser la fréquence des mots
- Détecter les palindromes
- Formater le texte

**Signature de la Fonction:**
```javascript
class AnalyseurTexte {
    constructor(texte) {
        this.texte = texte;
    }
    
    compterMots() {
        // Retourner le nombre de mots
    }
    
    compterCaracteres(avecEspaces = true) {
        // Compter caractères avec ou sans espaces
    }
    
    frequenceMots() {
        // Retourner un objet {mot: occurrence}
    }
    
    motsPlusFrequents(n = 5) {
        // Top N des mots les plus fréquents
    }
    
    estPalindrome() {
        // Vérifier si le texte est un palindrome
    }
    
    formater(style) {
        // 'titre', 'majuscules', 'minuscules', 'camel'
    }
    
    extraireMots(longueurMin = 1) {
        // Extraire mots uniques d'une longueur minimale
    }
}
```

**Cas de Test:**
```javascript
const analyseur = new AnalyseurTexte("Hello world! Hello JavaScript.");
analyseur.compterMots(); // 4
analyseur.frequenceMots(); // {hello: 2, world: 1, javascript: 1}
analyseur.motsPlusFrequents(2); // ['hello', 'world'] ou ['hello', 'javascript']
```

---

### Kata 4: Calculatrice de Matrices
**Objectif:** Implémenter des opérations sur des matrices (tableaux 2D).

**Signature de la Fonction:**
```javascript
class CalculatriceMatrice {
    static creer(lignes, colonnes, valeurDefaut = 0) {
        // Créer une matrice de taille lignes×colonnes
    }
    
    static addition(a, b) {
        // Addition de deux matrices
    }
    
    static soustraction(a, b) {
        // Soustraction de deux matrices
    }
    
    static multiplication(a, b) {
        // Multiplication de deux matrices
    }
    
    static transposer(matrice) {
        // Transposer une matrice
    }
    
    static determinant(matrice) {
        // Calculer le déterminant (matrices carrées)
    }
    
    static afficher(matrice) {
        // Affichage formaté
    }
    
    static estCarree(matrice) {
        // Vérifier si la matrice est carrée
    }
}
```

**Cas de Test:**
```javascript
const a = [[1, 2], [3, 4]];
const b = [[5, 6], [7, 8]];
CalculatriceMatrice.addition(a, b); // [[6, 8], [10, 12]]
CalculatriceMatrice.transposer(a); // [[1, 3], [2, 4]]
```

---

## Niveau Intermédiaire (Structures Avancées)

### Kata 5: Cache LRU (Least Recently Used)
**Objectif:** Implémenter un cache avec éviction LRU.

**Signature de la Fonction:**
```javascript
class CacheLRU {
    constructor(capacite) {
        this.capacite = capacite;
        // Implémenter avec Map pour maintenir l'ordre
    }
    
    get(cle) {
        // Récupérer et marquer comme récemment utilisé
    }
    
    put(cle, valeur) {
        // Ajouter/mettre à jour, évincer si nécessaire
    }
    
    taille() {
        // Retourner la taille actuelle
    }
    
    vider() {
        // Vider le cache
    }
    
    cles() {
        // Retourner les clés dans l'ordre d'utilisation
    }
}
```

**Cas de Test:**
```javascript
const cache = new CacheLRU(2);
cache.put('a', 1);
cache.put('b', 2);
cache.get('a'); // 1, 'a' devient le plus récent
cache.put('c', 3); // 'b' est évincé
cache.get('b'); // undefined
cache.cles(); // ['a', 'c'] dans l'ordre d'utilisation
```

---

### Kata 6: Système d'Index de Recherche
**Objectif:** Créer un index inversé pour la recherche rapide.

**Fonctionnalités:**
- Indexer des documents par mots-clés
- Recherche rapide par terme
- Recherche avec plusieurs termes (AND, OR)
- Scoring et pertinence

**Signature de la Fonction:**
```javascript
class IndexRecherche {
    constructor() {
        this.index = new Map(); // mot -> Set d'IDs de documents
        this.documents = new Map(); // ID -> document
    }
    
    ajouterDocument(id, contenu) {
        // Indexer un document
    }
    
    supprimerDocument(id) {
        // Supprimer de l'index
    }
    
    rechercher(terme) {
        // Recherche simple
    }
    
    rechercherMultiple(termes, operateur = 'AND') {
        // Recherche avec plusieurs termes
    }
    
    suggerer(prefixe, limite = 5) {
        // Suggestions de mots basées sur le préfixe
    }
    
    statistiques() {
        // Nombre de documents, mots uniques, etc.
    }
}
```

**Cas de Test:**
```javascript
const index = new IndexRecherche();
index.ajouterDocument(1, "JavaScript est un langage de programmation");
index.ajouterDocument(2, "Python est aussi un langage de programmation");
index.rechercher('langage'); // [1, 2]
index.rechercherMultiple(['JavaScript', 'langage'], 'AND'); // [1]
```

---

### Kata 7: Arbre Binaire de Recherche
**Objectif:** Implémenter un BST avec toutes les opérations classiques.

**Signature de la Fonction:**
```javascript
class Noeud {
    constructor(valeur) {
        this.valeur = valeur;
        this.gauche = null;
        this.droite = null;
    }
}

class ArbreBinaireRecherche {
    constructor() {
        this.racine = null;
    }
    
    inserer(valeur) {
        // Insérer une valeur
    }
    
    rechercher(valeur) {
        // Rechercher une valeur
    }
    
    supprimer(valeur) {
        // Supprimer une valeur
    }
    
    min() {
        // Trouver la valeur minimale
    }
    
    max() {
        // Trouver la valeur maximale
    }
    
    hauteur() {
        // Calculer la hauteur de l'arbre
    }
    
    parcoursInfixe() {
        // Parcours en ordre (gauche, racine, droite)
    }
    
    parcoursPrefixe() {
        // Parcours pré-ordre (racine, gauche, droite)
    }
    
    parcoursPostfixe() {
        // Parcours post-ordre (gauche, droite, racine)
    }
    
    estEquilibre() {
        // Vérifier si l'arbre est équilibré
    }
}
```

**Cas de Test:**
```javascript
const arbre = new ArbreBinaireRecherche();
[5, 3, 7, 2, 4, 6, 8].forEach(val => arbre.inserer(val));
arbre.parcoursInfixe(); // [2, 3, 4, 5, 6, 7, 8]
arbre.rechercher(4); // true
arbre.hauteur(); // 3
```

---

### Kata 8: Gestionnaire d'État avec Historique
**Objectif:** Système de gestion d'état avec undo/redo.

**Signature de la Fonction:**
```javascript
class GestionnaireEtat {
    constructor(etatInitial = {}) {
        this.etatActuel = {...etatInitial};
        this.historique = [];
        this.position = -1;
    }
    
    modifierEtat(modifications) {
        // Appliquer des modifications et sauvegarder l'état précédent
    }
    
    undo() {
        // Revenir à l'état précédent
    }
    
    redo() {
        // Avancer à l'état suivant
    }
    
    peutUndo() {
        // Vérifier si undo est possible
    }
    
    peutRedo() {
        // Vérifier si redo est possible
    }
    
    obtenirEtat() {
        // Retourner l'état actuel
    }
    
    viderHistorique() {
        // Vider l'historique
    }
    
    obtenirHistorique() {
        // Retourner l'historique des états
    }
}
```

**Cas de Test:**
```javascript
const gestionnaire = new GestionnaireEtat({compteur: 0});
gestionnaire.modifierEtat({compteur: 1});
gestionnaire.modifierEtat({compteur: 2});
gestionnaire.undo(); // compteur: 1
gestionnaire.redo(); // compteur: 2
```

---

## Niveau Avancé (Algorithmes et Structures Complexes)

### Kata 9: Graphe et Algorithmes de Parcours
**Objectif:** Implémenter un graphe avec BFS et DFS.

**Signature de la Fonction:**
```javascript
class Graphe {
    constructor(dirige = false) {
        this.dirige = dirige;
        this.sommets = new Map(); // sommet -> Set de voisins
    }
    
    ajouterSommet(sommet) {
        // Ajouter un sommet
    }
    
    ajouterArete(source, destination, poids = 1) {
        // Ajouter une arête
    }
    
    supprimerSommet(sommet) {
        // Supprimer un sommet et ses arêtes
    }
    
    supprimerArete(source, destination) {
        // Supprimer une arête
    }
    
    bfs(sommetDepart) {
        // Parcours en largeur (Breadth-First Search)
    }
    
    dfs(sommetDepart) {
        // Parcours en profondeur (Depth-First Search)
    }
    
    cheminLePlusCourt(source, destination) {
        // Dijkstra ou BFS pour le plus court chemin
    }
    
    estConnexe() {
        // Vérifier si le graphe est connexe
    }
    
    detecterCycle() {
        // Détecter la présence d'un cycle
    }
    
    triTopologique() {
        // Tri topologique (graphe dirigé acyclique)
    }
}
```

**Cas de Test:**
```javascript
const graphe = new Graphe();
['A', 'B', 'C', 'D'].forEach(s => graphe.ajouterSommet(s));
graphe.ajouterArete('A', 'B');
graphe.ajouterArete('B', 'C');
graphe.ajouterArete('C', 'D');
graphe.bfs('A'); // ['A', 'B', 'C', 'D']
graphe.cheminLePlusCourt('A', 'D'); // ['A', 'B', 'C', 'D']
```

---

### Kata 10: Système de Fichiers Virtuel
**Objectif:** Simuler un système de fichiers avec arbre.

**Signature de la Fonction:**
```javascript
class NoeudFichier {
    constructor(nom, estDossier = false) {
        this.nom = nom;
        this.estDossier = estDossier;
        this.contenu = estDossier ? new Map() : '';
        this.taille = 0;
        this.dateCreation = new Date();
        this.dateModification = new Date();
    }
}

class SystemeFichiersVirtuel {
    constructor() {
        this.racine = new NoeudFichier('/', true);
        this.cheminActuel = '/';
    }
    
    creerDossier(chemin) {
        // Créer un dossier
    }
    
    creerFichier(chemin, contenu = '') {
        // Créer un fichier
    }
    
    supprimer(chemin) {
        // Supprimer fichier ou dossier
    }
    
    lire(chemin) {
        // Lire le contenu d'un fichier
    }
    
    ecrire(chemin, contenu) {
        // Écrire dans un fichier
    }
    
    lister(chemin = this.cheminActuel) {
        // Lister le contenu d'un dossier
    }
    
    naviguer(chemin) {
        // Changer de répertoire courant
    }
    
    rechercher(nom, racineRecherche = this.racine) {
        // Rechercher fichiers/dossiers par nom
    }
    
    calculerTaille(chemin) {
        // Calculer la taille totale d'un dossier
    }
    
    arborescence(chemin = this.cheminActuel) {
        // Afficher l'arborescence
    }
}
```

**Cas de Test:**
```javascript
const fs = new SystemeFichiersVirtuel();
fs.creerDossier('/home/user');
fs.creerFichier('/home/user/test.txt', 'Contenu du fichier');
fs.lister('/home/user'); // ['test.txt']
fs.lire('/home/user/test.txt'); // 'Contenu du fichier'
```

---

### Kata 11: Moteur de Requête sur Données
**Objectif:** Créer un système de requête SQL-like sur des objets JavaScript.

**Fonctionnalités:**
- SELECT avec projection de colonnes
- WHERE avec conditions multiples
- ORDER BY avec tri multi-critères
- GROUP BY avec agrégations
- JOIN entre collections

**Signature de la Fonction:**
```javascript
class MoteurRequete {
    constructor(donnees = []) {
        this.donnees = donnees;
    }
    
    select(colonnes = '*') {
        // Projeter des colonnes spécifiques
        return new MoteurRequete(this.donnees);
    }
    
    where(predicate) {
        // Filtrer selon une condition
        return new MoteurRequete(this.donnees);
    }
    
    orderBy(colonne, ordre = 'asc') {
        // Trier par une colonne
        return new MoteurRequete(this.donnees);
    }
    
    groupBy(colonne) {
        // Grouper par une colonne
        return new MoteurRequete(this.donnees);
    }
    
    having(predicate) {
        // Filtrer les groupes
        return new MoteurRequete(this.donnees);
    }
    
    join(autreDonnees, condition) {
        // Joindre avec une autre collection
        return new MoteurRequete(this.donnees);
    }
    
    aggregate(operations) {
        // Opérations d'agrégation (sum, count, avg, min, max)
    }
    
    execute() {
        // Exécuter et retourner les résultats
        return this.donnees;
    }
    
    limit(n) {
        // Limiter le nombre de résultats
        return new MoteurRequete(this.donnees);
    }
    
    offset(n) {
        // Décaler le début des résultats
        return new MoteurRequete(this.donnees);
    }
}
```

**Cas de Test:**
```javascript
const employes = [
    {nom: 'Alice', departement: 'IT', salaire: 50000, age: 30},
    {nom: 'Bob', departement: 'RH', salaire: 45000, age: 35},
    {nom: 'Charlie', departement: 'IT', salaire: 55000, age: 28}
];

const query = new MoteurRequete(employes)
    .select(['nom', 'salaire'])
    .where(emp => emp.departement === 'IT')
    .orderBy('salaire', 'desc');
    
query.execute(); 
// [{nom: 'Charlie', salaire: 55000}, {nom: 'Alice', salaire: 50000}]
```

---

### Kata 12: Compresseur de Données Huffman
**Objectif:** Implémenter l'algorithme de compression Huffman.

**Signature de la Fonction:**
```javascript
class NoeudHuffman {
    constructor(caractere, frequence) {
        this.caractere = caractere;
        this.frequence = frequence;
        this.gauche = null;
        this.droite = null;
    }
    
    estFeuille() {
        return !this.gauche && !this.droite;
    }
}

class CompresseurHuffman {
    constructor() {
        this.arbre = null;
        this.codes = new Map();
    }
    
    analyserFrequences(texte) {
        // Compter la fréquence de chaque caractère
    }
    
    construireArbre(frequences) {
        // Construire l'arbre de Huffman
    }
    
    genererCodes(noeud = this.arbre, code = '') {
        // Générer les codes binaires pour chaque caractère
    }
    
    comprimer(texte) {
        // Comprimer le texte en binaire
    }
    
    decomprimer(donneesBinaires) {
        // Décomprimer les données binaires
    }
    
    ratioCompression(texteOriginal, texteCompresse) {
        // Calculer le ratio de compression
    }
    
    afficherCodes() {
        // Afficher la table des codes
    }
    
    sauvegarderArbre() {
        // Sérialiser l'arbre pour la décompression
    }
    
    chargerArbre(donneesSerialisees) {
        // Restaurer l'arbre depuis les données sérialisées
    }
}
```

**Cas de Test:**
```javascript
const compresseur = new CompresseurHuffman();
const texte = "hello world";
const compresse = compresseur.comprimer(texte);
const decomprresse = compresseur.decomprimer(compresse);
console.log(decomprresse === texte); // true
console.log(compresseur.ratioCompression(texte, compresse)); // ratio
```

---

## Niveau Expert (Structures Distribuées et Avancées)

### Kata 13: Base de Données en Mémoire
**Objectif:** Créer une base de données simple avec transactions et index.

**Fonctionnalités:**
- Tables avec schémas
- Index pour accélération des requêtes
- Transactions avec ACID
- Sauvegarde/restauration

**Signature de la Fonction:**
```javascript
class BaseDonneesMemoire {
    constructor() {
        this.tables = new Map();
        this.index = new Map();
        this.transactions = [];
        this.journalTransactions = [];
    }
    
    creerTable(nom, schema) {
        // Créer une table avec un schéma
    }
    
    creerIndex(table, colonne) {
        // Créer un index sur une colonne
    }
    
    inserer(table, donnees) {
        // Insérer des données
    }
    
    selectionner(table, conditions = {}) {
        // Sélectionner des données
    }
    
    modifier(table, conditions, nouvelleDonnees) {
        // Modifier des données
    }
    
    supprimer(table, conditions) {
        // Supprimer des données
    }
    
    commencerTransaction() {
        // Démarrer une transaction
    }
    
    validerTransaction() {
        // Commit une transaction
    }
    
    annulerTransaction() {
        // Rollback une transaction
    }
    
    sauvegarder() {
        // Sauvegarder en JSON
    }
    
    restaurer(donnees) {
        // Restaurer depuis JSON
    }
}
```

---

### Kata 14: Système de Cache Distribué
**Objectif:** Simuler un cache distribué avec hachage cohérent.

**Fonctionnalités:**
- Multiples nœuds de cache
- Hachage cohérent pour distribution
- Réplication et tolérance aux pannes
- Statistiques et monitoring

**Signature de la Fonction:**
```javascript
class NoeudCache {
    constructor(id, capacite) {
        this.id = id;
        this.cache = new Map();
        this.capacite = capacite;
        this.statistiques = {hits: 0, misses: 0};
    }
}

class CacheDistribue {
    constructor(nombreNoeuds = 3, facteurReplication = 2) {
        this.noeuds = [];
        this.anneauHachage = [];
        this.facteurReplication = facteurReplication;
    }
    
    ajouterNoeud(noeud) {
        // Ajouter un nœud au cluster
    }
    
    supprimerNoeud(noeudId) {
        // Supprimer un nœud (gestion des pannes)
    }
    
    hacher(cle) {
        // Fonction de hachage
    }
    
    trouverNoeuds(cle) {
        // Trouver les nœuds responsables d'une clé
    }
    
    put(cle, valeur) {
        // Stocker une valeur avec réplication
    }
    
    get(cle) {
        // Récupérer une valeur
    }
    
    delete(cle) {
        // Supprimer une valeur
    }
    
    reequilibrer() {
        // Rééquilibrer après ajout/suppression de nœud
    }
    
    obtenirStatistiques() {
        // Statistiques globales du cluster
    }
}
```

---

### Kata 15: Moteur de Règles Métier
**Objectif:** Créer un moteur d'exécution de règles configurables.

**Fonctionnalités:**
- Définition de règles en JSON/DSL
- Évaluation de conditions complexes
- Actions conditionnelles
- Chaînage de règles
- Audit et logs

**Signature de la Fonction:**
```javascript
class RegleMetier {
    constructor(id, nom, conditions, actions, priorite = 0) {
        this.id = id;
        this.nom = nom;
        this.conditions = conditions;
        this.actions = actions;
        this.priorite = priorite;
        this.active = true;
    }
}

class MoteurRegles {
    constructor() {
        this.regles = new Map();
        this.faits = new Map();
        this.historique = [];
        this.operateurs = new Map();
    }
    
    ajouterRegle(regle) {
        // Ajouter une règle au moteur
    }
    
    ajouterFait(nom, valeur) {
        // Ajouter un fait dans la base de connaissances
    }
    
    evaluerCondition(condition, contexte) {
        // Évaluer une condition avec le contexte
    }
    
    executerAction(action, contexte) {
        // Exécuter une action
    }
    
    executer(contexte = {}) {
        // Exécuter toutes les règles applicables
    }
    
    definirOperateur(nom, fonction) {
        // Définir un opérateur personnalisé
    }
    
    obtenirHistorique() {
        // Retourner l'historique d'exécution
    }
    
    exporterRegles() {
        // Exporter les règles en JSON
    }
    
    importerRegles(json) {
        // Importer des règles depuis JSON
    }
}
```

**Exemple de Règle:**
```json
{
    "id": "remise-senior",
    "nom": "Remise pour seniors",
    "conditions": {
        "et": [
            {"age": {">=": 65}},
            {"typeClient": {"=": "premium"}}
        ]
    },
    "actions": [
        {"appliquerRemise": 0.15},
        {"ajouterMessage": "Remise senior appliquée"}
    ],
    "priorite": 10
}
```

---

## Conseils de Pratique

### Pour les Débutants
1. **Maîtrisez les bases** : Arrays et Objects avant tout
2. **Pratiquez les méthodes** : map, filter, reduce sont essentielles
3. **Comprenez les références** : Différence entre copie et référence
4. **Testez vos structures** : Cas limites et validation

### Pour les Intermédiaires
1. **Explorez Map et Set** : Plus puissants que Object et Array parfois
2. **Implémentez des structures** : Pile, file, liste chaînée
3. **Optimisez les performances** : Complexity Big O
4. **Gérez la mémoire** : Éviter les fuites avec WeakMap/WeakSet

### Pour les Avancés
1. **Algorithmes de graphes** : BFS, DFS, plus courts chemins
2. **Structures persistantes** : Immutabilité et performance
3. **Patterns de design** : Observer, Strategy avec structures
4. **Structures distribuées** : Hachage cohérent, réplication

### Tests et Validation
1. **Tests unitaires** pour chaque opération
2. **Tests de performance** sur grandes données
3. **Tests de concurrence** pour structures partagées
4. **Validation des invariants** de structure

### Parcours d'Apprentissage
- **Semaine 1** : Katas 1-4 (Structures de base)
- **Semaine 2** : Katas 5-8 (Structures avancées)
- **Semaine 3** : Katas 9-12 (Algorithmes et complexité)
- **Semaine 4+** : Katas 13-15 (Systèmes complexes)

### Outils Utiles
- Visualisateurs d'algorithmes en ligne
- Profilers de performance JavaScript
- Librairies de structures de données (Immutable.js, Lodash)
- Benchmarks et comparaisons de performance