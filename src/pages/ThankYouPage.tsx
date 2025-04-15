
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const ThankYouPage = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-6">
          THANK <span className="font-normal">YOU <Heart size={16} className="fill-black text-black" /></span> 
        </h1>
        
        <p className="text-lg mb-12 text-gray-700 font-light">
          Thank you for your registration. One of our team members will reach out to you shortly.
        </p>
        
        <Button asChild className="bg-black text-white hover:bg-gray-900 py-6 px-8 text-base">
          <Link to="/">
            RETURN TO HOMEPAGE <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;
