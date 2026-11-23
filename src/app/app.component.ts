import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './services/recipe.service';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFilterComponent } from './components/recipe-filter/recipe-filter.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeListComponent, RecipeFilterComponent, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App implements OnInit {
  public appName = 'Tastify';

  private recipeService = inject(RecipeService);
  private destroyRef = inject(DestroyRef);

  public loading = this.recipeService.loading;
  public error = this.recipeService.error;
  public success = this.recipeService.success;

  recipes: Recipe[] = [];
  newRecipe = {
    title: '',
    description: '',
    category: '',
    createdAt: new Date().toISOString().slice(0, 10),
    prepTimeMinutes: 0,
    featured: false
  };
  selectedCategory = 'Totes';
  searchText = '';
  selectedRecipe: Recipe | null = null;

  ngOnInit(): void {
    this.recipeService.searchResults
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        }
      });

    this.recipeService.searchRecipes('');
  }

  get categories(): string[] {
    return [...new Set(this.recipes.map(recipe => recipe.category))];
  }

  get filteredRecipes(): Recipe[] {
    return this.recipes.filter(recipe => {
      const matchesCategory =
        this.selectedCategory === 'Totes' ||
        recipe.category === this.selectedCategory;

      const matchesText =
        recipe.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        recipe.description.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesCategory && matchesText;
    });
  }

  onFiltersApplied(filters: { searchText: string; category: string }): void {
    this.searchText = filters.searchText;
    this.selectedCategory = filters.category;
    this.selectedRecipe = null;
    this.recipeService.searchRecipes(filters.searchText);
  }

  onRetry(): void {
    this.recipeService.retryLastQuery().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      }
    });
  }

  onCreateRecipe(): void {
    this.recipeService.createRecipe(this.newRecipe).subscribe({
      next: (recipe) => {
        this.recipes = [...this.recipes, recipe];

        this.newRecipe = {
          title: '',
          description: '',
          category: '',
          createdAt: new Date().toISOString().slice(0, 10),
          prepTimeMinutes: 0,
          featured: false
        };
      },
      error: (error) => {
        console.error('Error en crear la recepta:', error);
      }
    });
  }

  onRecipeSelected(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}