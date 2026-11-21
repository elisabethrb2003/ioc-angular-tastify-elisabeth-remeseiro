import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { API_URL } from '../config/api.config';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  public loading = signal(false);

  getRecipes() {
    this.loading.set(true);

    return this.http.get<Recipe[]>(`${API_URL}/recipes`).pipe(
        finalize(() => this.loading.set(false))
    );
  }
}