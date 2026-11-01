import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.scss'
})

export class RecipeFilterComponent {
  @Input() categories: string[] = [];

  @Output() filtersApplied = new EventEmitter<{
  searchText: string;
  category: string;
  }>();

  searchText: string = '';
  selectedCategory: string = 'Totes';

  applyFilters(): void {
    this.filtersApplied.emit({
      searchText: this.searchText.trim(),
      category: this.selectedCategory
    });
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedCategory = 'Totes';

    this.filtersApplied.emit({
      searchText: '',
      category: 'Totes'
    });
  }
}