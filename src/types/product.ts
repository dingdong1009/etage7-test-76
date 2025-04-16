
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
  images?: string[]; // Added for product images
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

export interface SocialMediaLinks {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  telegram?: string;
  whatsapp?: string;
  vk?: string;
}
