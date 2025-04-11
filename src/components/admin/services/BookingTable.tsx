
import React from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge, ClientTypeBadge } from "./BookingDetailsDialog";

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

interface BookingTableProps {
  bookings: ServiceBooking[];
  onViewDetails: (booking: ServiceBooking) => void;
  onAssign: (booking: ServiceBooking) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onViewDetails,
  onAssign
}) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Client</th>
              <th className="px-6 py-3 text-left">Service</th>
              <th className="px-6 py-3 text-left">Date Requested</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="font-medium">{booking.clientName}</div>
                    <div className="text-sm text-gray-500">{booking.clientCompany}</div>
                    <div className="mt-1">
                      <ClientTypeBadge type={booking.userType} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{booking.serviceName}</div>
                  <div className="text-sm text-gray-500">{booking.serviceCategory}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{new Date(booking.preferredDate).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={booking.status} />
                  {booking.assignedTo && (
                    <div className="text-sm text-gray-600 mt-1">
                      Assigned to: {booking.assignedTo}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onViewDetails(booking)}>
                      View
                    </Button>
                    {booking.status === "pending" && (
                      <Button size="sm" onClick={() => onAssign(booking)}>
                        Assign
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
