
// Brand user type
export interface Brand {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "inactive";
  plan: string;
  productsCount: number;
  lastActivity: string;
  activeSince: string;
  website: string;
  marketSegment: string;
  description: string;
  avgOrderValue: string;
  totalSales: string;
}

// Buyer user type
export interface Buyer {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "inactive";
  plan: string;
  storeCount: number;
  lastActivity: string;
  annualPurchases: string;
  website: string;
  marketSegment: string;
  description: string;
}

// Sales Manager user type
export interface SalesManager {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "inactive";
  seniorityLevel: string;
  region: string;
  managedAccounts: number;
  monthlyTarget: string;
  quarterlyPerformance: string;
  startDate: string;
  yearsInCompany: number;
  salaryPerMonth: string;
  commissionRate: string;
}

// Contract template type
export interface ContractTemplate {
  id: number;
  name: string;
  status: "active" | "inactive";
  visibleTo: "brand" | "buyer" | "both";
  language: string;
  createdAt: string;
  lastUpdated: string;
  content?: string;
  type?: "sales" | "partnership" | "brand" | "buyer";
}
