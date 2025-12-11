# 📝 Quiz : Offline-First UX

### Q1: Qu'est-ce que l'Optimistic UI ?
A) UI rapide
B) Afficher les changements immédiatement, synchroniser ensuite
C) UI colorée
D) UI moderne

<details><summary>Réponse</summary>**B** - Appliquer les changements dans l'UI immédiatement, puis synchroniser en arrière-plan</details>

---

### Q2: Comment détecter la connexion/déconnexion ?
A) `navigator.onLine` + événements online/offline
B) `window.isOnline()`
C) `fetch()` continu
D) Impossible

<details><summary>Réponse</summary>**A** - `navigator.onLine` + écouter `window.addEventListener('online/offline')`</details>

---

### Q3: Limite de navigator.onLine ?
A) Lent
B) Détecte uniquement réseau local, pas Internet
C) Ne fonctionne pas
D) Consomme trop

<details><summary>Réponse</summary>**B** - Détecte la connexion au réseau local, pas forcément Internet</details>

---

### Q4: Les 4 états de synchronisation ?
A) On, Off, Maybe, Never
B) Synced, Pending, Syncing, Error
C) Good, Bad, Ugly, Unknown
D) Fast, Slow, Medium, Stopped

<details><summary>Réponse</summary>**B** - Synced (🟢), Pending (🟡), Syncing (🔵), Error (🔴)</details>

---

### Q5: Qu'est-ce qu'une queue de synchronisation ?
A) File d'attente
B) Liste d'opérations en attente de sync
C) Type de données
D) Protocole réseau

<details><summary>Réponse</summary>**B** - Queue qui stocke les opérations à synchroniser</details>

---

### Q6: Avantage de l'Optimistic UI ?
A) Moins de code
B) Interaction instantanée sans attente réseau
C) Plus sécurisé
D) Plus simple

<details><summary>Réponse</summary>**B** - L'utilisateur voit le résultat instantanément, meilleure UX</details>

---

### Q7: Feedback visuel recommandé ?
A) Aucun
B) Badges, toasts, spinners, icônes de statut
C) Uniquement console.log
D) Pop-ups bloquants

<details><summary>Réponse</summary>**B** - Multiples indicateurs visuels pour communiquer l'état</details>

---

### Q8: Que faire en cas d'erreur de sync ?
A) Ignorer
B) Afficher erreur, garder données localement, réessayer
C) Supprimer données
D) Bloquer l'app

<details><summary>Réponse</summary>**B** - Informer l'utilisateur, conserver localement, permettre retry</details>

---

### Q9: Quand afficher un spinner de sync ?
A) Toujours
B) Jamais
C) Pendant les opérations longues/importantes
D) Uniquement au démarrage

<details><summary>Réponse</summary>**C** - Pour les opérations qui prennent >500ms ou sont critiques</details>

---

### Q10: Principe clé de l'UX offline-first ?
A) Toujours en ligne
B) L'app doit fonctionner offline comme online
C) Bloquer si déconnecté
D) Afficher erreur

<details><summary>Réponse</summary>**B** - L'application doit fonctionner normalement offline, avec sync en arrière-plan</details>

---

**Score : /10**
