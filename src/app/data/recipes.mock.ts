import { Recipe } from '../models/recipe.model';

export const RECIPES_MOCK: Recipe[] = [
  {
    id: 1,
    title: 'Truita de patates',
    description: 'Truita tradicional amb patates i ceba.',
    category: 'Tradicional',
    createdAt: '2026-10-01',
    prepTimeMinutes: 30,
    featured: true
  },
  {
    id: 2,
    title: 'Amanida mediterrània',
    description: 'Amanida fresca amb tomàquet, olives i formatge.',
    category: 'Amanides',
    createdAt: '2026-10-02',
    prepTimeMinutes: 15,
    featured: false
  },
  {
    id: 3,
    title: 'Espaguetis a la bolonyesa',
    description: 'Pasta amb salsa de tomàquet i carn.',
    category: 'Pasta',
    createdAt: '2026-10-03',
    prepTimeMinutes: 40,
    featured: true
  },
  {
    id: 4,
    title: 'Crema de carbassa',
    description: 'Crema suau de carbassa i verdures.',
    category: 'Sopes i cremes',
    createdAt: '2026-10-04',
    prepTimeMinutes: 35,
    featured: false
  },
  {
    id: 5,
    title: 'Pollastre al forn',
    description: 'Pollastre rostit amb herbes aromàtiques.',
    category: 'Carn',
    createdAt: '2026-10-05',
    prepTimeMinutes: 60,
    featured: true
  },
  {
    id: 6,
    title: 'Paella de verdures',
    description: 'Arròs cuinat amb verdures de temporada.',
    category: 'Arròs',
    createdAt: '2026-10-06',
    prepTimeMinutes: 45,
    featured: false
  },
  {
    id: 7,
    title: 'Creps dolces',
    description: 'Creps fines ideals per a unes postres.',
    category: 'Postres',
    createdAt: '2026-10-07',
    prepTimeMinutes: 20,
    featured: false
  },
  {
    id: 8,
    title: 'Lluç al forn',
    description: 'Lluç al forn amb llimona i julivert.',
    category: 'Peix',
    createdAt: '2026-10-08',
    prepTimeMinutes: 25,
    featured: true
  },
  {
    id: 9,
    title: 'Llenties estofades',
    description: 'Plat calent de llenties amb verdures.',
    category: 'Llegums',
    createdAt: '2026-10-09',
    prepTimeMinutes: 50,
    featured: false
  },
  {
    id: 10,
    title: 'Iogurt amb fruita',
    description: 'Postres senzilles amb iogurt i fruita fresca.',
    category: 'Postres',
    createdAt: '2026-10-10',
    prepTimeMinutes: 5,
    featured: false
  }
];