
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderSummaryProps {
  order: {
    id: string;
    date: string;
    status: string;
    customer: string;
    email: string;
    phone: string;
    billingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    shippingAddress: {
      street: string;
      state: string;
      city: string;
      zipCode: string;
      country: string;
    };
    paymentMethod: string;
    shippingMethod: string;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Order Summary</span>
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-800">Customer Details</h3>
              <p>{order.customer}</p>
              <p>{order.email}</p>
              <p>{order.phone}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Billing Address</h3>
              <p>{order.billingAddress.street}</p>
              <p>
                {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
              </p>
              <p>{order.billingAddress.country}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Payment Method</h3>
              <p>{order.paymentMethod}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-800">Order Details</h3>
              <p>Order Number: {order.id}</p>
              <p>Order Date: {order.date}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Shipping Address</h3>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Shipping Method</h3>
              <p>{order.shippingMethod}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
