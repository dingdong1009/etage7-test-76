
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ServiceBooking {
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

interface ServiceStatsProps {
  bookings: ServiceBooking[];
}

const ServiceStats: React.FC<ServiceStatsProps> = ({ bookings }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-xs text-yellow-600 mb-1">Pending</div>
          <div className="text-2xl font-semibold">{bookings.filter(b => b.status === 'pending').length}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-xs text-blue-600 mb-1">Confirmed</div>
          <div className="text-2xl font-semibold">{bookings.filter(b => b.status === 'confirmed').length}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-xs text-purple-600 mb-1">In Progress</div>
          <div className="text-2xl font-semibold">{bookings.filter(b => b.status === 'in_progress').length}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-xs text-green-600 mb-1">Completed</div>
          <div className="text-2xl font-semibold">{bookings.filter(b => b.status === 'completed').length}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStats;
