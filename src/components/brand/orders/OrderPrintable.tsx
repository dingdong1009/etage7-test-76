
import React from "react";

interface OrderPrintableProps {
  order: {
    id: string;
    date: string;
  };
  children: React.ReactNode;
}

const OrderPrintable: React.FC<OrderPrintableProps> = ({ order, children }) => {
  return (
    <div className="space-y-6 print:p-6">
      {/* Print header - only visible when printing */}
      <div className="hidden print:block mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">ORDER #{order.id}</h1>
            <p>Date: {order.date}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">YOUR STORE NAME</h2>
            <p>123 Fashion Avenue</p>
            <p>New York, NY 10001</p>
            <p>store@example.com</p>
          </div>
        </div>
      </div>
      
      {children}
      
      {/* Print footer - only visible when printing */}
      <div className="hidden print:block mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>Thank you for your business!</p>
        <p>For any questions regarding this order, please contact us at support@yourstore.com</p>
      </div>
    </div>
  );
};

export default OrderPrintable;
