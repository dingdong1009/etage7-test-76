
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrderStatusUpdateProps {
  currentStatus: string;
}

const OrderStatusUpdate: React.FC<OrderStatusUpdateProps> = ({ currentStatus }) => {
  return (
    <Card className="border border-gray-200 print:hidden">
      <CardHeader>
        <CardTitle>Update Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button variant={currentStatus === "processing" ? "default" : "outline"}>
            Processing
          </Button>
          <Button variant={currentStatus === "shipped" ? "default" : "outline"}>
            Shipped
          </Button>
          <Button variant={currentStatus === "completed" ? "default" : "outline"}>
            Completed
          </Button>
          <Button variant={currentStatus === "cancelled" ? "default" : "outline"} 
                  className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200">
            Cancelled
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusUpdate;
