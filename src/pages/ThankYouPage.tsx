
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ThankYouPage = () => {
  return (
    <div className="pt-32 pb-32 px-4">
      <div className="max-w-[600px] mx-auto text-center">
        <h1 className="text-3xl uppercase font-thin mb-6">
          Thank You
        </h1>
        
        <p className="text-lg mb-8">
          Thank you for your registration. One of our team members will reach out to you shortly.
        </p>
        
        <Button asChild className="bg-black text-white hover:bg-black hover:underline transition-all duration-300">
          <Link to="/">
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;
