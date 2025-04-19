
import { CreditPackage, BrandCredit } from '../types/mockData';

export const mockCreditPackages: CreditPackage[] = [
  {
    id: "1",
    name: "Starter Package",
    credits: 1000,
    price: 99,
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Professional Package",
    credits: 5000,
    price: 399,
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    name: "Enterprise Package",
    credits: 10000,
    price: 699,
    isActive: true,
    createdAt: "2024-01-15",
  }
];

export const mockBrandCredits: BrandCredit[] = [
  {
    id: "1",
    brandId: "b1",
    brandName: "Fashion Brand Co.",
    packageId: "1",
    creditsPurchased: 1000,
    creditsUsed: 300,
    purchaseDate: "2024-02-01",
  },
  {
    id: "2",
    brandId: "b2",
    brandName: "Style House",
    packageId: "2",
    creditsPurchased: 5000,
    creditsUsed: 2100,
    purchaseDate: "2024-02-15",
  }
];
