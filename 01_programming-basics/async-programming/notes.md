# Programmation Asynchrone - Notes

## Qu'est-ce que la Programmation Asynchrone ?

La programmation asynchrone permet d'exécuter du code sans bloquer le thread principal, permettant à d'autres opérations de continuer pendant qu'on attend des tâches longues comme les appels réseau, la lecture de fichiers, ou les interactions utilisateur.

> 💡 **Liens avec d'autres modules :**
> - [**Functions ←**](../functions/) Les fonctions async/await et callbacks sont des fonctions spécialisées
> - [**Error-handling ←**](../error-handling/) La gestion d'erreurs est cruciale en programmation asynchrone
> - [**Input-output ←**](../input-output/) Les I/O sont souvent asynchrones (APIs, fichiers)

## Pourquoi est-elle Essentielle ?

### Performance et Expérience Utilisateur
- **Non-bloquant** : L'interface reste réactive pendant les opérations longues
- **Parallélisme** : Plusieurs opérations peuvent s'exécuter en "parallèle"
- **Efficacité** : Meilleure utilisation des ressources système

### Applications Web Modernes
- **APIs REST** : Récupération de données depuis des serveurs
- **Interfaces Dynamiques** : Mise à jour du DOM sans rechargement
- **Temps Réel** : WebSockets, notifications push
- **Optimisations** : Lazy loading, prefetching

## L'Event Loop et le Modèle Asynchrone

### Comment JavaScript Gère l'Asynchrone
```javascript
console.log('1 - Synchrone');

setTimeout(() => {
    console.log('3 - Asynchrone (après 0ms)');
}, 0);

console.log('2 - Synchrone');

// Sortie : 1, 2, 3
// Même avec 0ms, setTimeout est placé dans la queue des tâches
```

### La Stack d'Exécution
```javascript
function a() {
    console.log('Fonction A');
    b();
}

function b() {
    console.log('Fonction B');
    setTimeout(() => {
        console.log('Callback après B');
    }, 0);
}

a();
console.log('Fin du script principal');

// Sortie :
// Fonction A
// Fonction B
// Fin du script principal
// Callback après B
```

### Micro-tâches vs Macro-tâches
```javascript
console.log('Script start');

setTimeout(() => console.log('setTimeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('Script end');

// Sortie :
// Script start
// Script end
// Promise (micro-tâche, prioritaire)
// setTimeout (macro-tâche)
```

## Callbacks - Les Fondations

### Callback Basique
```javascript
function operationAsynchrone(callback) {
    setTimeout(() => {
        const resultat = 'Données récupérées';
        callback(null, resultat);
    }, 1000);
}

function gererResultat(erreur, donnees) {
    if (erreur) {
        console.error('Erreur:', erreur);
    } else {
        console.log('Succès:', donnees);
    }
}

operationAsynchrone(gererResultat);
```

### Callbacks avec Gestion d'Erreurs
```javascript
function lireFichier(nomFichier, callback) {
    // Simulation d'une opération de fichier
    setTimeout(() => {
        if (nomFichier === 'inexistant.txt') {
            callback(new Error('Fichier non trouvé'), null);
        } else {
            callback(null, `Contenu de ${nomFichier}`);
        }
    }, 500);
}

lireFichier('document.txt', (erreur, contenu) => {
    if (erreur) {
        console.error('Échec de lecture:', erreur.message);
    } else {
        console.log('Fichier lu:', contenu);
        // Traiter le contenu...
    }
});
```

### Le Problème du Callback Hell
```javascript
// Pyramid of Doom - À éviter !
recupererUtilisateur(userId, (erreur1, utilisateur) => {
    if (erreur1) throw erreur1;

    recupererProfil(utilisateur.id, (erreur2, profil) => {
        if (erreur2) throw erreur2;

        recupererCommandes(utilisateur.id, (erreur3, commandes) => {
            if (erreur3) throw erreur3;

            calculerStatistiques(commandes, (erreur4, stats) => {
                if (erreur4) throw erreur4;

                afficherDashboard(utilisateur, profil, stats);
            });
        });
    });
});
```

## Promises - La Solution Moderne

### Anatomie d'une Promise
```javascript
// Création d'une Promise
const maPromise = new Promise((resolve, reject) => {
    // Opération asynchrone
    setTimeout(() => {
        const succes = Math.random() > 0.5;

        if (succes) {
            resolve('Opération réussie !');
        } else {
            reject(new Error('Opération échouée'));
        }
    }, 1000);
});

// Utilisation
maPromise
    .then(resultat => {
        console.log('Succès:', resultat);
    })
    .catch(erreur => {
        console.error('Erreur:', erreur.message);
    })
    .finally(() => {
        console.log('Opération terminée');
    });
```

### États d'une Promise
```javascript
// Pending (En attente)
const promiseEnAttente = new Promise((resolve) => {
    // Pas encore résolue
});
console.log(promiseEnAttente); // Promise { <pending> }

// Fulfilled (Résolue)
const promiseResolue = Promise.resolve('Valeur');
console.log(promiseResolue); // Promise { 'Valeur' }

// Rejected (Rejetée)
const promiseRejetee = Promise.reject(new Error('Erreur'));
console.log(promiseRejetee); // Promise { <rejected> Error: Erreur }
```

### Chaînage de Promises
```javascript
function recupererDonnees() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('données brutes'), 500);
    });
}

function traiterDonnees(donnees) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(donnees.toUpperCase()), 300);
    });
}

function sauvegarder(donnees) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${donnees} sauvegardées`), 200);
    });
}

// Chaînage élégant
recupererDonnees()
    .then(donnees => {
        console.log('Données récupérées:', donnees);
        return traiterDonnees(donnees);
    })
    .then(donneesTraitees => {
        console.log('Données traitées:', donneesTraitees);
        return sauvegarder(donneesTraitees);
    })
    .then(resultat => {
        console.log('Résultat final:', resultat);
    })
    .catch(erreur => {
        console.error('Erreur dans la chaîne:', erreur);
    });
```

### Promise.all - Opérations Parallèles
```javascript
const promise1 = recupererUtilisateur(123);
const promise2 = recupererCommandes(123);
const promise3 = recupererFacturation(123);

// Attendre que toutes les promises se résolvent
Promise.all([promise1, promise2, promise3])
    .then(([utilisateur, commandes, facturation]) => {
        console.log('Toutes les données récupérées:', {
            utilisateur,
            commandes,
            facturation
        });
        // Construire le dashboard complet
        construireDashboard(utilisateur, commandes, facturation);
    })
    .catch(erreur => {
        console.error('Au moins une opération a échoué:', erreur);
    });

// Si une seule promise échoue, Promise.all échoue
```

### Promise.allSettled - Résultats Partiels
```javascript
const operations = [
    fetch('/api/users'),
    fetch('/api/products'),
    fetch('/api/orders')  // Peut échouer
];

Promise.allSettled(operations)
    .then(resultats => {
        resultats.forEach((resultat, index) => {
            if (resultat.status === 'fulfilled') {
                console.log(`Opération ${index} réussie:`, resultat.value);
            } else {
                console.log(`Opération ${index} échouée:`, resultat.reason);
            }
        });

        // Continuer avec les données disponibles
        const donneesDisponibles = resultats
            .filter(r => r.status === 'fulfilled')
            .map(r => r.value);

        construireInterfaceAvecDonneesPartielles(donneesDisponibles);
    });
```

### Promise.race - La Plus Rapide Gagne
```javascript
const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), 5000);
});

const apiCall = fetch('/api/data');

// Course entre l'API et le timeout
Promise.race([apiCall, timeout])
    .then(response => {
        console.log('API a répondu à temps');
        return response.json();
    })
    .catch(error => {
        if (error.message === 'Timeout') {
            console.log('API trop lente, timeout atteint');
        } else {
            console.log('Erreur API:', error);
        }
    });
```

## Async/Await - Syntaxe Synchrone pour Code Asynchrone

### Syntaxe de Base
```javascript
// Fonction async retourne toujours une Promise
async function recupererDonneesUtilisateur(id) {
    try {
        // await suspend l'exécution jusqu'à résolution
        const utilisateur = await fetch(`/api/users/${id}`);
        const donneesUtilisateur = await utilisateur.json();

        const profil = await fetch(`/api/profiles/${donneesUtilisateur.profileId}`);
        const donneesProfil = await profil.json();

        return {
            ...donneesUtilisateur,
            profil: donneesProfil
        };
    } catch (erreur) {
        console.error('Erreur récupération utilisateur:', erreur);
        throw erreur; // Re-lancer pour le caller
    }
}

// Utilisation
async function main() {
    try {
        const utilisateur = await recupererDonneesUtilisateur(123);
        console.log('Utilisateur complet:', utilisateur);
        afficherProfilUtilisateur(utilisateur);
    } catch (erreur) {
        afficherMessageErreur('Impossible de charger le profil');
    }
}
```

### Gestion d'Erreurs avec Try-Catch
```javascript
async function operationComplexe() {
    try {
        console.log('Début de l\'opération...');

        // Étape 1
        const etape1 = await executerEtape1();
        console.log('Étape 1 terminée:', etape1);

        // Étape 2 - peut échouer
        const etape2 = await executerEtape2(etape1);
        console.log('Étape 2 terminée:', etape2);

        // Étape 3
        const resultatFinal = await executerEtape3(etape2);
        console.log('Opération réussie:', resultatFinal);

        return resultatFinal;
    } catch (erreur) {
        console.error('Opération échouée à l\'étape:', erreur.step || 'inconnue');
        console.error('Détail de l\'erreur:', erreur.message);

        // Nettoyage ou rollback si nécessaire
        await nettoyerRessources();

        // Re-lancer avec contexte
        throw new Error(`Opération complexe échouée: ${erreur.message}`);
    } finally {
        console.log('Nettoyage final effectué');
    }
}
```

### Async/Await avec Opérations Parallèles
```javascript
// ❌ Séquentiel - lent
async function recupererDonneesSequentiel(userId) {
    const utilisateur = await fetch(`/api/users/${userId}`).then(r => r.json());
    const commandes = await fetch(`/api/orders/${userId}`).then(r => r.json());
    const preferences = await fetch(`/api/preferences/${userId}`).then(r => r.json());

    return { utilisateur, commandes, preferences };
}

// ✅ Parallèle - rapide
async function recupererDonneesParallele(userId) {
    // Lancer toutes les requêtes en parallèle
    const [utilisateur, commandes, preferences] = await Promise.all([
        fetch(`/api/users/${userId}`).then(r => r.json()),
        fetch(`/api/orders/${userId}`).then(r => r.json()),
        fetch(`/api/preferences/${userId}`).then(r => r.json())
    ]);

    return { utilisateur, commandes, preferences };
}

// ✅ Parallèle avec gestion d'erreurs individuelles
async function recupererDonneesRobuste(userId) {
    const operations = await Promise.allSettled([
        fetch(`/api/users/${userId}`).then(r => r.json()),
        fetch(`/api/orders/${userId}`).then(r => r.json()),
        fetch(`/api/preferences/${userId}`).then(r => r.json())
    ]);

    return {
        utilisateur: operations[0].status === 'fulfilled' ? operations[0].value : null,
        commandes: operations[1].status === 'fulfilled' ? operations[1].value : [],
        preferences: operations[2].status === 'fulfilled' ? operations[2].value : {}
    };
}
```

## Fetch API - Requêtes HTTP Modernes

### Requête GET Basique
```javascript
async function recupererUtilisateurs() {
    try {
        const response = await fetch('/api/users');

        // Vérifier le statut de la réponse
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        }

        const utilisateurs = await response.json();
        console.log('Utilisateurs récupérés:', utilisateurs);

        return utilisateurs;
    } catch (erreur) {
        console.error('Erreur récupération utilisateurs:', erreur);
        throw erreur;
    }
}
```

### Requêtes avec Différentes Méthodes HTTP
```javascript
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'GET',
            headers: this.defaultHeaders
        });

        return this.handleResponse(response);
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: this.defaultHeaders,
            body: JSON.stringify(data)
        });

        return this.handleResponse(response);
    }

    async put(endpoint, data) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            headers: this.defaultHeaders,
            body: JSON.stringify(data)
        });

        return this.handleResponse(response);
    }

    async delete(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: this.defaultHeaders
        });

        return this.handleResponse(response);
    }

    async handleResponse(response) {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }

        // Gérer les réponses vides (204 No Content)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        return await response.text();
    }
}

// Utilisation
const api = new APIClient('https://api.example.com');

async function gererUtilisateurs() {
    try {
        // GET - Récupérer tous les utilisateurs
        const utilisateurs = await api.get('/users');
        console.log('Utilisateurs:', utilisateurs);

        // POST - Créer un nouvel utilisateur
        const nouvelUtilisateur = await api.post('/users', {
            nom: 'Alice Dupont',
            email: 'alice@example.com'
        });
        console.log('Utilisateur créé:', nouvelUtilisateur);

        // PUT - Mettre à jour l'utilisateur
        const utilisateurMisAJour = await api.put(`/users/${nouvelUtilisateur.id}`, {
            nom: 'Alice Martin'
        });
        console.log('Utilisateur mis à jour:', utilisateurMisAJour);

        // DELETE - Supprimer l'utilisateur
        await api.delete(`/users/${nouvelUtilisateur.id}`);
        console.log('Utilisateur supprimé');

    } catch (erreur) {
        console.error('Erreur gestion utilisateurs:', erreur.message);
    }
}
```

### Gestion Avancée avec Headers et Options
```javascript
async function requeteAvancee() {
    try {
        const response = await fetch('/api/secure-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-Custom-Header': 'valeur-personnalisee'
            },
            body: JSON.stringify({
                data: 'mes données importantes'
            }),
            credentials: 'include', // Inclure cookies
            mode: 'cors', // Gérer CORS
            cache: 'no-cache', // Pas de cache
            timeout: 10000 // Timeout personnalisé (avec AbortController)
        });

        // Vérifier différents types de réponse
        const contentType = response.headers.get('content-type');

        let data;
        if (contentType?.includes('application/json')) {
            data = await response.json();
        } else if (contentType?.includes('text/')) {
            data = await response.text();
        } else {
            data = await response.blob(); // Pour fichiers binaires
        }

        return data;
    } catch (erreur) {
        if (erreur.name === 'AbortError') {
            console.log('Requête annulée');
        } else {
            console.error('Erreur requête:', erreur);
        }
        throw erreur;
    }
}
```

### AbortController - Annulation de Requêtes
```javascript
class RequeteAvecAnnulation {
    constructor() {
        this.abortController = null;
    }

    async effectuerRequete(url, options = {}) {
        // Annuler la requête précédente si elle existe
        if (this.abortController) {
            this.abortController.abort();
        }

        // Créer un nouveau controller pour cette requête
        this.abortController = new AbortController();

        try {
            const response = await fetch(url, {
                ...options,
                signal: this.abortController.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (erreur) {
            if (erreur.name === 'AbortError') {
                console.log('Requête annulée');
                return null;
            }
            throw erreur;
        } finally {
            this.abortController = null;
        }
    }

    annulerRequete() {
        if (this.abortController) {
            this.abortController.abort();
        }
    }
}

// Utilisation pour recherche en temps réel
const recherche = new RequeteAvecAnnulation();

document.getElementById('search-input').addEventListener('input', async (e) => {
    const terme = e.target.value.trim();

    if (terme.length < 2) return;

    try {
        afficherChargement(true);

        // Chaque nouvelle frappe annule la recherche précédente
        const resultats = await recherche.effectuerRequete(`/api/search?q=${terme}`);

        if (resultats) {
            afficherResultats(resultats);
        }
    } catch (erreur) {
        afficherErreur('Erreur de recherche');
    } finally {
        afficherChargement(false);
    }
});
```

## Intégration avec le DOM

### Mise à Jour Dynamique de l'Interface
```javascript
class GestionnaireUtilisateurs {
    constructor() {
        this.container = document.getElementById('users-container');
        this.chargementIndicateur = document.getElementById('loading');
        this.messageErreur = document.getElementById('error-message');
    }

    async chargerEtAfficherUtilisateurs() {
        try {
            this.afficherChargement(true);
            this.cacherErreur();

            const utilisateurs = await this.recupererUtilisateurs();
            this.afficherUtilisateurs(utilisateurs);

        } catch (erreur) {
            console.error('Erreur chargement utilisateurs:', erreur);
            this.afficherErreur('Impossible de charger les utilisateurs');
        } finally {
            this.afficherChargement(false);
        }
    }

    async recupererUtilisateurs() {
        const response = await fetch('/api/users');
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    }

    afficherUtilisateurs(utilisateurs) {
        // Vider le container
        this.container.innerHTML = '';

        if (utilisateurs.length === 0) {
            this.container.innerHTML = '<p class="no-users">Aucun utilisateur trouvé</p>';
            return;
        }

        // Créer les éléments DOM pour chaque utilisateur
        const fragment = document.createDocumentFragment();

        utilisateurs.forEach(utilisateur => {
            const userElement = this.creerElementUtilisateur(utilisateur);
            fragment.appendChild(userElement);
        });

        this.container.appendChild(fragment);
    }

    creerElementUtilisateur(utilisateur) {
        const div = document.createElement('div');
        div.className = 'user-card';
        div.innerHTML = `
            <h3>${utilisateur.nom}</h3>
            <p>Email: ${utilisateur.email}</p>
            <p>Rôle: ${utilisateur.role}</p>
            <button onclick="gestionnaireUtilisateurs.supprimerUtilisateur(${utilisateur.id})"
                    class="btn-delete">
                Supprimer
            </button>
        `;
        return div;
    }

    async supprimerUtilisateur(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            return;
        }

        try {
            this.afficherChargement(true);

            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}`);
            }

            // Recharger la liste des utilisateurs
            await this.chargerEtAfficherUtilisateurs();

        } catch (erreur) {
            console.error('Erreur suppression utilisateur:', erreur);
            this.afficherErreur('Impossible de supprimer l\'utilisateur');
        }
    }

    afficherChargement(visible) {
        if (this.chargementIndicateur) {
            this.chargementIndicateur.style.display = visible ? 'block' : 'none';
        }
    }

    afficherErreur(message) {
        if (this.messageErreur) {
            this.messageErreur.textContent = message;
            this.messageErreur.style.display = 'block';
        }
    }

    cacherErreur() {
        if (this.messageErreur) {
            this.messageErreur.style.display = 'none';
        }
    }
}

// Initialisation
const gestionnaireUtilisateurs = new GestionnaireUtilisateurs();

// Charger au démarrage de la page
document.addEventListener('DOMContentLoaded', () => {
    gestionnaireUtilisateurs.chargerEtAfficherUtilisateurs();
});
```

### Formulaires Asynchrones
```javascript
class FormulaireAsynchrone {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.soumettreFormulaire();
        });

        // Validation en temps réel
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validerChamp(input);
            });
        });
    }

    async soumettreFormulaire() {
        try {
            // Désactiver le bouton pour éviter double soumission
            this.toggleSubmitButton(false);
            this.clearMessages();

            // Valider le formulaire
            const donneesValides = this.validerFormulaire();
            if (!donneesValides) {
                return;
            }

            // Préparer les données
            const formData = this.collecterDonnees();

            // Envoyer la requête
            const response = await fetch(this.form.action, {
                method: this.form.method || 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content
                },
                body: JSON.stringify(formData)
            });

            const resultat = await response.json();

            if (!response.ok) {
                throw new Error(resultat.message || 'Erreur de soumission');
            }

            // Succès
            this.afficherSucces(resultat.message || 'Formulaire soumis avec succès');
            this.form.reset();

            // Redirection optionnelle
            if (resultat.redirectUrl) {
                setTimeout(() => {
                    window.location.href = resultat.redirectUrl;
                }, 2000);
            }

        } catch (erreur) {
            console.error('Erreur soumission formulaire:', erreur);
            this.afficherErreur(erreur.message);
        } finally {
            this.toggleSubmitButton(true);
        }
    }

    collecterDonnees() {
        const formData = new FormData(this.form);
        const donnees = {};

        for (const [key, value] of formData.entries()) {
            donnees[key] = value;
        }

        return donnees;
    }

    validerFormulaire() {
        let valide = true;
        const champs = this.form.querySelectorAll('input[required], select[required], textarea[required]');

        champs.forEach(champ => {
            if (!this.validerChamp(champ)) {
                valide = false;
            }
        });

        return valide;
    }

    validerChamp(champ) {
        const valeur = champ.value.trim();
        let messageErreur = '';

        // Validation des champs requis
        if (champ.hasAttribute('required') && !valeur) {
            messageErreur = 'Ce champ est requis';
        }
        // Validation email
        else if (champ.type === 'email' && valeur && !this.validerEmail(valeur)) {
            messageErreur = 'Format email invalide';
        }
        // Validation longueur minimale
        else if (champ.minLength && valeur.length < champ.minLength) {
            messageErreur = `Minimum ${champ.minLength} caractères requis`;
        }

        // Afficher/cacher le message d'erreur
        this.afficherErreurChamp(champ, messageErreur);

        return messageErreur === '';
    }

    validerEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    afficherErreurChamp(champ, message) {
        const existingError = champ.parentNode.querySelector('.field-error');

        if (existingError) {
            existingError.remove();
        }

        if (message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.25rem';

            champ.parentNode.appendChild(errorDiv);
            champ.classList.add('error');
        } else {
            champ.classList.remove('error');
        }
    }

    toggleSubmitButton(enabled) {
        this.submitButton.disabled = !enabled;
        this.submitButton.textContent = enabled ? 'Envoyer' : 'Envoi en cours...';
    }

    afficherSucces(message) {
        this.afficherMessage(message, 'success');
    }

    afficherErreur(message) {
        this.afficherMessage(message, 'error');
    }

    afficherMessage(message, type) {
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.padding = '1rem';
        messageDiv.style.marginBottom = '1rem';
        messageDiv.style.borderRadius = '4px';
        messageDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        messageDiv.style.color = type === 'success' ? '#155724' : '#721c24';
        messageDiv.style.border = type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb';

        this.form.insertBefore(messageDiv, this.form.firstChild);
    }

    clearMessages() {
        const messages = this.form.querySelectorAll('.form-message');
        messages.forEach(message => message.remove());
    }
}

// Initialisation pour tous les formulaires asynchrones
document.addEventListener('DOMContentLoaded', () => {
    const formulaires = document.querySelectorAll('.async-form');
    formulaires.forEach(form => {
        new FormulaireAsynchrone(`#${form.id}`);
    });
});
```

## Patterns Avancés

### Debouncing - Éviter les Appels Excessifs
```javascript
function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        // Annuler l'exécution précédente
        clearTimeout(timeoutId);

        // Programmer une nouvelle exécution
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Recherche avec debouncing
const rechercheAvecDebounce = debounce(async (terme) => {
    try {
        console.log('Recherche pour:', terme);
        const resultats = await fetch(`/api/search?q=${terme}`).then(r => r.json());
        afficherResultatsRecherche(resultats);
    } catch (erreur) {
        console.error('Erreur recherche:', erreur);
    }
}, 300);

// Utilisation
document.getElementById('search-input').addEventListener('input', (e) => {
    const terme = e.target.value.trim();
    if (terme.length >= 2) {
        rechercheAvecDebounce(terme);
    }
});
```

### Throttling - Limiter la Fréquence
```javascript
function throttle(func, limit) {
    let inThrottle;

    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Sauvegarde automatique avec throttling
const sauvegardeAutomatique = throttle(async () => {
    try {
        const contenu = document.getElementById('editor').value;
        await fetch('/api/documents/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contenu })
        });
        console.log('Document sauvegardé automatiquement');
    } catch (erreur) {
        console.error('Erreur sauvegarde auto:', erreur);
    }
}, 2000);

document.getElementById('editor').addEventListener('input', sauvegardeAutomatique);
```

### Retry avec Backoff Exponentiel
```javascript
async function avecRetry(operationAsync, options = {}) {
    const {
        maxTentatives = 3,
        delaiInitial = 1000,
        facteurMultiplicateur = 2,
        maxDelai = 10000,
        conditionRetry = () => true
    } = options;

    for (let tentative = 0; tentative < maxTentatives; tentative++) {
        try {
            return await operationAsync();
        } catch (erreur) {
            const estDerniereTentative = tentative === maxTentatives - 1;
            const doitReessayer = conditionRetry(erreur);

            if (estDerniereTentative || !doitReessayer) {
                throw erreur;
            }

            // Calcul du délai avec backoff exponentiel
            const delai = Math.min(
                delaiInitial * Math.pow(facteurMultiplicateur, tentative),
                maxDelai
            );

            console.log(`Tentative ${tentative + 1} échouée, nouvelle tentative dans ${delai}ms`);

            await new Promise(resolve => setTimeout(resolve, delai));
        }
    }
}

// Utilisation avec condition de retry personnalisée
async function appelAPIAvecRetry() {
    return avecRetry(
        async () => {
            const response = await fetch('/api/data');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        },
        {
            maxTentatives: 3,
            delaiInitial: 500,
            conditionRetry: (erreur) => {
                // Retry seulement pour certaines erreurs
                return erreur.message.includes('500') ||
                       erreur.message.includes('502') ||
                       erreur.message.includes('503');
            }
        }
    );
}
```

### Cache avec TTL (Time To Live)
```javascript
class CacheAvecTTL {
    constructor(ttlParDefaut = 300000) { // 5 minutes par défaut
        this.cache = new Map();
        this.ttlParDefaut = ttlParDefaut;
    }

    set(cle, valeur, ttl = this.ttlParDefaut) {
        const expiration = Date.now() + ttl;
        this.cache.set(cle, {
            valeur,
            expiration
        });
    }

    get(cle) {
        const entree = this.cache.get(cle);

        if (!entree) {
            return null;
        }

        if (Date.now() > entree.expiration) {
            this.cache.delete(cle);
            return null;
        }

        return entree.valeur;
    }

    has(cle) {
        return this.get(cle) !== null;
    }

    delete(cle) {
        return this.cache.delete(cle);
    }

    clear() {
        this.cache.clear();
    }

    nettoyerExpires() {
        const maintenant = Date.now();
        for (const [cle, entree] of this.cache.entries()) {
            if (maintenant > entree.expiration) {
                this.cache.delete(cle);
            }
        }
    }
}

// Service API avec cache
class APIService {
    constructor() {
        this.cache = new CacheAvecTTL(300000); // 5 minutes

        // Nettoyage périodique du cache
        setInterval(() => {
            this.cache.nettoyerExpires();
        }, 60000); // Toutes les minutes
    }

    async obtenirUtilisateur(id, forceRefresh = false) {
        const cleCache = `user_${id}`;

        // Vérifier le cache d'abord
        if (!forceRefresh && this.cache.has(cleCache)) {
            console.log('Utilisateur récupéré depuis le cache');
            return this.cache.get(cleCache);
        }

        try {
            console.log('Récupération utilisateur depuis l\'API');
            const response = await fetch(`/api/users/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const utilisateur = await response.json();

            // Mettre en cache
            this.cache.set(cleCache, utilisateur);

            return utilisateur;
        } catch (erreur) {
            console.error('Erreur récupération utilisateur:', erreur);

            // Fallback vers cache expiré si disponible
            const utilisateurCache = this.cache.get(cleCache);
            if (utilisateurCache) {
                console.log('Utilisation des données cache expirées en fallback');
                return utilisateurCache;
            }

            throw erreur;
        }
    }
}
```

### WebSockets - Communication Temps Réel
```javascript
class GestionnaireWebSocket {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.reconnectInterval = 5000;
        this.maxReconnectAttempts = 5;
        this.reconnectAttempts = 0;
        this.listeners = new Map();
    }

    async connecter() {
        try {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = (event) => {
                console.log('WebSocket connecté');
                this.reconnectAttempts = 0;
                this.emettre('connected', event);
            };

            this.socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.emettre('message', data);

                    // Émettre événement spécifique au type
                    if (data.type) {
                        this.emettre(data.type, data);
                    }
                } catch (erreur) {
                    console.error('Erreur parsing message WebSocket:', erreur);
                }
            };

            this.socket.onclose = (event) => {
                console.log('WebSocket fermé:', event.code, event.reason);
                this.emettre('disconnected', event);

                // Tentative de reconnexion automatique
                if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
                    setTimeout(() => {
                        this.reconnectAttempts++;
                        console.log(`Tentative de reconnexion ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
                        this.connecter();
                    }, this.reconnectInterval);
                }
            };

            this.socket.onerror = (error) => {
                console.error('Erreur WebSocket:', error);
                this.emettre('error', error);
            };

        } catch (erreur) {
            console.error('Erreur connexion WebSocket:', erreur);
            throw erreur;
        }
    }

    envoyer(data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn('WebSocket non connecté, impossible d\'envoyer:', data);
        }
    }

    fermer() {
        if (this.socket) {
            this.socket.close();
        }
    }

    // Système d'événements
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    off(event, callback) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    emettre(event, data) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(data);
                } catch (erreur) {
                    console.error(`Erreur callback ${event}:`, erreur);
                }
            });
        }
    }
}

// Utilisation pour chat en temps réel
class ChatTempsReel {
    constructor() {
        this.ws = new GestionnaireWebSocket('ws://localhost:8080/chat');
        this.messagesContainer = document.getElementById('messages');
        this.messageInput = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-button');

        this.setupEventListeners();
        this.connecter();
    }

    async connecter() {
        try {
            await this.ws.connecter();

            // Écouter les nouveaux messages
            this.ws.on('message', (message) => {
                this.afficherMessage(message);
            });

            // Écouter les événements de connexion
            this.ws.on('connected', () => {
                this.afficherStatut('Connecté', 'success');
                this.sendButton.disabled = false;
            });

            this.ws.on('disconnected', () => {
                this.afficherStatut('Déconnecté', 'error');
                this.sendButton.disabled = true;
            });

        } catch (erreur) {
            console.error('Erreur connexion chat:', erreur);
            this.afficherStatut('Erreur de connexion', 'error');
        }
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => {
            this.envoyerMessage();
        });

        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.envoyerMessage();
            }
        });
    }

    envoyerMessage() {
        const texte = this.messageInput.value.trim();
        if (!texte) return;

        this.ws.envoyer({
            type: 'message',
            texte: texte,
            timestamp: new Date().toISOString()
        });

        this.messageInput.value = '';
    }

    afficherMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <span class="timestamp">${new Date(message.timestamp).toLocaleTimeString()}</span>
            <span class="text">${message.texte}</span>
        `;

        this.messagesContainer.appendChild(messageElement);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    afficherStatut(message, type) {
        console.log(`Statut ${type}: ${message}`);
        // Afficher dans l'UI si nécessaire
    }
}

// Initialiser le chat
document.addEventListener('DOMContentLoaded', () => {
    new ChatTempsReel();
});
```

## Applications Pratiques du Monde Réel

### 1. Dashboard Temps Réel
- **Données météo** : API météorologique avec mise à jour périodique
- **Notifications** : WebSockets pour les alertes en temps réel
- **Graphiques** : Mise à jour des données sans rechargement

### 2. E-commerce Interactif
- **Catalogue produits** : Lazy loading avec pagination infinie
- **Panier** : Mise à jour asynchrone avec localStorage
- **Paiement** : API Stripe/PayPal avec gestion d'erreurs

### 3. Réseaux Sociaux
- **Feed** : Chargement infini des publications
- **Notifications** : Push notifications temps réel
- **Upload** : Images/vidéos avec progress bars

### 4. Applications de Productivité
- **Édition collaborative** : WebSockets pour synchronisation
- **Sauvegarde auto** : Debouncing pour éviter surcharge serveur
- **Synchronisation** : Offline-first avec sync différée

Ces concepts forment la base de toute application web moderne et interactive.