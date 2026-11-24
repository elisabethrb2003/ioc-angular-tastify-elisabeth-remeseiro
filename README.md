# Tastify

## Autor/a

Elisabeth Remeseiro

## Descripció

Tastify és una aplicació web de receptes de cuina desenvolupada amb Angular. El projecte està pensat per descobrir, consultar i organitzar receptes de manera senzilla.

## Versions utilitzades

* Node.js: 24.21.0
* npm: 11.19.0
* Angular CLI: 22.2.0
* Angular: 22.2.0
* Git: 2.34.1
* TypeScript: 6.0.3
* SCSS per als estils

## Com crear i executar el projecte

Per crear el projecte des de zero:

```bash
ng new ioc-angular-tastify-elisabeth-remeseiro --routing --style=scss --ssr=false --standalone --file-name-style-guide=2016 --skip-git --package-manager=npm
```

Per instal·lar les dependències:

```bash
npm install
```

Per executar l'aplicació en mode desenvolupament:

```bash
ng serve
```

Després, obrir al navegador:

```text
http://localhost:4200
```

## Estat de l'EAC1

L'EAC1 està completada. El projecte Angular està configurat, personalitzat i publicat a GitHub. La branca de treball `ra1-setup` conté la preparació inicial del projecte, l'estructura base i la personalització inicial de la interfície.

També s'ha comprovat el funcionament del hot reload durant l'execució en mode desenvolupament.

## Enllaç del repositori

https://github.com/elisabethrb2003/ioc-angular-tastify-elisabeth-remeseiro

## Estat de l'EAC2

L'EAC2 incorpora els components necessaris per consultar i filtrar receptes a Tastify.

### Branca de treball

`ra2-components`

### Components creats

- `RecipeListComponent`: mostra el llistat de receptes.
- `RecipeCardComponent`: mostra cada recepta individualment.
- `RecipeCategoryComponent`: representa la categoria d'una recepta.
- `RecipeFilterComponent`: permet cercar i filtrar receptes.

### Model i dades

- Model `Recipe` definit a `src/app/models/recipe.model.ts`.
- Dades de prova definides a `src/app/data/recipes.mock.ts`.

### Funcionalitats implementades

- Cerca de receptes per text.
- Filtratge per categoria.
- Validació del formulari.
- Comptador de resultats.
- Visualització del detall d'una recepta.
- Missatge quan no hi ha resultats.

### Accessibilitat i disseny responsive

- Enllaç per saltar directament al contingut principal.
- Indicadors visuals de focus per a la navegació amb teclat.
- Etiquetes associades als camps del formulari.
- Ús de `role="status"`, `aria-live` i `role="alert"`.
- Disseny adaptable a pantalles de diferents amplades.

## Estat de l'EAC3

L'EAC3 incorpora la comunicació amb una API local mitjançant serveis HTTP.

### Branca de treball

`ra3-serveis`

### API local

- Servidor desenvolupat amb `json-server`.
- Fitxer de dades: `api/db.json`.
- Endpoint principal: `http://localhost:3000/recipes`.
- Comanda per iniciar l'API: `npm run api`.

### Serveis i models

- `RecipeService`: gestiona les peticions HTTP GET i POST.
- `ApiRecipe`: representa les dades rebudes de l'API.
- `Recipe`: representa el model intern de l'aplicació.
- `adaptRecipe()`: adapta i normalitza les dades de l'API.
- Estats de càrrega, error i èxit mitjançant signals.
- Cerca reactiva amb `debounceTime`, `distinctUntilChanged` i `switchMap`.

### Formularis i validacions de l'EAC3

L'EAC3 incorpora un formulari reactiu per cercar i filtrar receptes.

- Ús de `ReactiveFormsModule`.
- Cerca per text i filtratge per categoria.
- Validació síncrona amb `Validators.minLength(3)`.
- Validació asíncrona amb `recipeSearchValidator`.
- Comprovació de resultats a través de `RecipeService`.
- Missatges d'error i estat de comprovació.
- Botó per netejar la cerca.
- Historial de cerques amb `localStorage`.
- Recuperació de cerques anteriors i control d'errors amb `try/catch`.

## Execució del projecte

Cal obrir dos terminals:

Terminal 1 — API:

`npm run api`

Terminal 2 — Angular:

`ng serve`

L'aplicació estarà disponible a `http://localhost:4200` i l'API a `http://localhost:3000/recipes`.

## Proves i compilació

Per executar les proves:

`npm test`

Per compilar el projecte:

`npm run build`

## Branca de lliurament

La branca final de treball és `ra3-serveis`.