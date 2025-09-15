# Conditions - Katas

## Niveau Débutant (Conditions de Base)

### Kata 1: Classificateur d'Âge
**Objectif:** Classer le stade de vie d'une personne en fonction de son âge.

**Exigences:**
- 0-12: "Enfant"
- 13-17: "Adolescent"
- 18-64: "Adulte"
- 65+: "Senior"

**Signature de la Fonction:**
```javascript
function classifyAge(age) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
classifyAge(10) // "Enfant"
classifyAge(16) // "Adolescent"
classifyAge(25) // "Adulte"
classifyAge(70) // "Senior"
```

---

### Kata 2: Calculateur de Notes
**Objectif:** Convertir les scores numériques en notes littérales.

**Exigences:**
- 90-100: "A"
- 80-89: "B"
- 70-79: "C"
- 60-69: "D"
- En dessous de 60: "F"

**Signature de la Fonction:**
```javascript
function calculateGrade(score) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
calculateGrade(95) // "A"
calculateGrade(85) // "B"
calculateGrade(55) // "F"
```

---

### Kata 3: Pair ou Impair
**Objectif:** Déterminer si un nombre est pair ou impair.

**Signature de la Fonction:**
```javascript
function evenOrOdd(number) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
evenOrOdd(4) // "Pair"
evenOrOdd(7) // "Impair"
evenOrOdd(0) // "Pair"
```

---

## Niveau Intermédiaire (Opérateurs Logiques)

### Kata 4: Validateur de Connexion
**Objectif:** Vérifier si les identifiants de l'utilisateur sont valides pour la connexion.

**Exigences:**
- Le nom d'utilisateur ne doit pas être vide
- Le mot de passe doit contenir au moins 6 caractères
- L'utilisateur ne doit pas être banni

**Signature de la Fonction:**
```javascript
function canLogin(username, password, isBanned) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
canLogin("john", "secret123", false) // true
canLogin("", "password", false) // false
canLogin("jane", "123", false) // false
canLogin("bob", "password", true) // false
```

---

### Kata 5: Éligibilité à la Remise
**Objectif:** Déterminer si un client a droit à une remise.

**Exigences:**
- Senior (65+) obtient 15% de remise
- Étudiant obtient 10% de remise
- Employé obtient 20% de remise
- Membre VIP obtient 25% de remise
- Client régulier: aucune remise

**Signature de la Fonction:**
```javascript
function getDiscount(age, isStudent, isEmployee, isVIP) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
getDiscount(70, false, false, false) // 15
getDiscount(25, true, false, false) // 10
getDiscount(30, false, true, false) // 20
getDiscount(40, false, false, true) // 25
getDiscount(30, false, false, false) // 0
```

---

### Kata 6: Feu de Circulation
**Objectif:** Déterminer quelle action prendre en fonction de la couleur du feu de circulation.

**Exigences:**
- Rouge: "Stop"
- Jaune: "Attention"
- Vert: "Allez-y"
- Couleur invalide: "Invalide"

**Signature de la Fonction:**
```javascript
function trafficAction(lightColor) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
trafficAction("red") // "Stop"
trafficAction("green") // "Allez-y"
trafficAction("blue") // "Invalide"
```

---

## Niveau Avancé (Logique Complexe)

### Kata 7: Calculateur d'Année Bissextile
**Objectif:** Déterminer si une année est bissextile.

**Exigences:**
- Divisible par 4 ET (non divisible par 100 OU divisible par 400)

**Signature de la Fonction:**
```javascript
function isLeapYear(year) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
isLeapYear(2020) // true
isLeapYear(1900) // false
isLeapYear(2000) // true
isLeapYear(2021) // false
```

---

### Kata 8: Pierre Papier Ciseaux
**Objectif:** Déterminer le gagnant d'une partie de Pierre Papier Ciseaux.

**Exigences:**
- Pierre bat Ciseaux
- Ciseaux bat Papier
- Papier bat Pierre
- Même choix = égalité

**Signature de la Fonction:**
```javascript
function rockPaperScissors(player1, player2) {
    // Retourner "Joueur 1", "Joueur 2", ou "Égalité"
}
```

**Cas de Test:**
```javascript
rockPaperScissors("rock", "scissors") // "Joueur 1"
rockPaperScissors("paper", "rock") // "Joueur 1"
rockPaperScissors("rock", "rock") // "Égalité"
```

---

### Kata 9: Vérificateur de Force de Mot de Passe
**Objectif:** Évaluer la force du mot de passe selon plusieurs critères.

**Exigences:**
- Faible: Moins de 6 caractères
- Moyen: 6+ caractères avec lettres et chiffres
- Fort: 8+ caractères avec lettres, chiffres et caractères spéciaux
- Très Fort: 12+ caractères avec tous types et casse mixte

**Signature de la Fonction:**
```javascript
function checkPasswordStrength(password) {
    // Votre code ici
}
```

**Cas de Test:**
```javascript
checkPasswordStrength("123") // "Faible"
checkPasswordStrength("abc123") // "Moyen"
checkPasswordStrength("Abc123!") // "Fort"
checkPasswordStrength("MyP@ssw0rd123") // "Très Fort"
```

---

### Kata 10: Convertisseur de Température et Conseiller
**Objectif:** Convertir la température et fournir des conseils vestimentaires.

**Exigences:**
- Convertir entre Celsius, Fahrenheit et Kelvin
- Fournir des conseils vestimentaires basés sur la température en Celsius:
  - En dessous de 0°C: "Manteau épais et gants"
  - 0-10°C: "Veste chaude"
  - 10-20°C: "Veste légère"
  - 20-30°C: "T-shirt et jean"
  - Au-dessus de 30°C: "Short et débardeur"

**Signature de la Fonction:**
```javascript
function temperatureAdvice(temp, fromUnit, toUnit) {
    // Retourner un objet avec température convertie et conseil
    // { temperature: number, advice: string }
}
```

**Cas de Test:**
```javascript
temperatureAdvice(32, "F", "C") // { temperature: 0, advice: "Veste chaude" }
temperatureAdvice(25, "C", "F") // { temperature: 77, advice: "T-shirt et jean" }
```

---

## Niveau Défi (Conditions Imbriquées)

### Kata 11: Calculateur de Prime d'Assurance
**Objectif:** Calculer la prime d'assurance automobile basée sur plusieurs facteurs.

**Exigences:**
Prime de base: 500€
- Âge < 25: +200€
- Âge > 65: +100€
- Homme: +50€
- Accidents > 0: +100€ par accident
- Années de conduite < 2: +150€
- Voiture de luxe: +300€
- Remise bon étudiant (si moins de 25 ans): -100€

**Signature de la Fonction:**
```javascript
function calculatePremium(age, gender, accidents, yearsLicense, isLuxury, isGoodStudent) {
    // Votre code ici
}
```

---

### Kata 12: Contrôleur de Maison Intelligente
**Objectif:** Contrôler les appareils de maison intelligente selon les conditions.

**Exigences:**
- Si température > 24°C et quelqu'un est à la maison: allumer la climatisation
- Si température < 18°C et quelqu'un est à la maison: allumer le chauffage
- S'il fait sombre et mouvement détecté: allumer les lumières
- Si c'est la nuit (après 22h) et tous dorment: activer la sécurité
- Si fumée détectée: activer toutes les alarmes peu importe les autres conditions

**Signature de la Fonction:**
```javascript
function smartHomeControl(temp, isHome, isDark, motion, isNight, allAsleep, smokeDetected) {
    // Retourner un objet avec les états des appareils
    // { ac: boolean, heat: boolean, lights: boolean, security: boolean, alarm: boolean }
}
```

## Solutions Disponibles

> 💡 **Astuce:** Essayez de résoudre ces katas par vous-même d'abord. Les solutions peuvent être trouvées dans le dossier `/solutions` (à créer) ou vous pouvez exécuter les cas de test fournis pour vérifier vos implémentations.

## Directives de Pratique

1. **Commencez par Débutant**: Maîtrisez les conditions de base avant de progresser
2. **Réfléchissez à la Logique**: Écrivez d'abord la logique en français simple
3. **Testez les Cas Limites**: Considérez les valeurs frontières et les entrées inattendues
4. **Refactorisez**: Une fois que ça marche, pouvez-vous le rendre plus lisible ou efficace?
5. **Utilisez le Débogueur**: Parcourez votre code étape par étape pour comprendre le flux