
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RegistrationSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl uppercase font-thin mb-6">
          <span className="font-normal">THANK YOU</span> FOR REGISTERING
        </h1>
        
        <div className="bg-white p-8 border border-gray-200 mb-8">
          <p className="font-light mb-6">
            Thank you for your registration. One of our team members will reach out to you shortly. 
            In the meantime, you can go and confirm your registration on your email.
          </p>
          
          <p className="font-light">
            Once an administrator approves your account, you will have access to the platform.
          </p>
        </div>
        
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link to="/">
            RETURN TO HOME
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
