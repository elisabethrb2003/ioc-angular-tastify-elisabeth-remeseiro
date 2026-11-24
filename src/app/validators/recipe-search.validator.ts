import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { RecipeService } from '../services/recipe.service';

export function recipeSearchValidator(
  recipeService: RecipeService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const query = String(control.value ?? '').trim();

    if (!query || query.length < 3) {
      return new Observable(subscriber => {
        subscriber.next(null);
        subscriber.complete();
      });
    }

    return recipeService.hasSearchResults(query).pipe(
      map(hasResults => hasResults ? null : { noResults: true })
    );
  };
}