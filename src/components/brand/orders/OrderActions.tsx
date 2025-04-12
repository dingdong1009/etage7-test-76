
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, FileText, Mail } from "lucide-react";

interface OrderActionsProps {
  orderId: string;
  onPrint: () => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ orderId, onPrint }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild className="rounded-none border-gray-200">
          <Link to="/brand/orders">
            <ArrowLeft size={16} className="mr-2" />
            Back to Orders
          </Link>
        </Button>
        
        <h1 className="text-2xl md:text-3xl font-light tracking-tighter">
          Order {orderId}
        </h1>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" className="h-9 font-light" onClick={onPrint}>
          <Printer size={16} className="mr-2" />
          Print Order
        </Button>
        
        <Button variant="ghost" size="sm" className="h-9 font-light">
          <FileText size={16} className="mr-2" />
          Download PDF
        </Button>
        
        <Button variant="ghost" size="sm" className="h-9 font-light">
          <Mail size={16} className="mr-2" />
          Email Customer
        </Button>
      </div>
    </div>
  );
};

export default OrderActions;
