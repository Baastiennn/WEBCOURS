# 🧠 Flashcards : Sync P2P

### Q: Qu'est-ce que WebRTC ?
<details><summary>R</summary>Web Real-Time Communication - API pour communication temps réel entre navigateurs</details>

### Q: Avantage du P2P ?
<details><summary>R</summary>Communication directe, latence minimale, pas de serveur central, résilient</details>

### Q: Qu'est-ce que Trystero ?
<details><summary>R</summary>Bibliothèque JavaScript qui simplifie WebRTC avec une API minimaliste</details>

### Q: Comment rejoindre une room ?
<details><summary>R</summary>
```javascript
const room = joinRoom({ appId: 'app' }, 'room-name');
```
</details>

### Q: Comment créer un canal de communication ?
<details><summary>R</summary>
```javascript
const [send, onReceive] = room.makeAction('channel-name');
```
</details>

### Q: Comment détecter les pairs ?
<details><summary>R</summary>
```javascript
room.onPeerJoin(peerId => { ... });
room.onPeerLeave(peerId => { ... });
```
</details>

### Q: Comment synchroniser un CRDT via P2P ?
<details><summary>R</summary>
1. Créer une action de sync
2. Envoyer l'état lors de peerJoin
3. Merger les états reçus
4. Broadcaster les changements
</details>

### Q: Limite du P2P ?
<details><summary>R</summary>Traversée NAT difficile, pas de garantie de livraison, scalabilité limitée (full-mesh)</details>

### Q: Qu'est-ce que le signaling ?
<details><summary>R</summary>Échange initial d'informations (via serveur) pour établir connexion P2P directe</details>

### Q: Code minimal chat P2P ?
<details><summary>R</summary>
```javascript
const room = joinRoom({ appId: 'chat' }, 'room');
const [send, onMsg] = room.makeAction('msg');
onMsg((msg, id) => console.log(msg));
send('Hello!');
```
</details>

---

**🎉 Dernier module : Offline UX !**
