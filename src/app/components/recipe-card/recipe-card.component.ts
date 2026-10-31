import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeCategoryComponent } from '../recipe-category/recipe-category.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RecipeCategoryComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  @Output() recipeSelected = new EventEmitter<Recipe>();

  selectRecipe(): void {
    this.recipeSelected.emit(this.recipe);
  }
}