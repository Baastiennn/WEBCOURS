// 🍳 GÉNÉRATEUR DE MENU - Architecture de base

const MenuGenerator = {
    // 📊 État de l'application
    state: {
        availableIngredients: [
            "oeufs", "lait", "farine", "beurre", "sucre",
            "tomates", "oignons", "ail", "huile", "sel",
            "pâtes", "riz", "fromage", "jambon", "poulet",
            "pommes de terre", "carottes", "courgettes",
            "épinards", "champignons", "poivrons", "basilic"
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
            {
                id: 2,
                name: "Pâtes à l'ail",
                emoji: "🍝",
                ingredients: ["pâtes", "ail", "huile", "sel"],
                optionalIngredients: ["fromage", "basilic"],
                difficulty: "facile",
                cookingTime: 15,
                basePortions: 2,
                steps: [
                    "Faire bouillir de l'eau salée",
                    "Cuire les pâtes selon emballage",
                    "Faire revenir l'ail dans l'huile",
                    "Mélanger pâtes et ail, servir"
                ]
            },
            {
                id: 3,
                name: "Riz sauté aux légumes",
                emoji: "🍚",
                ingredients: ["riz", "oignons", "carottes", "huile", "sel"],
                optionalIngredients: ["oeufs", "courgettes", "poivrons"],
                difficulty: "moyen",
                cookingTime: 25,
                basePortions: 3,
                steps: [
                    "Cuire le riz selon emballage",
                    "Couper les légumes en dés",
                    "Faire sauter les légumes dans l'huile",
                    "Ajouter le riz et mélanger 3 minutes"
                ]
            },
            {
                id: 4,
                name: "Salade de tomates",
                emoji: "🥗",
                ingredients: ["tomates", "oignons", "huile", "sel"],
                optionalIngredients: ["basilic", "fromage"],
                difficulty: "facile",
                cookingTime: 5,
                basePortions: 2,
                steps: [
                    "Couper les tomates en rondelles",
                    "Émincer les oignons",
                    "Assaisonner avec huile et sel",
                    "Laisser mariner 10 minutes"
                ]
            }
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
        const saved = localStorage.getItem('menuGenerator');
        if (saved) {
            const savedData = JSON.parse(saved);
            this.state.selectedIngredients = savedData.selectedIngredients || [];
            this.state.favorites = savedData.favorites || [];
        }
    },

    saveToStorage() {
        const toSave = {
            selectedIngredients: this.state.selectedIngredients,
            favorites: this.state.favorites
        };
        localStorage.setItem('menuGenerator', JSON.stringify(toSave));
    },

    // 🥕 Gestion des ingrédients
    toggleIngredient(ingredient) {
        const index = this.state.selectedIngredients.indexOf(ingredient);
        if (index === -1) {
            this.state.selectedIngredients.push(ingredient);
        } else {
            this.state.selectedIngredients.splice(index, 1);
        }
        this.renderInterface();
        this.saveToStorage();
    },

    clearSelection() {
        this.state.selectedIngredients = [];
        this.renderInterface();
        this.saveToStorage();
    },

    // 🔍 Système de matching
    getMatchingRecipes() {
        if (this.state.selectedIngredients.length === 0) {
            return [];
        }

        const recipesWithScores = this.state.recipes.map(recipe => {
            const score = this.calculateMatchScore(recipe);
            return { ...recipe, matchScore: score };
        });

        // Filtrer les recettes avec au moins 50% de match
        const filtered = recipesWithScores.filter(recipe => recipe.matchScore >= 0.5);
        
        // Appliquer les filtres
        const finalFiltered = this.applyFilters(filtered);
        
        // Trier par score décroissant
        return finalFiltered.sort((a, b) => b.matchScore - a.matchScore);
    },

    calculateMatchScore(recipe) {
        const requiredIngredients = recipe.ingredients;
        const matchingIngredients = requiredIngredients.filter(ingredient => 
            this.state.selectedIngredients.includes(ingredient)
        );
        
        return matchingIngredients.length / requiredIngredients.length;
    },

    applyFilters(recipes) {
        let filtered = [...recipes];
        
        if (this.state.filters.difficulty) {
            filtered = filtered.filter(recipe => 
                recipe.difficulty === this.state.filters.difficulty
            );
        }
        
        if (this.state.filters.maxTime) {
            filtered = filtered.filter(recipe => 
                recipe.cookingTime <= this.state.filters.maxTime
            );
        }
        
        return filtered;
    },

    // 📱 Gestion des recettes
    selectRecipe(recipeId) {
        this.state.currentRecipe = this.state.recipes.find(r => r.id === recipeId);
        this.showRecipeDetail();
        this.renderRecipeDetail();
    },

    showRecipeDetail() {
        document.getElementById('recipe-detail').style.display = 'block';
        document.querySelector('.suggestions-section').style.display = 'none';
        document.querySelector('.ingredients-section').style.display = 'none';
        document.querySelector('.favorites-section').style.display = 'none';
    },

    hideRecipeDetail() {
        document.getElementById('recipe-detail').style.display = 'none';
        document.querySelector('.suggestions-section').style.display = 'block';
        document.querySelector('.ingredients-section').style.display = 'block';
        document.querySelector('.favorites-section').style.display = 'block';
    },

    toggleFavorite(recipeId) {
        const index = this.state.favorites.indexOf(recipeId);
        if (index === -1) {
            this.state.favorites.push(recipeId);
        } else {
            this.state.favorites.splice(index, 1);
        }
        this.renderFavorites();
        this.updateFavoriteButton();
        this.saveToStorage();
    },

    adjustPortions(newPortions) {
        if (this.state.currentRecipe) {
            this.state.currentRecipe.currentPortions = newPortions;
            this.renderRecipeDetail();
        }
    },

    // 🎨 Interface utilisateur
    renderInterface() {
        this.renderIngredients();
        this.renderSuggestions();
        this.renderFavorites();
        this.updateSelectedCount();
    },

    renderIngredients() {
        const container = document.getElementById('ingredients-grid');
        const searchTerm = document.getElementById('ingredient-search').value.toLowerCase();
        
        const filteredIngredients = this.state.availableIngredients.filter(ingredient => 
            ingredient.toLowerCase().includes(searchTerm)
        );
        
        container.innerHTML = filteredIngredients.map(ingredient => {
            const isSelected = this.state.selectedIngredients.includes(ingredient);
            return `
                <button class="ingredient-btn ${isSelected ? 'selected' : ''}" 
                        data-ingredient="${ingredient}">
                    ${Utils.capitalizeFirst(ingredient)}
                </button>
            `;
        }).join('');
    },

    renderSuggestions() {
        const recipes = this.getMatchingRecipes();
        const container = document.getElementById('recipes-grid');
        
        if (recipes.length === 0) {
            if (this.state.selectedIngredients.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="emoji">🥕</div>
                        <p>Sélectionnez des ingrédients pour voir des suggestions !</p>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="emoji">😔</div>
                        <p>Aucune recette trouvée avec ces ingrédients.</p>
                        <p>Essayez avec moins d'ingrédients ou changez les filtres.</p>
                    </div>
                `;
            }
            return;
        }
        
        container.innerHTML = recipes.map(recipe => {
            const matchPercentage = Math.round(recipe.matchScore * 100);
            const missingCount = recipe.ingredients.length - Math.round(recipe.ingredients.length * recipe.matchScore);
            
            return `
                <div class="recipe-card" data-recipe-id="${recipe.id}">
                    <div class="recipe-header">
                        <span class="recipe-emoji">${recipe.emoji}</span>
                        <h3 class="recipe-name">${recipe.name}</h3>
                        <span class="match-score">${matchPercentage}%</span>
                    </div>
                    <div class="recipe-info">
                        <span class="difficulty ${recipe.difficulty}">${Utils.capitalizeFirst(recipe.difficulty)}</span>
                        <span class="cooking-time">${Utils.formatTime(recipe.cookingTime)}</span>
                    </div>
                    <div class="recipe-match">
                        ${missingCount === 0 
                            ? '✅ Tous les ingrédients disponibles !' 
                            : `⚠️ Il manque ${missingCount} ingrédient(s)`}
                    </div>
                    <button class="view-recipe-btn" data-recipe-id="${recipe.id}">
                        Voir la recette
                    </button>
                </div>
            `;
        }).join('');
    },

    renderRecipeDetail() {
        const recipe = this.state.currentRecipe;
        if (!recipe) return;
        
        const currentPortions = recipe.currentPortions || recipe.basePortions;
        const multiplier = currentPortions / recipe.basePortions;
        const isFavorite = this.state.favorites.includes(recipe.id);
        
        document.getElementById('recipe-title').textContent = recipe.name;
        document.getElementById('recipe-difficulty').textContent = Utils.capitalizeFirst(recipe.difficulty);
        document.getElementById('recipe-time').textContent = Utils.formatTime(recipe.cookingTime);
        document.getElementById('recipe-portions').value = currentPortions;
        
        // Ingrédients (pour l'instant sans quantités)
        const ingredientsList = document.getElementById('recipe-ingredients-list');
        ingredientsList.innerHTML = recipe.ingredients.map(ingredient => {
            const available = this.state.selectedIngredients.includes(ingredient);
            return `
                <li class="ingredient-item ${available ? 'available' : 'missing'}">
                    ${available ? '✅' : '❌'} ${Utils.capitalizeFirst(ingredient)}
                </li>
            `;
        }).join('');
        
        // Étapes
        const stepsList = document.getElementById('recipe-steps-list');
        stepsList.innerHTML = recipe.steps.map(step => `
            <li class="recipe-step">${step}</li>
        `).join('');
        
        // Bouton favori
        this.updateFavoriteButton();
    },

    updateFavoriteButton() {
        const btn = document.getElementById('favorite-toggle');
        if (this.state.currentRecipe) {
            const isFavorite = this.state.favorites.includes(this.state.currentRecipe.id);
            btn.textContent = isFavorite ? '♥' : '♡';
            btn.classList.toggle('active', isFavorite);
        }
    },

    renderFavorites() {
        const container = document.getElementById('favorites-grid');
        const favoriteRecipes = this.state.recipes.filter(recipe => 
            this.state.favorites.includes(recipe.id)
        );
        
        if (favoriteRecipes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="emoji">⭐</div>
                    <p>Aucune recette favorite pour le moment.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = favoriteRecipes.map(recipe => `
            <div class="recipe-card favorite" data-recipe-id="${recipe.id}">
                <div class="recipe-header">
                    <span class="recipe-emoji">${recipe.emoji}</span>
                    <h3 class="recipe-name">${recipe.name}</h3>
                    <span class="favorite-star">⭐</span>
                </div>
                <div class="recipe-info">
                    <span class="difficulty ${recipe.difficulty}">${Utils.capitalizeFirst(recipe.difficulty)}</span>
                    <span class="cooking-time">${Utils.formatTime(recipe.cookingTime)}</span>
                </div>
                <button class="view-recipe-btn" data-recipe-id="${recipe.id}">
                    Voir la recette
                </button>
            </div>
        `).join('');
    },

    updateSelectedCount() {
        document.getElementById('selected-count').textContent = this.state.selectedIngredients.length;
    },

    // 🎯 Event Listeners
    setupEventListeners() {
        // Recherche d'ingrédients
        document.getElementById('ingredient-search').addEventListener('input', () => {
            this.renderIngredients();
        });

        // Clear selection
        document.getElementById('clear-selection').addEventListener('click', () => {
            this.clearSelection();
        });

        // Sélection d'ingrédients (delegation)
        document.getElementById('ingredients-grid').addEventListener('click', (e) => {
            if (e.target.classList.contains('ingredient-btn')) {
                const ingredient = e.target.dataset.ingredient;
                this.toggleIngredient(ingredient);
            }
        });

        // Filtres
        document.getElementById('difficulty-filter').addEventListener('change', (e) => {
            this.state.filters.difficulty = e.target.value;
            this.renderSuggestions();
        });

        document.getElementById('time-filter').addEventListener('change', (e) => {
            this.state.filters.maxTime = e.target.value ? parseInt(e.target.value) : null;
            this.renderSuggestions();
        });

        // Sélection de recette (delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-recipe-btn')) {
                const recipeId = parseInt(e.target.dataset.recipeId);
                this.selectRecipe(recipeId);
            }
        });

        // Retour aux suggestions
        document.getElementById('back-to-suggestions').addEventListener('click', () => {
            this.hideRecipeDetail();
        });

        // Toggle favori
        document.getElementById('favorite-toggle').addEventListener('click', () => {
            if (this.state.currentRecipe) {
                this.toggleFavorite(this.state.currentRecipe.id);
            }
        });

        // Ajustement des portions
        document.getElementById('recipe-portions').addEventListener('input', (e) => {
            const newPortions = parseInt(e.target.value);
            if (newPortions > 0) {
                this.adjustPortions(newPortions);
            }
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