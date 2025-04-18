
import { ServiceBooking } from "@/types/services";
import { Button } from "@/components/ui/button";
import { X, Clock, Calendar, User, Building } from "lucide-react";
import { format } from "date-fns";

interface AppointmentDetailsProps {
  booking: ServiceBooking;
  onClose: () => void;
}

const AppointmentDetails = ({ booking, onClose }: AppointmentDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Appointment Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>{format(new Date(booking.preferredDate), "PP")}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{format(new Date(booking.preferredDate), "p")}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-gray-500" />
          <span>{booking.clientName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Building className="h-4 w-4 text-gray-500" />
          <span>{booking.clientCompany}</span>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">Service Details</h3>
          <p className="text-sm">{booking.serviceName}</p>
          <p className="text-sm text-gray-500 mt-1">{booking.message}</p>
        </div>

        <div className="flex gap-2 pt-4">
          <Button className="flex-1" onClick={() => console.log("Accept")}>
            Accept
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => console.log("Reschedule")}
          >
            Reschedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
