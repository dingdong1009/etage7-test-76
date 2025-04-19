
export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  isActive: boolean;
  createdAt: string;
}

export interface BrandCredit {
  id: string;
  brandId: string;
  brandName: string;
  packageId: string;
  creditsPurchased: number;
  creditsUsed: number;
  purchaseDate: string;
}
