
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Example events data
const eventsData = [
  { 
    id: 1, 
    title: "Summer Fashion Showcase", 
    date: new Date(2025, 5, 15), 
    startTime: "10:00 AM", 
    endTime: "4:00 PM",
    location: "New York Fashion Center"
  },
  { 
    id: 2, 
    title: "Fall Collection Preview", 
    date: new Date(2025, 8, 20), 
    startTime: "2:00 PM", 
    endTime: "7:00 PM",
    location: "Paris Exhibition Hall"
  },
  { 
    id: 3, 
    title: "Winter Fashion Week", 
    date: new Date(2025, 11, 5), 
    startTime: "9:00 AM", 
    endTime: "6:00 PM",
    location: "Milan Design Center"
  },
  { 
    id: 4, 
    title: "Spring Trends Workshop", 
    date: new Date(2026, 1, 10), 
    startTime: "1:00 PM", 
    endTime: "5:00 PM",
    location: "London Fashion Institute"
  },
];

const EventsPage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);

  // Function to check if a date has events
  const hasEventOnDay = (day: Date) => {
    return eventsData.some(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Find events for the selected date
  const getEventsForSelectedDate = (selectedDate: Date) => {
    return eventsData.filter(event => 
      event.date.getDate() === selectedDate.getDate() && 
      event.date.getMonth() === selectedDate.getMonth() && 
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Handle date selection
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const events = getEventsForSelectedDate(selectedDate);
      setSelectedEvent(events.length > 0 ? events[0] : null);
    } else {
      setSelectedEvent(null);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen bg-black text-white flex items-center">
      <div className="container-lg">
        <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
        UPCOMING <br/>
                <span className="font-normal">EVENTS</span>
              </h1>
              <p className="max-w-2xl text-lg font-light mb-8">
                Join us at exclusive fashion industry events connecting brands and buyers.
              </p>
              <Button className="bg-white text-black border-0 hover:bg-gray-100">
                EXPLORE EVENTS <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
          </div>
        </div>
      </section>


      {/* Events Calendar Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-10 text-center">
            EVENTS <span className="font-normal">CALENDAR</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Calendar */}
            <div className="bg-white p-6 shadow-sm rounded-lg">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mb-4"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select event date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    modifiers={{
                      hasEvent: (date) => hasEventOnDay(date),
                    }}
                    modifiersClassNames={{
                      hasEvent: "bg-gray-100 font-bold text-black relative",
                    }}
                    components={{
                      DayContent: (props) => (
                        <div className="relative">
                          {props.date && hasEventOnDay(props.date) && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
                          )}
                          <div>{props.date.getDate()}</div>
                        </div>
                      ),
                    }}
                  />
                </PopoverContent>
              </Popover>

              <div className="text-gray-500 italic text-sm mb-6">
                Dates with events are highlighted on the calendar.
              </div>
              
              <div className="space-y-4">
                {eventsData.map(event => (
                  <Button 
                    key={event.id} 
                    variant="outline" 
                    className={cn(
                      "w-full justify-start text-left py-3",
                      selectedEvent?.id === event.id && "border-black bg-gray-50"
                    )}
                    onClick={() => {
                      setDate(event.date);
                      setSelectedEvent(event);
                    }}
                  >
                    <div className="flex flex-col items-start">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500">
                        {format(event.date, "MMMM d, yyyy")}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white p-6 shadow-sm rounded-lg">
              {selectedEvent ? (
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedEvent.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {format(selectedEvent.date, "EEEE, MMMM d, yyyy")}
                      </Badge>
                      <p className="text-gray-600">
                        {selectedEvent.startTime} - {selectedEvent.endTime}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-gray-600">{selectedEvent.location}</p>
                    </div>

                    <div>
                      <h4 className="font-medium">Description</h4>
                      <p className="text-gray-600">
                        Join us for this exclusive industry event where fashion brands and buyers 
                        can connect, network, and discover new opportunities. This event features 
                        showcases, networking sessions, and industry insights.
                      </p>
                    </div>

                    <Button className="bg-black text-white w-full mt-4">
                      Register for Event <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Event Selected</h3>
                  <p className="text-gray-500">
                    Select a date on the calendar to view event details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-10">
            FEATURED <span className="font-normal">EVENTS</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsData.slice(0, 3).map(event => (
              <div key={event.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {format(event.date, "MMMM d, yyyy")} • {event.location}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    {event.startTime} - {event.endTime}
                  </p>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="bg-black text-white mt-10">
            VIEW ALL EVENTS <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
