# 🌸 Dashboard de Bien-être Personnel

## 😫 Le Problème Humain

On surveille nos stats de productivité (emails, tâches, heures travaillées) mais on ignore complètement notre bien-être mental et physique au quotidien. Résultat : burn-out, fatigue chronique, et on ne comprend pas pourquoi on va mal parce qu'on n'a jamais pris le temps d'observer nos patterns.

## 🎯 Votre Mission

Créer une interface simple et rapide (30 secondes max) pour tracker quotidiennement son humeur, énergie, sommeil et stress, puis identifier les patterns qui impactent votre bien-être.

## 👥 User Stories (Phase Design - 30 min)

### 🎯 User Story Principal
> **En tant que** personne soucieuse de son équilibre vie/santé mentale  
> **Je veux** un moyen simple de tracker mon bien-être quotidien  
> **Pour que** je comprenne mes patterns et améliore ma qualité de vie

### 📋 User Stories Détaillées
1. **Check-in quotidien rapide** : "En 30 secondes le matin, je veux indiquer mon état général"
2. **Visualiser mes tendances** : "Je veux voir l'évolution sur 1 mois avec des graphiques clairs"
3. **Identifier des patterns** : "Je veux voir les corrélations (mauvais sommeil → mauvaise humeur)"
4. **Recevoir des insights** : "Je veux des observations personnalisées sur mes données"
5. **Exporter pour médecin** : "Je veux pouvoir montrer mes données à un professionnel"

## 🧠 Modules Programming-Basics Intégrés

- **OOP-basics** : Classes WellnessEntry, Pattern, Insight
- **Data-Structures** : Arrays pour historique, Objects pour métriques quotidiennes
- **Functions** : Calculs de moyennes, détection de patterns, génération d'insights
- **Input-Output** : Interface de saisie rapide, visualisations graphiques
- **Error-Handling** : Validation des données, gestion des données manquantes

## 🏗️ Architecture Technique (Phase Plan - 20 min)

### États de l'Application
1. **État onboarding** : Configuration initiale des métriques importantes
2. **État daily-checkin** : Saisie quotidienne rapide
3. **État dashboard** : Vue d'ensemble avec graphiques et insights
4. **État analysis** : Analyse détaillée des patterns sur périodes

### Structure des Données
```javascript
// Structure principale
const WellnessDashboard = {
    user: {
        id: 1,
        name: "Alice",
        timezone: "Europe/Paris",
        preferences: {
            trackingMetrics: ["mood", "energy", "sleep", "stress", "gratitude"],
            reminderTime: "08:00",
            weekStartsOn: "monday"
        }
    },
    entries: [
        {
            id: 1,
            date: "2024-01-22",
            metrics: {
                mood: 7,        // 1-10 scale
                energy: 6,      // 1-10 scale
                sleep: 7.5,     // hours
                sleepQuality: 8, // 1-10 scale
                stress: 4,      // 1-10 scale
                gratitude: "Projet bien avancé, équipe motivée",
                notes: "Réunion un peu stressante mais productive"
            },
            completedAt: "2024-01-22T08:15:00Z",
            mood_factors: ["work", "weather"], // factors influencing mood
            energy_factors: ["coffee", "exercise"]
        }
    ],
    patterns: [
        {
            id: 1,
            type: "correlation",
            description: "Sommeil < 7h → Humeur -2 points en moyenne",
            confidence: 0.82,
            impact: "high",
            suggestion: "Essayez de dormir 7h+ pour améliorer votre humeur"
        }
    ],
    insights: [
        {
            id: 1,
            type: "weekly_summary",
            period: "2024-W04",
            data: {
                averageMood: 7.2,
                trend: "stable",
                bestDay: "tuesday",
                improvement: "energy levels up 15% vs last week"
            },
            createdAt: "2024-01-28T20:00:00Z"
        }
    ]
};
```

## 🎨 MVP Features (Phase Code - 6-9h)

### ✅ Must Have (Version 1 - 3h)
- [ ] **Check-in quotidien** : 4-5 métriques essentielles (humeur, énergie, sommeil, stress)
- [ ] **Échelles visuelles** : Sliders ou emojis pour saisie rapide
- [ ] **Calendrier de tracking** : Vue mensuelle avec couleurs selon l'humeur
- [ ] **Graphiques de base** : Évolution des métriques sur 30 jours
- [ ] **Moyennes mobiles** : Tendances lissées pour voir les patterns

### 🚀 Should Have (Version 2 - 2h)
- [ ] **Détection de patterns** : Corrélations automatiques entre métriques
- [ ] **Insights personnalisés** : "Vos mardis sont généralement difficiles"
- [ ] **Facteurs d'influence** : Tags pour identifier ce qui affecte l'humeur
- [ ] **Rappels adaptatifs** : Notifications intelligentes selon les habitudes
- [ ] **Comparaisons temporelles** : "Cette semaine vs semaine dernière"

### 💫 Could Have (Version 3 - 4h)
- [ ] **Mode analyse avancée** : Graphiques de corrélation, heatmaps
- [ ] **Export médical** : PDF structuré pour consultations
- [ ] **Objectifs personnalisés** : "Améliorer sommeil", suivi de progrès
- [ ] **Mode équipe/famille** : Tracking collectif (optionnel et anonymisé)
- [ ] **Intégration données** : Sync avec apps de santé (sommeil, activité)

## 📁 Structure des Fichiers

```
06-wellness-dashboard/
├── README.md                 # Ce guide
├── starter-files/
│   ├── index.html           # Interface dashboard
│   ├── style.css            # Styles avec data visualization
│   └── script.js            # Classes et algorithmes d'analyse
└── extensions/
    ├── health-integrations.md # Sync Apple Health, Google Fit
    ├── ai-insights.md        # ML pour détection patterns avancés
    └── professional-reports.md # Export pour professionnels santé
```

## 🛠️ Starter Code

### `starter-files/script.js`
```javascript
// 🌸 WELLNESS DASHBOARD - Architecture OOP

class WellnessDashboard {
    constructor() {
        this.user = null;
        this.entries = [];
        this.patterns = [];
        this.insights = [];
        
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.checkTodaysEntry();
        this.renderInterface();
        this.setupEventListeners();
        console.log('🌸 Wellness Dashboard initialized!');
    }
    
    // 👤 Gestion utilisateur
    setupUser(preferences) {\n        this.user = {\n            id: Utils.generateId(),\n            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,\n            preferences: {\n                trackingMetrics: ['mood', 'energy', 'sleep', 'stress'],\n                reminderTime: '08:00',\n                weekStartsOn: 'monday',\n                ...preferences\n            },\n            createdAt: new Date().toISOString()\n        };\n        \n        this.saveToStorage();\n        this.renderInterface();\n    }\n    \n    // 📊 Gestion des entrées\n    checkTodaysEntry() {\n        const today = Utils.getTodayString();\n        const todaysEntry = this.entries.find(e => e.date === today);\n        \n        if (!todaysEntry && this.user) {\n            this.showDailyCheckin();\n        }\n    }\n    \n    addEntry(metrics, factors = {}) {\n        const today = Utils.getTodayString();\n        const existingEntry = this.entries.find(e => e.date === today);\n        \n        if (existingEntry) {\n            // Mettre à jour l'entrée existante\n            existingEntry.metrics = { ...existingEntry.metrics, ...metrics };\n            existingEntry.mood_factors = factors.mood_factors || [];\n            existingEntry.energy_factors = factors.energy_factors || [];\n            existingEntry.completedAt = new Date().toISOString();\n        } else {\n            // Créer nouvelle entrée\n            const entry = new WellnessEntry(today, metrics, factors);\n            this.entries.push(entry);\n        }\n        \n        this.detectPatterns();\n        this.generateInsights();\n        this.renderInterface();\n        this.saveToStorage();\n    }\n    \n    // 🔍 Analyse et patterns\n    detectPatterns() {\n        this.patterns = [];\n        \n        if (this.entries.length < 7) return; // Besoin d'au moins une semaine\n        \n        // Pattern 1: Corrélation sommeil-humeur\n        const sleepMoodCorrelation = this.calculateCorrelation('sleep', 'mood');\n        if (Math.abs(sleepMoodCorrelation.coefficient) > 0.3) {\n            this.patterns.push(new Pattern(\n                'correlation',\n                `Corrélation ${sleepMoodCorrelation.coefficient > 0 ? 'positive' : 'négative'} entre sommeil et humeur`,\n                Math.abs(sleepMoodCorrelation.coefficient),\n                sleepMoodCorrelation.coefficient > 0.5 ? 'high' : 'medium',\n                this.generateSleepMoodSuggestion(sleepMoodCorrelation)\n            ));\n        }\n        \n        // Pattern 2: Jour de la semaine\n        const weekdayPattern = this.analyzeWeekdayPatterns();\n        if (weekdayPattern) {\n            this.patterns.push(weekdayPattern);\n        }\n        \n        // Pattern 3: Tendance générale\n        const moodTrend = this.analyzeTrend('mood', 14); // 2 semaines\n        if (Math.abs(moodTrend) > 0.5) {\n            this.patterns.push(new Pattern(\n                'trend',\n                `Tendance ${moodTrend > 0 ? 'positive' : 'négative'} de l'humeur sur 2 semaines`,\n                Math.abs(moodTrend) / 2, // Normaliser\n                Math.abs(moodTrend) > 1 ? 'high' : 'medium',\n                moodTrend > 0 ? 'Continuez sur cette lancée !' : 'Peut-être temps de prendre soin de vous ?'\n            ));\n        }\n    }\n    \n    calculateCorrelation(metric1, metric2) {\n        const pairs = this.entries\n            .filter(e => e.metrics[metric1] != null && e.metrics[metric2] != null)\n            .map(e => [e.metrics[metric1], e.metrics[metric2]]);\n            \n        if (pairs.length < 5) return { coefficient: 0, significance: 'low' };\n        \n        // Calcul coefficient de Pearson simplifié\n        const n = pairs.length;\n        const sum1 = pairs.reduce((sum, pair) => sum + pair[0], 0);\n        const sum2 = pairs.reduce((sum, pair) => sum + pair[1], 0);\n        const sum1Sq = pairs.reduce((sum, pair) => sum + pair[0] * pair[0], 0);\n        const sum2Sq = pairs.reduce((sum, pair) => sum + pair[1] * pair[1], 0);\n        const pSum = pairs.reduce((sum, pair) => sum + pair[0] * pair[1], 0);\n        \n        const num = pSum - (sum1 * sum2 / n);\n        const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));\n        \n        const coefficient = den === 0 ? 0 : num / den;\n        \n        return {\n            coefficient: Utils.roundToDecimals(coefficient, 2),\n            significance: Math.abs(coefficient) > 0.5 ? 'high' : Math.abs(coefficient) > 0.3 ? 'medium' : 'low'\n        };\n    }\n    \n    analyzeWeekdayPatterns() {\n        const weekdayAverages = {};\n        const weekdayData = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };\n        \n        this.entries.forEach(entry => {\n            const date = new Date(entry.date);\n            const weekday = date.getDay();\n            if (entry.metrics.mood != null) {\n                weekdayData[weekday].push(entry.metrics.mood);\n            }\n        });\n        \n        // Calculer moyennes\n        Object.keys(weekdayData).forEach(day => {\n            const values = weekdayData[day];\n            if (values.length > 0) {\n                weekdayAverages[day] = values.reduce((sum, val) => sum + val, 0) / values.length;\n            }\n        });\n        \n        // Trouver le meilleur et pire jour\n        const avgEntries = Object.entries(weekdayAverages);\n        if (avgEntries.length < 5) return null;\n        \n        const sortedDays = avgEntries.sort((a, b) => b[1] - a[1]);\n        const bestDay = sortedDays[0];\n        const worstDay = sortedDays[sortedDays.length - 1];\n        \n        const difference = bestDay[1] - worstDay[1];\n        if (difference > 1.5) {\n            const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];\n            return new Pattern(\n                'weekday',\n                `Vos ${dayNames[bestDay[0]]}s sont généralement meilleurs que vos ${dayNames[worstDay[0]]}s`,\n                difference / 4, // Normaliser sur 10\n                'medium',\n                `Planifiez des activités agréables les ${dayNames[worstDay[0]]}s`\n            );\n        }\n        \n        return null;\n    }\n    \n    analyzeTrend(metric, days = 30) {\n        const recentEntries = this.entries\n            .filter(e => e.metrics[metric] != null)\n            .slice(-days)\n            .map((e, index) => [index, e.metrics[metric]]);\n            \n        if (recentEntries.length < 5) return 0;\n        \n        // Calcul de la pente de régression linéaire\n        const n = recentEntries.length;\n        const sumX = recentEntries.reduce((sum, point) => sum + point[0], 0);\n        const sumY = recentEntries.reduce((sum, point) => sum + point[1], 0);\n        const sumXY = recentEntries.reduce((sum, point) => sum + point[0] * point[1], 0);\n        const sumXX = recentEntries.reduce((sum, point) => sum + point[0] * point[0], 0);\n        \n        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);\n        return Utils.roundToDecimals(slope, 3);\n    }\n    \n    generateInsights() {\n        const weeklyInsight = this.generateWeeklyInsight();\n        if (weeklyInsight) {\n            // Remplacer l'insight de la semaine s'il existe\n            const currentWeek = Utils.getCurrentWeekString();\n            this.insights = this.insights.filter(i => \n                !(i.type === 'weekly_summary' && i.period === currentWeek)\n            );\n            this.insights.push(weeklyInsight);\n        }\n    }\n    \n    generateWeeklyInsight() {\n        const currentWeek = Utils.getCurrentWeekString();\n        const thisWeekEntries = this.getEntriesForWeek(currentWeek);\n        const lastWeekEntries = this.getEntriesForWeek(Utils.getPreviousWeekString());\n        \n        if (thisWeekEntries.length < 3) return null;\n        \n        const thisWeekAvg = this.calculateAverageMetrics(thisWeekEntries);\n        const lastWeekAvg = lastWeekEntries.length > 0 ? this.calculateAverageMetrics(lastWeekEntries) : null;\n        \n        let comparison = '';\n        if (lastWeekAvg) {\n            const moodChange = thisWeekAvg.mood - lastWeekAvg.mood;\n            const energyChange = thisWeekAvg.energy - lastWeekAvg.energy;\n            \n            if (Math.abs(moodChange) > 0.5 || Math.abs(energyChange) > 0.5) {\n                comparison = `Vs semaine dernière: humeur ${moodChange > 0 ? '+' : ''}${Utils.roundToDecimals(moodChange, 1)}, énergie ${energyChange > 0 ? '+' : ''}${Utils.roundToDecimals(energyChange, 1)}`;\n            }\n        }\n        \n        return new Insight(\n            'weekly_summary',\n            currentWeek,\n            {\n                averageMood: Utils.roundToDecimals(thisWeekAvg.mood, 1),\n                averageEnergy: Utils.roundToDecimals(thisWeekAvg.energy, 1),\n                entriesCount: thisWeekEntries.length,\n                comparison: comparison\n            }\n        );\n    }\n    \n    // 🎨 Interface\n    showDailyCheckin() {\n        // TODO: Afficher modal de check-in quotidien\n        console.log('Afficher check-in quotidien');\n    }\n    \n    renderInterface() {\n        if (!this.user) {\n            this.showOnboarding();\n            return;\n        }\n        \n        this.renderDashboard();\n        this.renderCalendarView();\n        this.renderChartsView();\n        this.renderPatternsView();\n        this.renderInsightsView();\n    }\n    \n    showOnboarding() {\n        // TODO: Interface d'onboarding\n    }\n    \n    renderDashboard() {\n        // TODO: Vue d'ensemble avec métriques du jour\n    }\n    \n    renderCalendarView() {\n        // TODO: Calendrier mensuel avec couleurs d'humeur\n    }\n    \n    renderChartsView() {\n        // TODO: Graphiques d'évolution des métriques\n    }\n    \n    renderPatternsView() {\n        // TODO: Affichage des patterns détectés\n    }\n    \n    renderInsightsView() {\n        // TODO: Affichage des insights personnalisés\n    }\n    \n    // 🔧 Utilitaires d'analyse\n    getEntriesForWeek(weekString) {\n        // TODO: Filtrer entrées par semaine\n        return [];\n    }\n    \n    calculateAverageMetrics(entries) {\n        const metrics = ['mood', 'energy', 'stress'];\n        const averages = {};\n        \n        metrics.forEach(metric => {\n            const values = entries\n                .map(e => e.metrics[metric])\n                .filter(v => v != null);\n                \n            if (values.length > 0) {\n                averages[metric] = values.reduce((sum, val) => sum + val, 0) / values.length;\n            } else {\n                averages[metric] = 0;\n            }\n        });\n        \n        return averages;\n    }\n    \n    generateSleepMoodSuggestion(correlation) {\n        if (correlation.coefficient > 0.5) {\n            return 'Votre sommeil impact positivement votre humeur. Maintenez vos bonnes habitudes de sommeil !';\n        } else if (correlation.coefficient < -0.3) {\n            return 'Plus vous dormez mal, plus votre humeur se dégrade. Essayez d\\'améliorer votre hygiène de sommeil.';\n        }\n        return 'Sommeil et humeur semblent liés. Surveillez ces métriques ensemble.';\n    }\n    \n    // 💾 Persistence\n    saveToStorage() {\n        const data = {\n            user: this.user,\n            entries: this.entries,\n            patterns: this.patterns,\n            insights: this.insights\n        };\n        localStorage.setItem('wellnessDashboard', JSON.stringify(data));\n    }\n    \n    loadFromStorage() {\n        const saved = localStorage.getItem('wellnessDashboard');\n        if (saved) {\n            const data = JSON.parse(saved);\n            this.user = data.user;\n            this.entries = data.entries || [];\n            this.patterns = data.patterns || [];\n            this.insights = data.insights || [];\n        }\n    }\n    \n    setupEventListeners() {\n        // TODO: Event listeners pour interface\n    }\n}\n\nclass WellnessEntry {\n    constructor(date, metrics, factors = {}) {\n        this.id = Utils.generateId();\n        this.date = date;\n        this.metrics = metrics;\n        this.mood_factors = factors.mood_factors || [];\n        this.energy_factors = factors.energy_factors || [];\n        this.notes = factors.notes || '';\n        this.completedAt = new Date().toISOString();\n    }\n}\n\nclass Pattern {\n    constructor(type, description, confidence, impact, suggestion) {\n        this.id = Utils.generateId();\n        this.type = type;\n        this.description = description;\n        this.confidence = confidence;\n        this.impact = impact;\n        this.suggestion = suggestion;\n        this.discoveredAt = new Date().toISOString();\n    }\n}\n\nclass Insight {\n    constructor(type, period, data) {\n        this.id = Utils.generateId();\n        this.type = type;\n        this.period = period;\n        this.data = data;\n        this.createdAt = new Date().toISOString();\n    }\n}\n\n// 💡 Fonctions utilitaires\nconst Utils = {\n    generateId() {\n        return Date.now() + Math.random().toString(36).substr(2, 9);\n    },\n    \n    getTodayString() {\n        return new Date().toISOString().split('T')[0];\n    },\n    \n    getCurrentWeekString() {\n        const date = new Date();\n        const year = date.getFullYear();\n        const week = this.getWeekNumber(date);\n        return `${year}-W${week.toString().padStart(2, '0')}`;\n    },\n    \n    getPreviousWeekString() {\n        const date = new Date();\n        date.setDate(date.getDate() - 7);\n        const year = date.getFullYear();\n        const week = this.getWeekNumber(date);\n        return `${year}-W${week.toString().padStart(2, '0')}`;\n    },\n    \n    getWeekNumber(date) {\n        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n        const dayNum = d.getUTCDay() || 7;\n        d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n        const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));\n        return Math.ceil((((d - yearStart) / 86400000) + 1)/7);\n    },\n    \n    roundToDecimals(num, decimals) {\n        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);\n    },\n    \n    formatDateFr(dateString) {\n        return new Date(dateString).toLocaleDateString('fr-FR', {\n            weekday: 'long',\n            day: 'numeric',\n            month: 'long'\n        });\n    }\n};\n\n// 🚀 Initialisation\ndocument.addEventListener('DOMContentLoaded', () => {\n    window.wellnessDashboard = new WellnessDashboard();\n});"
        ```

## 📊 Mesure du Succès

### **Régularité d'Usage**
- "Est-ce que je fais vraiment mon check-in quotidien ?"
- "Est-ce que ça prend vraiment moins de 30 secondes ?"

### **Insights Utiles**
- "Est-ce que je découvre des choses surprenantes sur mes patterns ?"
- "Est-ce que les suggestions m'aident concrètement ?"

### **Amélioration du Bien-être**
- "Est-ce que je prends plus conscience de mes états ?"
- "Est-ce que j'agis différemment grâce aux insights ?"

## 🔮 Extensions Possibles

### **🎯 Niveau 1 : Amélioration UX**
- **Interface super-rapide** : Saisie par emojis, gestures, ou reconnaissance vocale
- **Widgets phone** : Check-in directement depuis l'écran d'accueil
- **Mode habits** : Corrélation avec habitudes (sport, méditation, café)

### **🎯 Niveau 2 : Intelligence Avancée**
- **ML patterns** : Détection de patterns complexes multi-variables
- **Prédictions personnalisées** : "Demain risque d'être difficile selon tes patterns"
- **Recommandations contextuelles** : "Il pleut et tu es fatigué : que dirais-tu d'un thé ?"

### **🎯 Niveau 3 : Écosystème Santé**
- **Sync appareils** : Apple Watch, Fitbit, applications de méditation
- **Mode professionnel** : Tableaux de bord pour psychologues/coachs
- **Communauté anonyme** : Comparaisons avec des profils similaires (opt-in)

---

## 🎉 Challenge Bonus

**"Expérience 30 jours"** : Utilisez votre dashboard pendant 1 mois complet et documentez :
- Quels patterns vous découvrez sur vous-même
- Si cela change vos habitudes quotidiennes
- L'impact sur votre conscience de votre bien-être

L'objectif : développer une meilleure relation avec votre santé mentale et physique ! 🌸