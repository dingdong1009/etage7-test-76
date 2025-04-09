
export type UserType = "brand" | "buyer" | "salesManager";
export type ViewMode = "list" | "view" | "edit" | "add";

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
  lastActivity: string;
  email: string;
  phone: string;
  description: string;
  seniorityLevel: string;
  region: string;
  managedAccounts: number;
  activeSince: string;
  monthlyTarget: string;
  quarterlyPerformance: string;
}
