
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { ApiRecipe } from '../models/api-recipe.model';
import { API_URL } from '../config/api.config';
import { adaptRecipe } from '../adapters/recipe.adapter';
import { finalize, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  public loading = signal(false);

  getRecipes() {
    this.loading.set(true);

    return this.http.get<ApiRecipe[]>(`${API_URL}/recipes`).pipe(
      map(apiRecipes => apiRecipes.map(adaptRecipe)),
      finalize(() => this.loading.set(false))
    );
  }
}
