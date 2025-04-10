
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Order interface for type safety
interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: string;
}

// Sample request interface
interface SampleRequest {
  id: string;
  requestNumber: string;
  date: string;
  brand: string;
  products: string;
  status: "Pending" | "Approved" | "Shipped" | "Delivered" | "Declined";
  quantity: number;
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

  // Sample requests data
  const [sampleRequests] = useState<SampleRequest[]>([
    { id: "1", requestNumber: "SMP-2025-001", date: "2025-04-02", brand: "Premium Apparel", products: "Summer Dresses (3 styles)", status: "Pending", quantity: 6 },
    { id: "2", requestNumber: "SMP-2025-002", date: "2025-04-03", brand: "Urban Collective", products: "Fall Collection Outerwear", status: "Approved", quantity: 4 },
    { id: "3", requestNumber: "SMP-2025-003", date: "2025-04-04", brand: "Eco Essentials", products: "Sustainable Basics", status: "Shipped", quantity: 8 },
    { id: "4", requestNumber: "SMP-2025-004", date: "2025-04-06", brand: "Luxury Line", products: "Evening Wear Collection", status: "Delivered", quantity: 3 },
    { id: "5", requestNumber: "SMP-2025-005", date: "2025-04-08", brand: "Street Style", products: "Graphic Tees", status: "Declined", quantity: 5 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Orders</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search orders" 
              className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-white w-48 md:w-60"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border border-gray-200">
                <Filter size={14} className="mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Status</DropdownMenuItem>
              <DropdownMenuItem>Processing</DropdownMenuItem>
              <DropdownMenuItem>Shipped</DropdownMenuItem>
              <DropdownMenuItem>Delivered</DropdownMenuItem>
              <DropdownMenuItem>Cancelled</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-6 bg-gray-100">
          <TabsTrigger value="orders" className="data-[state=active]:bg-white">Orders</TabsTrigger>
          <TabsTrigger value="samples" className="data-[state=active]:bg-white">Sample Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
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
                            order.status === "Processing" ? "bg-blue-100 text-blue-800" :
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
        </TabsContent>
        
        <TabsContent value="samples">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">Brand</TableHead>
                    <TableHead className="hidden md:table-cell">Products</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.requestNumber}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.brand}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.products}</TableCell>
                      <TableCell>{request.quantity}</TableCell>
                      <TableCell>
                        <span 
                          className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                            request.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            request.status === "Approved" ? "bg-blue-100 text-blue-800" :
                            request.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                            request.status === "Delivered" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
