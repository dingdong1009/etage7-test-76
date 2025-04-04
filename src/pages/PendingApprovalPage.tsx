
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const PendingApprovalPage = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };
  
  return (
    <div className="flex min-h-screen w-full justify-center items-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl uppercase font-normal">ACCOUNT PENDING APPROVAL</h1>
        <p className="text-base font-light">
          Your account is currently pending approval by our team. Once approved, you'll have full access to the platform.
        </p>
        <p className="text-base font-light">
          Please check your email for updates regarding your account status.
        </p>
        <div className="pt-6 flex gap-4 justify-center">
          <Button onClick={() => navigate("/")} variant="outline">
            RETURN TO HOME
          </Button>
          <Button onClick={handleSignOut} variant="outline">
            SIGN OUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
