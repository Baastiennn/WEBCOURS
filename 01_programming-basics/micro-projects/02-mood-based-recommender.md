# 🎭 Micro-Projet 2 : Recommandeur Basé sur l'Humeur

> **Modules intégrés :** Variables + Conditions + Input-Output  
> **Durée :** 45 minutes  
> **Difficulté :** ⭐⭐⭐☆☆

## 🎯 Le Problème Humain

Quand on se sent triste, énervé, ou euphorique, on ne sait jamais quoi faire pour améliorer notre état ou canaliser nos émotions. Les recommandations génériques ne fonctionnent pas car elles ignorent notre humeur du moment et notre personnalité.

## 🌟 Votre Mission

Créer un assistant intelligent qui :
- Analyse votre humeur actuelle sur une échelle précise
- Considère vos préférences personnelles (introverti/extraverti, actif/calme)
- Recommande des activités personnalisées selon votre état
- Se souvient de ce qui a fonctionné pour vous dans le passé
- S'adapte selon l'heure et vos contraintes du moment

## 💻 Code de Base

### HTML (index.html)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recommandeur d'Humeur</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🎭 Que faire selon ton humeur ?</h1>
        
        <!-- Analyse d'humeur -->
        <section class="mood-analysis">
            <h2>Comment te sens-tu maintenant ?</h2>
            
            <div class="mood-scale">
                <label>Énergie (1 = fatigué, 10 = plein d'énergie)</label>
                <input type="range" id="energy-level" min="1" max="10" value="5">
                <span id="energy-display">5</span>
            </div>
            
            <div class="mood-scale">
                <label>Humeur (1 = triste, 10 = euphorique)</label>
                <input type="range" id="mood-level" min="1" max="10" value="5">
                <span id="mood-display">5</span>
            </div>
            
            <div class="mood-scale">
                <label>Stress (1 = détendu, 10 = très stressé)</label>
                <input type="range" id="stress-level" min="1" max="10" value="5">
                <span id="stress-display">5</span>
            </div>
            
            <div class="preferences">
                <label>Tu es plutôt...</label>
                <select id="personality-type">
                    <option value="introverti">Introverti (j'aime le calme)</option>
                    <option value="extraverti">Extraverti (j'aime l'action)</option>
                    <option value="mixte">Un peu des deux</option>
                </select>
            </div>
            
            <div class="constraints">
                <label>Contraintes actuelles</label>
                <div class="checkbox-group">
                    <label><input type="checkbox" id="has-time"> J'ai du temps (1h+)</label>
                    <label><input type="checkbox" id="has-money"> J'ai un budget</label>
                    <label><input type="checkbox" id="at-home"> Je suis chez moi</label>
                    <label><input type="checkbox" id="with-people"> Je suis avec quelqu'un</label>
                </div>
            </div>
            
            <button id="get-recommendation">💡 Que me conseilles-tu ?</button>
        </section>
        
        <!-- Recommandations -->
        <section id="recommendations" class="recommendations hidden">
            <h2>🎯 Recommandations personnalisées</h2>
            
            <div id="primary-recommendation" class="recommendation-card primary">
                <h3 id="primary-title"></h3>
                <p id="primary-description"></p>
                <div id="primary-benefits"></div>
            </div>
            
            <div class="alternative-recommendations">
                <h3>Autres idées</h3>
                <div id="alternative-list"></div>
            </div>
            
            <div class="feedback">
                <p>Cette recommandation t'a aidé ?</p>
                <button id="feedback-yes" data-rating="positive">👍 Oui !</button>
                <button id="feedback-no" data-rating="negative">👎 Pas vraiment</button>
                <button id="feedback-meh" data-rating="neutral">🤷 Moyennement</button>
            </div>
            
            <button id="try-again">🔄 Autre recommandation</button>
        </section>
        
        <!-- Historique -->
        <section class="history">
            <details>
                <summary>📊 Mon historique</summary>
                <div id="history-content">
                    <p>Tes recommandations précédentes apparaîtront ici...</p>
                </div>
            </details>
        </section>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

## 🎯 Votre Code à Compléter (script.js)

```javascript
// 🎭 RECOMMANDEUR BASÉ SUR L'HUMEUR
// Micro-projet intégrant Variables + Conditions + Input-Output

// 📊 Variables d'état de l'humeur
let energyLevel = 5;
let moodLevel = 5;
let stressLevel = 5;
let personalityType = 'mixte';

// 🎯 Variables de contexte
let hasTime = false;
let hasMoney = false;
let atHome = false;
let withPeople = false;
let currentHour = new Date().getHours();

// 📈 Variables d'historique
let recommendationHistory = [];
let userFeedback = {};

// 🎨 Variables DOM
const energySlider = document.getElementById('energy-level');
const moodSlider = document.getElementById('mood-level');
const stressSlider = document.getElementById('stress-level');
const recommendationsSection = document.getElementById('recommendations');

// 📚 Base de données des recommandations
const recommendationsDatabase = {
    // Recommandations pour énergie FAIBLE (1-3)
    lowEnergy: {
        lowMood: [
            { activity: "Écouter de la musique douce", description: "Laisse-toi porter par des mélodies apaisantes", benefits: ["Réconfort", "Détente"], time: 15, cost: 0, location: "home" },
            { activity: "Prendre un bain chaud", description: "Un moment cocooning pour te ressourcer", benefits: ["Relaxation", "Chaleur réconfortante"], time: 30, cost: 0, location: "home" },
            { activity: "Regarder des vidéos de chatons", description: "Parce que ça marche toujours !", benefits: ["Sourires garantis", "Réconfort"], time: 10, cost: 0, location: "any" }
        ],
        neutralMood: [
            { activity: "Méditation guidée 10 min", description: "Recentre-toi avec une méditation douce", benefits: ["Calme mental", "Energie restaurée"], time: 10, cost: 0, location: "any" },
            { activity: "Lire quelques pages d'un livre", description: "Évade-toi dans une autre histoire", benefits: ["Évasion", "Stimulation douce"], time: 20, cost: 0, location: "any" }
        ],
        highMood: [
            { activity: "Appeler un ami proche", description: "Partage ta bonne humeur !", benefits: ["Connexion", "Partage de joie"], time: 30, cost: 0, location: "any" },
            { activity: "Planifier quelque chose d'excitant", description: "Organise un projet qui te fait plaisir", benefits: ["Anticipation", "Créativité"], time: 45, cost: 0, location: "any" }
        ]
    },
    
    // TODO: Ajouter mediumEnergy et highEnergy avec leurs recommandations
    
    // Recommandations spéciales pour stress élevé
    highStress: [
        { activity: "Respiration 4-7-8", description: "Technique de respiration anti-stress", benefits: ["Calme immédiat", "Réduction stress"], time: 5, cost: 0, location: "any" },
        { activity: "Sortir prendre l'air", description: "Change d'environnement quelques minutes", benefits: ["Air frais", "Perspective"], time: 15, cost: 0, location: "outside" }
    ]
};

// 🚀 Initialisation de l'application
function initializeApp() {
    // TODO: Charger l'historique depuis localStorage
    loadUserHistory();
    
    // TODO: Configurer les event listeners pour les sliders
    setupSliderListeners();
    
    // TODO: Configurer le bouton de recommandation
    document.getElementById('get-recommendation').addEventListener('click', generateRecommendation);
    
    // TODO: Configurer les boutons de feedback
    setupFeedbackListeners();
}

// 🎚️ Fonction pour configurer les sliders
function setupSliderListeners() {
    // TODO: Mettre à jour energyLevel et l'affichage quand energySlider change
    energySlider.addEventListener('input', function() {
        energyLevel = parseInt(this.value);
        document.getElementById('energy-display').textContent = energyLevel;
    });
    
    // TODO: Faire pareil pour moodSlider et stressSlider
}

// 🧠 Fonction principale de génération de recommandation
function generateRecommendation() {
    // TODO: Récupérer toutes les valeurs actuelles
    collectCurrentState();
    
    // TODO: Analyser l'état de l'utilisateur
    const userState = analyzeUserState();
    
    // TODO: Générer la recommandation appropriée
    const recommendation = selectBestRecommendation(userState);
    
    // TODO: Afficher la recommandation
    displayRecommendation(recommendation);
    
    // TODO: Sauvegarder dans l'historique
    saveToHistory(userState, recommendation);
}

// 📋 Fonction pour collecter l'état actuel
function collectCurrentState() {
    // TODO: Mettre à jour toutes les variables depuis l'interface
    energyLevel = parseInt(document.getElementById('energy-level').value);
    moodLevel = parseInt(document.getElementById('mood-level').value);
    stressLevel = parseInt(document.getElementById('stress-level').value);
    personalityType = document.getElementById('personality-type').value;
    
    // TODO: Récupérer les contraintes (checkboxes)
    hasTime = document.getElementById('has-time').checked;
    hasMoney = document.getElementById('has-money').checked;
    atHome = document.getElementById('at-home').checked;
    withPeople = document.getElementById('with-people').checked;
    
    currentHour = new Date().getHours();
}

// 🔍 Fonction d'analyse de l'état utilisateur
function analyzeUserState() {
    let analysis = {
        energyCategory: '',
        moodCategory: '',
        stressCategory: '',
        timeOfDay: '',
        constraints: []
    };
    
    // TODO: Catégoriser l'énergie
    if (energyLevel <= 3) {
        analysis.energyCategory = 'low';
    } else if (energyLevel <= 7) {
        analysis.energyCategory = 'medium';
    } else {
        analysis.energyCategory = 'high';
    }
    
    // TODO: Catégoriser l'humeur
    if (moodLevel <= 3) {
        analysis.moodCategory = 'low';
    } else if (moodLevel <= 7) {
        analysis.moodCategory = 'neutral';
    } else {
        analysis.moodCategory = 'high';
    }
    
    // TODO: Catégoriser le stress (si > 7, c'est prioritaire)
    analysis.stressCategory = stressLevel > 7 ? 'high' : 'normal';
    
    // TODO: Déterminer le moment de la journée
    if (currentHour < 6) {
        analysis.timeOfDay = 'earlyMorning';
    } else if (currentHour < 12) {
        analysis.timeOfDay = 'morning';
    } else if (currentHour < 18) {
        analysis.timeOfDay = 'afternoon';
    } else if (currentHour < 22) {
        analysis.timeOfDay = 'evening';
    } else {
        analysis.timeOfDay = 'night';
    }
    
    return analysis;
}

// 🎯 Fonction de sélection de la meilleure recommandation
function selectBestRecommendation(userState) {
    let candidates = [];
    
    // TODO: Si stress élevé, priorité aux activités anti-stress
    if (userState.stressCategory === 'high') {
        candidates = [...recommendationsDatabase.highStress];
    } else {
        // TODO: Sélectionner selon énergie + humeur
        if (userState.energyCategory === 'low') {
            if (userState.moodCategory === 'low') {
                candidates = [...recommendationsDatabase.lowEnergy.lowMood];
            } else if (userState.moodCategory === 'neutral') {
                candidates = [...recommendationsDatabase.lowEnergy.neutralMood];
            } else {
                candidates = [...recommendationsDatabase.lowEnergy.highMood];
            }
        }
        // TODO: Ajouter les cas pour medium et high energy
    }
    
    // TODO: Filtrer selon les contraintes
    candidates = filterByConstraints(candidates);
    
    // TODO: Favoriser les activités qui ont reçu des feedbacks positifs
    candidates = scoreByHistory(candidates);
    
    // TODO: Retourner la meilleure option ou une au hasard si égalité
    return candidates.length > 0 ? candidates[0] : getDefaultRecommendation();
}

// 🔧 Fonction de filtrage par contraintes
function filterByConstraints(recommendations) {
    return recommendations.filter(rec => {
        // TODO: Vérifier les contraintes de temps
        if (!hasTime && rec.time > 30) return false;
        
        // TODO: Vérifier les contraintes de budget
        if (!hasMoney && rec.cost > 0) return false;
        
        // TODO: Vérifier les contraintes de lieu
        if (atHome && rec.location === 'outside') return false;
        if (!atHome && rec.location === 'home') return false;
        
        return true;
    });
}

// ⭐ Fonction de scoring basé sur l'historique
function scoreByHistory(recommendations) {
    // TODO: Ajouter un score basé sur les feedbacks précédents
    return recommendations.map(rec => {
        const feedback = userFeedback[rec.activity] || { positive: 0, negative: 0 };
        rec.score = feedback.positive - feedback.negative;
        return rec;
    }).sort((a, b) => b.score - a.score);
}

// 🎨 Fonction d'affichage de la recommandation
function displayRecommendation(recommendation) {
    // TODO: Remplir les éléments de la recommandation principale
    document.getElementById('primary-title').textContent = recommendation.activity;
    document.getElementById('primary-description').textContent = recommendation.description;
    
    // TODO: Afficher les bénéfices
    const benefitsHtml = recommendation.benefits.map(benefit => 
        `<span class="benefit-tag">${benefit}</span>`
    ).join('');
    document.getElementById('primary-benefits').innerHTML = benefitsHtml;
    
    // TODO: Montrer la section des recommandations
    recommendationsSection.classList.remove('hidden');
    
    // TODO: Scroll vers les résultats
    recommendationsSection.scrollIntoView({ behavior: 'smooth' });
}

// 💾 Fonction de sauvegarde dans l'historique
function saveToHistory(userState, recommendation) {
    const historyEntry = {
        timestamp: new Date().toISOString(),
        userState: userState,
        recommendation: recommendation,
        feedback: null
    };
    
    recommendationHistory.unshift(historyEntry);
    
    // TODO: Garder seulement les 20 dernières entrées
    if (recommendationHistory.length > 20) {
        recommendationHistory = recommendationHistory.slice(0, 20);
    }
    
    // TODO: Sauvegarder dans localStorage
    localStorage.setItem('moodRecommenderHistory', JSON.stringify(recommendationHistory));
}

// 📚 Fonction de chargement de l'historique
function loadUserHistory() {
    // TODO: Charger depuis localStorage
    const saved = localStorage.getItem('moodRecommenderHistory');
    if (saved) {
        recommendationHistory = JSON.parse(saved);
    }
    
    // TODO: Charger les feedbacks
    const savedFeedback = localStorage.getItem('moodRecommenderFeedback');
    if (savedFeedback) {
        userFeedback = JSON.parse(savedFeedback);
    }
}

// 👍 Fonction de gestion du feedback
function setupFeedbackListeners() {
    document.getElementById('feedback-yes').addEventListener('click', () => recordFeedback('positive'));
    document.getElementById('feedback-no').addEventListener('click', () => recordFeedback('negative'));
    document.getElementById('feedback-meh').addEventListener('click', () => recordFeedback('neutral'));
}

function recordFeedback(rating) {
    // TODO: Enregistrer le feedback pour la recommandation actuelle
    const lastRecommendation = recommendationHistory[0];
    if (lastRecommendation) {
        lastRecommendation.feedback = rating;
        
        // TODO: Mettre à jour les stats globales
        const activity = lastRecommendation.recommendation.activity;
        if (!userFeedback[activity]) {
            userFeedback[activity] = { positive: 0, negative: 0, neutral: 0 };
        }
        userFeedback[activity][rating]++;
        
        // TODO: Sauvegarder
        localStorage.setItem('moodRecommenderFeedback', JSON.stringify(userFeedback));
        
        // TODO: Afficher un message de remerciement
        showFeedbackThanks(rating);
    }
}

// 🎉 Fonction de remerciement pour feedback
function showFeedbackThanks(rating) {
    const messages = {
        positive: "Super ! On s'en souviendra pour les prochaines fois 👍",
        negative: "Merci pour ton retour, on ajustera nos suggestions 💪",
        neutral: "OK, on prendra ça en compte pour mieux te conseiller 👌"
    };
    
    // TODO: Afficher le message temporairement
    const feedbackDiv = document.querySelector('.feedback');
    const thankYou = document.createElement('p');
    thankYou.textContent = messages[rating];
    thankYou.className = 'feedback-thanks';
    feedbackDiv.appendChild(thankYou);
    
    setTimeout(() => thankYou.remove(), 3000);
}

// 🔄 Fonction de recommandation par défaut
function getDefaultRecommendation() {
    return {
        activity: "Prendre 5 minutes pour respirer",
        description: "Parfois, la meilleure chose à faire c'est juste de respirer",
        benefits: ["Simplicité", "Toujours accessible"],
        time: 5,
        cost: 0,
        location: "any"
    };
}

// 🚀 Initialisation
initializeApp();
```

## ✅ Critères de Réussite

### **Intelligence des Recommandations**
- [x] Les suggestions changent selon l'humeur/énergie/stress
- [x] Les contraintes (temps, argent, lieu) sont respectées
- [x] Le système apprend des feedbacks utilisateur
- [x] Cas de stress élevé traité en priorité

### **Expérience Utilisateur**
- [x] Interface intuitive avec sliders visuels
- [x] Recommandations claires avec bénéfices expliqués
- [x] Système de feedback simple
- [x] Historique des recommandations accessible

### **Logic des Conditions**
- [x] Conditions imbriquées (si stress élevé, alors...)
- [x] Conditions composées (énergie ET humeur ET contraintes)
- [x] Conditions dynamiques (heure du jour)
- [x] Conditions d'historique (feedback précédent)

## 🚀 Extensions Possibles

### **Version Améliorée**
- Recommandations selon la météo
- Suggestions d'activités de groupe vs solo
- Mode "découverte" pour sortir de sa zone de confort
- Intégration avec calendrier pour suggestions contextuelles

### **Version Avancée**
- Machine Learning simple pour prédire les préférences
- API de musique pour playlists adaptées à l'humeur
- Géolocalisation pour activités locales
- Partage anonyme de données pour améliorer les recommandations

## 💡 Ce que Vous Apprenez

### **Conditions en Situation Réelle**
- If/else imbriqués pour logique complexe
- Conditions multiples avec &&, ||
- Switch case pour catégorisation
- Conditions booléennes pour contraintes

### **Variables Avancées**
- État d'application complexe avec multiples variables
- Structures de données pour historique
- Variables temporaires pour calculs
- Persistance de données utilisateur

### **Logique Métier**
- Algorithme de scoring et de filtrage
- Prise de décision basée sur multiples facteurs
- Apprentissage simple à partir de feedback
- Gestion d'états d'interface

---

**🎯 Objectif Final :** Une application qui montre la puissance des conditions pour créer une expérience vraiment personnalisée et intelligente !

**⏱️ Temps recommandé :** 45 minutes de code + 15 minutes de test et amélioration