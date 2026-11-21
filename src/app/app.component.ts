import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './services/recipe.service';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFilterComponent } from './components/recipe-filter/recipe-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeListComponent, RecipeFilterComponent, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App implements OnInit {
  public appName = 'Tastify';

  private recipeService = inject(RecipeService);

  public loading = this.recipeService.loading;

  recipes: Recipe[] = [];
  selectedCategory = 'Totes';
  searchText = '';
  selectedRecipe: Recipe | null = null;

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Error en carregar les receptes:', error);
      }
    });
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
  }

  onRecipeSelected(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}