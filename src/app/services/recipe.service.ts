
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { ApiRecipe } from '../models/api-recipe.model';
import { API_URL } from '../config/api.config';
import { adaptRecipe } from '../adapters/recipe.adapter';
import {
  Observable,
  timer,
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
  shareReplay,
  Subject,
  switchMap,
  tap,
  throwError
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  public loading = signal(false);
  public error = signal<string | null>(null);
  public success = signal<string | null>(null);
  private lastQuery = '';

  private searchSubject = new Subject<string>();

  public searchResults = this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => this.getRecipes(query)),
    shareReplay(1)
  );

  searchRecipes(query: string): void {
    this.searchSubject.next(query);
  }

  getRecipes(query = '') {
    this.lastQuery = query;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);

    return this.http.get<ApiRecipe[]>(`${API_URL}/recipes`).pipe(
      map(apiRecipes => apiRecipes.map(adaptRecipe)),
      map(recipes => {
        const normalizedQuery = query.trim().toLocaleLowerCase('ca');

        if (!normalizedQuery) {
          return recipes;
        }

        return recipes.filter(recipe =>
          recipe.title.toLocaleLowerCase('ca').includes(normalizedQuery) ||
          recipe.description.toLocaleLowerCase('ca').includes(normalizedQuery)
        );
      }),
      catchError(error => {
        console.error('Error en carregar les receptes:', error);
        this.error.set('No s’han pogut carregar les receptes.');
        return of([]);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  retryLastQuery() {
    return this.getRecipes(this.lastQuery);
  }

  createRecipe(recipe: Omit<ApiRecipe, 'id'>) {
    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);

    return this.http.post<ApiRecipe>(`${API_URL}/recipes`, recipe).pipe(
      map(apiRecipe => adaptRecipe(apiRecipe)),
      tap(() => this.success.set('Recepta creada correctament!')),
      catchError(error => {
        console.error('Error en crear la recepta:', error);
        this.error.set('No s’ha pogut crear la recepta.');
        return throwError(() => error);
      }),
      finalize(() => this.loading.set(false))
    );
  }
  hasSearchResults(query: string): Observable<boolean> {
    return timer(500).pipe(
      switchMap(() =>
        this.http.get<ApiRecipe[]>(`${API_URL}/recipes`)
      ),
      map(recipes => {
        const normalizedQuery = query.trim().toLocaleLowerCase('ca');

        return recipes.some(recipe =>
          recipe.title.toLocaleLowerCase('ca').includes(normalizedQuery) ||
          recipe.description.toLocaleLowerCase('ca').includes(normalizedQuery)
        );
      }),
      catchError(() => of(false))
    );
  }
}
