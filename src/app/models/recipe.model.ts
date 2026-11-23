export interface Recipe {
  id: string | number;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  prepTimeMinutes: number;
  featured: boolean;
  status?: string;
}