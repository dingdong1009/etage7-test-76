
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Plus,
  FileText,
  ListFilter,
  ShoppingBag
} from "lucide-react";
import ProductList from "@/components/brand/products/ProductList";
import OrderList from "@/components/brand/products/OrderList";
import OrderDetail from "@/components/brand/products/OrderDetail";
import ProductForm from "@/components/brand/products/ProductForm";
import { Order } from "@/types/orders";

const BrandProducts = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  
  // Add products state
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Designer Silk Dress",
      sku: "DS-001",
      category: "Dresses",
      season: "Spring/Summer 2025",
      color: "Primary Purple",
      price: 299.99,
      status: "active",
      description: "Elegant silk dress for special occasions"
    },
    {
      id: 2,
      name: "Tailored Wool Blazer",
      sku: "TW-002",
      category: "Outerwear",
      season: "Fall/Winter 2024",
      color: "Dark Purple",
      price: 349.99,
      status: "active",
      description: "Premium wool blazer with custom fit"
    },
    {
      id: 3,
      name: "Casual Linen Pants",
      sku: "CL-003",
      category: "Bottoms",
      season: "Spring/Summer 2025",
      color: "Soft Green",
      price: 129.99,
      status: "draft",
      description: "Comfortable linen pants for everyday wear"
    },
    {
      id: 4,
      name: "Graphic Print T-Shirt",
      sku: "GP-004",
      category: "Tops",
      season: "Resort 2025",
      color: "Soft Blue",
      price: 89.99,
      status: "active",
      description: "Bold graphic print for a statement look"
    }
  ]);

  // Updated orders data with correct structure matching the Order interface
  const orders: Order[] = [
    { 
      id: "ORD-001", 
      date: "2023-04-01", 
      customer: "John Smith", 
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      total: "$129.99", 
      subtotal: "$119.99",
      tax: "$5.00",
      shipping: "$5.00",
      shippingMethod: "Standard Shipping",
      status: "completed",
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
          quantity: 2,
          price: "$40.00",
          total: "$80.00",
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
      notes: "Please leave package at the front door"
    },
    { 
      id: "ORD-002", 
      date: "2023-04-02", 
      customer: "Sarah Johnson", 
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      total: "$89.50", 
      subtotal: "$79.50",
      tax: "$4.00",
      shipping: "$6.00",
      shippingMethod: "Express Shipping",
      status: "processing",
      items: [
        {
          id: "ITEM-003",
          name: "Cotton Sweater",
          sku: "SW-GRY-M",
          quantity: 1,
          price: "$39.50",
          total: "$39.50",
          size: "M",
          color: "Gray",
          image: "https://via.placeholder.com/50"
        },
        {
          id: "ITEM-004",
          name: "Canvas Tote Bag",
          sku: "TB-NAT-01",
          quantity: 1,
          price: "$40.00",
          total: "$40.00",
          color: "Natural",
          image: "https://via.placeholder.com/50"
        }
      ],
      billingAddress: {
        street: "456 Oak Ave",
        city: "Boston",
        state: "MA",
        zipCode: "02115",
        country: "USA"
      },
      shippingAddress: {
        street: "456 Oak Ave",
        city: "Boston",
        state: "MA",
        zipCode: "02115",
        country: "USA"
      },
      paymentMethod: "PayPal"
    },
    { 
      id: "ORD-003", 
      date: "2023-04-03", 
      customer: "Michael Davis", 
      email: "michael.davis@example.com",
      phone: "+1 (555) 555-1234",
      total: "$210.75", 
      subtotal: "$195.75",
      tax: "$10.00",
      shipping: "$5.00",
      shippingMethod: "Standard Shipping",
      status: "completed",
      items: [
        {
          id: "ITEM-005",
          name: "Leather Jacket",
          sku: "LJ-BRN-L",
          quantity: 1,
          price: "$150.75",
          total: "$150.75",
          size: "L",
          color: "Brown",
          image: "https://via.placeholder.com/50"
        },
        {
          id: "ITEM-006",
          name: "Wool Scarf",
          sku: "WS-RED-01",
          quantity: 1,
          price: "$45.00",
          total: "$45.00",
          color: "Red",
          image: "https://via.placeholder.com/50"
        }
      ],
      billingAddress: {
        street: "789 Pine St",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "USA"
      },
      shippingAddress: {
        street: "789 Pine St",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "USA"
      },
      paymentMethod: "Credit Card (ending in 1234)"
    },
    { 
      id: "ORD-004", 
      date: "2023-04-05", 
      customer: "Emily Wilson", 
      email: "emily.w@example.com",
      phone: "+1 (555) 222-3333",
      total: "$45.99", 
      subtotal: "$39.99",
      tax: "$2.00",
      shipping: "$4.00",
      shippingMethod: "Standard Shipping",
      status: "shipped",
      items: [
        {
          id: "ITEM-007",
          name: "Graphic Print Hoodie",
          sku: "HD-BLK-L",
          quantity: 1,
          price: "$45.99",
          total: "$45.99",
          size: "L",
          color: "Black",
          image: "https://via.placeholder.com/50"
        }
      ],
      billingAddress: {
        street: "101 Maple Dr",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "USA"
      },
      shippingAddress: {
        street: "101 Maple Dr",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "USA"
      },
      paymentMethod: "Debit Card"
    },
    { 
      id: "ORD-005", 
      date: "2023-04-06", 
      customer: "Robert Brown", 
      email: "robert.b@example.com",
      phone: "+1 (555) 444-5555",
      total: "$178.25", 
      subtotal: "$165.25",
      tax: "$8.00",
      shipping: "$5.00",
      shippingMethod: "Standard Shipping",
      status: "cancelled",
      items: [
        {
          id: "ITEM-008",
          name: "Denim Jacket",
          sku: "DJ-BLU-M",
          quantity: 1,
          price: "$89.25",
          total: "$89.25",
          size: "M",
          color: "Blue",
          image: "https://via.placeholder.com/50"
        },
        {
          id: "ITEM-009",
          name: "Cotton T-Shirt",
          sku: "TS-WHT-M",
          quantity: 2,
          price: "$44.50",
          total: "$89.00",
          size: "M",
          color: "White",
          image: "https://via.placeholder.com/50"
        }
      ],
      billingAddress: {
        street: "222 Cedar Ln",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        country: "USA"
      },
      shippingAddress: {
        street: "222 Cedar Ln",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        country: "USA"
      },
      paymentMethod: "Credit Card (ending in 5678)"
    }
  ];

  // Function to view order details
  const viewOrderDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setShowOrderDetails(true);
    }
  };

  // Back to orders list
  const backToOrders = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  // Handle edit product
  const handleEditProduct = (product: any) => {
    setActiveTab("add");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Products</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setShowForm(true);
              setActiveTab("add");
            }} 
            className="h-9 text-xs bg-black hover:bg-black-600 text-white"
          >
            <Plus size={16} className="mr-1" />
            Add Product
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs">
            <FileText size={16} className="mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-3 bg-gray-100 p-1">
          <TabsTrigger 
            value="list" 
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            <ListFilter className="mr-2 h-4 w-4" /> Product List
          </TabsTrigger>
          <TabsTrigger 
            value="orders" 
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Orders
          </TabsTrigger>
          <TabsTrigger 
            value="add" 
            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          <ProductList 
            products={products} 
            setProducts={setProducts} 
            onEditProduct={handleEditProduct}
          />
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {showOrderDetails && selectedOrder ? (
            <OrderDetail order={selectedOrder} onBack={backToOrders} />
          ) : (
            <OrderList orders={orders} onViewOrder={viewOrderDetails} />
          )}
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <ProductForm onCancel={() => setActiveTab("list")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandProducts;
