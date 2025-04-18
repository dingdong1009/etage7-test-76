
import { useState } from "react";
import { BookingCalendar } from "@/components/admin/agenda/BookingCalendar";
import { BookingDetails } from "@/components/admin/agenda/BookingDetails";
import { BookingWithTeam, TeamMember } from "@/types/bookings";
import { useToast } from "@/hooks/use-toast";

// Mock data for team members
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sophie Martin",
    role: "Senior Consultant",
    availability: [
      {
        day: "2025-04-19",
        slots: [
          { startTime: "09:00", endTime: "10:30" },
          { startTime: "11:00", endTime: "12:30" },
          { startTime: "14:00", endTime: "15:30" },
        ]
      }
    ],
    bookedSlots: []
  },
  {
    id: "2",
    name: "Alexandre Chen",
    role: "Brand Strategist",
    availability: [
      {
        day: "2025-04-19",
        slots: [
          { startTime: "10:00", endTime: "11:30" },
          { startTime: "13:00", endTime: "14:30" },
          { startTime: "15:00", endTime: "16:30" },
        ]
      }
    ],
    bookedSlots: []
  }
];

// Mock data for bookings
const mockBookings: BookingWithTeam[] = [
  {
    id: "1",
    serviceName: "Brand Strategy Consultation",
    serviceCategory: "Strategy",
    clientName: "John Smith",
    clientEmail: "john@example.com",
    clientCompany: "Fashion Co",
    preferredDate: "2025-04-19",
    message: "Looking to discuss our brand positioning in the luxury market",
    status: "pending",
    createdAt: "2025-04-18T10:00:00Z",
    userType: "brand",
    assignedMember: mockTeamMembers[0],
    timeSlot: { startTime: "09:00", endTime: "10:30" }
  }
];

const Agenda = () => {
  const { toast } = useToast();
  const [selectedMemberId, setSelectedMemberId] = useState<string>();
  const [selectedBooking, setSelectedBooking] = useState<BookingWithTeam | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const booking = mockBookings.find(b => 
      new Date(b.preferredDate).toDateString() === date.toDateString() &&
      (!selectedMemberId || b.assignedMember?.id === selectedMemberId)
    );
    
    setSelectedBooking(booking || null);
  };

  const handleStatusUpdate = (bookingId: string, newStatus: "confirmed" | "cancelled") => {
    // In a real app, this would update the database
    toast({
      title: `Booking ${newStatus}`,
      description: `The booking has been ${newStatus} successfully.`
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">AGENDA</h1>
        <p className="text-lg text-gray-600">Manage your consulting service bookings and team schedule.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingCalendar
          teamMembers={mockTeamMembers}
          onDateSelect={handleDateSelect}
          selectedMemberId={selectedMemberId}
          onMemberSelect={setSelectedMemberId}
        />
        <BookingDetails
          booking={selectedBooking}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
    </div>
  );
};

export default Agenda;
