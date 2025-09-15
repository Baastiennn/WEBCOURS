# 📈 Micro-Projet 3 : Analyseur de Séries d'Habitudes

> **Modules intégrés :** Variables + Conditions + Loops + Functions  
> **Durée :** 60 minutes  
> **Difficulté :** ⭐⭐⭐⭐☆

## 🎯 Le Problème Humain

Quand on essaie de développer de bonnes habitudes (sport, lecture, méditation), c'est difficile de garder la motivation. On ne voit pas nos progrès, on ne comprend pas nos patterns d'échec/réussite, et on ne sait pas quand on risque de "casser" une belle série.

## 🌟 Votre Mission

Créer un analyseur intelligent qui :
- Calcule vos séries actuelles et records personnels  
- Identifie vos patterns de réussite (meilleurs jours, heures)
- Prédit les jours à risque selon vos habitudes passées
- Vous encourage avec des statistiques motivantes
- Propose des défis personnalisés pour progresser

## 💻 Code de Base

### HTML (index.html)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analyseur d'Habitudes</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>📈 Analyseur de Séries d'Habitudes</h1>
        
        <!-- Ajout d'activité -->
        <section class="add-activity">
            <h2>📝 Nouvelle activité</h2>
            <div class="input-group">
                <input type="date" id="activity-date" />
                <select id="activity-type">
                    <option value="sport">🏃 Sport</option>
                    <option value="lecture">📚 Lecture</option>
                    <option value="meditation">🧘 Méditation</option>
                    <option value="code">💻 Code</option>
                    <option value="musique">🎵 Musique</option>
                    <option value="custom">✏️ Autre...</option>
                </select>
                <input type="text" id="custom-activity" placeholder="Nom de l'activité" class="hidden" />
                <input type="number" id="activity-duration" placeholder="Durée (min)" min="1" />
                <button id="add-activity">➕ Ajouter</button>
            </div>
        </section>
        
        <!-- Statistiques globales -->
        <section class="global-stats">
            <h2>📊 Vue d'ensemble</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-number" id="total-days">0</span>
                    <span class="stat-label">Jours actifs</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number" id="current-streak">0</span>
                    <span class="stat-label">Série actuelle</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number" id="best-streak">0</span>
                    <span class="stat-label">Record personnel</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number" id="success-rate">0%</span>
                    <span class="stat-label">Taux de réussite</span>
                </div>
            </div>
        </section>
        
        <!-- Analyse par habitude -->
        <section class="habit-analysis">
            <h2>🎯 Analyse par habitude</h2>
            <select id="habit-selector">
                <option value="">Choisir une habitude...</option>
            </select>
            
            <div id="habit-details" class="habit-details hidden">
                <div class="habit-stats">
                    <h3 id="habit-name"></h3>
                    <div class="habit-metrics">
                        <div class="metric">
                            <span class="metric-label">Série actuelle</span>
                            <span class="metric-value" id="habit-current-streak">0</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Meilleure série</span>
                            <span class="metric-value" id="habit-best-streak">0</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Total sessions</span>
                            <span class="metric-value" id="habit-total-sessions">0</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Temps moyen</span>
                            <span class="metric-value" id="habit-avg-duration">0 min</span>
                        </div>
                    </div>
                </div>
                
                <div class="pattern-analysis">
                    <h4>🔍 Tes patterns</h4>
                    <div id="best-day-analysis"></div>
                    <div id="risk-prediction"></div>
                    <div id="motivation-message"></div>
                </div>
                
                <div class="challenge-suggestion">
                    <h4>🏆 Défi personnalisé</h4>
                    <div id="challenge-content"></div>
                </div>
            </div>
        </section>
        
        <!-- Calendrier visuel -->
        <section class="calendar-view">
            <h2>📅 Calendrier des 30 derniers jours</h2>
            <div id="habit-calendar"></div>
            <div class="legend">
                <span class="legend-item"><span class="day-marker active"></span> Jour actif</span>
                <span class="legend-item"><span class="day-marker inactive"></span> Jour manqué</span>
                <span class="legend-item"><span class="day-marker today"></span> Aujourd'hui</span>
            </div>
        </section>
        
        <!-- Historique détaillé -->
        <section class="detailed-history">
            <details>
                <summary>📋 Historique détaillé</summary>
                <div id="activity-history"></div>
            </details>
        </section>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

## 🎯 Votre Code à Compléter (script.js)

```javascript
// 📈 ANALYSEUR DE SÉRIES D'HABITUDES
// Micro-projet intégrant Variables + Conditions + Loops + Functions

// 📊 Variables principales de données
let activities = []; // Tableau de toutes les activités
let habitStats = {}; // Objet avec stats par type d'habitude
let currentSelectedHabit = '';

// 📅 Variables de temps et calculs
const today = new Date();
const msPerDay = 24 * 60 * 60 * 1000; // Milliseconds dans une journée

// 🎯 Variables DOM principales
const habitSelector = document.getElementById('habit-selector');
const habitDetails = document.getElementById('habit-details');
const globalStats = {
    totalDays: document.getElementById('total-days'),
    currentStreak: document.getElementById('current-streak'),
    bestStreak: document.getElementById('best-streak'),
    successRate: document.getElementById('success-rate')
};

// 🚀 Initialisation de l'application
function initializeApp() {
    // TODO: Charger les données sauvegardées
    loadActivitiesFromStorage();
    
    // TODO: Configurer la date d'aujourd'hui par défaut
    document.getElementById('activity-date').valueAsDate = today;
    
    // TODO: Configurer les event listeners
    setupEventListeners();
    
    // TODO: Calculer et afficher les statistiques initiales
    updateAllStatistics();
    
    // TODO: Générer le calendrier
    generateCalendar();
}

// ➕ Fonction pour ajouter une nouvelle activité
function addActivity() {
    // TODO: Récupérer les valeurs du formulaire
    const date = document.getElementById('activity-date').value;
    const type = document.getElementById('activity-type').value;
    const duration = parseInt(document.getElementById('activity-duration').value);
    
    // TODO: Gérer le cas "custom"
    let activityName = type;
    if (type === 'custom') {
        activityName = document.getElementById('custom-activity').value.trim();
        if (!activityName) {
            alert('Veuillez nommer votre activité personnalisée');
            return;
        }
    }
    
    // TODO: Valider les données
    if (!date || !duration || duration <= 0) {
        alert('Veuillez remplir tous les champs correctement');
        return;
    }
    
    // TODO: Créer l'objet activité
    const activity = {
        id: generateId(),
        date: date,
        type: activityName,
        duration: duration,
        timestamp: new Date().toISOString()
    };
    
    // TODO: Ajouter à la liste et sauvegarder
    activities.push(activity);
    saveActivitiesToStorage();
    
    // TODO: Mettre à jour toutes les statistiques
    updateAllStatistics();
    updateHabitSelector();
    generateCalendar();
    
    // TODO: Reset le formulaire
    resetForm();
    
    // TODO: Message de confirmation
    showConfirmationMessage('Activité ajoutée ! 🎉');
}

// 📊 Fonction principale de calcul des statistiques
function updateAllStatistics() {
    // TODO: Calculer les stats globales
    updateGlobalStatistics();
    
    // TODO: Calculer les stats par habitude
    calculateHabitStatistics();
    
    // TODO: Mettre à jour le sélecteur d'habitudes
    updateHabitSelector();
    
    // TODO: Si une habitude est sélectionnée, mettre à jour son analyse
    if (currentSelectedHabit) {
        analyzeSelectedHabit(currentSelectedHabit);
    }
}

// 🌍 Fonction de calcul des statistiques globales
function updateGlobalStatistics() {
    if (activities.length === 0) {
        // TODO: Remettre tous les compteurs à zéro
        globalStats.totalDays.textContent = '0';
        globalStats.currentStreak.textContent = '0';
        globalStats.bestStreak.textContent = '0';
        globalStats.successRate.textContent = '0%';
        return;
    }
    
    // TODO: Calculer le nombre de jours uniques avec activité
    const uniqueDays = getUniqueDates(activities);
    globalStats.totalDays.textContent = uniqueDays.length;
    
    // TODO: Calculer la série actuelle (jours consécutifs jusqu'à aujourd'hui)
    const currentStreak = calculateCurrentGlobalStreak();
    globalStats.currentStreak.textContent = currentStreak;
    
    // TODO: Calculer la meilleure série historique
    const bestStreak = calculateBestGlobalStreak();
    globalStats.bestStreak.textContent = bestStreak;
    
    // TODO: Calculer le taux de réussite (jours actifs / jours depuis première activité)
    const successRate = calculateSuccessRate(uniqueDays);
    globalStats.successRate.textContent = successRate + '%';
}

// 📈 Fonction de calcul des statistiques par habitude
function calculateHabitStatistics() {
    habitStats = {};
    
    // TODO: Grouper les activités par type
    const activitiesByType = groupActivitiesByType(activities);
    
    // TODO: Pour chaque type d'habitude, calculer les métriques
    for (const habitType in activitiesByType) {
        const habitActivities = activitiesByType[habitType];
        
        habitStats[habitType] = {
            activities: habitActivities,
            totalSessions: habitActivities.length,
            uniqueDays: getUniqueDates(habitActivities),
            currentStreak: calculateCurrentStreakForHabit(habitActivities),
            bestStreak: calculateBestStreakForHabit(habitActivities),
            averageDuration: calculateAverageDuration(habitActivities),
            bestDay: findBestDayPattern(habitActivities),
            riskPrediction: predictRiskDays(habitActivities)
        };
    }
}

// 🎯 Fonction d'analyse de l'habitude sélectionnée
function analyzeSelectedHabit(habitType) {
    currentSelectedHabit = habitType;
    const stats = habitStats[habitType];
    
    if (!stats) return;
    
    // TODO: Remplir les métriques de base
    document.getElementById('habit-name').textContent = getHabitEmoji(habitType) + ' ' + habitType;
    document.getElementById('habit-current-streak').textContent = stats.currentStreak;
    document.getElementById('habit-best-streak').textContent = stats.bestStreak;
    document.getElementById('habit-total-sessions').textContent = stats.totalSessions;
    document.getElementById('habit-avg-duration').textContent = Math.round(stats.averageDuration) + ' min';
    
    // TODO: Analyser les patterns et remplir les insights
    displayPatternAnalysis(stats);
    generatePersonalizedChallenge(stats);
    
    // TODO: Montrer la section de détails
    habitDetails.classList.remove('hidden');
}

// 🔍 Fonctions d'analyse de patterns
function findBestDayPattern(activities) {
    // TODO: Analyser quels jours de la semaine sont les plus productifs
    const dayCount = [0, 0, 0, 0, 0, 0, 0]; // Dimanche à Samedi
    
    activities.forEach(activity => {
        const dayOfWeek = new Date(activity.date).getDay();
        dayCount[dayOfWeek]++;
    });
    
    // TODO: Trouver le jour avec le plus d'activités
    const bestDayIndex = dayCount.indexOf(Math.max(...dayCount));
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    
    return {
        day: dayNames[bestDayIndex],
        count: dayCount[bestDayIndex],
        percentage: Math.round((dayCount[bestDayIndex] / activities.length) * 100)
    };
}

function predictRiskDays(activities) {
    // TODO: Identifier les jours où l'utilisateur a tendance à échouer
    // Analyser les trous dans la série et identifier des patterns
    
    const daysSinceLastActivity = getDaysSinceLastActivity(activities);
    const averageGapBetweenActivities = calculateAverageGap(activities);
    
    let riskLevel = 'low';
    let message = '';
    
    if (daysSinceLastActivity > averageGapBetweenActivities * 1.5) {
        riskLevel = 'high';
        message = '⚠️ Attention ! Tu dépasses ton rythme habituel';
    } else if (daysSinceLastActivity > averageGapBetweenActivities) {
        riskLevel = 'medium';
        message = '💛 Tu commences à prendre du retard';
    } else {
        message = '✅ Tu es dans tes temps !';
    }
    
    return { level: riskLevel, message: message };
}

// 🏆 Fonction de génération de défis personnalisés
function generatePersonalizedChallenge(stats) {
    let challenge = '';
    
    // TODO: Générer un défi basé sur les stats actuelles
    if (stats.currentStreak === 0) {
        challenge = '🎯 Objectif : Commencer une nouvelle série de 3 jours !';
    } else if (stats.currentStreak < stats.bestStreak) {
        const daysToRecord = stats.bestStreak - stats.currentStreak + 1;
        challenge = `🏆 Défi : Plus que ${daysToRecord} jours pour battre ton record !`;
    } else if (stats.currentStreak >= stats.bestStreak) {
        challenge = '🌟 Incroyable ! Tu bats ton record. Continue sur 7 jours pour une super série !';
    }
    
    // TODO: Ajouter un défi de durée si pertinent
    if (stats.averageDuration < 30) {
        challenge += '<br>💪 Bonus : Essaie de tenir 30 minutes pour ta prochaine session !';
    }
    
    document.getElementById('challenge-content').innerHTML = challenge;
}

// 🧮 Fonctions utilitaires de calcul
function calculateCurrentGlobalStreak() {
    // TODO: Calculer la série de jours consécutifs jusqu'à aujourd'hui
    const uniqueDays = getUniqueDates(activities).sort();
    if (uniqueDays.length === 0) return 0;
    
    let streak = 0;
    const todayStr = today.toISOString().split('T')[0];
    
    // TODO: Remonter jour par jour depuis aujourd'hui
    for (let i = 0; i >= -30; i--) { // Limite à 30 jours pour éviter les boucles infinies
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() + i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        if (uniqueDays.includes(dateStr)) {
            if (i <= 0) streak++; // Si c'est aujourd'hui ou avant
        } else if (i === 0) {
            // Si pas d'activité aujourd'hui, vérifier hier
            continue;
        } else {
            // Série interrompue
            break;
        }
    }
    
    return streak;
}

function calculateBestGlobalStreak() {
    // TODO: Trouver la plus longue série de jours consécutifs dans l'historique
    const uniqueDays = getUniqueDates(activities).sort();
    if (uniqueDays.length === 0) return 0;
    
    let maxStreak = 0;
    let currentStreak = 1;
    
    for (let i = 1; i < uniqueDays.length; i++) {
        const prevDate = new Date(uniqueDays[i-1]);
        const currDate = new Date(uniqueDays[i]);
        const daysDiff = (currDate - prevDate) / msPerDay;
        
        if (daysDiff === 1) {
            currentStreak++;
        } else {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 1;
        }
    }
    
    return Math.max(maxStreak, currentStreak);
}

// 🛠️ Fonctions utilitaires
function getUniqueDates(activitiesList) {
    // TODO: Extraire les dates uniques d'une liste d'activités
    const dates = activitiesList.map(activity => activity.date);
    return [...new Set(dates)];
}

function groupActivitiesByType(activitiesList) {
    // TODO: Grouper les activités par type/nom
    const grouped = {};
    
    activitiesList.forEach(activity => {
        if (!grouped[activity.type]) {
            grouped[activity.type] = [];
        }
        grouped[activity.type].push(activity);
    });
    
    return grouped;
}

function calculateAverageDuration(activitiesList) {
    // TODO: Calculer la durée moyenne des activités
    if (activitiesList.length === 0) return 0;
    
    const totalDuration = activitiesList.reduce((sum, activity) => sum + activity.duration, 0);
    return totalDuration / activitiesList.length;\n}\n\nfunction generateId() {\n    // TODO: Générer un ID unique simple\n    return Date.now() + Math.random().toString(36).substr(2, 9);\n}\n\nfunction getHabitEmoji(habitType) {\n    // TODO: Retourner l'emoji approprié selon le type d'habitude\n    const emojis = {\n        sport: '🏃',\n        lecture: '📚',\n        meditation: '🧘',\n        code: '💻',\n        musique: '🎵'\n    };\n    return emojis[habitType] || '✨';\n}\n\n// 📅 Fonction de génération du calendrier\nfunction generateCalendar() {\n    const calendar = document.getElementById('habit-calendar');\n    calendar.innerHTML = '';\n    \n    // TODO: Générer les 30 derniers jours\n    const uniqueDays = getUniqueDates(activities);\n    \n    for (let i = 29; i >= 0; i--) {\n        const date = new Date(today);\n        date.setDate(date.getDate() - i);\n        const dateStr = date.toISOString().split('T')[0];\n        \n        const dayElement = document.createElement('div');\n        dayElement.className = 'calendar-day';\n        dayElement.textContent = date.getDate();\n        \n        // TODO: Ajouter les classes CSS appropriées\n        if (uniqueDays.includes(dateStr)) {\n            dayElement.classList.add('active');\n        } else {\n            dayElement.classList.add('inactive');\n        }\n        \n        if (i === 0) {\n            dayElement.classList.add('today');\n        }\n        \n        calendar.appendChild(dayElement);\n    }\n}\n\n// 🎯 Event Listeners\nfunction setupEventListeners() {\n    // TODO: Bouton d'ajout d'activité\n    document.getElementById('add-activity').addEventListener('click', addActivity);\n    \n    // TODO: Sélecteur de type d'activité\n    document.getElementById('activity-type').addEventListener('change', function() {\n        const customInput = document.getElementById('custom-activity');\n        if (this.value === 'custom') {\n            customInput.classList.remove('hidden');\n        } else {\n            customInput.classList.add('hidden');\n        }\n    });\n    \n    // TODO: Sélecteur d'habitude pour l'analyse\n    habitSelector.addEventListener('change', function() {\n        if (this.value) {\n            analyzeSelectedHabit(this.value);\n        } else {\n            habitDetails.classList.add('hidden');\n        }\n    });\n}\n\n// 💾 Fonctions de sauvegarde/chargement\nfunction saveActivitiesToStorage() {\n    // TODO: Sauvegarder les activités dans localStorage\n    localStorage.setItem('habitAnalyzerActivities', JSON.stringify(activities));\n}\n\nfunction loadActivitiesFromStorage() {\n    // TODO: Charger les activités depuis localStorage\n    const saved = localStorage.getItem('habitAnalyzerActivities');\n    if (saved) {\n        activities = JSON.parse(saved);\n    }\n}\n\n// 🎨 Fonctions d'interface\nfunction updateHabitSelector() {\n    // TODO: Mettre à jour la liste des habitudes disponibles\n    const habitTypes = Object.keys(habitStats);\n    \n    habitSelector.innerHTML = '<option value=\"\">Choisir une habitude...</option>';\n    \n    habitTypes.forEach(habitType => {\n        const option = document.createElement('option');\n        option.value = habitType;\n        option.textContent = getHabitEmoji(habitType) + ' ' + habitType;\n        habitSelector.appendChild(option);\n    });\n}\n\nfunction displayPatternAnalysis(stats) {\n    // TODO: Afficher l'analyse des patterns\n    const bestDayDiv = document.getElementById('best-day-analysis');\n    bestDayDiv.innerHTML = `🗓️ <strong>Ton meilleur jour :</strong> ${stats.bestDay.day} (${stats.bestDay.percentage}% de tes sessions)`;\n    \n    const riskDiv = document.getElementById('risk-prediction');\n    riskDiv.innerHTML = stats.riskPrediction.message;\n    \n    const motivationDiv = document.getElementById('motivation-message');\n    motivationDiv.innerHTML = generateMotivationMessage(stats);\n}\n\nfunction generateMotivationMessage(stats) {\n    // TODO: Générer un message de motivation personnalisé\n    const messages = [\n        `🔥 Tu as une série de ${stats.currentStreak} jours ! Impressionnant !`,\n        `💪 ${stats.totalSessions} sessions au total, tu progresses !`,\n        `⭐ Ton record est de ${stats.bestStreak} jours consécutifs`,\n        `📊 Tu fais en moyenne ${Math.round(stats.averageDuration)} minutes par session`\n    ];\n    \n    return messages[Math.floor(Math.random() * messages.length)];\n}\n\nfunction resetForm() {\n    // TODO: Remettre le formulaire à zéro\n    document.getElementById('activity-duration').value = '';\n    document.getElementById('custom-activity').value = '';\n    document.getElementById('custom-activity').classList.add('hidden');\n    document.getElementById('activity-type').value = 'sport';\n}\n\nfunction showConfirmationMessage(message) {\n    // TODO: Afficher un message de confirmation temporaire\n    const confirmDiv = document.createElement('div');\n    confirmDiv.className = 'confirmation-message';\n    confirmDiv.textContent = message;\n    document.body.appendChild(confirmDiv);\n    \n    setTimeout(() => {\n        confirmDiv.remove();\n    }, 2000);\n}\n\n// 🚀 Initialisation\ninitializeApp();"
        ```

## ✅ Critères de Réussite

### **Fonctionnalités Core**
- [x] Calcul correct des séries actuelles et records
- [x] Statistiques globales précises (jours actifs, taux de réussite)  
- [x] Analyse individuelle par type d'habitude
- [x] Calendrier visuel des 30 derniers jours

### **Intelligence des Analyses**
- [x] Détection des patterns de jours préférés
- [x] Prédiction des jours à risque d'échec
- [x] Génération de défis personnalisés
- [x] Messages de motivation adaptatifs

### **Code Quality avec Loops & Functions**
- [x] Loops pour parcourir historique et calculer séries
- [x] Functions modulaires pour chaque type de calcul
- [x] Algorithmes efficaces pour les statistiques
- [x] Gestion propre des données temporelles

## 🚀 Extensions Possibles

### **Version Améliorée**
- Graphiques de progression avec Chart.js
- Comparaisons entre habitudes différentes
- Export PDF de rapport mensuel
- Objectifs SMART avec suivi de progression

### **Version Avancée**  
- Machine Learning pour prédictions plus précises
- Synchronisation cloud pour multi-devices
- Gamification avec points et niveaux
- Notifications push personnalisées

## 💡 Ce que Vous Apprenez

### **Loops en Situation Complexe**
- For loops pour parcourir historiques
- While loops pour calculs de séries consécutives
- ForEach pour traitement de données groupées
- Loops imbriqués pour analyses multi-dimensionnelles

### **Functions Avancées**
- Functions pures pour calculs mathématiques
- Functions avec multiples paramètres et retours
- Composition de functions pour analyses complexes
- Functions d'utilitaires réutilisables

### **Logique Algorithmique**
- Algorithmes de détection de patterns temporels
- Calculs statistiques (moyennes, pourcentages, tendances)
- Algorithmes de prédiction basés sur l'historique
- Optimisation de performance pour gros datasets

### **Architecture de Données**
- Structures de données complexes imbriquées
- Transformation et groupement de données
- Gestion d'état d'application avec multiples variables
- Persistance et synchronisation localStorage

---

**🎯 Objectif Final :** Maîtriser loops et functions dans un contexte d'analyse de données réelles avec valeur utilisateur immédiate !

**⏱️ Temps recommandé :** 60 minutes de code + 30 minutes d'analyse et optimisation