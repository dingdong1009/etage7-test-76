
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Printer, Search, Package, Filter, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const BrandOrders = () => {
  // Toast for notifications
  const { toast } = useToast();
  
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

  // Sample requests data
  const sampleRequests = [
    {
      id: "SMP-001",
      date: "2023-04-02",
      retailer: "Concept Store Berlin",
      products: "Summer Collection - Dresses",
      quantity: 3,
      status: "pending"
    },
    {
      id: "SMP-002",
      date: "2023-04-04",
      retailer: "Fashion Store Paris",
      products: "Autumn Collection - Outerwear",
      quantity: 5,
      status: "approved"
    },
    {
      id: "SMP-003",
      date: "2023-04-05",
      retailer: "Luxury Boutique Milan",
      products: "Limited Edition - Accessories",
      quantity: 2,
      status: "shipped"
    },
    {
      id: "SMP-004",
      date: "2023-04-07",
      retailer: "Department Store London",
      products: "Spring Collection - Full Range",
      quantity: 8,
      status: "delivered"
    },
    {
      id: "SMP-005",
      date: "2023-04-08",
      retailer: "Online Retailer Madrid",
      products: "Basics Collection - Tops",
      quantity: 4,
      status: "declined"
    }
  ];

  // Handle delete order
  const handleDeleteOrder = (orderId: string) => {
    toast({
      title: "Order deletion requested",
      description: `Order ${orderId} will be deleted.`,
    });
  };

  // Handle edit order
  const handleEditOrder = (orderId: string) => {
    toast({
      title: "Edit order",
      description: `Editing order ${orderId}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Orders</h1>
        <Button variant="outline" size="sm" className="w-full sm:w-auto flex items-center gap-2">
          <FileText size={16} />
          Export Orders
        </Button>
      </div>
      
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-6 bg-gray-100">
          <TabsTrigger value="orders" className="data-[state=active]:bg-white">Orders</TabsTrigger>
          <TabsTrigger value="samples" className="data-[state=active]:bg-white">Sample Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Recent Orders</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <input 
                    type="search" 
                    placeholder="Search orders..." 
                    className="w-full rounded-md border border-gray-200 pl-8 py-2 text-sm outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
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
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Processing</DropdownMenuItem>
                    <DropdownMenuItem>Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                              order.status === "processing" ? "bg-blue-100 text-blue-800" :
                              order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                              "bg-red-100 text-red-800"
                            } font-normal`}
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
                                    onClick={() => handleEditOrder(order.id)}
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
                                    onClick={() => handleDeleteOrder(order.id)}
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
              </div>
              
              <div className="flex items-center justify-between mt-6">
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
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
                Sample Requests
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <input 
                    type="search" 
                    placeholder="Search sample requests..." 
                    className="w-full rounded-md border border-gray-200 pl-8 py-2 text-sm outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
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
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Approved</DropdownMenuItem>
                    <DropdownMenuItem>Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Delivered</DropdownMenuItem>
                    <DropdownMenuItem>Declined</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Retailer</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.retailer}</TableCell>
                        <TableCell>{request.products}</TableCell>
                        <TableCell>{request.quantity}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              request.status === "approved" ? "bg-blue-100 text-blue-800" :
                              request.status === "shipped" ? "bg-purple-100 text-purple-800" :
                              request.status === "delivered" ? "bg-green-100 text-green-800" :
                              request.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            } font-normal`}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <TooltipProvider>
                            <div className="flex items-center justify-end space-x-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/brand/samples/${request.id}`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                                      <Eye size={16} />
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View sample request details</p>
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
                                      description: `Editing sample request ${request.id}.`,
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
                                      description: `Sample request ${request.id} will be deleted.`,
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
              </div>
              
              <div className="flex items-center justify-between mt-6">
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

export default BrandOrders;
