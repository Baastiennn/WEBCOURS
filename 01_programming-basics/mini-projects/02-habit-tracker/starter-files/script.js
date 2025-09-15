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