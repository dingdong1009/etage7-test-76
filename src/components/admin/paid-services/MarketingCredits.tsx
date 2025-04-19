import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  Search, Plus, Eye, Edit, ArrowUpRight, ArrowDownRight, Download, 
  Users, CreditCard, Coins, BarChart, Calendar, Settings
} from "lucide-react";
import { MarketingCredit, MarketingTransaction } from "@/types/services/paidServices";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data for marketing credits
const mockMarketingCredits: MarketingCredit[] = [
  {
    id: "mc-1",
    userId: "brand-1",
    userType: "brand",
    totalCredits: 5000,
    usedCredits: 3200,
    expiryDate: "2024-12-31T23:59:59Z",
    lastUpdated: "2024-04-05T14:30:00Z",
    transactions: [
      {
        id: "tr-1-1",
        creditId: "mc-1",
        amount: 5000,
        description: "Initial credit purchase",
        date: "2024-01-01T10:00:00Z",
        type: "credit"
      },
      {
        id: "tr-1-2",
        creditId: "mc-1",
        amount: 2000,
        description: "Email campaign",
        date: "2024-02-15T14:30:00Z",
        type: "debit"
      },
      {
        id: "tr-1-3",
        creditId: "mc-1",
        amount: 1200,
        description: "Social media promotion",
        date: "2024-03-20T09:45:00Z",
        type: "debit"
      }
    ]
  },
  {
    id: "mc-2",
    userId: "brand-2",
    userType: "brand",
    totalCredits: 10000,
    usedCredits: 4500,
    expiryDate: "2025-03-31T23:59:59Z",
    lastUpdated: "2024-04-10T11:15:00Z",
    transactions: [
      {
        id: "tr-2-1",
        creditId: "mc-2",
        amount: 10000,
        description: "Premium credit package",
        date: "2024-01-15T11:30:00Z",
        type: "credit"
      },
      {
        id: "tr-2-2",
        creditId: "mc-2",
        amount: 3000,
        description: "Featured product placement",
        date: "2024-02-20T13:45:00Z",
        type: "debit"
      },
      {
        id: "tr-2-3",
        creditId: "mc-2",
        amount: 1500,
        description: "Newsletter inclusion",
        date: "2024-03-25T15:20:00Z",
        type: "debit"
      }
    ]
  },
  {
    id: "mc-3",
    userId: "buyer-1",
    userType: "buyer",
    totalCredits: 2500,
    usedCredits: 1800,
    expiryDate: "2024-09-30T23:59:59Z",
    lastUpdated: "2024-04-12T10:00:00Z",
    transactions: [
      {
        id: "tr-3-1",
        creditId: "mc-3",
        amount: 2500,
        description: "Starter credit package",
        date: "2024-02-01T09:00:00Z",
        type: "credit"
      },
      {
        id: "tr-3-2",
        creditId: "mc-3",
        amount: 1800,
        description: "Promotional campaign",
        date: "2024-03-10T14:15:00Z",
        type: "debit"
      }
    ]
  }
];

// Create monthly usage data for chart
const monthlyData = [
  { month: "Jan", used: 2000, added: 5000 },
  { month: "Feb", used: 3500, added: 0 },
  { month: "Mar", used: 4000, added: 0 },
  { month: "Apr", used: 1000, added: 2500 },
  { month: "May", used: 0, added: 0 },
  { month: "Jun", used: 0, added: 0 }
];

// Mock data for credit packages
const creditPackages = [
  { id: 1, name: "Starter", credits: 1000, price: 49, popular: false },
  { id: 2, name: "Professional", credits: 5000, price: 199, popular: true },
  { id: 3, name: "Enterprise", credits: 20000, price: 499, popular: false }
];

// Mock data for user types distribution
const userTypeData = [
  { name: "Brands", value: 65, color: "#8884d8" },
  { name: "Buyers", value: 35, color: "#82ca9d" }
];

const MarketingCredits = () => {
  const [credits] = useState<MarketingCredit[]>(mockMarketingCredits);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCreditsDialog, setShowAddCreditsDialog] = useState(false);
  const [showCreatePackageDialog, setShowCreatePackageDialog] = useState(false);
  const [showPromoDialog, setShowPromoDialog] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<MarketingCredit | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUserType, setSelectedUserType] = useState("all");
  const [dateRange, setDateRange] = useState("month");
  
  // Calculate totals
  const totalCredits = credits.reduce((sum, credit) => sum + credit.totalCredits, 0);
  const totalUsed = credits.reduce((sum, credit) => sum + credit.usedCredits, 0);
  const remainingCredits = totalCredits - totalUsed;
  
  const handleAddCredits = () => {
    toast({
      title: "Credits Added",
      description: "1000 credits have been added to the selected account."
    });
    setShowAddCreditsDialog(false);
  };
  
  const handleCreatePackage = () => {
    toast({
      title: "Package Created",
      description: "New credit package has been created successfully."
    });
    setShowCreatePackageDialog(false);
  };
  
  const handleCreatePromo = () => {
    toast({
      title: "Promotion Created",
      description: "New promotional code has been created and is now active."
    });
    setShowPromoDialog(false);
  };
  
  const viewCreditDetails = (credit: MarketingCredit) => {
    setSelectedCredit(credit);
  };
  
  const filteredCredits = credits.filter(credit => {
    if (selectedUserType !== "all" && credit.userType !== selectedUserType) {
      return false;
    }
    
    return (
      credit.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      credit.userId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal tracking-tighter uppercase">Marketing Credits Management</h2>
        <div className="flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mr-4">
            <TabsList className="bg-transparent border border-gray-200">
              <TabsTrigger 
                value="overview" 
                className="text-xs font-normal uppercase data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="packages" 
                className="text-xs font-normal uppercase data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
              >
                Packages
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="text-xs font-normal uppercase data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="text-xs font-normal uppercase data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
              >
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by user or ID..."
              className="pl-10 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase"
            onClick={() => setShowAddCreditsDialog(true)}
          >
            <Plus size={16} className="mr-1" />
            Add Credits
          </Button>
        </div>
      </div>
      
      <TabsContent value="overview" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Total Credit Purchased</span>
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Coins className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
                </div>
              </div>
              <div className="text-2xl font-light">{totalCredits.toLocaleString()}</div>
              <span className="text-xs font-medium text-gray-400">From {credits.length} users</span>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Total Credit Used</span>
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <ArrowDownRight className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
                </div>
              </div>
              <div className="text-2xl font-light">{totalUsed.toLocaleString()}</div>
              <span className="text-xs font-medium text-gray-400">
                {(totalUsed / totalCredits * 100).toFixed(1)}% of total
              </span>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Remaining Credits</span>
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-green-500" strokeWidth={1.5} />
                </div>
              </div>
              <div className="text-2xl font-light">{remainingCredits.toLocaleString()}</div>
              <span className="text-xs font-medium text-gray-400">
                {(remainingCredits / totalCredits * 100).toFixed(1)}% of total
              </span>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Active Users</span>
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
                </div>
              </div>
              <div className="text-2xl font-light">{credits.filter(c => c.totalCredits > c.usedCredits).length}</div>
              <span className="text-xs font-medium text-gray-400">
                With active credits
              </span>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <div className="xl:col-span-2">
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                  Credit Allocations
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                    <SelectTrigger className="w-[150px] text-xs uppercase font-light border-gray-200">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs uppercase font-light">All Types</SelectItem>
                      <SelectItem value="brand" className="text-xs uppercase font-light">Brands Only</SelectItem>
                      <SelectItem value="buyer" className="text-xs uppercase font-light">Buyers Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="uppercase">
                      <TableHead className="font-normal text-xs">ID</TableHead>
                      <TableHead className="font-normal text-xs">User Type</TableHead>
                      <TableHead className="font-normal text-xs">Total</TableHead>
                      <TableHead className="font-normal text-xs">Used</TableHead>
                      <TableHead className="font-normal text-xs">Remaining</TableHead>
                      <TableHead className="font-normal text-xs">Usage %</TableHead>
                      <TableHead className="font-normal text-xs">Expiry</TableHead>
                      <TableHead className="text-right font-normal text-xs uppercase">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCredits.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                          No credit records found with the current filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCredits.map((credit) => {
                        const remaining = credit.totalCredits - credit.usedCredits;
                        const usagePercent = (credit.usedCredits / credit.totalCredits * 100).toFixed(1);
                        
                        return (
                          <TableRow key={credit.id} className="border-t border-gray-100">
                            <TableCell className="font-light uppercase">{credit.id}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="secondary" 
                                className={`capitalize border-gray-200 ${
                                  credit.userType === 'brand' ? 'bg-accent-mint/20 text-gray-800' : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {credit.userType}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-light">{credit.totalCredits.toLocaleString()}</TableCell>
                            <TableCell className="font-light">{credit.usedCredits.toLocaleString()}</TableCell>
                            <TableCell className="font-light">{remaining.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className="w-full bg-gray-100 h-2 rounded-full">
                                <div 
                                  className={`h-full rounded-full ${
                                    parseFloat(usagePercent) > 80 ? 'bg-red-400' :
                                    parseFloat(usagePercent) > 50 ? 'bg-yellow-400' : 'bg-green-400'
                                  }`}
                                  style={{ width: `${usagePercent}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{usagePercent}%</span>
                            </TableCell>
                            <TableCell className="font-light">
                              {credit.expiryDate
                                ? new Date(credit.expiryDate).toLocaleDateString()
                                : "Never"}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 p-0 hover:bg-gray-200"
                                onClick={() => viewCreditDetails(credit)}
                              >
                                <Eye className="h-4 w-4" strokeWidth={1.5} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200">
                                <Edit className="h-4 w-4" strokeWidth={1.5} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                  Credit Usage
                </CardTitle>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[120px] text-xs font-light border-gray-200">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} className="font-thin text-sm">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: "4px", 
                          border: "1px solid #f0f0f0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="used" 
                        name="Credits Used" 
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="added" 
                        name="Credits Added" 
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#8884d8] mr-2"></span>
                    <span className="text-xs text-gray-600">Credits Used</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#82ca9d] mr-2"></span>
                    <span className="text-xs text-gray-600">Credits Added</span>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-4 flex justify-end">
                <Button variant="outline" size="sm" className="text-xs uppercase font-light">
                  <Download className="h-3.5 w-3.5 mr-1" strokeWidth={1.5} />
                  Export Data
                </Button>
              </div>
            </Card>
            
            <Card className="border border-gray-200 shadow-none rounded-lg mt-6">
              <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                  User Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {userTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center space-x-6 mt-4">
                  {userTypeData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <span 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }}
                      ></span>
                      <span className="text-xs text-gray-600">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="border border-gray-200 shadow-none rounded-lg mt-6">
          <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80">
            <CardTitle className="text-lg font-normal text-gray-900 uppercase">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="p-4">
              <TabsList className="mb-4 bg-transparent border border-gray-200">
                <TabsTrigger 
                  value="all" 
                  className="text-xs font-normal uppercase data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="credits" 
                  className="text-xs font-normal uppercase data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
                >
                  Credits
                </TabsTrigger>
                <TabsTrigger 
                  value="debits" 
                  className="text-xs font-normal uppercase data-[state=active]:bg-black data-[state=active]:text-white rounded-none"
                >
                  Debits
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="space-y-4">
                  {credits.flatMap(credit =>
                    credit.transactions.map(transaction => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            transaction.type === 'credit' ? 'bg-accent-mint/20' : 'bg-gray-100'
                          }`}>
                            {transaction.type === 'credit' ? (
                              <ArrowUpRight className="h-5 w-5 text-green-600" />
                            ) : (
                              <ArrowDownRight className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(transaction.date).toLocaleDateString()} - User ID: {credit.userId}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className={transaction.type === 'credit' ? 'text-green-600' : 'text-gray-800'}>
                            {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                          </div>
                          <div className="text-xs text-gray-500">
                            Balance: {transaction.type === 'credit' 
                              ? credit.totalCredits 
                              : (credit.totalCredits - transaction.amount)
                            }
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="credits" className="mt-0">
                <div className="space-y-4">
                  {credits.flatMap(credit =>
                    credit.transactions
                      .filter(t => t.type === 'credit')
                      .map(transaction => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-accent-mint/20 flex items-center justify-center mr-4">
                              <ArrowUpRight className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium">{transaction.description}</div>
                              <div className="text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleDateString()} - User ID: {credit.userId}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-green-600">
                              +{transaction.amount}
                            </div>
                            <div className="text-xs text-gray-500">
                              Balance: {credit.totalCredits}
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="debits" className="mt-0">
                <div className="space-y-4">
                  {credits.flatMap(credit =>
                    credit.transactions
                      .filter(t => t.type === 'debit')
                      .map(transaction => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                              <ArrowDownRight className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium">{transaction.description}</div>
                              <div className="text-sm text-gray-500">
                                {new Date(transaction.date).toLocaleDateString()} - User ID: {credit.userId}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-gray-800">
                              -{transaction.amount}
                            </div>
                            <div className="text-xs text-gray-500">
                              Balance: {credit.totalCredits - transaction.amount}
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="packages" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                Credit Packages
              </CardTitle>
              <Button 
                className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal text-xs"
                onClick={() => setShowCreatePackageDialog(true)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                New Package
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {creditPackages.map(pkg => (
                  <div key={pkg.id} className={`p-4 border ${pkg.popular ? 'border-black' : 'border-gray-200'} rounded-lg relative`}>
                    {pkg.popular && (
                      <Badge className="absolute top-0 right-0 transform translate-x-1 -translate-y-1/2 bg-accent-mint text-gray-800 border-none">
                        MOST POPULAR
                      </Badge>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">{pkg.name}</h3>
                      <span className="text-xl font-light">${pkg.price}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      <p>{pkg.credits.toLocaleString()} email marketing credits</p>
                      <p className="text-xs mt-1">${(pkg.price / pkg.credits * 1000).toFixed(2)} per 1000 credits</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Edit className="h-3.5 w-3.5 mr-1" strokeWidth={1.5} />
                        Edit
                      </Button>
                      {!pkg.popular && (
                        <Button size="sm" variant="outline" className="text-xs">
                          Set as Popular
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80 flex flex-row items-center justify-
