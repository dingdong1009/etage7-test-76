
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
  email: string;
  phone: string;
  startDate: string;
  yearsInCompany: number;
  salaryPerMonth: string;
  totalCommissions: string;
  ytdCommissions: string;
  commissionRate: string;
  commissionHistory?: CommissionChange[];
  description?: string;
  seniorityLevel?: string;
  region?: string;
  managedAccounts?: number;
  activeSince?: string;
  monthlyTarget?: string;
  quarterlyPerformance?: string;
  lastActivity?: string;
}

export interface CommissionChange {
  id: number;
  rate: string;
  effectiveDate: string;
  notes?: string;
}
