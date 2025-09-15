# 💰 Simplificateur de Partage de Frais

## 😫 Le Problème Humain

Après un resto, un voyage ou une soirée en groupe, calculer qui doit quoi à qui devient un cauchemar. "Alice a payé 45€, Bob 23€, Charlie rien mais il doit sa part..." Résultat : des calculs compliqués, des erreurs, et parfois des tensions dans le groupe.

## 🎯 Votre Mission

Créer un calculateur intelligent qui optimise les remboursements entre amis : qui doit payer combien à qui pour équilibrer les comptes avec le minimum de transactions.

## 👥 User Stories (Phase Design - 30 min)

### 🎯 User Story Principal
> **En tant que** personne qui organise des sorties en groupe  
> **Je veux** un outil qui calcule automatiquement les remboursements  
> **Pour que** tout le monde sache exactement qui doit quoi sans dispute

### 📋 User Stories Détaillées
1. **Ajouter les participants** : "Je veux créer rapidement la liste des personnes du groupe"
2. **Enregistrer les dépenses** : "Je veux noter qui a payé quoi facilement"
3. **Voir l'équilibrage** : "Je veux savoir qui doit combien à qui"
4. **Optimiser les transferts** : "Je veux le minimum de transactions pour équilibrer"
5. **Partager le résultat** : "Je veux envoyer le résumé à tout le monde"

## 🧠 Modules Programming-Basics Intégrés

- **Data-Structures** : Arrays pour participants/dépenses, Objects pour balances
- **Functions** : Calculs de répartition, algorithmes d'optimisation
- **Loops** : Itération sur dépenses, calculs de balances
- **Conditions** : Logique de qui doit à qui, validations
- **OOP-basics** : Classes Participant, Expense, Transaction
- **Error-Handling** : Validation des montants, gestion des erreurs de calcul

## 🏗️ Architecture Technique (Phase Plan - 20 min)

### États de l'Application
1. **État setup** : Ajout des participants et dépenses
2. **État calculation** : Calcul des balances et optimisation
3. **État results** : Affichage des transactions nécessaires
4. **État share** : Export et partage du résumé

### Structure des Données
```javascript
// Structure principale
const ExpenseSplitter = {
    currentGroup: {
        id: 1,
        name: "Weekend à la montagne",
        participants: [
            {
                id: 1,
                name: "Alice",
                email: "alice@email.com",
                totalPaid: 120.50,
                totalOwed: 85.33,
                balance: 35.17 // positif = doit recevoir, négatif = doit payer
            }
        ],
        expenses: [
            {
                id: 1,
                description: "Restaurant samedi soir",
                amount: 156.00,
                paidBy: 1, // participant ID
                splitBetween: [1, 2, 3, 4], // participant IDs
                splitType: "equal", // equal, custom, percentage
                date: "2024-01-20",
                category: "food"
            }
        ],
        transactions: [
            {
                from: 2, // participant ID
                to: 1,   // participant ID
                amount: 25.50,
                description: "Remboursement part restaurant"
            }
        ],
        settings: {
            currency: "EUR",
            roundToNearestCent: true
        }
    }
};
```

## 🎨 MVP Features (Phase Code - 5-7h)

### ✅ Must Have (Version 1 - 2.5h)
- [ ] **Ajouter participants** : Nom simple, gestion de la liste
- [ ] **Enregistrer dépenses** : Qui a payé, montant, répartition égale
- [ ] **Calculer balances** : Qui doit combien au total
- [ ] **Générer transactions** : Qui paie combien à qui
- [ ] **Affichage clair** : Vue simple des remboursements nécessaires

### 🚀 Should Have (Version 2 - 2h)
- [ ] **Répartition personnalisée** : Parts inégales selon participation
- [ ] **Catégories de dépenses** : Restaurant, transport, logement, etc.
- [ ] **Optimisation des transferts** : Algorithme pour minimiser les transactions
- [ ] **Validation des données** : Vérifications de cohérence
- [ ] **Historique des groupes** : Sauvegarde et récupération

### 💫 Could Have (Version 3 - 2.5h)
- [ ] **Export PDF** : Résumé professionnel à imprimer/envoyer
- [ ] **Intégration devises** : Conversion automatique pour voyages internationaux
- [ ] **Split intelligent** : Suggestions de répartition selon le contexte
- [ ] **Mode collaboratif** : Chacun peut ajouter ses dépenses en temps réel
- [ ] **Notifications de rappel** : Relance pour les remboursements en attente

## 📁 Structure des Fichiers

```
05-expense-splitter/
├── README.md                 # Ce guide
├── starter-files/
│   ├── index.html           # Interface principale
│   ├── style.css            # Styles avec visualisations claires
│   └── script.js            # Classes et algorithmes de calcul
└── extensions/
    ├── payment-integration.md # Intégration PayPal/Lydia
    ├── multi-currency.md     # Support devises multiples
    └── group-collaboration.md # Mode temps-réel collaboratif
```

## 🛠️ Starter Code

### `starter-files/script.js`
```javascript
// 💰 EXPENSE SPLITTER - Architecture OOP

class ExpenseSplitter {
    constructor() {
        this.currentGroup = null;
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.renderInterface();
        this.setupEventListeners();
        console.log('💰 Expense Splitter initialized!');
    }
    
    // 👥 Gestion du groupe
    createGroup(name) {
        this.currentGroup = new Group(name);
        this.renderInterface();
        this.saveToStorage();
    }
    
    addParticipant(name, email = '') {
        if (!this.currentGroup) return;
        
        const participant = new Participant(name, email);
        this.currentGroup.addParticipant(participant);
        this.renderParticipants();
        this.saveToStorage();
    }
    
    removeParticipant(participantId) {
        if (!this.currentGroup) return;
        
        this.currentGroup.removeParticipant(participantId);
        this.recalculateAll();
        this.renderInterface();
        this.saveToStorage();
    }
    
    // 💸 Gestion des dépenses
    addExpense(description, amount, paidById, splitBetween, splitType = 'equal') {
        if (!this.currentGroup) return;
        
        const expense = new Expense(description, amount, paidById, splitBetween, splitType);
        this.currentGroup.addExpense(expense);
        this.recalculateAll();
        this.renderInterface();
        this.saveToStorage();
    }
    
    removeExpense(expenseId) {
        if (!this.currentGroup) return;
        
        this.currentGroup.removeExpense(expenseId);
        this.recalculateAll();
        this.renderInterface();
        this.saveToStorage();
    }
    
    // 🧮 Calculs principaux
    recalculateAll() {
        if (!this.currentGroup) return;
        
        this.calculateParticipantBalances();
        this.calculateOptimalTransactions();
    }
    
    calculateParticipantBalances() {
        // Réinitialiser les balances
        this.currentGroup.participants.forEach(p => {
            p.totalPaid = 0;
            p.totalOwed = 0;
            p.balance = 0;
        });
        
        // Calculer pour chaque dépense
        this.currentGroup.expenses.forEach(expense => {
            const payer = this.currentGroup.getParticipant(expense.paidBy);
            if (payer) {
                payer.totalPaid += expense.amount;
            }
            
            // Calculer la part de chaque participant
            const shares = this.calculateExpenseShares(expense);
            Object.keys(shares).forEach(participantId => {
                const participant = this.currentGroup.getParticipant(parseInt(participantId));
                if (participant) {
                    participant.totalOwed += shares[participantId];
                }
            });
        });
        
        // Calculer la balance (positif = doit recevoir, négatif = doit payer)
        this.currentGroup.participants.forEach(p => {
            p.balance = p.totalPaid - p.totalOwed;
        });
    }
    
    calculateExpenseShares(expense) {
        const shares = {};\n        \n        if (expense.splitType === 'equal') {\n            const sharePerPerson = expense.amount / expense.splitBetween.length;\n            expense.splitBetween.forEach(participantId => {\n                shares[participantId] = sharePerPerson;\n            });\n        } else if (expense.splitType === 'custom') {\n            // TODO: Implémenter répartition personnalisée\n            // Pour l'instant, retour à égal\n            const sharePerPerson = expense.amount / expense.splitBetween.length;\n            expense.splitBetween.forEach(participantId => {\n                shares[participantId] = sharePerPerson;\n            });\n        }\n        \n        return shares;\n    }\n    \n    calculateOptimalTransactions() {\n        if (!this.currentGroup) return;\n        \n        // Algorithme de simplification des dettes\n        const creditors = this.currentGroup.participants.filter(p => p.balance > 0.01);\n        const debtors = this.currentGroup.participants.filter(p => p.balance < -0.01);\n        \n        this.currentGroup.transactions = [];\n        \n        // Trier par montant décroissant\n        creditors.sort((a, b) => b.balance - a.balance);\n        debtors.sort((a, b) => a.balance - b.balance);\n        \n        let i = 0, j = 0;\n        while (i < creditors.length && j < debtors.length) {\n            const creditor = creditors[i];\n            const debtor = debtors[j];\n            \n            const transferAmount = Math.min(creditor.balance, -debtor.balance);\n            \n            if (transferAmount > 0.01) { // Éviter les micro-transactions\n                const transaction = new Transaction(\n                    debtor.id, \n                    creditor.id, \n                    transferAmount,\n                    `Remboursement ${debtor.name} → ${creditor.name}`\n                );\n                this.currentGroup.addTransaction(transaction);\n                \n                creditor.balance -= transferAmount;\n                debtor.balance += transferAmount;\n            }\n            \n            if (creditor.balance < 0.01) i++;\n            if (debtor.balance > -0.01) j++;\n        }\n    }\n    \n    // 📊 Génération de rapports\n    generateSummary() {\n        if (!this.currentGroup) return '';\n        \n        const summary = `# Résumé des Frais - ${this.currentGroup.name}\n\n**Date :** ${new Date().toLocaleDateString('fr-FR')}\n**Participants :** ${this.currentGroup.participants.length}\n**Total dépensé :** ${this.getTotalExpenses().toFixed(2)} €\n\n## Dépenses\n\n${this.currentGroup.expenses.map(expense => `\n- **${expense.description}** : ${expense.amount.toFixed(2)} € (payé par ${this.currentGroup.getParticipant(expense.paidBy)?.name})\n`).join('')}\n\n## Équilibrage des Comptes\n\n${this.currentGroup.participants.map(p => `\n- **${p.name}** :\n  - Payé : ${p.totalPaid.toFixed(2)} €\n  - Dû : ${p.totalOwed.toFixed(2)} €\n  - Balance : ${p.balance >= 0 ? '+' : ''}${p.balance.toFixed(2)} €\n`).join('')}\n\n## Transactions Nécessaires\n\n${this.currentGroup.transactions.map(t => {\n            const from = this.currentGroup.getParticipant(t.from);\n            const to = this.currentGroup.getParticipant(t.to);\n            return `- **${from?.name}** doit **${t.amount.toFixed(2)} €** à **${to?.name}**`;\n        }).join('\\n')}\n\n---\n*Généré automatiquement par Expense Splitter*`;\n        \n        return summary;\n    }\n    \n    getTotalExpenses() {\n        return this.currentGroup?.expenses.reduce((sum, exp) => sum + exp.amount, 0) || 0;\n    }\n    \n    exportSummary() {\n        const summary = this.generateSummary();\n        const blob = new Blob([summary], { type: 'text/markdown' });\n        const url = URL.createObjectURL(blob);\n        \n        const a = document.createElement('a');\n        a.href = url;\n        a.download = `frais-${this.currentGroup.name.toLowerCase().replace(/\\s+/g, '-')}.md`;\n        document.body.appendChild(a);\n        a.click();\n        document.body.removeChild(a);\n        URL.revokeObjectURL(url);\n    }\n    \n    // 🎨 Interface\n    renderInterface() {\n        this.renderGroupInfo();\n        this.renderParticipants();\n        this.renderExpenses();\n        this.renderBalances();\n        this.renderTransactions();\n    }\n    \n    renderGroupInfo() {\n        // TODO: Afficher infos du groupe\n    }\n    \n    renderParticipants() {\n        // TODO: Afficher liste des participants\n    }\n    \n    renderExpenses() {\n        // TODO: Afficher liste des dépenses\n    }\n    \n    renderBalances() {\n        // TODO: Afficher balances de chaque participant\n    }\n    \n    renderTransactions() {\n        // TODO: Afficher transactions d'équilibrage\n    }\n    \n    // 💾 Persistence\n    saveToStorage() {\n        if (this.currentGroup) {\n            localStorage.setItem('expenseSplitterGroup', JSON.stringify(this.currentGroup));\n        }\n    }\n    \n    loadFromStorage() {\n        const saved = localStorage.getItem('expenseSplitterGroup');\n        if (saved) {\n            const data = JSON.parse(saved);\n            this.currentGroup = Group.fromJSON(data);\n        }\n    }\n    \n    setupEventListeners() {\n        // TODO: Implémenter event listeners\n    }\n}\n\nclass Group {\n    constructor(name) {\n        this.id = Utils.generateId();\n        this.name = name;\n        this.participants = [];\n        this.expenses = [];\n        this.transactions = [];\n        this.createdAt = new Date().toISOString();\n        this.settings = {\n            currency: 'EUR',\n            roundToNearestCent: true\n        };\n    }\n    \n    addParticipant(participant) {\n        this.participants.push(participant);\n    }\n    \n    removeParticipant(participantId) {\n        this.participants = this.participants.filter(p => p.id !== participantId);\n        // Nettoyer les dépenses liées\n        this.expenses = this.expenses.filter(e => \n            e.paidBy !== participantId && !e.splitBetween.includes(participantId)\n        );\n    }\n    \n    getParticipant(id) {\n        return this.participants.find(p => p.id === id);\n    }\n    \n    addExpense(expense) {\n        this.expenses.push(expense);\n    }\n    \n    removeExpense(expenseId) {\n        this.expenses = this.expenses.filter(e => e.id !== expenseId);\n    }\n    \n    addTransaction(transaction) {\n        this.transactions.push(transaction);\n    }\n    \n    static fromJSON(data) {\n        const group = new Group(data.name);\n        Object.assign(group, data);\n        return group;\n    }\n}\n\nclass Participant {\n    constructor(name, email = '') {\n        this.id = Utils.generateId();\n        this.name = name;\n        this.email = email;\n        this.totalPaid = 0;\n        this.totalOwed = 0;\n        this.balance = 0;\n    }\n}\n\nclass Expense {\n    constructor(description, amount, paidBy, splitBetween, splitType = 'equal') {\n        this.id = Utils.generateId();\n        this.description = description;\n        this.amount = parseFloat(amount);\n        this.paidBy = paidBy;\n        this.splitBetween = splitBetween || [];\n        this.splitType = splitType;\n        this.date = new Date().toISOString().split('T')[0];\n        this.category = 'other';\n    }\n}\n\nclass Transaction {\n    constructor(from, to, amount, description) {\n        this.id = Utils.generateId();\n        this.from = from;\n        this.to = to;\n        this.amount = parseFloat(amount);\n        this.description = description;\n        this.status = 'pending'; // pending, completed\n        this.createdAt = new Date().toISOString();\n    }\n    \n    markCompleted() {\n        this.status = 'completed';\n        this.completedAt = new Date().toISOString();\n    }\n}\n\n// 💡 Fonctions utilitaires\nconst Utils = {\n    generateId() {\n        return Date.now() + Math.random().toString(36).substr(2, 9);\n    },\n    \n    formatCurrency(amount, currency = 'EUR') {\n        return new Intl.NumberFormat('fr-FR', {\n            style: 'currency',\n            currency: currency\n        }).format(amount);\n    },\n    \n    validateAmount(amount) {\n        const parsed = parseFloat(amount);\n        return !isNaN(parsed) && parsed >= 0;\n    },\n    \n    roundToNearestCent(amount) {\n        return Math.round(amount * 100) / 100;\n    }\n};\n\n// 🚀 Initialisation\ndocument.addEventListener('DOMContentLoaded', () => {\n    window.expenseSplitter = new ExpenseSplitter();\n});"
        ```

## 📊 Mesure du Succès

### **Simplicité d'Usage**
- "Est-ce que quelqu'un peut l'utiliser sans explication ?"
- "Est-ce qu'on évite les erreurs de calcul manuelles ?"

### **Réduction des Conflicts**
- "Est-ce que les remboursements sont plus clairs ?"
- "Est-ce qu'il y a moins de discussions sur 'qui doit quoi' ?"

### **Optimisation**
- "Est-ce qu'on minimise vraiment le nombre de transactions ?"
- "Est-ce que l'équilibrage est mathématiquement correct ?"

## 🔮 Extensions Possibles

### **🎯 Niveau 1 : Amélioration UX**
- **Scanner de reçus** : OCR pour extraire montant et description automatiquement
- **Templates de groupe** : Modèles pré-définis (voyage, restaurant, colocation)
- **Mode offline** : Fonctionnement sans connexion internet

### **🎯 Niveau 2 : Intelligence Financière**
- **Prédictions de dépenses** : "En général ce type de sortie coûte X€ par personne"
- **Suggestions d'économies** : "Vous pouvez économiser en divisant autrement"
- **Détection d'anomalies** : "Cette dépense semble inhabituellement élevée"

### **🎯 Niveau 3 : Intégration & Automation**
- **Intégration bancaire** : Connection avec comptes pour validation des paiements
- **Notifications automatiques** : Rappels par email/SMS des remboursements dus
- **Mode entreprise** : Gestion de notes de frais avec validation hiérarchique

---

## 🎉 Challenge Bonus

**"Test en situation réelle"** : Utilisez l'outil pour 3 sorties de groupe différentes et mesurez :
- Temps gagné vs calculs manuels
- Réduction des erreurs de calcul
- Satisfaction du groupe sur la clarté des remboursements

L'objectif : ne plus jamais avoir de disputes d'argent entre amis ! 💰