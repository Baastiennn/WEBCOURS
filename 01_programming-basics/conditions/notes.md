# Conditions - Notes

## Que sont les Conditions ?

Les conditions sont des déclarations logiques qui s'évaluent soit à `true` (vrai) soit à `false` (faux). Elles permettent aux programmes de prendre des décisions et d'exécuter différents chemins de code basés sur différents scénarios.

## Concepts Fondamentaux

### Valeurs Booléennes
- `true`: Représente un état positif ou affirmatif
- `false`: Représente un état négatif ou de déni

### Opérateurs de Comparaison
- `==` ou `===`: Égal à (égalité stricte)
- `!=` ou `!==`: Différent de
- `>`: Supérieur à
- `<`: Inférieur à
- `>=`: Supérieur ou égal à
- `<=`: Inférieur ou égal à

### Opérateurs Logiques
- `&&` (ET): Les deux conditions doivent être vraies
- `||` (OU): Au moins une condition doit être vraie
- `!` (NON): Inverse la valeur booléenne

## Instructions Conditionnelles de Base

### Instruction If
```javascript
if (condition) {
    // Le code s'exécute quand la condition est vraie
}
```

### Instruction If-Else
```javascript
if (condition) {
    // Code quand la condition est vraie
} else {
    // Code quand la condition est fausse
}
```

### Chaîne If-Else If-Else
```javascript
if (condition1) {
    // Code pour condition1
} else if (condition2) {
    // Code pour condition2
} else {
    // Code par défaut
}
```

### Instruction Switch
```javascript
switch (variable) {
    case valeur1:
        // Code pour valeur1
        break;
    case valeur2:
        // Code pour valeur2
        break;
    default:
        // Code par défaut
}
```

## Concepts Avancés

### Valeurs Vraies (Truthy) et Fausses (Falsy)
Dans de nombreux langages, les valeurs peuvent être évaluées dans un contexte booléen :
- **Falsy**: `false`, `0`, `""` (chaîne vide), `null`, `undefined`, `NaN`
- **Truthy**: Tout le reste

### Opérateur Ternaire
```javascript
condition ? valeurSiVraie : valeurSiFausse
```

### Évaluation Court-Circuit
- `&&`: Si le premier est faux, le second n'est pas évalué
- `||`: Si le premier est vrai, le second n'est pas évalué

## Meilleures Pratiques

1. **Utilisez des Conditions Claires**: Rendez vos conditions lisibles et auto-documentées
2. **Évitez l'Imbrication Profonde**: Utilisez des retours anticipés ou des clauses de garde quand possible
3. **Utilisez Switch pour Plusieurs Valeurs**: Quand vous vérifiez une variable contre de nombreuses valeurs
4. **Combinez les Conditions Logiquement**: Utilisez `&&` et `||` pour combiner des conditions liées
5. **Considérez les Cas Limites**: Pensez aux conditions frontières et aux entrées inattendues

## Modèles Courants

### Clause de Garde
```javascript
if (!isValid) {
    return; // Sortie anticipée
}
// Continuer avec la logique principale
```

### Vérification de Plage
```javascript
if (age >= 18 && age < 65) {
    // Âge de travail
}
```

### Vérification Null/Undefined
```javascript
if (data && data.property) {
    // Sûr d'accéder à la propriété
}
```

## Applications du Monde Réel

- Authentification et autorisation des utilisateurs
- Validation des entrées
- Logique de jeu (conditions de victoire/défaite)
- Implémentation de règles métier
- Gestion d'erreurs et contrôle de flux
- Gestion d'état de l'interface utilisateur