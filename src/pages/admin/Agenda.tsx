
import { useState } from "react";
import { Card } from "@/components/ui/card";
import AgendaCalendar from "@/components/admin/agenda/AgendaCalendar";
import AppointmentDetails from "@/components/admin/agenda/AppointmentDetails";
import TeamSchedule from "@/components/admin/agenda/TeamSchedule";
import { ServiceBooking } from "@/types/services";

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedBooking, setSelectedBooking] = useState<ServiceBooking | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">AGENDA</h1>
        <p className="text-lg text-gray-600">Manage appointments and team schedules</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <Card className="border border-gray-200 shadow-none rounded-lg p-6">
            <AgendaCalendar 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onBookingSelect={setSelectedBooking}
            />
          </Card>
        </div>
        
        <div className="xl:col-span-4 space-y-6">
          <Card className="border border-gray-200 shadow-none rounded-lg p-6">
            <TeamSchedule selectedDate={selectedDate} />
          </Card>
          
          {selectedBooking && (
            <Card className="border border-gray-200 shadow-none rounded-lg p-6">
              <AppointmentDetails 
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
