# 📅 Tracker d'Habitudes Personnelles

## 😫 Le Problème Humain

Vous voulez développer de bonnes habitudes (sport, lecture, méditation) mais vous oubliez, perdez la motivation, ou ne savez pas si vous progressez vraiment. Les apps existantes sont soit trop complexes, soit trop rigides pour s'adapter à votre vraie vie.

## 🎯 Votre Mission

Créer un outil simple et personnel qui vous aide à maintenir vos habitudes importantes en vous donnant un feedback visuel immédiat et en s'adaptant à votre rythme réel de vie.

## 👥 User Stories (Phase Design - 30 min)

### 🎯 User Story Principal
> **En tant que** personne qui veut développer de bonnes habitudes
> **Je veux** tracker facilement mes progrès quotidiens
> **Pour que** je reste motivé et voir concrètement mon évolution

### 📋 User Stories Détaillées
1. **Définir mes habitudes** : "Je veux créer facilement mes habitudes avec un nom et une fréquence cible"
2. **Marquer mes réussites** : "Je veux d'un clic marquer 'fait' pour aujourd'hui"
3. **Voir mes streaks** : "Je veux voir mes séries de jours consécutifs pour rester motivé"
4. **Comprendre mes patterns** : "Je veux voir les jours où je réussis le mieux"
5. **Rester flexible** : "Je veux pouvoir modifier ou rattraper des jours passés"

## 🧠 Modules Programming-Basics Intégrés

- **Variables** : Stocker habitudes, compteurs, dates
- **Data-Structures** : Arrays pour les habitudes, Objects pour les données
- **Functions** : Ajouter habitude, marquer complet, calculer streaks
- **Conditions** : Logique de validation, vérification des objectifs
- **Loops** : Parcourir les jours, calculer statistiques
- **Input-Output** : Interface de saisie, affichage visuel des progrès

## 🏗️ Architecture Technique (Phase Plan - 20 min)

### États de l'Application
1. **État vide** : Première visite, inviter à créer sa première habitude
2. **État actif** : Habitudes créées, vue du jour avec actions possibles
3. **État historique** : Vue des semaines/mois passés avec statistiques
4. **État édition** : Modification d'une habitude existante

### Structure des Données
```javascript
// Structure principale
const habitTracker = {
    habits: [
        {
            id: 1,
            name: "Faire 30 min de sport",
            emoji: "💪",
            targetFrequency: "daily", // "daily", "weekly", "custom"
            createdDate: "2024-01-01",
            category: "health" // "health", "learning", "personal", "work"
        }
    ],
    records: [
        {
            habitId: 1,
            date: "2024-01-15",
            completed: true,
            note: "Course de 35 min au parc"
        }
    ],
    settings: {
        weekStartsOn: "monday", // "sunday", "monday"
        reminderTime: "20:00",
        theme: "light" // "light", "dark", "auto"
    }
};
```

## 🎨 MVP Features (Phase Code - 3-5h)

### ✅ Must Have (Version 1 - 1.5h)
- [ ] **Créer une habitude** : Nom + emoji simple
- [ ] **Vue du jour** : Liste des habitudes avec checkbox ✅
- [ ] **Marquer complet** : Clic pour marquer fait/pas fait
- [ ] **Persistence** : Sauvegarde localStorage

### 🚀 Should Have (Version 2 - 1.5h)
- [ ] **Streaks visuels** : "🔥 3 jours d'affilée !"
- [ ] **Calendrier hebdo** : Vue des 7 derniers jours
- [ ] **Statistiques simples** : "Cette semaine : 5/7 jours"
- [ ] **Catégories colorées** : Santé=vert, Learning=bleu, etc.

### 💫 Could Have (Version 3 - 2h)
- [ ] **Notes rapides** : "Comment c'était aujourd'hui ?"
- [ ] **Objectifs flexibles** : "3 fois par semaine" au lieu de "tous les jours"
- [ ] **Motivation quotes** : Citations inspirantes selon les progrès
- [ ] **Export/partage** : "Mes 30 jours de méditation !"

## 📁 Structure des Fichiers

```
02-habit-tracker/
├── README.md                 # Ce guide
├── starter-files/
│   ├── index.html           # Interface principale
│   ├── style.css            # Styles avec thèmes
│   └── script.js            # Logique de tracking
└── extensions/
    ├── notifications.md     # Push notifications
    ├── social-sharing.md    # Partage de progrès
    └── analytics.md         # Statistiques avancées
```

## 🛠️ Starter Code

### `starter-files/index.html`
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mes Habitudes - Tracker Personnel</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>📅 Mes Habitudes</h1>
            <p class="today-date">Aujourd'hui : <span id="current-date"></span></p>
        </header>

        <!-- Section Ajout Rapide -->
        <section class="quick-add-section">
            <h2>➕ Nouvelle habitude</h2>
            <form id="add-habit-form" class="add-form">
                <input
                    type="text"
                    id="habit-name"
                    placeholder="Ex: Lire 20 minutes"
                    required
                >
                <input
                    type="text"
                    id="habit-emoji"
                    placeholder="📚"
                    maxlength="2"
                >
                <button type="submit">Ajouter</button>
            </form>
        </section>

        <!-- Section Aujourd'hui -->
        <section class="today-section">
            <h2>🎯 Aujourd'hui</h2>
            <div id="today-habits" class="habits-grid">
                <!-- Habitudes du jour générées ici -->
            </div>
        </section>

        <!-- Section Progrès -->
        <section class="progress-section">
            <h2>📊 Mes Progrès</h2>
            <div class="stats-container">
                <div class="stat-card">
                    <span class="stat-number" id="total-habits">0</span>
                    <span class="stat-label">Habitudes actives</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number" id="completion-rate">0%</span>
                    <span class="stat-label">Réussite aujourd'hui</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number" id="best-streak">0</span>
                    <span class="stat-label">Meilleure série</span>
                </div>
            </div>
        </section>

        <!-- Section Historique -->
        <section class="history-section">
            <h2>📈 Cette Semaine</h2>
            <div id="week-view" class="week-calendar">
                <!-- Calendrier de la semaine généré ici -->
            </div>
        </section>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### `starter-files/script.js`
```javascript
// 📅 HABIT TRACKER - Architecture de base

const HabitTracker = {
    // 📊 État de l'application
    state: {
        habits: [],
        records: [],
        settings: {
            weekStartsOn: "monday"
        }
    },

    // 🏗️ Initialisation
    init() {
        this.loadFromStorage();
        this.renderInterface();
        this.setupEventListeners();
        this.updateCurrentDate();
        console.log('📅 Habit Tracker initialized!');
    },

    // 💾 Gestion des données
    loadFromStorage() {
        // TODO: Charger depuis localStorage
        const savedHabits = localStorage.getItem('habitTracker');
        // if (savedHabits) { this.state = JSON.parse(savedHabits); }
    },

    saveToStorage() {
        // TODO: Sauvegarder dans localStorage
        localStorage.setItem('habitTracker', JSON.stringify(this.state));
    },

    // 📅 Gestion des habitudes
    addHabit(name, emoji = "⭐") {
        // TODO: Valider les données
        // TODO: Créer l'objet habitude
        // TODO: Ajouter au state.habits
        // TODO: Re-render et sauvegarder
        const habit = {
            id: Utils.generateId(),
            name: name.trim(),
            emoji: emoji || "⭐",
            createdDate: Utils.getTodayString(),
            category: "personal"
        };

        // Implementation ici...
    },

    toggleHabitToday(habitId) {
        // TODO: Vérifier si déjà fait aujourd'hui
        // TODO: Ajouter ou supprimer record pour aujourd'hui
        // TODO: Re-render et sauvegarder
    },

    // 📊 Calculs et statistiques
    getStreakForHabit(habitId) {
        // TODO: Calculer série de jours consécutifs
        // Partir d'aujourd'hui et remonter les jours
        return 0;
    },

    getTodayCompletionRate() {
        // TODO: Calculer % habitudes complétées aujourd'hui
        return 0;
    },

    getHabitRecordsForWeek(habitId, startDate) {
        // TODO: Récupérer les 7 derniers jours pour une habitude
        return [];
    },

    // 🎨 Interface utilisateur
    renderInterface() {
        this.renderTodayHabits();
        this.renderStats();
        this.renderWeekView();
    },

    renderTodayHabits() {
        // TODO: Afficher les habitudes avec leur état du jour
        const container = document.getElementById('today-habits');

        // Pour chaque habitude :
        // - Créer une card avec nom, emoji
        // - Checkbox ou bouton pour marquer fait
        // - Afficher streak actuel
    },

    renderStats() {
        // TODO: Mettre à jour les statistiques affichées
        document.getElementById('total-habits').textContent = this.state.habits.length;
        document.getElementById('completion-rate').textContent = this.getTodayCompletionRate() + '%';
        // etc.
    },

    renderWeekView() {
        // TODO: Créer le calendrier de la semaine
        // 7 colonnes (jours), une ligne par habitude
        // Colorier les cases selon completion
    },

    updateCurrentDate() {
        // TODO: Afficher la date d'aujourd'hui
        const today = new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('current-date').textContent = today;
    },

    // 🎯 Event Listeners
    setupEventListeners() {
        // TODO: Formulaire d'ajout d'habitude
        const form = document.getElementById('add-habit-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Récupérer les valeurs et appeler addHabit()
        });

        // TODO: Clics sur les habitudes pour toggle
        // TODO: Autres interactions
    }
};

// 🚀 Démarrage de l'application
document.addEventListener('DOMContentLoaded', () => {
    HabitTracker.init();
});

// 💡 Fonctions utilitaires
const Utils = {
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },

    getTodayString() {
        return new Date().toISOString().split('T')[0]; // "2024-01-15"
    },

    getWeekDates(startDay = "monday") {
        // TODO: Retourner array des 7 dates de la semaine courante
        const dates = [];
        // Logic here...
        return dates;
    },

    formatDateFr(dateString) {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric'
        });
    }
};
```

### `starter-files/style.css`
```css
/* 📅 HABIT TRACKER - Styles de base */

:root {
    --primary-color: #4CAF50;
    --success-color: #8BC34A;
    --warning-color: #FF9800;
    --background: #f5f5f5;
    --card-background: white;
    --text-primary: #333;
    --text-secondary: #666;
    --border-color: #ddd;
    --border-radius: 12px;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 24px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: var(--background);
    color: var(--text-primary);
    line-height: 1.6;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-large);
}

/* Header */
header {
    text-align: center;
    margin-bottom: var(--spacing-large);
}

header h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: var(--spacing-small);
}

.today-date {
    color: var(--text-secondary);
    font-size: 1.1rem;
}

/* Sections */
section {
    background: var(--card-background);
    padding: var(--spacing-large);
    margin-bottom: var(--spacing-large);
    border-radius: var(--border-radius);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

section h2 {
    margin-bottom: var(--spacing-medium);
    color: var(--text-primary);
    font-size: 1.4rem;
}

/* Formulaire d'ajout */
.add-form {
    display: flex;
    gap: var(--spacing-small);
    flex-wrap: wrap;
}

.add-form input {
    flex: 1;
    min-width: 200px;
    padding: 12px;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
}

.add-form input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.add-form button {
    padding: 12px 24px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
}

.add-form button:hover {
    background: #45a049;
}

/* Grille des habitudes */
.habits-grid {
    display: grid;
    gap: var(--spacing-medium);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.habit-card {
    padding: var(--spacing-medium);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s;
}

.habit-card:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
}

.habit-card.completed {
    background: #e8f5e8;
    border-color: var(--success-color);
}

.habit-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
}

.habit-emoji {
    font-size: 1.5rem;
}

.habit-name {
    font-weight: 500;
}

.habit-streak {
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.habit-toggle {
    padding: 8px 16px;
    border: 2px solid var(--primary-color);
    background: transparent;
    color: var(--primary-color);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
}

.habit-toggle.completed {
    background: var(--primary-color);
    color: white;
}

/* Statistiques */
.stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-medium);
}

.stat-card {
    text-align: center;
    padding: var(--spacing-medium);
    background: #f8f9fa;
    border-radius: var(--border-radius);
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
}

/* Vue semaine */
.week-calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-top: var(--spacing-medium);
}

.week-day {
    text-align: center;
    padding: var(--spacing-small);
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
}

.week-cell {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
}

.week-cell.completed {
    background: var(--success-color);
    color: white;
}

.week-cell.missed {
    background: #ffcdd2;
}

.week-cell.today {
    border: 2px solid var(--primary-color);
}

/* Responsive */
@media (max-width: 768px) {
    .container {
        padding: var(--spacing-medium);
    }

    .add-form {
        flex-direction: column;
    }

    .add-form input,
    .add-form button {
        width: 100%;
    }

    .habits-grid {
        grid-template-columns: 1fr;
    }
}

/* États vides */
.empty-state {
    text-align: center;
    padding: var(--spacing-large);
    color: var(--text-secondary);
}

.empty-state .emoji {
    font-size: 3rem;
    margin-bottom: var(--spacing-medium);
}
```

## 📊 Mesure du Succès

### **Utilité Quotidienne**
- "Est-ce que j'ouvre vraiment l'app tous les jours ?"
- "Est-ce que ça m'aide à me rappeler de mes habitudes ?"

### **Motivation Maintenue**
- "Est-ce que voir mes streaks me motive ?"
- "Est-ce que je continue au-delà des premiers jours ?"

### **Simplicité**
- "Est-ce que c'est plus simple que mon carnet papier ?"
- "Est-ce que quelqu'un d'autre peut l'utiliser immédiatement ?"

## 🔮 Extensions Possibles

### **🎯 Niveau 1 : Améliorations UX**
- **Rappels visuels** : Badge de notification pour les habitudes non faites
- **Célébrations** : Animation quand on atteint un milestone (7 jours, 30 jours)
- **Mode nuit** : Thème sombre pour usage en soirée

### **🎯 Niveau 2 : Intelligence**
- **Patterns personnels** : "Tu fais plus de sport les mardis et jeudis"
- **Suggestions adaptatives** : "Tu n'as pas lu hier, petite session de 10 min aujourd'hui ?"
- **Objectifs flexibles** : S'adapter aux weekends ou périodes chargées

### **🎯 Niveau 3 : Social & Gamification**
- **Partage de progrès** : "30 jours de méditation accomplis ! 🎉"
- **Défis personnels** : "Peux-tu battre ton record de 12 jours ?"
- **Groupe de soutien** : Tracking en famille ou entre amis

---

## 🎉 Challenge Bonus

**"Test de la vraie vie"** : Choisissez 2-3 habitudes que vous voulez vraiment développer et utilisez votre propre outil pendant 2 semaines. Notez :
- Quels jours vous oubliez de l'utiliser
- Quelles features vous manquent le plus
- Si ça change réellement vos comportements

L'objectif est de créer quelque chose qui vous aide VRAIMENT dans votre quotidien ! 📅