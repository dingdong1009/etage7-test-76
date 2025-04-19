
import { ConsultingService, Subscription } from "@/types/services/paidServices";

export const mockConsultingServices: ConsultingService[] = [
  {
    id: "cons-1",
    name: "Strategic Planning Session",
    description: "Comprehensive business strategy consultation",
    price: 500,
    type: "consulting",
    duration: 2,
    consultantCount: 3,
    features: ["Market Analysis", "Growth Strategy", "Actionable Insights"],
    status: "active",
    availability: ["Monday", "Wednesday", "Friday"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-20T15:30:00Z"
  },
  {
    id: "cons-2", 
    name: "Digital Transformation Workshop",
    description: "In-depth digital strategy and implementation guidance",
    price: 750,
    type: "consulting",
    duration: 4,
    consultantCount: 2,
    features: ["Technology Assessment", "Digital Roadmap", "Implementation Support"],
    status: "active",
    availability: ["Tuesday", "Thursday"],
    createdAt: "2024-02-01T11:15:00Z",
    updatedAt: "2024-04-10T14:45:00Z"
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: "sub-1",
    name: "Starter Tier",
    description: "Basic access and features for emerging brands",
    price: 99,
    type: "subscription",
    userCount: 15,
    maxUsers: 25,
    features: ["Basic Reporting", "Limited Support"],
    status: "active",
    frequency: "monthly",
    autoRenewal: true,
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-03-15T16:20:00Z"
  },
  {
    id: "sub-2",
    name: "Professional Tier",
    description: "Comprehensive features for growing brands",
    price: 249,
    type: "subscription",
    userCount: 40,
    maxUsers: 50,
    features: ["Advanced Reporting", "Priority Support", "Team Management"],
    status: "active",
    frequency: "monthly",
    autoRenewal: true,
    createdAt: "2024-02-05T10:30:00Z",
    updatedAt: "2024-04-01T11:15:00Z"
  }
];
