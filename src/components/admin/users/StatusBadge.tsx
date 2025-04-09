
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "active" | "pending" | "inactive";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge 
      className={`${
        status === "active" ? "bg-green-100 text-green-800" :
        status === "pending" ? "bg-yellow-100 text-yellow-800" :
        "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
