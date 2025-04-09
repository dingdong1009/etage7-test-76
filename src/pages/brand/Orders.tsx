
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Printer, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BrandOrders = () => {
  // Sample order data
  const orders = [
    { 
      id: "ORD-001", 
      date: "2023-04-01", 
      customer: "John Smith", 
      total: "$129.99", 
      status: "completed",
      items: 3 
    },
    { 
      id: "ORD-002", 
      date: "2023-04-02", 
      customer: "Sarah Johnson", 
      total: "$89.50", 
      status: "processing",
      items: 2 
    },
    { 
      id: "ORD-003", 
      date: "2023-04-03", 
      customer: "Michael Davis", 
      total: "$210.75", 
      status: "completed",
      items: 4 
    },
    { 
      id: "ORD-004", 
      date: "2023-04-05", 
      customer: "Emily Wilson", 
      total: "$45.99", 
      status: "shipped",
      items: 1 
    },
    { 
      id: "ORD-005", 
      date: "2023-04-06", 
      customer: "Robert Brown", 
      total: "$178.25", 
      status: "cancelled",
      items: 3 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Orders</h1>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <FileText size={16} className="mr-2" />
          Export Orders
        </Button>
      </div>
      
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Recent Orders</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="search" 
              placeholder="Search orders..." 
              className="w-full rounded-md border border-gray-200 pl-8 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          order.status === "completed" ? "bg-green-100 text-green-800" :
                          order.status === "processing" ? "bg-black-100 text-blue-800" :
                          order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                          "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <div className="flex items-center justify-end space-x-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link to={`/brand/orders/${order.id}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye size={16} />
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View order details</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Printer size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Print order</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">Showing 5 of 25 orders</p>
            <div className="flex space-x-1">
              <button className="px-2 py-1 text-sm border rounded">Previous</button>
              <button className="px-2 py-1 text-sm border rounded bg-black-50">1</button>
              <button className="px-2 py-1 text-sm border rounded">2</button>
              <button className="px-2 py-1 text-sm border rounded">3</button>
              <button className="px-2 py-1 text-sm border rounded">Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandOrders;
