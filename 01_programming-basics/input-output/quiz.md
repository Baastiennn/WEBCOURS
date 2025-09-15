# Entrées-Sorties - Quiz

## Questions à Choix Multiples

### 1. Que retourne `prompt("Entrez votre nom")` si l'utilisateur clique sur "Annuler" ?
a) `""` (chaîne vide)  
b) `undefined`  
c) `null`  
d) `false`  

**Réponse: c) `null`**

### 2. Comment récupérer la valeur d'un champ input avec l'id "email" ?
a) `document.email.value`  
b) `document.getElementById("email").value`  
c) `document.getElement("email").value`  
d) `document.select("#email").value`  

**Réponse: b) `document.getElementById("email").value`**

### 3. Quelle méthode utiliser pour écouter les changements en temps réel dans un input ?
a) `change`  
b) `input`  
c) `keyup`  
d) `focus`  

**Réponse: b) `input`**

### 4. Comment empêcher la soumission automatique d'un formulaire ?
a) `return false;`  
b) `event.stop();`  
c) `event.preventDefault();`  
d) `form.cancel();`  

**Réponse: c) `event.preventDefault();`**

### 5. Quelle est la différence principale entre `localStorage` et `sessionStorage` ?
a) `localStorage` est plus rapide  
b) `sessionStorage` peut stocker plus de données  
c) `localStorage` persiste entre les sessions  
d) Il n'y a pas de différence  

**Réponse: c) `localStorage` persiste entre les sessions**

## Questions Vrai/Faux

### 6. `prompt()` retourne toujours une chaîne de caractères.
**Réponse: Faux** (retourne `null` si annulé)

### 7. `console.table()` est utile pour afficher des tableaux d'objets.
**Réponse: Vrai**

### 8. En Node.js, `process.argv[0]` contient le nom du script exécuté.
**Réponse: Faux** (contient le chemin vers Node.js, le script est à l'index 1)

### 9. `fetch()` utilise la méthode POST par défaut.
**Réponse: Faux** (utilise GET par défaut)

### 10. `FileReader` peut lire des fichiers sur le serveur.
**Réponse: Faux** (seulement les fichiers sélectionnés par l'utilisateur côté client)

## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
const nom = prompt("Votre nom ?");
if (nom) {
    console.log("Bonjour " + nom);
} else {
    console.log("Pas de nom fourni");
}
```
Si l'utilisateur clique "Annuler":
**Réponse: "Pas de nom fourni"** (car `null` est falsy)

### 12. Quel est le problème avec ce code ?
```javascript
const age = prompt("Votre âge ?");
if (age > 18) {
    console.log("Majeur");
}
```
**Réponse: `prompt()` retourne une chaîne, pas un nombre** - besoin de `parseInt(age)`

### 13. Que fait ce code ?
```javascript
document.getElementById('fichier').addEventListener('change', function(e) {
    const fichier = e.target.files[0];
    console.log(fichier.name);
});
```
**Réponse: Affiche le nom du fichier sélectionné par l'utilisateur**

### 14. Comment corriger ce code pour gérer les erreurs ?
```javascript
const data = localStorage.getItem('config');
const config = JSON.parse(data);
```
**Réponse:**
```javascript
try {
    const data = localStorage.getItem('config');
    const config = data ? JSON.parse(data) : {};
} catch (error) {
    console.error("Erreur parsing JSON:", error);
}
```

## Questions Pratiques

### 15. Écrivez le code pour sauvegarder un objet utilisateur en localStorage :
```javascript
const utilisateur = {nom: "Alice", age: 25};
// Votre code ici
```
**Réponse:**
```javascript
localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
```

### 16. Comment télécharger un fichier texte généré par JavaScript ?
**Réponse:**
```javascript
function telechargerFichier(contenu, nom) {
    const blob = new Blob([contenu], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nom;
    a.click();
    URL.revokeObjectURL(url);
}
```

### 17. Validez une adresse email avec une regex :
```javascript
function validerEmail(email) {
    // Votre code ici
}
```
**Réponse:**
```javascript
function validerEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
```

### 18. Créez une fonction de debouncing pour limiter les appels :
```javascript
function debounce(func, delai) {
    // Votre code ici
}
```
**Réponse:**
```javascript
function debounce(func, delai) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delai);
    };
}
```

## Questions sur Node.js

### 19. Comment lire un fichier de manière asynchrone en Node.js ?
**Réponse:**
```javascript
const fs = require('fs');
fs.readFile('fichier.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

### 20. Comment récupérer des arguments de ligne de commande en Node.js ?
```javascript
// node script.js arg1 arg2
const args = // Votre code ici
```
**Réponse:**
```javascript
const args = process.argv.slice(2);
```

### 21. Comment créer une interface de saisie interactive en Node.js ?
**Réponse:**
```javascript
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Votre nom ? ', (nom) => {
    console.log(`Bonjour ${nom}`);
    rl.close();
});
```

## Questions sur les APIs

### 22. Comment envoyer des données JSON avec fetch() ?
**Réponse:**
```javascript
fetch('/api/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
```

### 23. Comment gérer les erreurs avec fetch() ?
**Réponse:**
```javascript
fetch('/api/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Erreur:', error));
```

### 24. Comment implémenter un timeout sur une requête fetch() ?
**Réponse:**
```javascript
function fetchAvecTimeout(url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
}
```

## Questions de Sécurité

### 25. Pourquoi faut-il valider les entrées utilisateur ?
**Réponse:** Pour éviter les failles de sécurité (XSS, injection), les erreurs d'application, et garantir l'intégrité des données

### 26. Comment échapper du HTML pour éviter les attaques XSS ?
**Réponse:**
```javascript
function echapperHTML(texte) {
    const div = document.createElement('div');
    div.textContent = texte;
    return div.innerHTML;
}
```

### 27. Que faire si une entrée utilisateur contient du code malveillant ?
**Réponse:** Rejeter l'entrée, nettoyer le contenu, logger l'incident, et informer l'utilisateur avec un message d'erreur approprié

## Questions de Performance

### 28. Pourquoi utiliser le debouncing pour les recherches en temps réel ?
**Réponse:** Pour éviter trop de requêtes serveur lors de la frappe et améliorer les performances

### 29. Quelle est la différence entre les opérations synchrones et asynchrones pour les I/O ?
**Réponse:** Synchrone bloque l'exécution jusqu'à completion, asynchrone permet la continuité du programme

### 30. Comment optimiser les opérations de lecture/écriture de fichiers volumineux ?
**Réponse:** Utiliser des streams, traiter par chunks, et implémenter la lecture/écriture asynchrone

## Questions de Débogage

### 31. Comment déboguer un problème de formulaire qui ne se soumet pas ?
**Réponse:** 
1. Vérifier les événements attachés
2. Contrôler `event.preventDefault()`
3. Valider les champs requis
4. Vérifier la console pour les erreurs JavaScript

### 32. Que faire si `localStorage.getItem()` retourne `null` ?
**Réponse:** Vérifier si la clé existe, utiliser une valeur par défaut, ou initialiser le stockage

### 33. Comment diagnostiquer une erreur CORS ?
**Réponse:** Vérifier la console, confirmer l'origine et la destination, contrôler les headers serveur, tester avec un proxy de développement

## Notation
- **30-33 correct**: Maîtrise experte des entrées-sorties
- **27-29 correct**: Excellente compréhension, quelques détails à approfondir
- **24-26 correct**: Bonne connaissance, pratiquer les cas avancés
- **20-23 correct**: Compréhension de base solide, développer l'expertise
- **16-19 correct**: Bases acquises, se concentrer sur la validation et sécurité
- **Moins de 16**: Réviser les concepts fondamentaux et pratiquer les exemples