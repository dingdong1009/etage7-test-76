import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Upload, 
  Plus, 
  FileText, 
  Image, 
  Tag, 
  DollarSign, 
  Package, 
  Truck,
  Palette,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  ListFilter,
  ArrowUpDown,
  Filter,
  ShoppingBag,
  Printer,
  ArrowLeft,
  Mail
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useReactToPrint } from "react-to-print";

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

const BrandProducts = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  
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

  const colorOptions = [
    { name: "Neutral Gray", hex: "#8E9196" },
    { name: "Primary Purple", hex: "#9b87f5" },
    { name: "Secondary Purple", hex: "#7E69AB" },
    { name: "Tertiary Purple", hex: "#6E59A5" },
    { name: "Dark Purple", hex: "#1A1F2C" },
    { name: "Light Purple", hex: "#D6BCFA" },
    { name: "Soft Green", hex: "#F2FCE2" },
    { name: "Soft Yellow", hex: "#FEF7CD" },
    { name: "Soft Orange", hex: "#FEC6A1" },
    { name: "Soft Purple", hex: "#E5DEFF" },
    { name: "Soft Pink", hex: "#FFDEE2" },
    { name: "Soft Blue", hex: "#D3E4FD" },
    { name: "Vivid Purple", hex: "#8B5CF6" },
    { name: "Magenta Pink", hex: "#D946EF" },
    { name: "Bright Orange", hex: "#F97316" },
    { name: "Ocean Blue", hex: "#0EA5E9" },
    { name: "Charcoal Gray", hex: "#403E43" },
    { name: "Navy Blue", hex: "#1E3A8A" },
    { name: "Burgundy", hex: "#9F1239" },
    { name: "Tan", hex: "#D4A76A" },
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesSeason = seasonFilter ? product.season === seasonFilter : true;
    const matchesStatus = statusFilter ? product.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesSeason && matchesStatus;
  });

  const toggleProductStatus = (id, newStatus) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: newStatus } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(orderSearchQuery.toLowerCase())
  );

  // Function to view order details
  const viewOrderDetails = (orderId) => {
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

  // Function to handle printing/PDF generation - fixed to handle the correct type
  const handlePrint = useReactToPrint({
    documentTitle: `Order-${selectedOrder?.id || ""}`,
    onAfterPrint: () => console.log('Print completed'),
    // Fix: Use 'content' as a function that returns the ref
    content: () => printRef.current,
  });

  // Function to get status color
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
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Product Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-10 flex gap-1.5">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm">Category</Label>
                          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="All categories" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All categories</SelectItem>
                              <SelectItem value="Outerwear">Outerwear</SelectItem>
                              <SelectItem value="Tops">Tops</SelectItem>
                              <SelectItem value="Bottoms">Bottoms</SelectItem>
                              <SelectItem value="Dresses">Dresses</SelectItem>
                              <SelectItem value="Accessories">Accessories</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Season</Label>
                          <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="All seasons" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All seasons</SelectItem>
                              <SelectItem value="Spring/Summer 2025">Spring/Summer 2025</SelectItem>
                              <SelectItem value="Fall/Winter 2024">Fall/Winter 2024</SelectItem>
                              <SelectItem value="Resort 2025">Resort 2025</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Status</Label>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All statuses</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setCategoryFilter("");
                              setSeasonFilter("");
                              setStatusFilter("");
                            }}
                          >
                            Reset
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-black hover:bg-black-600"
                          >
                            Apply Filters
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort('name')}>
                        <div className="flex items-center">
                          Product Name
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('sku')}>
                        <div className="flex items-center">
                          SKU
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                        <div className="flex items-center">
                          Category
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Season</TableHead>
                      <TableHead className="hidden md:table-cell">
                        <div className="flex items-center">
                          Colors
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer text-right" onClick={() => handleSort('price')}>
                        <div className="flex items-center justify-end">
                          Price
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('status')}>
                        <div className="flex items-center">
                          Status
                          <ArrowUpDown size={16} className="ml-1.5" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.season}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-2">
                                  <div 
                                    className="h-3 w-3 rounded-full" 
                                    style={{ 
                                      backgroundColor: colorOptions.find(c => c.name === product.color)?.hex || '#000000'
                                    }} 
                                  />
                                  <span className="text-xs">{product.color}</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
                                {colorOptions.map((color) => (
                                  <DropdownMenuItem 
                                    key={color.name}
                                    className="flex items-center gap-2"
                                  >
                                    <div 
                                      className="h-4 w-4 rounded-full" 
                                      style={{ backgroundColor: color.hex }} 
                                    />
                                    <span>{color.name}</span>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.status === 'active' ? 'Active' : 'Draft'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                title="View details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                title="Edit product"
                                onClick={() => {
                                  setActiveTab("add");
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {product.status === 'active' ? (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  title="Deactivate product"
                                  onClick={() => toggleProductStatus(product.id, 'draft')}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  title="Activate product"
                                  onClick={() => toggleProductStatus(product.id, 'active')}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                title="Delete product"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card className="border border-gray-200">
            {!showOrderDetails ? (
              <>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Recent Orders</CardTitle>
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input 
                      type="search" 
                      placeholder="Search orders..." 
                      className="w-full rounded-md border border-gray-200 pl-8 py-2 text-sm outline-none focus:border-blue-500"
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
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
                        {filteredOrders.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No orders found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredOrders.map((order) => (
                            <TableRow key={order.id}>
