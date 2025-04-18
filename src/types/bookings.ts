
import { ServiceBooking } from "./services";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  availability: {
    day: string;
    slots: TimeSlot[];
  }[];
  bookedSlots: BookedSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface BookedSlot extends TimeSlot {
  bookingId: string;
  memberId: string;
}

export interface BookingWithTeam extends ServiceBooking {
  assignedMember?: TeamMember;
  timeSlot?: TimeSlot;
}
