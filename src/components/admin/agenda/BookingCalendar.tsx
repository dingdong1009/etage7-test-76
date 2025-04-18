
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeamMember } from "@/types/bookings";

interface BookingCalendarProps {
  teamMembers: TeamMember[];
  onDateSelect: (date: Date | undefined) => void;
  selectedMemberId?: string;
  onMemberSelect: (memberId: string) => void;
}

export const BookingCalendar = ({
  teamMembers,
  onDateSelect,
  selectedMemberId,
  onMemberSelect,
}: BookingCalendarProps) => {
  const [date, setDate] = useState<Date>();

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    onDateSelect(newDate);
  };

  return (
    <Card className="border border-gray-200 shadow-none rounded-none">
      <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-light">Team Calendar</CardTitle>
          <Select value={selectedMemberId} onValueChange={onMemberSelect}>
            <SelectTrigger className="w-[180px] h-9 text-xs rounded-none border-gray-200">
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border shadow-sm p-3"
        />
      </CardContent>
    </Card>
  );
};
