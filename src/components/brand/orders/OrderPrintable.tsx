
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
            <p className="text-xs text-gray-600 font-light">Date: {order.date}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-light uppercase tracking-tighter">ETAGE7</h2>
            <p className="text-xs font-light text-gray-600">123 Fashion Avenue</p>
            <p className="text-xs font-light text-gray-600">New York, NY 10001</p>
            <p className="text-xs font-light text-gray-600">store@etage7.com</p>
          </div>
        </div>
      </div>
      
      {children}
      
      {/* Print footer - only visible when printing */}
      <div className="hidden print:block mt-8 pt-8 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500 font-light">Thank you for your business!</p>
        <p className="text-xs text-gray-500 font-light">For any questions regarding this order, please contact us at support@etage7.com</p>
      </div>
    </div>
  );
};

export default OrderPrintable;
