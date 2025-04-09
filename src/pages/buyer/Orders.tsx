
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

// Order interface for type safety
interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: string;
}

const Orders = () => {
  // Sample order data
  const [orders] = useState<Order[]>([
    { id: "1", orderNumber: "ORD-2025-001", date: "2025-04-01", customer: "Fashion Store Paris", status: "Processing", total: "€2,450.00" },
    { id: "2", orderNumber: "ORD-2025-002", date: "2025-04-02", customer: "Concept Store Berlin", status: "Shipped", total: "€1,780.00" },
    { id: "3", orderNumber: "ORD-2025-003", date: "2025-04-03", customer: "Luxury Boutique Milan", status: "Delivered", total: "€3,250.00" },
    { id: "4", orderNumber: "ORD-2025-004", date: "2025-04-05", customer: "Department Store London", status: "Processing", total: "€4,120.00" },
    { id: "5", orderNumber: "ORD-2025-005", date: "2025-04-07", customer: "Online Retailer Madrid", status: "Cancelled", total: "€950.00" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Orders</h1>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search orders" 
            className="border border-gray-200 rounded px-3 py-1.5 text-sm bg-white"
          />
          <select className="border border-gray-200 rounded px-3 py-1.5 text-sm bg-white">
            <option>All Status</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden md:table-cell">Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.customer}</TableCell>
                  <TableCell>
                    <span 
                      className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                        order.status === "Processing" ? "bg-black-100 text-blue-800" :
                        order.status === "Shipped" ? "bg-yellow-100 text-yellow-800" :
                        order.status === "Delivered" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
