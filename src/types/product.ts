
export interface Product {
  id: number | string;
  name: string;
  sku: string;
  category: string;
  subCategory?: string;
  season?: string;
  color?: string;
  price: number | string;
  status: string;
  releaseDate: string;
  description: string;
  materials: string;
  material?: string;
  favorite?: boolean;
  imagePlaceholder?: string;
  availability?: string;
  minimumOrder?: number;
  leadTime?: string;
  shippingFrom?: string;
  exclusivity?: boolean;
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
