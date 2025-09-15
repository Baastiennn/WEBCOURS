# Conditions - Quiz

## Questions à Choix Multiples

### 1. Que va afficher `console.log(5 > 3 && 2 < 4)` ?
a) `true`
b) `false`
c) `undefined`
d) Erreur

**Réponse: a) `true`**

### 2. Quelle valeur est fausse (falsy) en JavaScript ?
a) `[]`
b) `"0"`
c) `0`
d) `{}`

**Réponse: c) `0`**

### 3. À quoi l'expression `!false || true` s'évalue-t-elle ?
a) `true`
b) `false`
c) `undefined`
d) Erreur

**Réponse: a) `true`**

### 4. Quand devriez-vous utiliser une instruction switch au lieu de if-else ?
a) Quand vous avez seulement deux conditions
b) Quand vous vérifiez une variable contre plusieurs valeurs
c) Quand vous utilisez des opérateurs logiques
d) Quand les conditions sont complexes

**Réponse: b) Quand vous vérifiez une variable contre plusieurs valeurs**

### 5. Que se passe-t-il si vous oubliez `break` dans un case de switch ?
a) Erreur de syntaxe
b) Exécution continue au case suivant (fall-through)
c) L'instruction switch s'arrête
d) Erreur d'exécution

**Réponse: b) Exécution continue au case suivant (fall-through)**

## Questions Vrai/Faux

### 6. L'expression `"" && "hello"` s'évalue à `"hello"`.
**Réponse: Faux** (Elle s'évalue à `""` car une chaîne vide est fausse)

### 7. Dans `condition1 || condition2`, si condition1 est vraie, condition2 est toujours évaluée.
**Réponse: Faux** (L'évaluation court-circuit s'arrête à la première vraie)

### 8. L'opérateur ternaire peut remplacer de simples instructions if-else.
**Réponse: Vrai**

### 9. `null == undefined` retourne `true` en JavaScript.
**Réponse: Vrai**

### 10. Vous pouvez avoir plusieurs cases `default` dans une instruction switch.
**Réponse: Faux** (Un seul case default est autorisé)

## Questions d'Analyse de Code

### 11. Que va afficher ce code ?
```javascript
let age = 20;
if (age >= 18) {
    console.log("Adulte");
} else if (age >= 13) {
    console.log("Adolescent");
} else {
    console.log("Enfant");
}
```
**Réponse: "Adulte"** (La première condition vraie s'exécute)

### 12. Que va afficher ce code ?
```javascript
let x = 0;
console.log(x || "défaut");
```
**Réponse: "défaut"** (0 est faux, donc OR retourne la seconde valeur)

### 13. Complétez cet opérateur ternaire pour vérifier si un nombre est pair :
```javascript
let num = 8;
let result = num % 2 === 0 ? _______ : _______;
```
**Réponse: `"pair" : "impair"`** (ou des valeurs similaires vraie/fausse)

### 14. Qu'est-ce qui ne va pas avec cette instruction switch ?
```javascript
switch (grade) {
    case 'A':
        console.log("Excellent");
    case 'B':
        console.log("Bien");
        break;
    default:
        console.log("Essayez plus fort");
}
```
**Réponse: `break` manquant après case 'A'** (cause un fall-through)

## Scénarios Pratiques

### 15. Écrivez une condition pour vérifier si un utilisateur peut voter (âge 18+) et est inscrit :
```javascript
if (_______ && _______) {
    console.log("Peut voter");
}
```
**Réponse: `age >= 18 && isRegistered`**

### 16. Écrivez une clause de garde pour sortir tôt si les données ne sont pas valides :
```javascript
function processData(data) {
    if (_______) {
        return;
    }
    // Traiter les données
}
```
**Réponse: `!data` ou `data === null` ou `data === undefined`**

### 17. Convertissez ce if-else en opérateur ternaire :
```javascript
if (score >= 60) {
    result = "Réussi";
} else {
    result = "Échoué";
}
```
**Réponse: `result = score >= 60 ? "Réussi" : "Échoué";`**

## Questions à Réponse Courte

### 18. Expliquez la différence entre `==` et `===`.
**Réponse:** `===` est l'égalité stricte qui ne fait pas de conversion de type, tandis que `==` permet la conversion de type avant la comparaison.

### 19. Qu'est-ce que l'évaluation court-circuit et pourquoi est-elle utile ?
**Réponse:** L'évaluation court-circuit arrête l'évaluation des expressions logiques une fois que le résultat est déterminé. C'est utile pour les performances et pour prévenir les erreurs (comme accéder aux propriétés d'objets null).

### 20. Donnez un exemple de quand vous utiliseriez des conditions imbriquées vs des opérateurs logiques.
**Réponse:**
- Opérateurs logiques: `if (age >= 18 && hasLicense)` - conditions simples liées
- Conditions imbriquées: Scénarios complexes où chaque niveau nécessite une logique différente ou une validation extensive

## Notation
- **18-20 correct**: Excellente compréhension des conditions
- **15-17 correct**: Bonne maîtrise, réviser quelques concepts
- **12-14 correct**: Connaissances adéquates, pratiquer davantage
- **Moins de 12**: Revoir les notes et pratiquer les fondamentaux