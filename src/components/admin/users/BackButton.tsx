
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onClick}
      className="bg-gray-100 hover:bg-gray-200"
    >
      <ChevronLeft className="mr-1 h-4 w-4" /> Back
    </Button>
  );
};

export default BackButton;
