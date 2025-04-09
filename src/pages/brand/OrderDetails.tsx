
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, FileText, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Define Order Type
interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: string;
  total: string;
  size?: string;
  color?: string;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  status: string;
  total: string;
  subtotal: string;
  tax: string;
  shipping: string;
  shippingMethod: string;
  items: OrderItem[];
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  notes?: string;
}

const BrandOrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const printRef = React.useRef(null);

  // Function to handle printing
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Order-${orderId}`,
    onAfterPrint: () => console.log('Print completed'),
  });

  // Fetch order data (in a real app, this would be an API call)
  useEffect(() => {
    // Simulating API fetch with setTimeout
    setTimeout(() => {
      // This is sample data - in a real app this would come from an API
      const sampleOrder: Order = {
        id: orderId || "ORD-001",
        date: "2023-04-01",
        customer: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        status: "completed",
        total: "$129.99",
        subtotal: "$119.99",
        tax: "$5.00",
        shipping: "$5.00",
        shippingMethod: "Standard Shipping",
        items: [
          {
            id: "ITEM-001",
            name: "Designer T-Shirt",
            sku: "TS-BLK-L",
            quantity: 1,
            price: "$49.99",
            total: "$49.99",
            size: "L",
            color: "Black",
            image: "https://via.placeholder.com/50"
          },
          {
            id: "ITEM-002",
            name: "Premium Jeans",
            sku: "JN-BLU-32",
            quantity: 1,
            price: "$70.00",
            total: "$70.00",
            size: "32",
            color: "Blue",
            image: "https://via.placeholder.com/50"
          }
        ],
        billingAddress: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA"
        },
        shippingAddress: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA"
        },
        paymentMethod: "Credit Card (ending in 4242)",
        notes: "Please deliver during business hours."
      };
      
      setOrder(sampleOrder);
      setLoading(false);
    }, 500);
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="text-xl">Order not found</div>
        <Button asChild>
          <Link to="/brand/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/brand/orders">
              <ArrowLeft size={16} className="mr-2" />
              Back to Orders
            </Link>
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-semibold">
            Order {order.id}
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer size={16} className="mr-2" />
            Print Order
          </Button>
          
          <Button variant="outline" size="sm">
            <FileText size={16} className="mr-2" />
            Download PDF
          </Button>
          
          <Button variant="outline" size="sm">
            <Mail size={16} className="mr-2" />
            Email Customer
          </Button>
        </div>
      </div>
      
      {/* Order details printable section */}
      <div ref={printRef} className="space-y-6 print:p-6">
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
        
        {/* Order summary */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Order Summary</span>
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">Customer Details</h3>
                  <p>{order.customer}</p>
                  <p>{order.email}</p>
                  <p>{order.phone}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Billing Address</h3>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Payment Method</h3>
                  <p>{order.paymentMethod}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">Order Details</h3>
                  <p>Order Number: {order.id}</p>
                  <p>Order Date: {order.date}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Shipping Address</h3>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Shipping Method</h3>
                  <p>{order.shippingMethod}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Order items */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 object-cover rounded" 
                            />
                          )}
                          <span>{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {item.size && <div>Size: {item.size}</div>}
                          {item.color && <div>Color: {item.color}</div>}
                        </div>
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-end">
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{order.subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{order.shipping}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{order.tax}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Additional notes */}
        {order.notes && (
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.notes}</p>
            </CardContent>
          </Card>
        )}
        
        {/* Print footer - only visible when printing */}
        <div className="hidden print:block mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Thank you for your business!</p>
          <p>For any questions regarding this order, please contact us at support@yourstore.com</p>
        </div>
      </div>
      
      {/* Order Status Update - hidden when printing */}
      <Card className="border border-gray-200 print:hidden">
        <CardHeader>
          <CardTitle>Update Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant={order.status === "processing" ? "default" : "outline"}>
              Processing
            </Button>
            <Button variant={order.status === "shipped" ? "default" : "outline"}>
              Shipped
            </Button>
            <Button variant={order.status === "completed" ? "default" : "outline"}>
              Completed
            </Button>
            <Button variant={order.status === "cancelled" ? "default" : "outline"} 
                    className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200">
              Cancelled
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandOrderDetails;
