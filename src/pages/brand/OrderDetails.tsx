
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Order } from "@/types/order";
import OrderActions from "@/components/brand/orders/OrderActions";
import OrderSummary from "@/components/brand/orders/OrderSummary";
import OrderItems from "@/components/brand/orders/OrderItems";
import OrderNotes from "@/components/brand/orders/OrderNotes";
import OrderStatusUpdate from "@/components/brand/orders/OrderStatusUpdate";
import OrderPrintable from "@/components/brand/orders/OrderPrintable";
import { Button } from "@/components/ui/button";

const BrandOrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  // Function to handle printing - properly typed for react-to-print
  const handlePrint = useReactToPrint({
    documentTitle: `Order-${orderId}`,
    onAfterPrint: () => console.log('Print completed'),
    // Fix: Pass the ref directly instead of a function returning the ref
    content: printRef,
  });

  // Fetch order data (in a real app, this would be an API call)
  useEffect(() => {
    // Simulating API fetch with setTimeout
    setTimeout(() => {
      // This is sample data - in a real app this would come from an API
      const sampleOrder: Order = {
        id: orderId || "ORD-001",
        date: "2023-04-01",
        customer: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        status: "completed",
        total: "$129.99",
        subtotal: "$119.99",
        tax: "$5.00",
        shipping: "$5.00",
        shippingMethod: "Standard Shipping",
        items: [
          {
            id: "ITEM-001",
            name: "Designer T-Shirt",
            sku: "TS-BLK-L",
            quantity: 1,
            price: "$49.99",
            total: "$49.99",
            size: "L",
            color: "Black",
            image: "https://via.placeholder.com/50"
          },
          {
            id: "ITEM-002",
            name: "Premium Jeans",
            sku: "JN-BLU-32",
            quantity: 1,
            price: "$70.00",
            total: "$70.00",
            size: "32",
            color: "Blue",
            image: "https://via.placeholder.com/50"
          }
        ],
        billingAddress: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA"
        },
        shippingAddress: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA"
        },
        paymentMethod: "Credit Card (ending in 4242)",
        notes: "Please deliver during business hours."
      };
      
      setOrder(sampleOrder);
      setLoading(false);
    }, 500);
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="text-xl">Order not found</div>
        <Button asChild>
          <Link to="/brand/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <OrderActions orderId={order.id} onPrint={handlePrint} />
      
      {/* Order details printable section */}
      <div ref={printRef}>
        <OrderPrintable order={order}>
          <OrderSummary order={order} />
          <OrderItems 
            items={order.items} 
            subtotal={order.subtotal}
            shipping={order.shipping}
            tax={order.tax}
            total={order.total}
          />
          <OrderNotes notes={order.notes} />
        </OrderPrintable>
      </div>
      
      {/* Order Status Update - hidden when printing */}
      <OrderStatusUpdate currentStatus={order.status} />
    </div>
  );
};

export default BrandOrderDetails;
