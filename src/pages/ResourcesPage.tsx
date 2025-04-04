
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ResourcesPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-3xl md:text-5xl uppercase font-thin mb-6">
            INDUSTRY <br/>
            <span className="font-normal">RESOURCES</span>
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Valuable insights and tools for fashion brands and buyers.
          </p>
          <Button className="bg-white text-black border-0 hover:bg-gray-100">
            EXPLORE RESOURCES <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Placeholder Content */}
      <section className="py-32 px-4">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
            RESOURCES <span className="font-normal">COMING SOON</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light">
            We're developing a comprehensive resource library with market reports, guides, templates, 
            and educational content to help brands and buyers navigate the fashion industry.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">
            SUBSCRIBE FOR UPDATES <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
