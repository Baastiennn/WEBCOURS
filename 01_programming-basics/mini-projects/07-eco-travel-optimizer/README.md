# 🌱 Optimiseur de Trajets Éco-Responsable

## 😫 Le Problème Humain

Quand on doit se déplacer (travail, vacances, famille), c'est difficile de comparer toutes les options : avion rapide mais polluant, train plus long mais écologique, voiture flexible mais chère... On finit par choisir par défaut sans savoir si c'est optimal selon nos vraies priorités.

## 🎯 Votre Mission

Créer un outil qui compare intelligemment toutes les options de transport (prix, temps, impact carbone) en fonction de VOS priorités personnelles, et vous aide à prendre des décisions de voyage éclairées.

## 👥 User Stories (Phase Design - 30 min)

### 🎯 User Story Principal
> **En tant que** voyageur consciencieux qui veut optimiser ses déplacements  
> **Je veux** comparer facilement toutes les options de transport  
> **Pour que** je choisisse selon mes vraies priorités (prix/temps/écologie)

### 📋 User Stories Détaillées
1. **Définir mon trajet** : "Je saisis départ/arrivée et mes contraintes de dates"
2. **Pondérer mes priorités** : "Je définis l'importance relative de prix/temps/écologie pour moi"
3. **Voir toutes les options** : "L'outil me montre avion/train/bus/voiture/covoiturage avec détails"
4. **Comparer visuellement** : "Je vois facilement quelle option est optimale selon mes critères"
5. **Simuler des scénarios** : "Je peux ajuster mes priorités et voir comment ça change le classement"

## 🧠 Modules Programming-Basics Intégrés

- **Async-Programming** : Appels APIs de transport (SNCF, Rome2Rio, etc.)
- **OOP-basics** : Classes Route, TransportOption, CarbonCalculator
- **Error-Handling** : Gestion des timeouts d'APIs, données manquantes
- **Functions** : Algorithmes de scoring, calculs de coûts cachés
- **Data-Structures** : Arrays pour options, Objects pour critères de comparaison
- **Modules** : Séparation APIs / calculs / interface

## 🏗️ Architecture Technique (Phase Plan - 20 min)

### États de l'Application
1. **État search** : Saisie des critères de voyage
2. **État loading** : Recherche en cours via APIs
3. **État comparison** : Affichage des options avec scoring
4. **État details** : Vue détaillée d'une option sélectionnée

### Structure des Données
```javascript
// Structure principale
const TravelOptimizer = {
    searchCriteria: {
        from: { name: "Paris", coordinates: [48.8566, 2.3522] },
        to: { name: "Lyon", coordinates: [45.7640, 4.8357] },
        departure: "2024-02-15",
        return: "2024-02-17", // optionnel
        passengers: 1,
        preferences: {
            price_weight: 0.4,    // 40% d'importance
            time_weight: 0.3,     // 30% d'importance  
            carbon_weight: 0.3    // 30% d'importance
        },
        constraints: {
            max_budget: 200,
            max_duration: 480, // minutes
            accessible: false
        }
    },
    transportOptions: [
        {
            id: 1,
            type: "train",
            provider: "SNCF",
            route: {
                departure: "2024-02-15T08:15:00",
                arrival: "2024-02-15T10:12:00",
                duration: 117, // minutes
                stops: ["Paris Gare de Lyon", "Lyon Part-Dieu"],
                changes: 0
            },
            pricing: {
                base_price: 45.00,
                booking_fees: 2.00,
                total_price: 47.00,
                refundable: true,
                currency: "EUR"
            },
            carbon: {
                co2_kg: 2.1,
                calculation_method: "ADEME",
                offset_available: true
            },
            comfort: {
                wifi: true,
                power_outlets: true,
                food_service: true,
                luggage_included: true
            },
            score: 0, // Calculé selon les préférences
            pros: ["Rapide", "Centre-ville à centre-ville"],
            cons: ["Prix variable selon horaire"]
        }
    ],
    apis: {
        sncf: { enabled: true, quota_remaining: 95 },
        rome2rio: { enabled: true, quota_remaining: 150 },
        blablacar: { enabled: false, reason: "API key missing" }
    }
};
```

## 🎨 MVP Features (Phase Code - 8-12h)

### ✅ Must Have (Version 1 - 4h)
- [ ] **Recherche de base** : Saisie départ/arrivée, date
- [ ] **Options statiques** : Train/avion/voiture avec données pré-calculées
- [ ] **Scoring simple** : Pondération prix/temps/carbone
- [ ] **Comparaison visuelle** : Tableau avec ranking des options
- [ ] **Calcul carbone** : Facteurs d'émission par mode de transport

### 🚀 Should Have (Version 2 - 4h)
- [ ] **Intégration APIs** : SNCF Connect, Rome2Rio pour données réelles
- [ ] **Coûts cachés** : Parking, essence, péages pour voiture
- [ ] **Préférences utilisateur** : Slider pour ajuster pondération
- [ ] **Détails par option** : Vue expandable avec horaires, confort
- [ ] **Sauvegarde recherches** : Historique des trajets comparés

### 💫 Could Have (Version 3 - 4h)
- [ ] **Mode multi-modal** : Combinaisons (train + bus, avion + train)  
- [ ] **Prédictions prix** : "Meilleur moment pour réserver"
- [ ] **Alertes de prix** : Notifications quand un trajet baisse
- [ ] **Compensation carbone** : Liens vers plateformes de compensation
- [ ] **Mode groupe** : Optimisation pour plusieurs personnes avec contraintes différentes

## 📁 Structure des Fichiers

```
07-eco-travel-optimizer/
├── README.md                 # Ce guide
├── src/
│   ├── index.html           # Interface principale
│   ├── styles/
│   │   ├── main.css         # Styles principaux
│   │   └── components.css   # Styles composants
│   ├── scripts/
│   │   ├── app.js           # Application principale
│   │   ├── apis/
│   │   │   ├── transport-apis.js # Gestion des APIs externes
│   │   │   └── carbon-calculator.js # Calculs d'empreinte carbone
│   │   ├── utils/
│   │   │   ├── scoring.js   # Algorithmes de scoring
│   │   │   └── formatters.js # Formatage des données
│   │   └── components/
│   │       ├── search-form.js # Formulaire de recherche
│   │       ├── results-table.js # Tableau de comparaison
│   │       └── option-details.js # Détails d'une option
└── extensions/
    ├── realtime-apis.md     # APIs temps réel avancées
    ├── ml-predictions.md    # ML pour prédictions de prix
    └── carbon-offsetting.md # Intégration compensation carbone
```

## 🛠️ Starter Code

### `src/scripts/app.js`
```javascript
// 🌱 ECO TRAVEL OPTIMIZER - Architecture modulaire

import { TransportAPI } from './apis/transport-apis.js';
import { CarbonCalculator } from './apis/carbon-calculator.js';
import { ScoringEngine } from './utils/scoring.js';
import { SearchForm } from './components/search-form.js';
import { ResultsTable } from './components/results-table.js';

class TravelOptimizer {
    constructor() {
        this.searchCriteria = null;
        this.transportOptions = [];
        this.isLoading = false;
        
        // Modules
        this.transportAPI = new TransportAPI();
        this.carbonCalculator = new CarbonCalculator();
        this.scoringEngine = new ScoringEngine();
        
        // Composants UI
        this.searchForm = new SearchForm(this.handleSearch.bind(this));
        this.resultsTable = new ResultsTable(this.handleOptionSelect.bind(this));
        
        this.init();
    }
    
    async init() {
        this.loadFromStorage();
        this.renderInterface();
        this.setupEventListeners();
        
        // Pré-charger quelques données statiques
        await this.loadStaticTransportData();
        
        console.log('🌱 Eco Travel Optimizer initialized!');
    }
    
    // 🔍 Recherche principale
    async handleSearch(criteria) {\n        this.searchCriteria = criteria;\n        this.setLoading(true);\n        \n        try {\n            // Recherche en parallèle sur différentes sources\n            const searchPromises = [\n                this.searchTrainOptions(criteria),\n                this.searchFlightOptions(criteria),\n                this.searchBusOptions(criteria),\n                this.calculateCarOption(criteria)\n            ];\n            \n            const results = await Promise.allSettled(searchPromises);\n            \n            // Consolider les résultats\n            this.transportOptions = [];\n            results.forEach((result, index) => {\n                if (result.status === 'fulfilled' && result.value) {\n                    if (Array.isArray(result.value)) {\n                        this.transportOptions.push(...result.value);\n                    } else {\n                        this.transportOptions.push(result.value);\n                    }\n                } else {\n                    console.warn(`Search failed for option ${index}:`, result.reason);\n                }\n            });\n            \n            // Calculer scores et trier\n            this.calculateScores();\n            this.sortByScore();\n            \n            // Afficher résultats\n            this.renderResults();\n            \n        } catch (error) {\n            this.handleSearchError(error);\n        } finally {\n            this.setLoading(false);\n            this.saveToStorage();\n        }\n    }\n    \n    async searchTrainOptions(criteria) {\n        try {\n            const trains = await this.transportAPI.searchTrains(\n                criteria.from,\n                criteria.to,\n                criteria.departure\n            );\n            \n            return trains.map(train => this.formatTrainOption(train, criteria));\n        } catch (error) {\n            console.warn('Train search failed:', error);\n            // Fallback sur données statiques\n            return this.getStaticTrainOptions(criteria);\n        }\n    }\n    \n    async searchFlightOptions(criteria) {\n        // Distance minimum pour proposer l'avion\n        const distance = this.calculateDistance(criteria.from.coordinates, criteria.to.coordinates);\n        if (distance < 300) return []; // Pas d'avion pour < 300km\n        \n        try {\n            const flights = await this.transportAPI.searchFlights(\n                criteria.from,\n                criteria.to,\n                criteria.departure\n            );\n            \n            return flights.map(flight => this.formatFlightOption(flight, criteria));\n        } catch (error) {\n            console.warn('Flight search failed:', error);\n            return this.getStaticFlightOptions(criteria);\n        }\n    }\n    \n    async searchBusOptions(criteria) {\n        try {\n            const buses = await this.transportAPI.searchBuses(\n                criteria.from,\n                criteria.to,\n                criteria.departure\n            );\n            \n            return buses.map(bus => this.formatBusOption(bus, criteria));\n        } catch (error) {\n            console.warn('Bus search failed:', error);\n            return this.getStaticBusOptions(criteria);\n        }\n    }\n    \n    calculateCarOption(criteria) {\n        const distance = this.calculateDistance(criteria.from.coordinates, criteria.to.coordinates);\n        const fuelCost = this.calculateFuelCost(distance);\n        const tolls = this.estimateTolls(criteria.from, criteria.to);\n        const parking = this.estimateParking(criteria.to, criteria.return ? 2 : 1);\n        \n        const totalCost = fuelCost + tolls + parking;\n        const drivingTime = this.estimateDrivingTime(distance);\n        const carbonFootprint = this.carbonCalculator.calculateCarEmissions(distance);\n        \n        return new TransportOption({\n            type: 'car',\n            provider: 'Voiture personnelle',\n            route: {\n                departure: criteria.departure,\n                duration: drivingTime,\n                distance: distance\n            },\n            pricing: {\n                base_price: fuelCost,\n                additional_costs: {\n                    tolls: tolls,\n                    parking: parking\n                },\n                total_price: totalCost\n            },\n            carbon: {\n                co2_kg: carbonFootprint,\n                calculation_method: 'ADEME_2023'\n            },\n            comfort: {\n                flexibility: 'high',\n                luggage: 'unlimited',\n                privacy: 'high'\n            },\n            pros: ['Flexibilité totale', 'Bagages illimités'],\n            cons: ['Fatigue de conduite', 'Parking à trouver']\n        });\n    }\n    \n    // 🧮 Système de scoring\n    calculateScores() {\n        if (!this.searchCriteria?.preferences) return;\n        \n        this.transportOptions.forEach(option => {\n            option.score = this.scoringEngine.calculateScore(\n                option,\n                this.searchCriteria.preferences\n            );\n        });\n    }\n    \n    sortByScore() {\n        this.transportOptions.sort((a, b) => b.score - a.score);\n    }\n    \n    // 📊 Calculs utilitaires\n    calculateDistance(coord1, coord2) {\n        // Formule de haversine pour distance entre coordonnées\n        const R = 6371; // Rayon de la Terre en km\n        const dLat = this.toRad(coord2[0] - coord1[0]);\n        const dLon = this.toRad(coord2[1] - coord1[1]);\n        const lat1 = this.toRad(coord1[0]);\n        const lat2 = this.toRad(coord2[0]);\n        \n        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +\n                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);\n        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));\n        \n        return R * c;\n    }\n    \n    toRad(degrees) {\n        return degrees * (Math.PI/180);\n    }\n    \n    calculateFuelCost(distance) {\n        const consumption = 6.5; // L/100km moyenne\n        const fuelPrice = 1.65; // €/L moyenne\n        return (distance * consumption / 100) * fuelPrice;\n    }\n    \n    estimateTolls(from, to) {\n        // Estimation basée sur une base de données de péages\n        // Pour l'instant, estimation simple\n        const distance = this.calculateDistance(from.coordinates, to.coordinates);\n        if (distance > 200) {\n            return distance * 0.08; // ~8 centimes par km d'autoroute\n        }\n        return 0;\n    }\n    \n    estimateParking(destination, days) {\n        // Estimation parking selon type de ville\n        const cityTypes = {\n            'Paris': 25,\n            'Lyon': 15,\n            'Marseille': 12,\n            'default': 8\n        };\n        \n        const dailyRate = cityTypes[destination.name] || cityTypes.default;\n        return dailyRate * days;\n    }\n    \n    estimateDrivingTime(distance) {\n        // Temps de conduite estimé (autoroute + routes nationales)\n        const autoroute_speed = 110; // km/h moyenne\n        const city_time = 20; // minutes supplémentaires entrée/sortie ville\n        \n        const driving_hours = distance / autoroute_speed;\n        return Math.round((driving_hours * 60) + city_time);\n    }\n    \n    // 🎨 Interface utilisateur\n    renderInterface() {\n        this.searchForm.render();\n        \n        if (this.searchCriteria) {\n            this.renderSearchSummary();\n        }\n        \n        if (this.transportOptions.length > 0) {\n            this.renderResults();\n        }\n    }\n    \n    renderSearchSummary() {\n        const container = document.getElementById('search-summary');\n        if (!container || !this.searchCriteria) return;\n        \n        container.innerHTML = `\n            <div class=\"search-summary\">\n                <h3>🔍 Recherche en cours</h3>\n                <p><strong>${this.searchCriteria.from.name}</strong> → <strong>${this.searchCriteria.to.name}</strong></p>\n                <p>Départ: ${new Date(this.searchCriteria.departure).toLocaleDateString('fr-FR')}</p>\n                <p>Priorités: Prix ${Math.round(this.searchCriteria.preferences.price_weight * 100)}% | \n                   Temps ${Math.round(this.searchCriteria.preferences.time_weight * 100)}% | \n                   Écologie ${Math.round(this.searchCriteria.preferences.carbon_weight * 100)}%</p>\n            </div>\n        `;\n    }\n    \n    renderResults() {\n        this.resultsTable.render(this.transportOptions, this.searchCriteria.preferences);\n    }\n    \n    setLoading(loading) {\n        this.isLoading = loading;\n        const loader = document.getElementById('loading-indicator');\n        if (loader) {\n            loader.style.display = loading ? 'block' : 'none';\n        }\n        \n        const searchBtn = document.getElementById('search-btn');\n        if (searchBtn) {\n            searchBtn.disabled = loading;\n            searchBtn.textContent = loading ? 'Recherche...' : 'Rechercher';\n        }\n    }\n    \n    handleSearchError(error) {\n        console.error('Search error:', error);\n        const errorContainer = document.getElementById('error-message');\n        if (errorContainer) {\n            errorContainer.innerHTML = `\n                <div class=\"error-message\">\n                    <h4>❌ Erreur de recherche</h4>\n                    <p>Impossible de récupérer toutes les options de transport. Certains résultats peuvent être manquants.</p>\n                    <details>\n                        <summary>Détails techniques</summary>\n                        <pre>${error.message}</pre>\n                    </details>\n                </div>\n            `;\n        }\n    }\n    \n    handleOptionSelect(optionId) {\n        const option = this.transportOptions.find(opt => opt.id === optionId);\n        if (option) {\n            this.showOptionDetails(option);\n        }\n    }\n    \n    showOptionDetails(option) {\n        // TODO: Afficher modal avec détails complets\n        console.log('Showing details for:', option);\n    }\n    \n    // 📋 Données statiques de fallback\n    async loadStaticTransportData() {\n        // Charger données statiques pour cas où APIs sont indisponibles\n        this.staticData = {\n            train_routes: [\n                { from: 'Paris', to: 'Lyon', duration: 120, price: 45, co2: 2.1 },\n                { from: 'Paris', to: 'Marseille', duration: 195, price: 65, co2: 3.2 }\n            ],\n            flight_routes: [\n                { from: 'Paris', to: 'Nice', duration: 85, price: 120, co2: 180 }\n            ]\n        };\n    }\n    \n    getStaticTrainOptions(criteria) {\n        // Retourner options statiques si API indisponible\n        return [];\n    }\n    \n    getStaticFlightOptions(criteria) {\n        return [];\n    }\n    \n    getStaticBusOptions(criteria) {\n        return [];\n    }\n    \n    // 💾 Persistence\n    saveToStorage() {\n        const data = {\n            searchCriteria: this.searchCriteria,\n            lastSearch: Date.now()\n        };\n        localStorage.setItem('travelOptimizer', JSON.stringify(data));\n    }\n    \n    loadFromStorage() {\n        const saved = localStorage.getItem('travelOptimizer');\n        if (saved) {\n            const data = JSON.parse(saved);\n            // Charger seulement si recherche récente (< 1 heure)\n            if (Date.now() - data.lastSearch < 3600000) {\n                this.searchCriteria = data.searchCriteria;\n            }\n        }\n    }\n    \n    setupEventListeners() {\n        // Préférences en temps réel\n        const preferenceSliders = document.querySelectorAll('.preference-slider');\n        preferenceSliders.forEach(slider => {\n            slider.addEventListener('input', () => {\n                this.updatePreferences();\n                this.calculateScores();\n                this.sortByScore();\n                this.renderResults();\n            });\n        });\n    }\n    \n    updatePreferences() {\n        if (!this.searchCriteria) return;\n        \n        const priceWeight = document.getElementById('price-weight')?.value / 100 || 0.33;\n        const timeWeight = document.getElementById('time-weight')?.value / 100 || 0.33;\n        const carbonWeight = document.getElementById('carbon-weight')?.value / 100 || 0.33;\n        \n        this.searchCriteria.preferences = {\n            price_weight: priceWeight,\n            time_weight: timeWeight,\n            carbon_weight: carbonWeight\n        };\n    }\n}\n\nclass TransportOption {\n    constructor(data) {\n        this.id = Utils.generateId();\n        Object.assign(this, data);\n        this.score = 0;\n    }\n    \n    getTotalPrice() {\n        let total = this.pricing.base_price;\n        if (this.pricing.additional_costs) {\n            Object.values(this.pricing.additional_costs).forEach(cost => {\n                total += cost;\n            });\n        }\n        return total;\n    }\n    \n    getDurationInMinutes() {\n        return this.route.duration;\n    }\n    \n    getCarbonFootprint() {\n        return this.carbon.co2_kg;\n    }\n}\n\nconst Utils = {\n    generateId() {\n        return Date.now() + Math.random().toString(36).substr(2, 9);\n    },\n    \n    formatCurrency(amount, currency = 'EUR') {\n        return new Intl.NumberFormat('fr-FR', {\n            style: 'currency',\n            currency: currency\n        }).format(amount);\n    },\n    \n    formatDuration(minutes) {\n        const hours = Math.floor(minutes / 60);\n        const mins = minutes % 60;\n        return `${hours}h${mins.toString().padStart(2, '0')}`;\n    },\n    \n    formatDistance(km) {\n        return `${Math.round(km)} km`;\n    },\n    \n    formatCarbonFootprint(kg) {\n        return `${kg.toFixed(1)} kg CO₂`;\n    }\n};\n\n// 🚀 Initialisation\ndocument.addEventListener('DOMContentLoaded', () => {\n    window.travelOptimizer = new TravelOptimizer();\n});\n\nexport { TravelOptimizer, TransportOption, Utils };"
        ```

## 📊 Mesure du Succès

### **Utilité des Comparaisons**
- "Est-ce que je découvre des options que je n'aurais pas considérées ?"
- "Est-ce que le classement correspond à mes vraies priorités ?"

### **Prise de Décision**
- "Est-ce que je prends des décisions de voyage plus éclairées ?"
- "Est-ce que je trouve des compromis intéressants prix/temps/écologie ?"

### **Impact Environnemental**
- "Est-ce que je choisis plus souvent des options moins polluantes ?"
- "Est-ce que je comprends mieux l'impact carbone de mes déplacements ?"

## 🔮 Extensions Possibles

### **🎯 Niveau 1 : Données Enrichies**
- **APIs temps réel** : Prix dynamiques, retards, disponibilité
- **Données météo** : Impact sur les trajets (neige, grève, etc.)
- **Multi-devises** : Conversion automatique pour voyages internationaux

### **🎯 Niveau 2 : Intelligence Prédictive**
- **ML prix** : "Meilleur moment pour réserver", alertes de baisse
- **Recommandations contextuelles** : "Vu vos habitudes, vous préféreriez..."
- **Impact carbone personnel** : Bilan annuel, comparaisons avec objectifs

### **🎯 Niveau 3 : Écosystème Voyage**
- **Planification complète** : Hébergement, activités locales
- **Mode entreprise** : Optimisation selon politiques de voyage corporate
- **Compensation automatique** : Achat automatique de crédits carbone

---

## 🎉 Challenge Bonus

**"Expérience 3 mois"** : Utilisez l'outil pour tous vos déplacements longue distance pendant 3 mois et mesurez :
- Économies réalisées vs vos choix habituels
- Réduction de votre empreinte carbone transport
- Découverte de nouvelles options de voyage

L'objectif : devenir un voyageur plus conscient et optimisé ! 🌱