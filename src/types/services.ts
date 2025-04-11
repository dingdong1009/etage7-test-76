
export interface ServiceBooking {
  id: string;
  serviceName: string;
  serviceCategory: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  preferredDate: string;
  message: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  assignedTo?: string;
  userType: "brand" | "buyer";
}

export interface AssignmentData {
  assignedTo: string;
  scheduledDate: string;
  notes: string;
}
