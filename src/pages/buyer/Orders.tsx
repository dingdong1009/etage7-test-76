
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  // Toast for notifications
  const { toast } = useToast();
  
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

  // Handle edit order
  const handleEditOrder = (orderId: string) => {
    toast({
      title: "Edit order",
      description: `Editing order ${orderId}.`,
    });
  };

  // Handle delete order
  const handleDeleteOrder = (orderId: string) => {
    toast({
      title: "Order deletion requested",
      description: `Order ${orderId} will be deleted.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">ORDERS</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Export Orders
        </Button>
      </div>
      
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-6 bg-gray-100 p-1">
          <TabsTrigger 
            value="orders" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-none transition-all"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger 
            value="samples" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-none transition-all"
          >
            Sample Requests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <Card className="border border-gray-200 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Recent Orders</CardTitle>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search orders" 
                    className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white w-48 md:w-60"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border border-gray-200 hover:bg-gray-50">
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
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 hover:bg-white">
                    <TableHead>Order Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.customer}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`inline-block px-2 py-0.5 text-xs ${
                            order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                            order.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                            order.status === "Delivered" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.total}</TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <div className="flex items-center justify-end space-x-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/buyer/orders/${order.id}`}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
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
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 hover:bg-gray-100"
                                  onClick={() => handleEditOrder(order.orderNumber)}
                                >
                                  <Edit size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit order</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 hover:bg-gray-100"
                                  onClick={() => handleDeleteOrder(order.orderNumber)}
                                >
                                  <Trash size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete order</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between p-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Showing 5 of 25 orders</p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="samples">
          <Card className="border border-gray-200 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Sample Requests</CardTitle>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search sample requests" 
                    className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white w-48 md:w-60"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border border-gray-200 hover:bg-gray-50">
                      <Filter size={14} className="mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white">
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Status</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Approved</DropdownMenuItem>
                    <DropdownMenuItem>Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Delivered</DropdownMenuItem>
                    <DropdownMenuItem>Declined</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 hover:bg-white">
                    <TableHead>Request Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">Brand</TableHead>
                    <TableHead className="hidden md:table-cell">Products</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleRequests.map((request) => (
                    <TableRow key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="font-medium">{request.requestNumber}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.brand}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.products}</TableCell>
                      <TableCell>{request.quantity}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`inline-block px-2 py-0.5 text-xs ${
                            request.status === "Approved" ? "bg-blue-100 text-blue-800" :
                            request.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                            request.status === "Delivered" ? "bg-green-100 text-green-800" :
                            request.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <div className="flex items-center justify-end space-x-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/buyer/samples/${request.id}`}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                                    <Eye size={16} />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View sample details</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 hover:bg-gray-100"
                                  onClick={() => toast({
                                    title: "Edit sample request",
                                    description: `Editing sample request ${request.requestNumber}.`,
                                  })}
                                >
                                  <Edit size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit sample request</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 hover:bg-gray-100"
                                  onClick={() => toast({
                                    title: "Sample request deletion requested",
                                    description: `Sample request ${request.requestNumber} will be deleted.`,
                                  })}
                                >
                                  <Trash size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete sample request</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between p-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Showing 5 of 12 sample requests</p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
