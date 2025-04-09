
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, FileText } from "lucide-react";

const BuyerOrders = () => {
  // Sample order data
  const orders = [
    { 
      id: "ORD-001", 
      date: "2023-04-01", 
      supplier: "Brand Name A", 
      total: "$1,299.99", 
      status: "completed",
      items: 3 
    },
    { 
      id: "ORD-002", 
      date: "2023-04-02", 
      supplier: "Brand Name B", 
      total: "$895.50", 
      status: "processing",
      items: 2 
    },
    { 
      id: "ORD-003", 
      date: "2023-04-03", 
      supplier: "Brand Name C", 
      total: "$2,107.75", 
      status: "completed",
      items: 4 
    },
    { 
      id: "ORD-004", 
      date: "2023-04-05", 
      supplier: "Brand Name D", 
      total: "$4,559.99", 
      status: "shipped",
      items: 10 
    },
    { 
      id: "ORD-005", 
      date: "2023-04-06", 
      supplier: "Brand Name E", 
      total: "$1,782.25", 
      status: "cancelled",
      items: 3 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button className="text-xs px-3 py-2 bg-gray-200 rounded-none flex items-center gap-1 w-full sm:w-auto justify-center">
          <FileText size={16} />
          Export Orders
        </button>
      </div>
      
      <Card className="border border-gray-200 rounded-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="search" 
              placeholder="Search orders..." 
              className="w-full rounded-none border border-gray-200 pl-8 py-2 text-sm outline-none focus:border-black"
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
                  <TableHead>Supplier</TableHead>
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
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`rounded-none ${
                          order.status === "completed" ? "bg-green-100 text-green-800" :
                          order.status === "processing" ? "bg-blue-100 text-blue-800" :
                          order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                          "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <button className="text-xs px-2 py-1 bg-gray-100 rounded-none">View</button>
                      <button className="text-xs px-2 py-1 bg-gray-100 rounded-none">Print</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">Showing 5 of 25 orders</p>
            <div className="flex space-x-1">
              <button className="px-2 py-1 text-sm border rounded-none">Previous</button>
              <button className="px-2 py-1 text-sm border rounded-none bg-gray-100">1</button>
              <button className="px-2 py-1 text-sm border rounded-none">2</button>
              <button className="px-2 py-1 text-sm border rounded-none">3</button>
              <button className="px-2 py-1 text-sm border rounded-none">Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerOrders;
