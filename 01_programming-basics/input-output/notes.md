# Entrées-Sorties - Notes

## Qu'est-ce que les Entrées-Sorties ?

Les entrées-sorties (I/O pour Input/Output) sont les mécanismes qui permettent à un programme d'interagir avec l'extérieur : recevoir des données de l'utilisateur, d'un fichier, d'un réseau (entrées) et afficher ou envoyer des informations vers l'écran, un fichier, ou un service externe (sorties).

## Concepts Fondamentaux

### Types d'Entrées
- **Entrées Utilisateur** : Clavier, souris, écran tactile
- **Fichiers** : Lecture de données stockées
- **Réseau** : APIs, services web, bases de données
- **Capteurs** : Microphone, caméra, GPS
- **Paramètres** : Arguments de ligne de commande

### Types de Sorties
- **Affichage** : Console, interface graphique
- **Fichiers** : Sauvegarde de données
- **Réseau** : Envoi vers des APIs, services
- **Périphériques** : Imprimante, haut-parleurs
- **Notifications** : Alertes, messages

## Entrées-Sorties en JavaScript

### Console - Sortie de Base

#### console.log()
```javascript
console.log("Bonjour le monde !");
console.log("Nom:", nom, "Âge:", age);
console.log(`Bonjour ${nom}, vous avez ${age} ans`);
```

#### Autres Méthodes Console
```javascript
console.error("Erreur critique !");
console.warn("Attention : valeur suspecte");
console.info("Information : processus terminé");
console.table([{nom: "Alice", age: 25}, {nom: "Bob", age: 30}]);
console.group("Groupe de logs");
console.log("Message dans le groupe");
console.groupEnd();
```

### Entrées Utilisateur dans le Navigateur

#### prompt() - Entrée Simple
```javascript
const nom = prompt("Comment vous appelez-vous ?");
const age = prompt("Quel âge avez-vous ?");
const ageNombre = parseInt(age); // Conversion en nombre

// Avec valeur par défaut
const ville = prompt("Dans quelle ville habitez-vous ?", "Paris");
```

#### confirm() - Confirmation
```javascript
const confirme = confirm("Êtes-vous sûr de vouloir continuer ?");
if (confirme) {
    console.log("Action confirmée");
} else {
    console.log("Action annulée");
}
```

#### alert() - Notification
```javascript
alert("Bienvenue dans l'application !");
alert(`Bonjour ${nom} !`);
```

### Entrées via Formulaires HTML

#### Éléments de Formulaire
```html
<!-- HTML -->
<input type="text" id="nomUtilisateur" placeholder="Votre nom">
<input type="number" id="age" min="0" max="120">
<input type="email" id="email" placeholder="votre@email.com">
<textarea id="message" rows="4" cols="50"></textarea>
<select id="pays">
    <option value="fr">France</option>
    <option value="be">Belgique</option>
    <option value="ch">Suisse</option>
</select>
<input type="checkbox" id="accepteConditions">
<button onclick="traiterFormulaire()">Envoyer</button>
```

```javascript
// Récupérer les valeurs
function traiterFormulaire() {
    const nom = document.getElementById('nomUtilisateur').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const pays = document.getElementById('pays').value;
    const accepte = document.getElementById('accepteConditions').checked;
    
    console.log("Données récupérées:", {nom, age, email, message, pays, accepte});
}
```

#### Événements de Formulaire
```javascript
// Écouter les changements
document.getElementById('nomUtilisateur').addEventListener('input', function(event) {
    console.log("Nom tapé:", event.target.value);
});

// Validation en temps réel
document.getElementById('email').addEventListener('blur', function(event) {
    const email = event.target.value;
    if (!email.includes('@')) {
        alert("Email invalide !");
    }
});

// Soumission de formulaire
document.getElementById('monFormulaire').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de page
    traiterFormulaire();
});
```

### Gestion de Fichiers

#### Lecture de Fichiers (Frontend)
```javascript
// HTML: <input type="file" id="fichierInput" accept=".txt,.json">

document.getElementById('fichierInput').addEventListener('change', function(event) {
    const fichier = event.target.files[0];
    
    if (fichier) {
        const lecteur = new FileReader();
        
        lecteur.onload = function(e) {
            const contenu = e.target.result;
            console.log("Contenu du fichier:", contenu);
            
            // Traitement selon le type
            if (fichier.type === 'application/json') {
                try {
                    const donnees = JSON.parse(contenu);
                    console.log("Données JSON:", donnees);
                } catch (error) {
                    console.error("Erreur parsing JSON:", error);
                }
            }
        };
        
        lecteur.readAsText(fichier);
    }
});
```

#### Téléchargement de Fichiers
```javascript
function telechargerFichier(contenu, nomFichier, typeMime = 'text/plain') {
    const blob = new Blob([contenu], { type: typeMime });
    const url = URL.createObjectURL(blob);
    
    const lien = document.createElement('a');
    lien.href = url;
    lien.download = nomFichier;
    lien.click();
    
    URL.revokeObjectURL(url);
}

// Utilisation
const donnees = JSON.stringify({nom: "Alice", age: 25}, null, 2);
telechargerFichier(donnees, "donnees.json", "application/json");
```

### Stockage Local

#### localStorage
```javascript
// Sauvegarder des données
localStorage.setItem('nomUtilisateur', 'Alice');
localStorage.setItem('parametres', JSON.stringify({theme: 'sombre', langue: 'fr'}));

// Récupérer des données
const nom = localStorage.getItem('nomUtilisateur');
const parametres = JSON.parse(localStorage.getItem('parametres') || '{}');

// Supprimer des données
localStorage.removeItem('nomUtilisateur');
localStorage.clear(); // Tout supprimer
```

#### sessionStorage
```javascript
// Similaire à localStorage mais données supprimées à la fermeture de l'onglet
sessionStorage.setItem('sessionId', '123456');
const sessionId = sessionStorage.getItem('sessionId');
```

### Communication Réseau

#### Fetch API - Récupérer des Données
```javascript
// GET - Récupérer des données
async function recupererDonnees() {
    try {
        const response = await fetch('https://api.exemple.com/utilisateurs');
        const donnees = await response.json();
        console.log("Utilisateurs:", donnees);
        return donnees;
    } catch (error) {
        console.error("Erreur réseau:", error);
    }
}

// POST - Envoyer des données
async function envoyerDonnees(utilisateur) {
    try {
        const response = await fetch('https://api.exemple.com/utilisateurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(utilisateur)
        });
        
        const resultat = await response.json();
        console.log("Utilisateur créé:", resultat);
    } catch (error) {
        console.error("Erreur envoi:", error);
    }
}
```

#### XMLHttpRequest (Ancienne Méthode)
```javascript
function requeteAJAX(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const donnees = JSON.parse(xhr.responseText);
            callback(donnees);
        }
    };
    
    xhr.send();
}
```

## Entrées-Sorties en Node.js

### Console et Arguments

#### Arguments de Ligne de Commande
```javascript
// process.argv contient les arguments
console.log("Arguments:", process.argv);

// node script.js nom=Alice age=25
const args = process.argv.slice(2);
const parametres = {};

args.forEach(arg => {
    const [cle, valeur] = arg.split('=');
    parametres[cle] = valeur;
});

console.log("Paramètres:", parametres);
```

#### Variables d'Environnement
```javascript
// Lire les variables d'environnement
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL || 'localhost';

console.log(`Serveur démarrant sur le port ${port}`);
```

### Entrée Interactive (readline)
```javascript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Question simple
rl.question('Comment vous appelez-vous ? ', (nom) => {
    console.log(`Bonjour ${nom} !`);
    
    rl.question('Quel âge avez-vous ? ', (age) => {
        console.log(`Vous avez ${age} ans`);
        rl.close();
    });
});

// Gestion de la fermeture
rl.on('close', () => {
    console.log('Au revoir !');
    process.exit(0);
});
```

### Fichiers en Node.js

#### Lecture de Fichiers
```javascript
const fs = require('fs');

// Lecture synchrone
try {
    const contenu = fs.readFileSync('fichier.txt', 'utf8');
    console.log("Contenu:", contenu);
} catch (error) {
    console.error("Erreur lecture:", error.message);
}

// Lecture asynchrone
fs.readFile('fichier.txt', 'utf8', (error, contenu) => {
    if (error) {
        console.error("Erreur:", error.message);
        return;
    }
    console.log("Contenu:", contenu);
});

// Avec Promises
const fsPromises = require('fs').promises;

async function lireFichier(chemin) {
    try {
        const contenu = await fsPromises.readFile(chemin, 'utf8');
        return contenu;
    } catch (error) {
        console.error("Erreur:", error.message);
        return null;
    }
}
```

#### Écriture de Fichiers
```javascript
// Écriture synchrone
fs.writeFileSync('sortie.txt', 'Contenu à écrire');

// Écriture asynchrone
fs.writeFile('sortie.txt', 'Contenu à écrire', (error) => {
    if (error) {
        console.error("Erreur écriture:", error.message);
    } else {
        console.log("Fichier sauvegardé !");
    }
});

// Ajout au fichier
fs.appendFile('log.txt', `${new Date()}: Message de log\n`, (error) => {
    if (error) console.error("Erreur log:", error.message);
});
```

## Validation et Sécurité

### Validation des Entrées
```javascript
function validerEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validerAge(age) {
    const ageNum = parseInt(age);
    return !isNaN(ageNum) && ageNum >= 0 && ageNum <= 120;
}

function nettoyer(texte) {
    // Supprimer les caractères dangereux
    return texte.replace(/[<>]/g, '').trim();
}

// Validation complète
function validerFormulaire(donnees) {
    const erreurs = [];
    
    if (!donnees.nom || donnees.nom.length < 2) {
        erreurs.push("Le nom doit contenir au moins 2 caractères");
    }
    
    if (!validerEmail(donnees.email)) {
        erreurs.push("Email invalide");
    }
    
    if (!validerAge(donnees.age)) {
        erreurs.push("Âge invalide");
    }
    
    return erreurs;
}
```

### Sécurité
```javascript
// Échapper les caractères HTML
function echapperHTML(texte) {
    const div = document.createElement('div');
    div.textContent = texte;
    return div.innerHTML;
}

// Limiter la taille des entrées
function limiterTaille(texte, tailleMax = 1000) {
    return texte.substring(0, tailleMax);
}

// Détecter les tentatives malveillantes
function detecterMalveillant(texte) {
    const motsSuspects = ['<script', 'javascript:', 'onload=', 'eval('];
    return motsSuspects.some(mot => texte.toLowerCase().includes(mot));
}
```

## Formatage et Présentation

### Formatage de Texte
```javascript
// Formatage de nombres
const prix = 1234.56;
console.log(prix.toFixed(2)); // "1234.56"
console.log(prix.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})); 
// "1 234,56 €"

// Formatage de dates
const maintenant = new Date();
console.log(maintenant.toLocaleDateString('fr-FR')); // "25/12/2023"
console.log(maintenant.toLocaleString('fr-FR')); // "25/12/2023 14:30:25"

// Templates avancés
function formaterUtilisateur(utilisateur) {
    return `
Nom: ${utilisateur.nom}
Email: ${utilisateur.email}
Inscrit le: ${new Date(utilisateur.inscription).toLocaleDateString('fr-FR')}
Statut: ${utilisateur.actif ? 'Actif' : 'Inactif'}
    `.trim();
}
```

### Progression et Feedback
```javascript
// Barre de progression simple
function afficherProgression(pourcentage) {
    const largeur = 30;
    const rempli = Math.round(largeur * pourcentage / 100);
    const vide = largeur - rempli;
    
    const barre = '█'.repeat(rempli) + '░'.repeat(vide);
    console.log(`[${barre}] ${pourcentage}%`);
}

// Animation de chargement
function animationChargement(message, duree = 3000) {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let frameIndex = 0;
    
    const interval = setInterval(() => {
        process.stdout.write(`\r${frames[frameIndex]} ${message}`);
        frameIndex = (frameIndex + 1) % frames.length;
    }, 100);
    
    setTimeout(() => {
        clearInterval(interval);
        console.log(`\r✓ ${message} terminé !`);
    }, duree);
}
```

## Gestion d'Erreurs

### Try-Catch pour I/O
```javascript
async function operationSecurisee() {
    try {
        const donnees = await recupererDonnees();
        const resultat = traiterDonnees(donnees);
        await sauvegarderResultat(resultat);
        console.log("Opération réussie !");
    } catch (error) {
        console.error("Erreur:", error.message);
        
        // Log détaillé pour debug
        console.error("Stack trace:", error.stack);
        
        // Notification utilisateur
        alert("Une erreur s'est produite. Veuillez réessayer.");
    }
}
```

### Gestion des Timeouts
```javascript
function avecTimeout(promise, tempsLimite) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), tempsLimite)
        )
    ]);
}

// Utilisation
try {
    const donnees = await avecTimeout(fetch('/api/donnees'), 5000);
    console.log("Données reçues à temps");
} catch (error) {
    if (error.message === 'Timeout') {
        console.error("Opération trop lente");
    } else {
        console.error("Autre erreur:", error.message);
    }
}
```

## Bonnes Pratiques

### 1. Validation Systématique
```javascript
function traiterEntree(donnee) {
    // Toujours valider
    if (!donnee || typeof donnee !== 'string') {
        throw new Error('Donnée invalide');
    }
    
    // Nettoyer
    donnee = donnee.trim();
    
    // Traiter
    return donnee.toUpperCase();
}
```

### 2. Feedback Utilisateur
```javascript
function operationLongue() {
    console.log("⏳ Traitement en cours...");
    
    // Simuler opération
    setTimeout(() => {
        console.log("✓ Opération terminée !");
    }, 2000);
}
```

### 3. Gestion Gracieuse des Erreurs
```javascript
function gestionRobuste() {
    try {
        // Opération risquée
        operationRisquee();
    } catch (error) {
        // Log pour les développeurs
        console.error('Erreur technique:', error);
        
        // Message pour l'utilisateur
        console.log('Désolé, une erreur est survenue. Réessayez plus tard.');
        
        // Valeur par défaut ou alternative
        return valeurParDefaut();
    }
}
```

### 4. Performance et Optimisation
```javascript
// Débouncing pour limiter les appels
function debounce(func, delai) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delai);
    };
}

// Utilisation pour recherche en temps réel
const rechercheOptimisee = debounce(function(terme) {
    console.log('Recherche pour:', terme);
    // Appel API ici
}, 300);
```

## Applications Pratiques

- **Formulaires Web** : Collecte et validation de données utilisateur
- **Jeux Interactifs** : Contrôles joueur et affichage scores
- **Outils CLI** : Scripts en ligne de commande
- **Applications de Bureau** : Interface utilisateur riche
- **APIs et Services** : Communication client-serveur
- **Analyses de Données** : Import/export de fichiers CSV, JSON
- **Systèmes de Configuration** : Fichiers de paramètres
- **Logging et Monitoring** : Enregistrement d'activités