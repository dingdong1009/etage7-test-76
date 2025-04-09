
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CuratedPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-3xl md:text-5xl uppercase font-thin mb-6">
            AI-POWERED <br/>
            <span className="font-normal">BRAND CURATION</span>
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Discover brands hand-picked by our AI to match your specific requirements.
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
            CURATED COLLECTIONS <span className="font-normal">COMING SOON</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light">
            Our advanced AI system is being trained to understand your specific requirements 
            and match you with brands that perfectly align with your business needs.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">
            SUBSCRIBE FOR UPDATES <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CuratedPage;
