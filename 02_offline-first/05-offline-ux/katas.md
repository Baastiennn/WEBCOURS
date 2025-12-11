# 🥋 Katas : Offline-First UX

## Kata 1 : Détecteur de Connexion ⭐
Affichez un message quand l'utilisateur se déconnecte/reconnecte

<details><summary>✅ Solution</summary>

```javascript
window.addEventListener('online', () => {
  alert('Connexion restaurée!');
});

window.addEventListener('offline', () => {
  alert('Vous êtes déconnecté');
});
```
</details>

---

## Kata 2 : Badge de Statut ⭐⭐
Créez un badge qui montre l'état de connexion

<details><summary>✅ Solution</summary>

```html
<div id="status">🟢 En ligne</div>

<script>
function updateStatus() {
  const status = document.getElementById('status');
  if (navigator.onLine) {
    status.textContent = '🟢 En ligne';
    status.style.color = 'green';
  } else {
    status.textContent = '🔴 Hors ligne';
    status.style.color = 'red';
  }
}

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
updateStatus();
</script>
```
</details>

---

## Kata 3 : Optimistic UI ⭐⭐⭐
Implémentez un ajout de todo optimiste avec feedback visuel

<details><summary>✅ Solution</summary>

```javascript
const todos = [];

async function addTodo(text) {
  const todo = {
    id: `temp-${Date.now()}`,
    text,
    status: 'pending'
  };

  // Ajout immédiat
  todos.push(todo);
  renderTodos();

  // Sync en arrière-plan
  try {
    await syncToServer(todo);
    todo.status = 'synced';
  } catch (error) {
    todo.status = 'error';
  }
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById('todos');
  list.innerHTML = todos.map(t => `
    <li>
      ${t.text}
      ${t.status === 'pending' ? '⏳' : t.status === 'synced' ? '✓' : '⚠️'}
    </li>
  `).join('');
}

async function syncToServer(todo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      navigator.onLine ? resolve() : reject();
    }, 1000);
  });
}
```
</details>

---

## Challenge : App Complète ⭐⭐⭐
Créez une todo app avec :
- Indicateur de connexion
- Changements optimistes
- Queue de synchronisation
- États visuels (synced, pending, error)

<details><summary>Indice</summary>
Combinez tous les concepts : détection connexion + optimistic UI + états de sync + feedback visuel
</details>
