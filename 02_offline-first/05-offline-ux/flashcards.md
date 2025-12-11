# 🧠 Flashcards : Offline-First UX

### Q: Qu'est-ce que l'Optimistic UI ?
<details><summary>R</summary>Afficher les changements immédiatement dans l'UI, puis synchroniser en arrière-plan. Donne une sensation d'instantanéité.</details>

### Q: Comment détecter la connexion ?
<details><summary>R</summary>
```javascript
navigator.onLine // État actuel
window.addEventListener('online', handler)
window.addEventListener('offline', handler)
```
</details>

### Q: Les 4 états de synchronisation ?
<details><summary>R</summary>
- 🟢 **Synced**: Tout synchronisé
- 🟡 **Pending**: Changements locaux en attente
- 🔵 **Syncing**: Synchronisation en cours
- 🔴 **Error**: Erreur de sync
</details>

### Q: Qu'est-ce qu'une queue de sync ?
<details><summary>R</summary>File d'attente stockant les opérations à synchroniser, traitées séquentiellement lors de la connexion</details>

### Q: Feedback visuel recommandé ?
<details><summary>R</summary>Badges de statut, toasts de notification, spinners, icônes par item, barre de connexion</details>

### Q: Code minimal détection connexion ?
<details><summary>R</summary>
```javascript
window.addEventListener('online', () => {
  console.log('Connecté');
  syncPendingChanges();
});

window.addEventListener('offline', () => {
  console.log('Déconnecté');
});
```
</details>

### Q: Pattern Optimistic UI ?
<details><summary>R</summary>
1. Appliquer changement localement
2. Afficher dans UI (instantané)
3. Synchroniser en arrière-plan
4. Gérer succès/erreur
</details>

### Q: Que montrer à l'utilisateur offline ?
<details><summary>R</summary>
- Indicateur clair "Hors ligne"
- "Vos changements seront synchronisés"
- Badge/barre de statut
- Pas de blocage de fonctionnalités
</details>

### Q: Gestion d'erreur de sync ?
<details><summary>R</summary>
- Afficher erreur visuelle (🔴)
- Conserver données localement
- Proposer retry
- Ne jamais perdre les données
</details>

### Q: Checklist UX Offline-First ?
<details><summary>R</summary>
✅ Indicateur connexion
✅ États de sync clairs
✅ Changements optimistes
✅ Queue de sync
✅ Gestion erreurs
✅ Feedback instantané
</details>

---

**🎉 Vous avez terminé tous les modules !**
