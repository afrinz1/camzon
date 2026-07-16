export interface Product {
  id: number;
  slug: string;
  name: string;
  collection: string;
  image: string;
}

export type PageType = 'home' | 'catalog';

export interface RouteState {
  page: PageType;
  selectedCategory?: string;
}
