import { Category } from '../common/interfaces';

export const parseCategoryIds: (categories: Category[]) => number[] = (categories: Category[]): number[] => {
  return categories.map((cat: Category) => cat.id);
};
