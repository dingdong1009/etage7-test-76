
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ServiceBooking } from "@/types/services";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AgendaCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onBookingSelect: (booking: ServiceBooking) => void;
}

const AgendaCalendar = ({
  selectedDate,
  onDateSelect,
  onBookingSelect,
}: AgendaCalendarProps) => {
  // Mock data for demonstration
  const [bookings] = useState<ServiceBooking[]>([]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{format(selectedDate, "MMMM yyyy")}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDateSelect(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDateSelect(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border p-3 pointer-events-auto"
      />

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-3">Appointments for {format(selectedDate, "PP")}</h3>
        {bookings.length === 0 ? (
          <p className="text-sm text-gray-500">No appointments scheduled for this date.</p>
        ) : (
          <div className="space-y-2">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => onBookingSelect(booking)}
              >
                <p className="font-medium">{booking.serviceName}</p>
                <p className="text-sm text-gray-500">{booking.clientName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaCalendar;
