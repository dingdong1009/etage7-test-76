
export interface CommissionChange {
  rate: string;
  effectiveDate: string;
  notes?: string;
}

export interface Brand {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  plan: string;
  lastActivity: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  marketSegment: string;
  productsCount: number;
  activeSince: string;
  avgOrderValue: string;
  totalSales: string;
}

export interface Buyer {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  plan: string;
  lastActivity: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  marketSegment: string;
  storeCount: number;
  activeSince: string;
  avgOrderValue: string;
  annualPurchases: string;
}

export interface SalesManager {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  email: string;
  phone: string;
  startDate: string;
  yearsInCompany: number;
  salaryPerMonth: string;
  totalCommissions: string;
  ytdCommissions: string;
  commissionRate: string;
  commissionHistory: CommissionChange[];
}

export type UserType = "brand" | "buyer" | "salesManager";
export type ViewMode = "list" | "view" | "edit" | "add";

export const isBrand = (user: any): user is Brand => {
  return 'productsCount' in user && 'totalSales' in user;
};

export const isBuyer = (user: any): user is Buyer => {
  return 'storeCount' in user && 'annualPurchases' in user;
};

export const isSalesManager = (user: any): user is SalesManager => {
  return 'commissionRate' in user && 'salaryPerMonth' in user;
};
