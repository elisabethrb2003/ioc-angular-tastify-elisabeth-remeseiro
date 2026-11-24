# Documentació dels serveis — Tastify

## RecipeService

El servei `RecipeService`, ubicat a `src/app/services/recipe.service.ts`, centralitza la comunicació entre l'aplicació Angular i l'API local.

### Comunicació HTTP

- **GET** `/recipes`: recupera les receptes de l'API.
- **POST** `/recipes`: crea una recepta nova.
- URL base: `http://localhost:3000`.
- Client HTTP: `HttpClient`, injectat mitjançant `inject(HttpClient)`.

### Gestió d'estats

El servei utilitza signals per controlar:

- `loading`: indica si hi ha una petició en curs.
- `error`: emmagatzema els missatges d'error.
- `success`: mostra els missatges de confirmació.

S'utilitza `catchError()` per gestionar errors i `finalize()` per finalitzar l'estat de càrrega.

### Cerca reactiva

La cerca utilitza:

- `Subject` per emetre els termes de cerca.
- `debounceTime(300)` per evitar consultes massa freqüents.
- `distinctUntilChanged()` per evitar cerques repetides.
- `switchMap()` per gestionar les peticions.
- `shareReplay(1)` per compartir els resultats.

### Reintent

El mètode `retryLastQuery()` repeteix l'última consulta mitjançant `getRecipes(this.lastQuery)`.

### Altres mètodes

- `searchRecipes(query)`: inicia una cerca.
- `createRecipe(recipe)`: envia una recepta nova.
- `hasSearchResults(query)`: comprova si existeixen receptes coincidents.

### Execució de l'API

L'API s'inicia amb:

`npm run api`

Les dades es guarden a `api/db.json` mitjançant `json-server`.