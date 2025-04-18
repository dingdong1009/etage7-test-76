
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingWithTeam } from "@/types/bookings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

interface BookingDetailsProps {
  booking: BookingWithTeam | null;
  onStatusUpdate: (bookingId: string, newStatus: "confirmed" | "cancelled") => void;
}

export const BookingDetails = ({ booking, onStatusUpdate }: BookingDetailsProps) => {
  if (!booking) {
    return (
      <Card className="border border-gray-200 shadow-none rounded-none h-full">
        <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
          <CardTitle className="text-base font-light">Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-500">Select a booking to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200 shadow-none rounded-none h-full">
      <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
        <CardTitle className="text-base font-light">Booking Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{booking.serviceName}</h3>
              <p className="text-gray-500">{booking.serviceCategory}</p>
            </div>
            <Badge 
              variant="outline" 
              className={
                booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                booking.status === "cancelled" ? "bg-red-100 text-red-800" :
                "bg-gray-100 text-gray-800"
              }
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4" />
              <span>{booking.clientName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
            </div>
            {booking.timeSlot && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{booking.timeSlot.startTime} - {booking.timeSlot.endTime}</span>
              </div>
            )}
          </div>

          {booking.message && (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">{booking.message}</p>
            </div>
          )}

          {booking.status === "pending" && (
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onStatusUpdate(booking.id, "cancelled")}
              >
                Decline
              </Button>
              <Button 
                className="w-full"
                onClick={() => onStatusUpdate(booking.id, "confirmed")}
              >
                Accept
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
