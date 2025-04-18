
export type ServiceFrequency = "monthly" | "semi-annual" | "annual" | "one-time";
export type ServiceStatus = "active" | "inactive" | "archived" | "draft";
export type ServiceType = "subscription" | "consulting" | "marketing" | "advertisement" | "communication";

export interface PaidService {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  type: ServiceType;
  frequency?: ServiceFrequency;
  autoRenewal?: boolean;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription extends PaidService {
  type: "subscription";
  userCount: number;
  maxUsers: number;
  trialDays?: number;
}

export interface ConsultingService extends PaidService {
  type: "consulting";
  duration: number; // in hours
  consultantCount: number;
  availability: string[];
}

export interface MarketingCredit {
  id: string;
  userId: string;
  userType: "brand" | "buyer";
  totalCredits: number;
  usedCredits: number;
  expiryDate?: string;
  lastUpdated: string;
  transactions: MarketingTransaction[];
}

export interface MarketingTransaction {
  id: string;
  creditId: string;
  amount: number;
  description: string;
  date: string;
  type: "credit" | "debit";
}

export interface Advertisement extends PaidService {
  type: "advertisement";
  placement: "homepage" | "search" | "dashboard" | "curated";
  duration: number; // in days
  impressions?: number;
  clicks?: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  content: string;
  previewImage: string;
  category: "announcement" | "promotion" | "newsletter" | "event";
  createdAt: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  description: string;
  templateId: string;
  recipients: number;
  opened: number;
  clicked: number;
  sentAt?: string;
  scheduledFor?: string;
  status: "draft" | "scheduled" | "sent" | "cancelled";
  createdAt: string;
}
