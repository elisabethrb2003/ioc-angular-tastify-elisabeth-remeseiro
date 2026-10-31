import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.scss'
})
export class RecipeFilterComponent {
  @Input() categories: string[] = [];

  @Output() categorySelected = new EventEmitter<string>();

  onCategoryChange(category: string): void {
    this.categorySelected.emit(category);
  }
}