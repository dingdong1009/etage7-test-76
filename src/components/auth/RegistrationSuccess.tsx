
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const RegistrationSuccess = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen w-full justify-center items-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl uppercase font-normal">THANK YOU</h1>
        <p className="text-base font-light">
          Thank you for your registration. One of our team members will reach out to you shortly. 
          In the meantime, you can go and confirm your registration on your email.
        </p>
        <div className="pt-6">
          <Button onClick={() => navigate("/")} variant="outline" className="mx-auto">
            RETURN TO HOME
          </Button>
        </div>
      </div>
    </div>
  );
};
