import { Component } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RECIPES_MOCK } from './data/recipes.mock';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeFilterComponent } from './components/recipe-filter/recipe-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeListComponent, RecipeFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  public appName = 'Tastify';
  recipes: Recipe[] = RECIPES_MOCK;
  selectedCategory = 'Totes';
  searchText = '';
  selectedRecipe: Recipe | null = null;

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