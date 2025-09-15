# 🍳 Générateur de Menu Intelligent

## 😫 Le Problème Humain

Vous ouvrez le frigo, vous voyez des ingrédients, mais impossible de savoir quoi cuisiner. Vous perdez 20 minutes à chercher des recettes en ligne, pour finalement commander une pizza. Les sites de recettes sont pleins de publicités et vous proposent des plats avec 15 ingrédients que vous n'avez pas.

## 🎯 Votre Mission

Créer un outil simple qui vous suggère des plats réalisables avec ce que vous avez déjà chez vous, sans stress ni complexité.

## 👥 User Stories (Phase Design - 30 min)

### 🎯 User Story Principal
> **En tant que** personne qui veut cuisiner avec ses ingrédients disponibles
> **Je veux** obtenir rapidement des suggestions de plats
> **Pour que** je cuisine maison plutôt que de commander

### 📋 User Stories Détaillées
1. **Indiquer mes ingrédients** : "Je veux sélectionner rapidement ce que j'ai dans mon frigo"
2. **Obtenir des suggestions** : "Je veux voir des plats que je peux faire avec ça"
3. **Voir les étapes** : "Je veux des instructions simples et claires"
4. **Gérer mes favoris** : "Je veux sauvegarder les recettes qui ont marché"
5. **Adapter aux portions** : "Je veux ajuster selon le nombre de personnes"

## 🧠 Modules Programming-Basics Intégrés

- **Variables** : Stocker ingrédients sélectionnés, recettes, portions
- **Data-Structures** : Arrays pour ingrédients/recettes, Objects pour détails
- **Functions** : Filtrer recettes, calculer ingrédients, adapter portions
- **Conditions** : Logique de matching ingrédients, validation disponibilité
- **Loops** : Parcourir recettes, comparer ingrédients, afficher résultats
- **Input-Output** : Interface de sélection, affichage suggestions

## 🏗️ Architecture Technique (Phase Plan - 20 min)

### États de l'Application
1. **État sélection** : Choisir ses ingrédients disponibles
2. **État suggestions** : Voir les plats possibles avec match score
3. **État recette** : Afficher la recette détaillée sélectionnée
4. **État favoris** : Gérer ses recettes sauvegardées

### Structure des Données
```javascript
// Structure principale
const menuGenerator = {
    availableIngredients: [
        "tomates", "oeufs", "fromage", "pâtes", "oignons",
        "ail", "huile", "beurre", "farine", "lait"
    ],
    selectedIngredients: [],
    recipes: [
        {
            id: 1,
            name: "Omelette aux tomates",
            emoji: "🍳",
            ingredients: ["oeufs", "tomates", "fromage", "huile"],
            optionalIngredients: ["oignons", "herbes"],
            difficulty: "facile", // "facile", "moyen", "difficile"
            cookingTime: 15, // minutes
            portions: 2,
            steps: [
                "Battre les oeufs dans un bol",
                "Couper les tomates en dés",
                "Chauffer l'huile dans une poêle",
                "Verser les oeufs et ajouter les tomates",
                "Plier l'omelette et servir"
            ]
        }
    ],
    favorites: [],
    settings: {
        defaultPortions: 2,
        showOnlyEasyRecipes: false
    }
};
```

## 🎨 MVP Features (Phase Code - 4-5h)

### ✅ Must Have (Version 1 - 2h)
- [ ] **Sélectionner ingrédients** : Liste avec checkboxes
- [ ] **Voir les matches** : Recettes faisables avec ingrédients sélectionnés
- [ ] **Afficher recette** : Détails, étapes, temps de cuisson
- [ ] **Score de match** : "Tu as 4/5 ingrédients pour ce plat"

### 🚀 Should Have (Version 2 - 1.5h)
- [ ] **Filtres** : Par difficulté, temps de cuisson, type de plat
- [ ] **Ajuster portions** : Recalculer les quantités automatiquement
- [ ] **Favoris** : Sauvegarder ses recettes préférées
- [ ] **Suggestions intelligentes** : "Il te manque juste X pour faire Y"

### 💫 Could Have (Version 3 - 1.5h)
- [ ] **Ajouter ses recettes** : Personnaliser avec ses propres plats
- [ ] **Planning des repas** : "Que cuisiner cette semaine ?"
- [ ] **Liste de courses** : "Acheter X pour pouvoir faire Y et Z"
- [ ] **Mode surprise** : "Suggère-moi quelque chose de nouveau"

## 📁 Structure des Fichiers

```
03-recipe-finder/
├── README.md                 # Ce guide
├── starter-files/
│   ├── index.html           # Interface principale
│   ├── style.css            # Styles avec thèmes
│   └── script.js            # Logique de matching
└── extensions/
    ├── recipe-api.md        # Intégration APIs recettes
    ├── nutrition.md         # Calculs nutritionnels
    └── meal-planning.md     # Planning hebdomadaire
```

## 🛠️ Starter Code

### `starter-files/index.html`
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Générateur de Menu - Que cuisiner ?</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🍳 Que Cuisiner ?</h1>
            <p>Découvrez des plats avec vos ingrédients</p>
        </header>

        <!-- Section Sélection d'Ingrédients -->
        <section class="ingredients-section">
            <h2>🥕 Mes Ingrédients Disponibles</h2>
            <div class="search-container">
                <input
                    type="text"
                    id="ingredient-search"
                    placeholder="Rechercher un ingrédient..."
                >
            </div>
            <div id="ingredients-grid" class="ingredients-grid">
                <!-- Ingrédients générés ici -->
            </div>
            <div class="selected-summary">
                <span id="selected-count">0</span> ingrédients sélectionnés
                <button id="clear-selection" class="clear-btn">Tout effacer</button>
            </div>
        </section>

        <!-- Section Suggestions -->
        <section class="suggestions-section">
            <div class="suggestions-header">
                <h2>🎯 Suggestions pour Vous</h2>
                <div class="filters">
                    <select id="difficulty-filter">
                        <option value="">Toute difficulté</option>
                        <option value="facile">Facile</option>
                        <option value="moyen">Moyen</option>
                        <option value="difficile">Difficile</option>
                    </select>
                    <select id="time-filter">
                        <option value="">Tout timing</option>
                        <option value="15">Moins de 15 min</option>
                        <option value="30">Moins de 30 min</option>
                        <option value="60">Moins d'1 heure</option>
                    </select>
                </div>
            </div>
            <div id="recipes-grid" class="recipes-grid">
                <!-- Recettes suggérées ici -->
            </div>
        </section>

        <!-- Section Détail Recette -->
        <section id="recipe-detail" class="recipe-detail-section" style="display: none;">
            <div class="recipe-header">
                <button id="back-to-suggestions" class="back-btn">← Retour</button>
                <h2 id="recipe-title">Nom de la recette</h2>
                <button id="favorite-toggle" class="favorite-btn">♡</button>
            </div>
            <div class="recipe-content">
                <div class="recipe-info">
                    <div class="info-item">
                        <span class="label">Difficulté :</span>
                        <span id="recipe-difficulty">Facile</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Temps :</span>
                        <span id="recipe-time">15 min</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Portions :</span>
                        <input type="number" id="recipe-portions" value="2" min="1" max="10">
                    </div>
                </div>
                <div class="recipe-ingredients">
                    <h3>Ingrédients</h3>
                    <ul id="recipe-ingredients-list">
                        <!-- Ingrédients avec quantités -->
                    </ul>
                </div>
                <div class="recipe-steps">
                    <h3>Étapes</h3>
                    <ol id="recipe-steps-list">
                        <!-- Étapes de préparation -->
                    </ol>
                </div>
            </div>
        </section>

        <!-- Section Favoris -->
        <section class="favorites-section">
            <h2>⭐ Mes Recettes Favorites</h2>
            <div id="favorites-grid" class="recipes-grid">
                <!-- Recettes favorites -->
            </div>
        </section>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### `starter-files/script.js`
```javascript
// 🍳 GÉNÉRATEUR DE MENU - Architecture de base

const MenuGenerator = {
    // 📊 État de l'application
    state: {
        availableIngredients: [
            "oeufs", "lait", "farine", "beurre", "sucre",
            "tomates", "oignons", "ail", "huile", "sel",
            "pâtes", "riz", "fromage", "jambon", "poulet",
            "pommes de terre", "carottes", "courgettes"
        ],
        selectedIngredients: [],
        recipes: [
            {
                id: 1,
                name: "Omelette simple",
                emoji: "🍳",
                ingredients: ["oeufs", "beurre", "sel"],
                optionalIngredients: ["fromage", "jambon"],
                difficulty: "facile",
                cookingTime: 10,
                basePortions: 2,
                steps: [
                    "Battre 3 oeufs dans un bol",
                    "Chauffer le beurre dans une poêle",
                    "Verser les oeufs et cuire 3-4 minutes",
                    "Plier l'omelette et servir"
                ]
            },
            // Plus de recettes...
        ],
        favorites: [],
        currentRecipe: null,
        filters: {
            difficulty: "",
            maxTime: null
        }
    },

    // 🏗️ Initialisation
    init() {
        this.loadFromStorage();
        this.renderInterface();
        this.setupEventListeners();
        console.log('🍳 Menu Generator initialized!');
    },

    // 💾 Gestion des données
    loadFromStorage() {
        // TODO: Charger depuis localStorage
        const saved = localStorage.getItem('menuGenerator');
        // if (saved) { this.state = {...this.state, ...JSON.parse(saved)}; }
    },

    saveToStorage() {
        // TODO: Sauvegarder dans localStorage
        const toSave = {
            selectedIngredients: this.state.selectedIngredients,
            favorites: this.state.favorites
        };
        localStorage.setItem('menuGenerator', JSON.stringify(toSave));
    },

    // 🥕 Gestion des ingrédients
    toggleIngredient(ingredient) {
        // TODO: Ajouter/supprimer ingrédient de la sélection
        // TODO: Re-render suggestions
        // TODO: Sauvegarder
    },

    clearSelection() {
        // TODO: Vider selectedIngredients
        // TODO: Re-render
    },

    // 🔍 Système de matching
    getMatchingRecipes() {
        // TODO: Filtrer recettes selon ingrédients sélectionnés
        // TODO: Calculer score de match pour chaque recette
        // TODO: Trier par score décroissant
        return [];
    },

    calculateMatchScore(recipe) {
        // TODO: Comparer recipe.ingredients avec selectedIngredients
        // Score = ingrédients possédés / ingrédients requis
        return 0;
    },

    applyFilters(recipes) {
        // TODO: Filtrer selon difficulty et maxTime
        return recipes;
    },

    // 📱 Gestion des recettes
    selectRecipe(recipeId) {
        // TODO: Afficher détail de la recette
        // TODO: Masquer la vue suggestions
        this.state.currentRecipe = this.state.recipes.find(r => r.id === recipeId);
        this.renderRecipeDetail();
    },

    toggleFavorite(recipeId) {
        // TODO: Ajouter/supprimer des favoris
        // TODO: Re-render et sauvegarder
    },

    adjustPortions(newPortions) {
        // TODO: Recalculer les quantités des ingrédients
        // TODO: Re-render les ingrédients
    },

    // 🎨 Interface utilisateur
    renderInterface() {
        this.renderIngredients();
        this.renderSuggestions();
        this.renderFavorites();
        this.updateSelectedCount();
    },

    renderIngredients() {
        // TODO: Afficher tous les ingrédients disponibles
        // Checkboxes avec état sélectionné/non sélectionné
        const container = document.getElementById('ingredients-grid');
        // Pour chaque ingrédient : créer un bouton toggle
    },

    renderSuggestions() {
        // TODO: Afficher recettes matchantes avec score
        const recipes = this.getMatchingRecipes();
        const container = document.getElementById('recipes-grid');

        // Pour chaque recette :
        // - Card avec nom, emoji, temps, difficulté
        // - Score de match visuel (ex: "4/5 ingrédients")
        // - Bouton pour voir détails
    },

    renderRecipeDetail() {
        // TODO: Afficher détail de currentRecipe
        // TODO: Afficher ingrédients avec quantités ajustées
        // TODO: Afficher étapes numérotées
    },

    renderFavorites() {
        // TODO: Afficher recettes favorites
        // Même format que suggestions mais sans score
    },

    updateSelectedCount() {
        // TODO: Mettre à jour "X ingrédients sélectionnés"
        document.getElementById('selected-count').textContent = this.state.selectedIngredients.length;
    },

    // 🎯 Event Listeners
    setupEventListeners() {
        // TODO: Sélection d'ingrédients
        // TODO: Filtres de difficulté/temps
        // TODO: Sélection de recette
        // TODO: Ajustement des portions
        // TODO: Retour aux suggestions

        // Recherche d'ingrédients
        document.getElementById('ingredient-search').addEventListener('input', (e) => {
            // TODO: Filtrer ingrédients selon recherche
        });

        // Clear selection
        document.getElementById('clear-selection').addEventListener('click', () => {
            this.clearSelection();
        });
    }
};

// 🚀 Démarrage de l'application
document.addEventListener('DOMContentLoaded', () => {
    MenuGenerator.init();
});

// 💡 Fonctions utilitaires
const Utils = {
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },

    formatTime(minutes) {
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const remainingMins = minutes % 60;
        return `${hours}h${remainingMins > 0 ? remainingMins : ''}`;
    },

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // Fonction de recherche floue pour ingrédients
    fuzzySearch(query, items) {
        const lowercaseQuery = query.toLowerCase();
        return items.filter(item =>
            item.toLowerCase().includes(lowercaseQuery)
        );
    }
};
```

## 📊 Mesure du Succès

### **Utilité Culinaire**
- "Est-ce que ça m'aide vraiment à décider quoi cuisiner ?"
- "Est-ce que je cuisine plus souvent grâce à cet outil ?"

### **Simplicité d'Usage**
- "Est-ce que c'est plus rapide que chercher sur Google ?"
- "Est-ce que quelqu'un d'autre peut l'utiliser sans explication ?"

### **Pertinence des Suggestions**
- "Est-ce que les plats proposés sont réellement faisables ?"
- "Est-ce que j'ai envie de les cuisiner ?"

## 🔮 Extensions Possibles

### **🎯 Niveau 1 : Améliorations UX**
- **Photos de plats** : Images pour rendre plus appétissant
- **Temps de préparation** : Distinction prep/cuisson
- **Mode shopping** : "Que acheter pour avoir plus d'options ?"

### **🎯 Niveau 2 : Intelligence**
- **Apprentissage** : Se souvenir des préférences utilisateur
- **Saisonnalité** : Suggérer selon la saison
- **Planification** : "Menu de la semaine" avec liste de courses

### **🎯 Niveau 3 : Social & API**
- **Partage de recettes** : Ajouter ses propres créations
- **API externes** : Intégration avec Spoonacular ou Edamam
- **Communauté** : Noter et commenter les recettes

---

## 🎉 Challenge Bonus

**"Test en cuisine réelle"** : Utilisez l'outil pour planifier vos repas pendant 1 semaine. Notez :
- Combien de fois vous l'utilisez vraiment
- Si les suggestions correspondent à vos envies
- Quels ingrédients vous manquent le plus souvent

L'objectif est de créer quelque chose qui transforme vraiment votre façon de cuisiner ! 🍳