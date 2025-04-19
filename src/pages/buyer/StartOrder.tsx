
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StartOrder = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white p-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="font-normal uppercase text-sm flex items-center gap-2 mb-8 bg-black text-white hover:bg-gray-100 hover:text-black"
      >
        <ArrowLeft size={16} strokeWidth={1} />
        Back to Product
      </Button>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-normal uppercase tracking-tighter mb-6">Start an Order</h1>
        <p className="text-gray-500 mb-8">
          This feature will be implemented soon. Please check back later or contact the brand directly.
        </p>
      </div>
    </div>
  );
};

export default StartOrder;
