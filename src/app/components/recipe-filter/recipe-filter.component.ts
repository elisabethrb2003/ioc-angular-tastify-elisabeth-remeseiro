import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { RecipeService } from '../../services/recipe.service';
import { recipeSearchValidator } from '../../validators/recipe-search.validator';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.scss'
})
export class RecipeFilterComponent implements OnInit {
  @Input() categories: string[] = [];

  @Output() filtersApplied = new EventEmitter<{
    searchText: string;
    category: string;
  }>();

  private recipeService = inject(RecipeService);

  filterForm = new FormGroup({
    searchText: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
      asyncValidators: [recipeSearchValidator(this.recipeService)]
    }),
    category: new FormControl('Totes', {
      nonNullable: true
    })
  });

  searchHistory: string[] = [];
  private readonly HISTORY_KEY = 'tastify-search-history';

  applyFilters(): void {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }
    this.saveSearchHistory(this.filterForm.controls.searchText.value);
    this.filtersApplied.emit({
      searchText: this.filterForm.controls.searchText.value.trim(),
      category: this.filterForm.controls.category.value
    });
  }

  resetFilters(): void {
    this.filterForm.reset({
      searchText: '',
      category: 'Totes'
    });

    this.filtersApplied.emit({
      searchText: '',
      category: 'Totes'
    });
  }

  loadSearchHistory(): void {
    try {
      const saved = localStorage.getItem(this.HISTORY_KEY);
      this.searchHistory = saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error en carregar l’historial:', error);
      this.searchHistory = [];
    }
  }

  saveSearchHistory(term: string): void {
    const normalizedTerm = term.trim();

    if (!normalizedTerm) {
      return;
    }

    // Evitar duplicats consecutius
    if (this.searchHistory[0] === normalizedTerm) {
      return;
    }

    this.searchHistory = [
      normalizedTerm,
      ...this.searchHistory.filter(item => item !== normalizedTerm)
    ].slice(0, 5);

    try {
      localStorage.setItem(
        this.HISTORY_KEY,
        JSON.stringify(this.searchHistory)
      );
    } catch (error) {
      console.error('Error en desar l’historial:', error);
    }
  }

  restoreSearch(term: string): void {
    this.filterForm.controls.searchText.setValue(term);
    this.filterForm.controls.searchText.markAsTouched();
  }

  ngOnInit(): void {
    this.loadSearchHistory();
  }
}