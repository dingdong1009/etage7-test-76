
export interface AppointmentSlot {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  teamMemberId?: string;
  teamMemberName?: string;
  serviceBookingId?: string;
  status: "available" | "booked" | "unavailable";
}

export interface TeamMemberAvailability {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  availableSlots: AppointmentSlot[];
}
