
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, MessagesSquare, X, Check, Clock } from "lucide-react";

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

interface BookingDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  booking: ServiceBooking | null;
  onAssign: (booking: ServiceBooking) => void;
  onStatusChange: (bookingId: string, newStatus: "confirmed" | "in_progress" | "completed" | "cancelled") => void;
}

// Component for status badge
const StatusBadge = ({ status }: { status: ServiceBooking["status"] }) => {
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    confirmed: { color: "bg-blue-100 text-blue-800", label: "Confirmed" },
    in_progress: { color: "bg-purple-100 text-purple-800", label: "In Progress" },
    completed: { color: "bg-green-100 text-green-800", label: "Completed" },
    cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" }
  };
  
  const { color, label } = statusConfig[status];
  
  return (
    <Badge variant="outline" className={`${color} border-0`}>
      {label}
    </Badge>
  );
};

// Component for client type badge
const ClientTypeBadge = ({ type }: { type: "brand" | "buyer" }) => {
  return (
    <Badge variant="outline" className={type === "brand" ? "bg-gray-100 text-gray-800" : "bg-indigo-100 text-indigo-800"}>
      {type === "brand" ? "Brand" : "Buyer"}
    </Badge>
  );
};

const BookingDetailsDialog: React.FC<BookingDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
  booking,
  onAssign,
  onStatusChange
}) => {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between">
            <StatusBadge status={booking.status} />
            <ClientTypeBadge type={booking.userType} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Service</div>
              <div className="font-medium">{booking.serviceName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Category</div>
              <div className="font-medium">{booking.serviceCategory}</div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center mb-2">
              <User size={16} className="mr-2 text-gray-500" />
              <span className="font-medium">Client Information</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div>{booking.clientName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Company</div>
                <div>{booking.clientCompany}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-gray-500">Email</div>
                <div>{booking.clientEmail}</div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center mb-2">
              <Calendar size={16} className="mr-2 text-gray-500" />
              <span className="font-medium">Schedule</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Preferred Date</div>
                <div>{new Date(booking.preferredDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Created</div>
                <div>{new Date(booking.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
          
          {booking.assignedTo && (
            <div className="border-t pt-4">
              <div className="flex items-center mb-2">
                <User size={16} className="mr-2 text-gray-500" />
                <span className="font-medium">Assigned To</span>
              </div>
              <div>{booking.assignedTo}</div>
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="flex items-center mb-2">
              <MessagesSquare size={16} className="mr-2 text-gray-500" />
              <span className="font-medium">Message</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-md text-sm">
              {booking.message}
            </div>
          </div>
          
          {booking.status === 'pending' && (
            <div className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => onStatusChange(booking.id, 'cancelled')}>
                <X size={16} className="mr-1" /> Cancel
              </Button>
              <Button onClick={() => {
                setIsOpen(false);
                onAssign(booking);
              }}>
                <Check size={16} className="mr-1" /> Assign
              </Button>
            </div>
          )}
          
          {booking.status === 'confirmed' && (
            <div className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => onStatusChange(booking.id, 'cancelled')}>
                <X size={16} className="mr-1" /> Cancel
              </Button>
              <Button onClick={() => onStatusChange(booking.id, 'in_progress')}>
                <Clock size={16} className="mr-1" /> Mark In Progress
              </Button>
            </div>
          )}
          
          {booking.status === 'in_progress' && (
            <div className="flex justify-end border-t pt-4">
              <Button onClick={() => onStatusChange(booking.id, 'completed')}>
                <Check size={16} className="mr-1" /> Mark Complete
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;
export { StatusBadge, ClientTypeBadge };
