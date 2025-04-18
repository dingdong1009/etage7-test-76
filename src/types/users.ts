
export type UserType = "brand" | "buyer" | "salesManager";
export type ViewMode = "list" | "view" | "edit" | "add";
export type UserStatus = "active" | "pending" | "rejected" | "inactive";

export interface Brand {
  id: number;
  name: string;
  status: UserStatus;
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
  assignedManager?: number;
  registrationDate?: string;
}

export interface Buyer {
  id: number;
  name: string;
  status: UserStatus;
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
  assignedManager?: number;
  registrationDate?: string;
}

export interface SalesManager {
  id: number;
  name: string;
  status: UserStatus;
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
  // New metrics for performance tracking
  totalSubscriptions?: number;
  renewalRate?: string;
  conversionRate?: string;
  monthlySubscriptions?: MonthlySubscriptionData[];
}

export interface CommissionChange {
  id: number;
  rate: string;
  effectiveDate: string;
  notes?: string;
}

export interface MonthlySubscriptionData {
  month: string;
  subscriptions: number;
  renewals: number;
  leads: number;
  conversions: number;
}

export interface RegistrationRequest {
  id: number;
  type: "brand" | "buyer";
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  registrationDate: string;
  website?: string;
  description?: string;
  assignedManager?: number;
}
