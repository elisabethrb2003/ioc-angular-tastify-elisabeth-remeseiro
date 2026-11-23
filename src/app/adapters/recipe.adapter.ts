
import { ApiRecipe } from '../models/api-recipe.model';
import { Recipe } from '../models/recipe.model';

export function adaptRecipe(apiRecipe: ApiRecipe): Recipe {
  const title = apiRecipe.title.trim() || 'Recepta sense títol';
  const description = apiRecipe.description.trim() || 'Sense descripció';

  const categoryText = apiRecipe.category.trim().toLocaleLowerCase('ca');
  const category = categoryText
    ? categoryText.charAt(0).toLocaleUpperCase('ca') + categoryText.slice(1)
    : 'Sense categoria';

  const prepTime = Number(apiRecipe.prepTimeMinutes);
  const prepTimeMinutes = Number.isFinite(prepTime) && prepTime >= 0
    ? prepTime
    : 0;

  const parsedDate = new Date(apiRecipe.createdAt);
  const createdAt = Number.isNaN(parsedDate.getTime())
    ? ''
    : parsedDate.toISOString().slice(0, 10);

  const featured = apiRecipe.featured ?? false;

  return {
    id: apiRecipe.id,
    title,
    description,
    category,
    createdAt,
    prepTimeMinutes,
    featured,
    status: featured ? 'Destacada' : 'General'
  };
}
