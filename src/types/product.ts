
export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  season: string;
  color: string;
  price: number;
  status: string;
  releaseDate: string;
  description: string;
  materials: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface LookbookPage {
  id: number;
  template: string;
  images: string[];
  linkedProducts?: number[];
}
