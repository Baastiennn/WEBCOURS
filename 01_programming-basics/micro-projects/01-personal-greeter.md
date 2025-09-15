# 👋 Micro-Projet 1 : Saluteur Personnel Intelligent

> **Modules intégrés :** Variables + Input-Output  
> **Durée :** 30 minutes  
> **Difficulté :** ⭐⭐☆☆☆

## 🎯 Le Problème Humain

Les sites web nous accueillent toujours de façon impersonnelle : "Bonjour utilisateur" ou "Bienvenue sur notre site". Vous voulez créer une expérience plus chaleureuse qui se souvient de vos préférences et s'adapte au moment de la journée.

## 🌟 Votre Mission

Créer un saluteur intelligent qui :
- Retient votre nom après la première visite 
- Adapte son message selon l'heure de la journée
- Se souvient de votre couleur préférée pour personnaliser l'interface
- Compte le nombre de fois que vous revenez

## 💻 Code de Base

### HTML (index.html)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Saluteur Personnel</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1 id="greeting-message">👋 Bonjour !</h1>
        
        <div id="first-visit" class="card">
            <h2>Première visite ?</h2>
            <input type="text" id="user-name" placeholder="Votre prénom">
            <select id="favorite-color">
                <option value="#3498db">Bleu</option>
                <option value="#e74c3c">Rouge</option>
                <option value="#2ecc71">Vert</option>
                <option value="#f39c12">Orange</option>
                <option value="#9b59b6">Violet</option>
            </select>
            <button id="save-preferences">Sauvegarder mes préférences</button>
        </div>
        
        <div id="returning-visitor" class="card hidden">
            <p id="personalized-message"></p>
            <p id="visit-counter"></p>
            <button id="reset-preferences">Nouvelle personne ?</button>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

### CSS (style.css)
```css
:root {
    --primary-color: #3498db;
    --text-color: #2c3e50;
    --bg-color: #ecf0f1;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    margin: 0;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    text-align: center;
    max-width: 400px;
    width: 100%;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--primary-color);
}

.card {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin-bottom: 1rem;
}

.hidden {
    display: none;
}

input, select {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    opacity: 0.9;
}

#personalized-message {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

#visit-counter {
    color: var(--primary-color);
    font-weight: bold;
}
```

## 🎯 Votre Code à Compléter (script.js)

```javascript
// 👋 SALUTEUR PERSONNEL INTELLIGENT
// Micro-projet intégrant Variables + Input-Output

// 📊 Variables d'état de l'application
let userName = '';
let favoriteColor = '';
let visitCount = 0;
let isFirstVisit = true;

// 🎨 Variables pour les éléments DOM
const greetingMessage = document.getElementById('greeting-message');
const firstVisitCard = document.getElementById('first-visit');
const returningVisitorCard = document.getElementById('returning-visitor');
const personalizedMessage = document.getElementById('personalized-message');
const visitCounterElement = document.getElementById('visit-counter');

// ⏰ Variables pour l'heure
const now = new Date();
const currentHour = now.getHours();

// 🚀 Initialisation de l'application
function initializeApp() {
    // TODO: Charger les données sauvegardées depuis localStorage
    // Utilisez les variables : userName, favoriteColor, visitCount, isFirstVisit
    
    if (isFirstVisit) {
        // TODO: Afficher le formulaire de première visite
        // Cachez returningVisitorCard, montrez firstVisitCard
    } else {
        // TODO: Afficher l'accueil personnalisé
        // Montrez returningVisitorCard, cachez firstVisitCard
        // Appelez updateGreetingMessage() et updatePersonalizedInterface()
    }
}

// 🎨 Fonction pour mettre à jour le message d'accueil
function updateGreetingMessage() {
    // TODO: Créer un message personnalisé selon l'heure et le nom
    let timeOfDay = '';
    
    // TODO: Définir timeOfDay selon currentHour
    // 5-11: "Bonjour", 12-17: "Bon après-midi", 18-23: "Bonsoir", 0-4: "Bonne nuit"
    
    // TODO: Créer le message final avec userName et timeOfDay
    let message = ''; // Ex: "Bonjour Alex ! 👋"
    
    // TODO: Mettre à jour greetingMessage.textContent
}

// 🌈 Fonction pour personnaliser l'interface
function updatePersonalizedInterface() {
    // TODO: Changer la couleur primaire CSS avec favoriteColor
    // Utilisez document.documentElement.style.setProperty('--primary-color', favoriteColor)
    
    // TODO: Mettre à jour le message personnalisé
    // Utilisez personalizedMessage.textContent
    
    // TODO: Afficher le compteur de visites
    // Utilisez visitCounterElement.textContent
}

// 💾 Fonction pour sauvegarder les préférences
function savePreferences() {
    // TODO: Récupérer les valeurs des inputs
    const nameInput = document.getElementById('user-name');
    const colorInput = document.getElementById('favorite-color');
    
    // TODO: Mettre à jour les variables userName et favoriteColor
    
    // TODO: Mettre à jour visitCount et isFirstVisit
    
    // TODO: Sauvegarder dans localStorage
    // localStorage.setItem('userName', userName);
    // localStorage.setItem('favoriteColor', favoriteColor);
    // localStorage.setItem('visitCount', visitCount);
    // localStorage.setItem('isFirstVisit', isFirstVisit);
    
    // TODO: Actualiser l'affichage
    // Appelez updateGreetingMessage(), updatePersonalizedInterface()
    // Cachez firstVisitCard, montrez returningVisitorCard
}

// 🔄 Fonction pour charger les données sauvegardées
function loadSavedData() {
    // TODO: Récupérer les données depuis localStorage
    // const savedName = localStorage.getItem('userName');
    // Etc...
    
    // TODO: Mettre à jour les variables si les données existent
    // if (savedName) { userName = savedName; }
    
    // TODO: Incrémenter visitCount si ce n'est pas la première visite
}

// 🗑️ Fonction pour réinitialiser les préférences
function resetPreferences() {
    // TODO: Remettre toutes les variables à leur état initial
    
    // TODO: Vider localStorage
    // localStorage.clear();
    
    // TODO: Actualiser l'affichage
    // Retour à l'écran de première visite
}

// 🎯 Event Listeners
document.getElementById('save-preferences').addEventListener('click', savePreferences);
document.getElementById('reset-preferences').addEventListener('click', resetPreferences);

// 🚀 Démarrage de l'application
loadSavedData();
initializeApp();
```

## ✅ Critères de Réussite

### **Fonctionnalités de Base**
- [x] L'app se souvient de votre nom après fermeture/ouverture
- [x] Le message change selon l'heure de la journée  
- [x] La couleur de l'interface s'adapte à votre préférence
- [x] Le compteur de visites s'incrémente correctement

### **Experience Utilisateur** 
- [x] Interface claire et intuitive
- [x] Transitions fluides entre première visite et retour
- [x] Messages chaleureux et personnalisés
- [x] Possibilité de réinitialiser pour tester

### **Code Quality**
- [x] Variables bien nommées et organisées
- [x] Fonctions modulaires et réutilisables  
- [x] localStorage utilisé correctement
- [x] Gestion des cas d'erreur (pas de nom saisi, etc.)

## 🚀 Extensions Possibles

### **Version Améliorée** 
- Emoji adapté à l'heure (☀️🌅🌙)
- Message spécial pour les anniversaires de première visite
- Suggestions d'activité selon l'heure
- Historique des dernières visites

### **Version Avancée**
- Détection automatique du fuseau horaire
- Personnalisation du message selon la météo (API)
- Mode sombre/clair selon l'heure
- Notifications de bienvenue avec l'API Notification

## 💡 Ce que Vous Apprenez

### **Variables en Action**
- Stockage et manipulation de données utilisateur
- Distinction entre données temporaires et persistantes  
- Organisation logique des variables par responsabilité

### **Input-Output Intégré**  
- Récupération de données utilisateur via formulaires
- Affichage dynamique avec manipulation du DOM
- Persistance avec localStorage

### **Concepts Transversaux**
- Séparation des préoccupations (données/affichage/logique)
- Cycle de vie d'une application (chargement/utilisation/sauvegarde)
- Personnalisation d'expérience utilisateur

---

**🎯 Objectif Final :** À la fin de ce micro-projet, vous aurez créé une expérience personnalisée complète qui montre concrètement pourquoi les variables sont essentielles en programmation !

**⏱️ Temps recommandé :** 30 minutes de code + 15 minutes de personnalisation et test