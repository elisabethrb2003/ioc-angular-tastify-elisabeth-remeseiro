# Models TypeScript i adaptador normalitzador

## Descripció

L'aplicació Tastify separa les dades que rep de l'API del model intern que utilitza l'aplicació.

Per fer-ho, s'han creat dos models TypeScript i un adaptador que transforma i normalitza les receptes abans que arribin a la vista.

## Fitxers

- Model de l'API: `src/app/models/api-recipe.model.ts`
- Model intern: `src/app/models/recipe.model.ts`
- Adaptador: `src/app/adapters/recipe.adapter.ts`

## Taula de mapatge API → model intern

| Camp de l'API | Camp del model intern | Transformació |
| `id` | `id` | Es conserva com a `string` o `number`. |
| `title` | `title` | `trim()` i valor per defecte. |
| `description` | `description` | `trim()` i valor per defecte. |
| `category` | `category` | Eliminació d'espais i normalització de majúscules. |
| `createdAt` | `createdAt` | Normalització de la data a `YYYY-MM-DD`. |
| `prepTimeMinutes` | `prepTimeMinutes` | Conversió numèrica segura. |
| `featured` | `featured` | Valor per defecte `false` si falta. |
| Derivat de `featured` | `status` | Assignació de `Destacada` o `General`. |

## Normalitzacions aplicades

L'adaptador `adaptRecipe()` aplica les normalitzacions següents:

1. Elimina els espais sobrants dels títols i les descripcions amb `trim()`.
2. Substitueix els textos buits per valors per defecte.
3. Converteix el temps de preparació a un número segur i no negatiu.
4. Normalitza les categories.
5. Transforma les dates a un format coherent (`YYYY-MM-DD`).
6. Assigna `false` al camp `featured` quan no existeix.
7. Genera un estat intern segons si la recepta és destacada o general.

## Flux de dades

Les dades arriben de l'API com a `ApiRecipe[]`. El servei `RecipeService` utilitza l'adaptador `adaptRecipe()` per convertir-les en `Recipe[]`.

La vista treballa així únicament amb el model intern normalitzat.