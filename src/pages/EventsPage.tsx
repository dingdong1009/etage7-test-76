
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EventsPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-3xl md:text-5xl uppercase font-thin mb-6">
            UPCOMING <br/>
            <span className="font-normal">EVENTS</span>
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Join us at exclusive fashion industry events connecting brands and buyers.
          </p>
          <Button className="bg-white text-black border-0 hover:bg-gray-100">
            COMING SOON <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Placeholder Content */}
      <section className="py-32 px-4">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
            EVENTS CALENDAR <span className="font-normal">COMING SOON</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light">
            We're planning a series of exclusive industry events, both virtual and physical, 
            to connect fashion brands with professional buyers. Check back soon for our upcoming schedule.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">
            SUBSCRIBE FOR UPDATES <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
