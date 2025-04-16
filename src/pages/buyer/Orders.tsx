
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,} from "@/components/ui/pagination";

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
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">Orders Management</h1>      
      <Tabs defaultValue="orders" className="w-full">
      <div className="border-t border-gray-200 mb-6">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
          <TabsTrigger 
            value="orders" 
            className="text-xs font-normal uppercase data-[state=active]:border-b-2 data-[state=active]:border-black px-6 py-2 data-[state=active]:shadow-none"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger 
            value="samples" 
            className="text-xs font-normal uppercase data-[state=active]:border-b-2 data-[state=active]:border-black px-6 py-2 data-[state=active]:shadow-none"
          >
            Sample Requests
          </TabsTrigger>
        </TabsList>
      </div>

        <TabsContent value="orders" className="mt-0">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search Orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 border-gray-200 bg-gray-50/50" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[150px] border-gray-200 bg-white text-sm">
                      All
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white">
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Processing</DropdownMenuItem>
                    <DropdownMenuItem>Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Delivered</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="border border-gray-200 shadow-none rounded-none overflow-hidden">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-lg font-normal flex items-center uppercase gap-2">
                    Recent Orders
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader>
                <TableRow className="hover:bg-transparent uppercase">
                    <TableHead className="font-normal text-gray-600 text-sm">Order Number</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Date</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Brands</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Status</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm text-right">Total</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-normal">{order.orderNumber}</TableCell>
                      <TableCell className="font-normal">{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`inline-block px-2 py-0.5 text-xs ${
                            order.status === "Processing" ? "bg-accent-pink font-normal text-gray-800" :
                            order.status === "Shipped" ? "bg-accent-mint font-normal text-gray-800" :
                            order.status === "Delivered" ? "bg-accent-blue font-normal text-gray-800" :
                            "bg-red-100 font-normal text-red-800"
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
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none text-black-500 hover:text-black hover:border">
                                    <Eye size={14} />
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
                                  size="sm" 
                                  className="h-8 w-8 p-0 rounded-none text-black-500 hover:text-black hover:border"
                                  onClick={() => handleEditOrder(order.orderNumber)}
                                >
                                  <Edit size={14} />
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
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 rounded-none hover:border"
                                  onClick={() => handleDeleteOrder(order.orderNumber)}
                                >
                                  <Trash2 size={14} />
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

        <TabsContent value="samples" className="mt-0">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search Orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 border-gray-200 bg-gray-50/50" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[150px] border-gray-200 bg-white text-sm">
                      All
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white">
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Processing</DropdownMenuItem>
                    <DropdownMenuItem>Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Delivered</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        </TabsContent>

        <TabsContent value="samples">
         <Card className="border border-gray-200 shadow-none rounded-none overflow-hidden">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-lg font-normal flex items-center uppercase gap-2">
                  Sample Requests 
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader>
                <TableRow className="hover:bg-transparent uppercase">
                    <TableHead className="font-normal text-gray-600 text-sm">Request Number</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Date</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Brand</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Products</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Quantity</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Status</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleRequests.map((request) => (
                    <TableRow key={request.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium">{request.requestNumber}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.brand}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.products}</TableCell>
                      <TableCell>{request.quantity}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`inline-block px-2 py-0.5 text-xs ${
                            request.status === "Approved" ? "bg-accent-mint font-normal text-gray-800" :
                            request.status === "Shipped" ? "bg-accent-yellow font-normal text-gray-800" :
                            request.status === "Delivered" ? "bg-accent-blue font-normal text-gray-800" :
                            request.status === "Pending" ? "bg-accent-pink font-normal text-gray-800" :
                            "bg-red-100 font-normal text-red-800"
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
                                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0 rounded-none text-black-500 hover:text-black hover:border">
                                    <Eye size={14} />
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
                                  size="sm" 
                                  className="h-8 w-8 p-0 rounded-none text-black-500 hover:text-black hover:border"
                                  onClick={() => toast({
                                    title: "Edit sample request",
                                    description: `Editing sample request ${request.requestNumber}.`,
                                  })}
                                >
                                  <Edit size={14} />
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
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 rounded-none hover:border"
                                  onClick={() => toast({
                                    title: "Sample request deletion requested",
                                    description: `Sample request ${request.requestNumber} will be deleted.`,
                                  })}
                                >
                                  <Trash2 size={14} />
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
