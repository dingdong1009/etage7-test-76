
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
            <h1 className="text-2xl font-light tracking-tighter uppercase">ORDER #{order.id}</h1>
            <p className="text-sm font-light">Date: {order.date}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-light uppercase tracking-tighter">ETAGE7</h2>
            <p className="text-sm font-light">123 Fashion Avenue</p>
            <p className="text-sm font-light">New York, NY 10001</p>
            <p className="text-sm font-light">store@example.com</p>
          </div>
        </div>
      </div>
      
      {children}
      
      {/* Print footer - only visible when printing */}
      <div className="hidden print:block mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500 font-light">
        <p>Thank you for your business!</p>
        <p>For any questions regarding this order, please contact us at support@etage7.com</p>
      </div>
    </div>
  );
};

export default OrderPrintable;
