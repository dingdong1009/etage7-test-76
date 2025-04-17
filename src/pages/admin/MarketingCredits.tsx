
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ArrowUpDown, 
  CreditCard, 
  Download, 
  Edit, 
  Gift, 
  Plus, 
  Settings, 
  Trash2, 
  User,
  Eye 
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock brands data for credit management
const mockBrands = [
  { id: 1, name: "Chanel", email: "contact@chanel.com", freeMonthly: 1, creditBalance: 10, totalUsed: 25, lastPurchase: "2025-03-15" },
  { id: 2, name: "Gucci", email: "contact@gucci.com", freeMonthly: 2, creditBalance: 8, totalUsed: 32, lastPurchase: "2025-03-10" },
  { id: 3, name: "Prada", email: "contact@prada.com", freeMonthly: 1, creditBalance: 5, totalUsed: 18, lastPurchase: "2025-03-05" },
  { id: 4, name: "Dior", email: "contact@dior.com", freeMonthly: 3, creditBalance: 15, totalUsed: 40, lastPurchase: "2025-03-01" },
  { id: 5, name: "Louis Vuitton", email: "contact@louisvuitton.com", freeMonthly: 2, creditBalance: 12, totalUsed: 30, lastPurchase: "2025-02-28" },
  { id: 6, name: "Hermès", email: "contact@hermes.com", freeMonthly: 1, creditBalance: 7, totalUsed: 15, lastPurchase: "2025-02-25" },
  { id: 7, name: "Valentino", email: "contact@valentino.com", freeMonthly: 1, creditBalance: 3, totalUsed: 12, lastPurchase: "2025-02-20" },
  { id: 8, name: "Balenciaga", email: "contact@balenciaga.com", freeMonthly: 2, creditBalance: 9, totalUsed: 22, lastPurchase: "2025-02-15" },
];

// Mock credit packages
const mockPackages = [
  { id: 1, name: "Basic", credits: 5, price: 25, active: true, description: "5 email credits" },
  { id: 2, name: "Standard", credits: 10, price: 45, active: true, description: "10 email credits (10% discount)" },
  { id: 3, name: "Premium", credits: 20, price: 80, active: true, description: "20 email credits (20% discount)" },
  { id: 4, name: "Enterprise", credits: 50, price: 175, active: true, description: "50 email credits (30% discount)" },
];

// Mock transactions
const mockTransactions = [
  { id: 1, brandId: 1, brandName: "Chanel", date: "2025-03-15", type: "purchase", amount: 10, price: 45, description: "Credit package purchase" },
  { id: 2, brandId: 2, brandName: "Gucci", date: "2025-03-10", type: "purchase", amount: 20, price: 80, description: "Credit package purchase" },
  { id: 3, brandId: 3, brandName: "Prada", date: "2025-03-05", type: "complimentary", amount: 5, price: 0, description: "Complimentary credits" },
  { id: 4, brandId: 4, brandName: "Dior", date: "2025-03-01", type: "purchase", amount: 10, price: 45, description: "Credit package purchase" },
  { id: 5, brandId: 5, brandName: "Louis Vuitton", date: "2025-02-28", type: "purchase", amount: 5, price: 25, description: "Credit package purchase" },
  { id: 6, brandId: 1, brandName: "Chanel", date: "2025-02-25", type: "purchase", amount: 20, price: 80, description: "Credit package purchase" },
  { id: 7, brandId: 3, brandName: "Prada", date: "2025-02-20", type: "purchase", amount: 5, price: 25, description: "Credit package purchase" },
  { id: 8, brandId: 6, brandName: "Hermès", date: "2025-02-15", type: "purchase", amount: 10, price: 45, description: "Credit package purchase" },
];

// Mock analytics data
const monthlySalesData = [
  { month: 'Jan', credits: 120, revenue: 5400 },
  { month: 'Feb', credits: 150, revenue: 6750 },
  { month: 'Mar', credits: 200, revenue: 9000 },
  { month: 'Apr', credits: 180, revenue: 8100 },
  { month: 'May', credits: 220, revenue: 9900 },
  { month: 'Jun', credits: 250, revenue: 11250 },
];

const packageDistributionData = [
  { name: '5 Credits', value: 30 },
  { name: '10 Credits', value: 45 },
  { name: '20 Credits', value: 15 },
  { name: '50 Credits', value: 10 },
];

const COLORS = ['#d1d5db', '#9ca3af', '#6b7280', '#374151'];

const MarketingCredits = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddBrandCreditsOpen, setIsAddBrandCreditsOpen] = useState(false);
  const [isEditPackageOpen, setIsEditPackageOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<{ column: string | null; direction: 'asc' | 'desc' }>({
    column: null,
    direction: 'asc'
  });

  const brandForm = useForm({
    defaultValues: {
      brandId: "",
      creditAmount: "10",
      reason: "Purchase",
      notes: "",
      notify: true,
    },
  });

  const packageForm = useForm({
    defaultValues: {
      name: "",
      credits: "",
      price: "",
      active: true,
      description: "",
    },
  });

  const handleSortColumn = (column: string) => {
    setSortOrder((prev) => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedBrands = [...mockBrands].sort((a, b) => {
    if (!sortOrder.column) return 0;
    
    const direction = sortOrder.direction === 'asc' ? 1 : -1;
    
    switch (sortOrder.column) {
      case 'name':
        return a.name.localeCompare(b.name) * direction;
      case 'balance':
        return (a.creditBalance - b.creditBalance) * direction;
      case 'used':
        return (a.totalUsed - b.totalUsed) * direction;
      case 'monthly':
        return (a.freeMonthly - b.freeMonthly) * direction;
      default:
        return 0;
    }
  });

  const handleOpenBrandCredits = (brandId: number) => {
    const brand = mockBrands.find(b => b.id === brandId);
    if (brand) {
      brandForm.setValue("brandId", brandId.toString());
      setSelectedBrandId(brandId);
      setIsAddBrandCreditsOpen(true);
    }
  };

  const handleOpenEditPackage = (packageId: number | null = null) => {
    if (packageId) {
      const pkg = mockPackages.find(p => p.id === packageId);
      if (pkg) {
        packageForm.setValue("name", pkg.name);
        packageForm.setValue("credits", pkg.credits.toString());
        packageForm.setValue("price", pkg.price.toString());
        packageForm.setValue("active", pkg.active);
        packageForm.setValue("description", pkg.description);
        setSelectedPackageId(packageId);
      }
    } else {
      packageForm.reset({
        name: "",
        credits: "",
        price: "",
        active: true,
        description: "",
      });
      setSelectedPackageId(null);
    }
    setIsEditPackageOpen(true);
  };

  const handleAddBrandCredits = (data) => {
    const brand = mockBrands.find(b => b.id === parseInt(data.brandId));
    if (brand) {
      toast({
        title: "Credits Added",
        description: `${data.creditAmount} credits have been added to ${brand.name}.`,
      });
    }
    setIsAddBrandCreditsOpen(false);
  };

  const handleSavePackage = (data) => {
    if (selectedPackageId) {
      toast({
        title: "Package Updated",
        description: `The credit package "${data.name}" has been updated.`,
      });
    } else {
      toast({
        title: "Package Created",
        description: `New credit package "${data.name}" has been created.`,
      });
    }
    setIsEditPackageOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">MARKETING CREDITS</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent p-0 mb-4 border-b w-full flex justify-start space-x-4 h-auto">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="brands"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Brand Credits
          </TabsTrigger>
          <TabsTrigger 
            value="packages"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Credit Packages
          </TabsTrigger>
          <TabsTrigger 
            value="transactions"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light"
          >
            Transactions
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="border-gray-100 shadow-none rounded-none">
              <CardHeader className="p-4 pb-0">
                <CardDescription className="text-xs uppercase font-light">Total Active Credits</CardDescription>
                <CardTitle className="text-4xl font-light">
                  {mockBrands.reduce((sum, brand) => sum + brand.creditBalance, 0)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="text-sm text-gray-500">
                  Across {mockBrands.length} brands
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100 shadow-none rounded-none">
              <CardHeader className="p-4 pb-0">
                <CardDescription className="text-xs uppercase font-light">Monthly Revenue</CardDescription>
                <CardTitle className="text-4xl font-light">€{monthlySalesData[monthlySalesData.length - 1].revenue}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="text-sm text-gray-500">
                  From {monthlySalesData[monthlySalesData.length - 1].credits} credits
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100 shadow-none rounded-none">
              <CardHeader className="p-4 pb-0">
                <CardDescription className="text-xs uppercase font-light">Monthly Free Credits</CardDescription>
                <CardTitle className="text-4xl font-light">
                  {mockBrands.reduce((sum, brand) => sum + brand.freeMonthly, 0)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="text-sm text-gray-500">
                  Allocated to brands each month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-gray-100 shadow-none rounded-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base font-light">Monthly Credit Sales & Revenue</CardTitle>
                <CardDescription className="text-xs">Last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlySalesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis yAxisId="left" fontSize={12} />
                      <YAxis yAxisId="right" orientation="right" fontSize={12} />
                      <RechartsTooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="credits" stroke="#9ca3af" strokeWidth={2} dot={{ stroke: '#9ca3af', strokeWidth: 2 }} name="Credits Sold" />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#374151" strokeWidth={2} dot={{ stroke: '#374151', strokeWidth: 2 }} name="Revenue (€)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100 shadow-none rounded-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base font-light">Credit Package Distribution</CardTitle>
                <CardDescription className="text-xs">By purchase volume</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={packageDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={2}
                        dataKey="value"
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {packageDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Brands Tab Content */}
        <TabsContent value="brands">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs rounded-none border-gray-200 font-light mr-2"
              onClick={() => {
                brandForm.reset({
                  brandId: "",
                  creditAmount: "10",
                  reason: "Purchase",
                  notes: "",
                  notify: true,
                });
                setSelectedBrandId(null);
                setIsAddBrandCreditsOpen(true);
              }}
            >
              <Plus className="w-3 h-3 mr-1" strokeWidth={1.5} />
              Add Credits
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs rounded-none border-gray-200 font-light"
            >
              <Download className="w-3 h-3 mr-1" strokeWidth={1.5} />
              Export Data
            </Button>
          </div>
          
          <Card className="border-gray-100 shadow-none rounded-none">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-light" onClick={() => handleSortColumn('name')}>
                      <div className="flex items-center cursor-pointer">
                        Brand Name
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="font-light" onClick={() => handleSortColumn('balance')}>
                      <div className="flex items-center cursor-pointer">
                        Credit Balance
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="font-light" onClick={() => handleSortColumn('monthly')}>
                      <div className="flex items-center cursor-pointer">
                        Free Monthly
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="font-light" onClick={() => handleSortColumn('used')}>
                      <div className="flex items-center cursor-pointer">
                        Total Used
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="font-light">Last Purchase</TableHead>
                    <TableHead className="text-right font-light">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBrands.map((brand) => (
                    <TableRow key={brand.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                          <span>{brand.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{brand.creditBalance}</TableCell>
                      <TableCell>{brand.freeMonthly}</TableCell>
                      <TableCell>{brand.totalUsed}</TableCell>
                      <TableCell>{brand.lastPurchase}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-none"
                          onClick={() => handleOpenBrandCredits(brand.id)}
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                          <span className="sr-only">Add credits</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-none"
                        >
                          <Settings className="h-3 w-3" strokeWidth={1.5} />
                          <span className="sr-only">Settings</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Packages Tab Content */}
        <TabsContent value="packages">
          <div className="flex justify-end mb-4">
            <Button 
              className="bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
              onClick={() => handleOpenEditPackage()}
            >
              <Plus className="w-3 h-3 mr-1" strokeWidth={1.5} />
              New Package
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockPackages.map((pkg) => (
              <Card key={pkg.id} className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-light">{pkg.name}</CardTitle>
                    <Badge className={`rounded-sm text-xs ${pkg.active ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-500'} font-light`}>
                      {pkg.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-4 py-2">
                  <div className="text-3xl font-light mb-2">€{pkg.price}</div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Badge className="bg-transparent text-gray-600 p-0 font-normal">
                      {pkg.credits} credits
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{pkg.description}</p>
                </CardContent>
                <CardFooter className="px-4 py-3 border-t border-gray-50 flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 rounded-none"
                    onClick={() => handleOpenEditPackage(pkg.id)}
                  >
                    <Edit className="h-3 w-3" strokeWidth={1.5} />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 rounded-none text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Transactions Tab Content */}
        <TabsContent value="transactions">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs rounded-none border-gray-200 font-light"
            >
              <Download className="w-3 h-3 mr-1" strokeWidth={1.5} />
              Export Transactions
            </Button>
          </div>
          
          <Card className="border-gray-100 shadow-none rounded-none">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-light">Date</TableHead>
                    <TableHead className="font-light">Brand</TableHead>
                    <TableHead className="font-light">Type</TableHead>
                    <TableHead className="font-light text-right">Credits</TableHead>
                    <TableHead className="font-light text-right">Price (€)</TableHead>
                    <TableHead className="font-light">Description</TableHead>
                    <TableHead className="text-right font-light">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.brandName}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`
                            rounded-sm text-xs font-light flex items-center gap-1 h-6
                            ${transaction.type === 'purchase' ? 'bg-gray-100 text-gray-700' : ''}
                            ${transaction.type === 'complimentary' ? 'bg-gray-100 text-gray-700' : ''}
                          `}
                        >
                          {transaction.type === 'purchase' && <CreditCard className="h-3 w-3" strokeWidth={1.5} />}
                          {transaction.type === 'complimentary' && <Gift className="h-3 w-3" strokeWidth={1.5} />}
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{transaction.amount}</TableCell>
                      <TableCell className="text-right">{transaction.price}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <div className="flex justify-end gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 hover:bg-gray-100"
                                  onClick={() => toast({
                                    title: "View Transaction Details",
                                    description: `Viewing details for transaction ${transaction.id}`,
                                  })}
                                >
                                  <Eye size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View transaction details</p>
                              </TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 hover:bg-gray-100"
                                  onClick={() => toast({
                                    title: "Export Transaction",
                                    description: `Exporting transaction ${transaction.id}`,
                                  })}
                                >
                                  <Download size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Export transaction</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Brand Credits Dialog */}
      <Dialog open={isAddBrandCreditsOpen} onOpenChange={setIsAddBrandCreditsOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none">
          <DialogHeader>
            <DialogTitle className="text-lg font-light">Add Credits to Brand</DialogTitle>
            <DialogDescription>
              {selectedBrandId 
                ? `Add credits to ${mockBrands.find(b => b.id === selectedBrandId)?.name}`
                : "Select a brand to add credits to"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...brandForm}>
            <form onSubmit={brandForm.handleSubmit(handleAddBrandCredits)} className="space-y-4">
              {!selectedBrandId && (
                <FormField
                  control={brandForm.control}
                  name="brandId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-light">Brand</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-none border-gray-200">
                            <SelectValue placeholder="Select a brand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {mockBrands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id.toString()}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={brandForm.control}
                name="creditAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Credit Amount</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        <SelectItem value="5">5 Credits</SelectItem>
                        <SelectItem value="10">10 Credits</SelectItem>
                        <SelectItem value="20">20 Credits</SelectItem>
                        <SelectItem value="50">50 Credits</SelectItem>
                        <SelectItem value="custom">Custom Amount</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {brandForm.watch('creditAmount') === 'custom' && (
                <FormItem>
                  <FormLabel className="text-sm font-light">Custom Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      className="rounded-none border-gray-200" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

              <FormField
                control={brandForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Reason</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        <SelectItem value="Purchase">Purchase</SelectItem>
                        <SelectItem value="Complimentary">Complimentary</SelectItem>
                        <SelectItem value="Promotion">Promotion</SelectItem>
                        <SelectItem value="Compensation">Compensation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={brandForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Additional information..." 
                        className="rounded-none border-gray-200 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={brandForm.control}
                name="notify"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-light">Notify Brand</FormLabel>
                      <FormDescription className="text-xs">
                        Send an email notification about the credits.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsAddBrandCreditsOpen(false)} className="rounded-none border-gray-200">
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white hover:bg-gray-800 rounded-none">
                  Add Credits
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Package Dialog */}
      <Dialog open={isEditPackageOpen} onOpenChange={setIsEditPackageOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none">
          <DialogHeader>
            <DialogTitle className="text-lg font-light">
              {selectedPackageId ? "Edit Credit Package" : "Create Credit Package"}
            </DialogTitle>
            <DialogDescription>
              {selectedPackageId 
                ? "Update the credit package details"
                : "Set up a new credit package for brands to purchase"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...packageForm}>
            <form onSubmit={packageForm.handleSubmit(handleSavePackage)} className="space-y-4">
              <FormField
                control={packageForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Package Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Basic, Standard, Premium" className="rounded-none border-gray-200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={packageForm.control}
                  name="credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-light">Credits</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" className="rounded-none border-gray-200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={packageForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-light">Price (€)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" className="rounded-none border-gray-200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={packageForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the package..." 
                        className="rounded-none border-gray-200 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={packageForm.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-light">Active Package</FormLabel>
                      <FormDescription className="text-xs">
                        Inactive packages won't be available for purchase.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsEditPackageOpen(false)} className="rounded-none border-gray-200">
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white hover:bg-gray-800 rounded-none">
                  {selectedPackageId ? "Update Package" : "Create Package"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketingCredits;
