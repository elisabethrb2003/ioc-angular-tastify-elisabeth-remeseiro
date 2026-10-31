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
  selectedRecipe: Recipe | null = null;

  get categories(): string[] {
    return [...new Set(this.recipes.map(recipe => recipe.category))];
  }

  get filteredRecipes(): Recipe[] {
    if (this.selectedCategory === 'Totes') {
      return this.recipes;
    }

    return this.recipes.filter(
      recipe => recipe.category === this.selectedCategory
    );
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.selectedRecipe = null;
  }

  onRecipeSelected(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}