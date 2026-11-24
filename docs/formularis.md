# Documentació dels formularis — Tastify

## Formulari de cerca i filtres

El formulari de cerca es troba a:

`src/app/components/recipe-filter/recipe-filter.component.ts`

Utilitza `ReactiveFormsModule` i un `FormGroup` amb dos camps:

- `searchText`: permet cercar receptes pel títol o la descripció.
- `category`: permet seleccionar una categoria o mostrar totes les receptes.

## Validacions

### Validació síncrona

El camp `searchText` utilitza `Validators.minLength(3)` per exigir un mínim de tres caràcters quan s'introdueix un terme de cerca.

### Validació asíncrona

L'arxiu `src/app/validators/recipe-search.validator.ts` conté la funció `recipeSearchValidator()`.

Aquesta validació consulta el servei `RecipeService` per comprovar si existeixen receptes que coincideixin amb el terme introduït.

S'utilitza un retard de 500 ms abans de fer la consulta.

## Missatges i accions

- Es mostra un missatge quan la cerca té menys de tres caràcters.
- Es mostra un indicador mentre es comproven els resultats.
- Es mostra un missatge quan no es troben receptes.
- El botó «Aplicar filtres» aplica els criteris seleccionats.
- El botó «Netejar cerca» reinicia els camps.

## Historial de cerques

El formulari desa les cerques vàlides a `localStorage`.

- Clau utilitzada: `tastify-search-history`.
- Es guarden fins a cinc termes.
- S'eviten els duplicats consecutius.
- Es poden recuperar cerques anteriors seleccionant-les de l'historial.
- S'utilitza `try/catch` per gestionar possibles errors de lectura o escriptura.

## Accessibilitat

Els camps tenen etiquetes associades mitjançant `label` i `for`.

Els missatges de validació utilitzen `role="alert"` i l'indicador de comprovació utilitza `role="status"`.

El formulari és adaptable a diferents amplades de pantalla.