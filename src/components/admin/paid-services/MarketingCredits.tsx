
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
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                Promotional Codes
              </CardTitle>
              <Button 
                className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal text-xs"
                onClick={() => setShowPromoDialog(true)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                New Promo
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium uppercase">WELCOME25</h3>
                    <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-none">Active</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>25% off first credit purchase</p>
                    <p className="text-xs mt-1">Expires: 12/31/2024</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Used: 45 times</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs text-red-600 hover:text-red-700">
                        Deactivate
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium uppercase">SUMMER2024</h3>
                    <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-none">Active</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>15% off any credit package</p>
                    <p className="text-xs mt-1">Expires: 09/30/2024</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Used: 28 times</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs text-red-600 hover:text-red-700">
                        Deactivate
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium uppercase">SPRING10</h3>
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-500 border-none">Inactive</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>10% off any credit package</p>
                    <p className="text-xs mt-1">Expired: 03/31/2024</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Used: 56 times</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs text-green-600 hover:text-green-700">
                        Reactivate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                Package Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {creditPackages.map(pkg => (
                  <div key={`perf-${pkg.id}`} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{pkg.name}</h3>
                      <span className="text-sm text-gray-500">${pkg.price}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          pkg.popular ? 'bg-accent-mint' : 'bg-gray-400'
                        }`}
                        style={{ 
                          width: `${pkg.popular ? '68' : pkg.id === 1 ? '42' : '25'}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {pkg.popular ? '68' : pkg.id === 1 ? '42' : '25'}% of total sales
                      </span>
                      <span>
                        {pkg.popular ? '325' : pkg.id === 1 ? '201' : '120'} purchases
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-medium mb-4">Monthly Purchase Trend</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: "Jan", professional: 45, starter: 32, enterprise: 10 },
                      { month: "Feb", professional: 52, starter: 28, enterprise: 14 },
                      { month: "Mar", professional: 49, starter: 35, enterprise: 12 },
                      { month: "Apr", professional: 63, starter: 42, enterprise: 18 },
                      { month: "May", professional: 59, starter: 40, enterprise: 15 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="starter" name="Starter" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="professional" name="Professional" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="enterprise" name="Enterprise" stroke="#ff7300" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                Credit Usage by Campaign Type
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Email Campaigns', value: 42, color: '#8884d8' },
                        { name: 'Social Media Promos', value: 28, color: '#82ca9d' },
                        { name: 'Featured Products', value: 18, color: '#ffc658' },
                        { name: 'Newsletter Inclusion', value: 12, color: '#ff8042' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: 'Email Campaigns', value: 42, color: '#8884d8' },
                        { name: 'Social Media Promos', value: 28, color: '#82ca9d' },
                        { name: 'Featured Products', value: 18, color: '#ffc658' },
                        { name: 'Newsletter Inclusion', value: 12, color: '#ff8042' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-light">42%</h3>
                  <p className="text-sm text-gray-500">Email Campaigns</p>
                  <div className="text-xs text-gray-400 mt-1">16,800 credits used</div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-light">28%</h3>
                  <p className="text-sm text-gray-500">Social Media Promos</p>
                  <div className="text-xs text-gray-400 mt-1">11,200 credits used</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                Credit Sales vs Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: "Jan", sold: 12000, used: 8000 },
                    { month: "Feb", sold: 15000, used: 10000 },
                    { month: "Mar", sold: 13000, used: 12000 },
                    { month: "Apr", sold: 18000, used: 13000 },
                    { month: "May", sold: 22000, used: 15000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="sold" 
                      name="Credits Sold" 
                      stroke="#8884d8"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="used" 
                      name="Credits Used" 
                      stroke="#82ca9d"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Usage Efficiency</span>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div 
                    className="h-full rounded-full bg-accent-mint"
                    style={{ width: "72%" }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  72% of purchased credits have been utilized within the same month
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border border-gray-200 shadow-none rounded-lg mt-6">
          <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-normal text-gray-900 uppercase">
              Campaign Performance Analysis
            </CardTitle>
            <Select defaultValue="30days">
              <SelectTrigger className="w-[150px] text-xs uppercase font-light border-gray-200">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days" className="text-xs uppercase font-light">Last 7 days</SelectItem>
                <SelectItem value="30days" className="text-xs uppercase font-light">Last 30 days</SelectItem>
                <SelectItem value="90days" className="text-xs uppercase font-light">Last 90 days</SelectItem>
                <SelectItem value="year" className="text-xs uppercase font-light">Last year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="uppercase">
                  <TableHead className="font-normal text-xs">Campaign</TableHead>
                  <TableHead className="font-normal text-xs">User</TableHead>
                  <TableHead className="font-normal text-xs">Type</TableHead>
                  <TableHead className="font-normal text-xs">Credits Used</TableHead>
                  <TableHead className="font-normal text-xs">Open Rate</TableHead>
                  <TableHead className="font-normal text-xs">Click Rate</TableHead>
                  <TableHead className="font-normal text-xs">ROI Score</TableHead>
                  <TableHead className="font-normal text-xs">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-light">Spring Collection Announcement</TableCell>
                  <TableCell className="font-light">brand-1</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-accent-mint/20 text-gray-800 border-none">
                      Email
                    </Badge>
                  </TableCell>
                  <TableCell className="font-light">1,200</TableCell>
                  <TableCell className="font-light">42%</TableCell>
                  <TableCell className="font-light">12%</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-100 h-2 rounded-full mr-2">
                        <div className="h-full rounded-full bg-green-400" style={{ width: "75%" }}></div>
                      </div>
                      <span className="text-xs">7.5</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-light text-sm">Mar 20, 2024</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-light">New Product Line</TableCell>
                  <TableCell className="font-light">brand-2</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-accent-mint/20 text-gray-800 border-none">
                      Email
                    </Badge>
                  </TableCell>
                  <TableCell className="font-light">2,000</TableCell>
                  <TableCell className="font-light">38%</TableCell>
                  <TableCell className="font-light">9%</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-100 h-2 rounded-full mr-2">
                        <div className="h-full rounded-full bg-yellow-400" style={{ width: "65%" }}></div>
                      </div>
                      <span className="text-xs">6.5</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-light text-sm">Apr 05, 2024</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-light">Limited Time Offer</TableCell>
                  <TableCell className="font-light">brand-1</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-none">
                      Social
                    </Badge>
                  </TableCell>
                  <TableCell className="font-light">1,500</TableCell>
                  <TableCell className="font-light">-</TableCell>
                  <TableCell className="font-light">15%</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-100 h-2 rounded-full mr-2">
                        <div className="h-full rounded-full bg-green-400" style={{ width: "82%" }}></div>
                      </div>
                      <span className="text-xs">8.2</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-light text-sm">Apr 12, 2024</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 3 of 24 campaigns
            </div>
            <Button variant="outline" size="sm" className="text-xs uppercase font-light">
              View All Campaigns
            </Button>
          </div>
        </Card>
      </TabsContent>
      
      <TabsContent value="settings" className="mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                  Credit System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Credit Pricing Structure</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="base-rate" className="text-xs">Base Rate (per 1000 credits)</Label>
                          <div className="flex items-center mt-1">
                            <span className="mr-1 text-gray-500">$</span>
                            <Input id="base-rate" value="49.00" className="w-24 h-9" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="volume-discount" className="text-xs">Volume Discount Threshold</Label>
                          <div className="flex items-center mt-1">
                            <Input id="volume-discount" value="5000" className="w-24 h-9" />
                            <span className="ml-1 text-gray-500">credits</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="discount-rate" className="text-xs">Discount Rate</Label>
                          <div className="flex items-center mt-1">
                            <Input id="discount-rate" value="15" className="w-24 h-9" />
                            <span className="ml-1 text-gray-500">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium mb-4">Credit Expiration</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center h-5 mt-1">
                          <input
                            id="enable-expiry"
                            type="checkbox"
                            checked
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="enable-expiry" className="text-sm font-medium">
                            Enable credit expiration
                          </Label>
                          <p className="text-sm text-gray-500">
                            Credits will expire after the specified period if not used
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center pl-8">
                        <div>
                          <Label htmlFor="expiry-period" className="text-xs">Default Expiration Period</Label>
                          <div className="flex items-center mt-1">
                            <Input id="expiry-period" type="number" value="12" className="w-16 h-9" />
                            <Select defaultValue="months">
                              <SelectTrigger className="w-[100px] ml-2 h-9 text-xs border-gray-200">
                                <SelectValue placeholder="Unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="days" className="text-xs">Days</SelectItem>
                                <SelectItem value="months" className="text-xs">Months</SelectItem>
                                <SelectItem value="years" className="text-xs">Years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium mb-4">Credit Usage Rules</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email-credits" className="text-xs">Email Campaign Cost (per recipient)</Label>
                        <div className="flex items-center mt-1">
                          <Input id="email-credits" type="number" value="5" className="w-16 h-9" />
                          <span className="ml-1 text-gray-500">credits</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="social-credits" className="text-xs">Social Media Promotion Cost</Label>
                        <div className="flex items-center mt-1">
                          <Input id="social-credits" type="number" value="100" className="w-16 h-9" />
                          <span className="ml-1 text-gray-500">credits per post</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="featured-credits" className="text-xs">Featured Product Placement Cost</Label>
                        <div className="flex items-center mt-1">
                          <Input id="featured-credits" type="number" value="500" className="w-16 h-9" />
                          <span className="ml-1 text-gray-500">credits per day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                <div className="flex space-x-2">
                  <Button variant="outline" className="text-xs uppercase font-light">
                    Reset to Defaults
                  </Button>
                  <Button className="bg-black hover:bg-gray-800 text-white text-xs uppercase font-light">
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Low Credit Alerts</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Notify users when credits fall below threshold
                      </p>
                    </div>
                    <div className="flex h-6 items-center">
                      <input
                        id="low-credit-alerts"
                        type="checkbox"
                        checked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Expiry Reminders</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Send reminders before credits expire
                      </p>
                    </div>
                    <div className="flex h-6 items-center">
                      <input
                        id="expiry-reminders"
                        type="checkbox"
                        checked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Usage Reports</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Send monthly reports to users
                      </p>
                    </div>
                    <div className="flex h-6 items-center">
                      <input
                        id="usage-reports"
                        type="checkbox"
                        checked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Admin Transaction Alerts</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Get notified on large credit purchases
                      </p>
                    </div>
                    <div className="flex h-6 items-center">
                      <input
                        id="transaction-alerts"
                        type="checkbox"
                        checked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-none rounded-lg mt-6">
              <CardHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-lg font-normal text-gray-900 uppercase">
                  System Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" strokeWidth={1.5} />
                    Export All Credit Data
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" strokeWidth={1.5} />
                    Manage Payment Gateways
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" strokeWidth={1.5} />
                    Configure Automatic Top-ups
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <BarChart className="mr-2 h-4 w-4" strokeWidth={1.5} />
                    Generate Annual Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      
      {/* Add Credits Dialog */}
      <Dialog open={showAddCreditsDialog} onOpenChange={setShowAddCreditsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-normal uppercase">Add Credits</DialogTitle>
            <DialogDescription>
              Add marketing credits to a user account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="user-id" className="text-right text-xs uppercase font-light">
                User ID
              </Label>
              <div className="col-span-3">
                <Input id="user-id" placeholder="Enter user ID or name" className="h-9 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="credit-amount" className="text-right text-xs uppercase font-light">
                Amount
              </Label>
              <div className="col-span-3">
                <Input id="credit-amount" type="number" defaultValue={1000} className="h-9 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="credit-reason" className="text-right text-xs uppercase font-light">
                Reason
              </Label>
              <div className="col-span-3">
                <Select defaultValue="purchase">
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="promo">Promotional</SelectItem>
                    <SelectItem value="comp">Complimentary</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="credit-note" className="text-right text-xs uppercase font-light">
                Note
              </Label>
              <div className="col-span-3">
                <Input id="credit-note" placeholder="Add a note (optional)" className="h-9 text-sm" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCreditsDialog(false)}>Cancel</Button>
            <Button onClick={handleAddCredits} className="bg-black text-white">
              Add Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create Package Dialog */}
      <Dialog open={showCreatePackageDialog} onOpenChange={setShowCreatePackageDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-normal uppercase">Create Package</DialogTitle>
            <DialogDescription>
              Create a new credit package for users to purchase.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="package-name" className="text-right text-xs uppercase font-light">
                Name
              </Label>
              <div className="col-span-3">
                <Input id="package-name" placeholder="Package name" className="h-9 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="package-credits" className="text-right text-xs uppercase font-light">
                Credits
              </Label>
              <div className="col-span-3">
                <Input id="package-credits" type="number" placeholder="Number of credits" className="h-9 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="package-price" className="text-right text-xs uppercase font-light">
                Price ($)
              </Label>
              <div className="col-span-3">
                <Input id="package-price" type="number" placeholder="Price in USD" className="h-9 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="package-popular" className="text-right text-xs uppercase font-light">
                Popular
              </Label>
              <div className="col-span-3 flex items-center">
                <input
                  id="package-popular"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="package-popular" className="ml-2 text-sm">
                  Mark as popular package
                </label>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="package-description" className="text-right text-xs uppercase font-light">
                Description
              </Label>
              <div className="col-span-3">
                <Input id="package-description" placeholder="Short description (optional)" className="h-9 text-sm" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreatePackageDialog(false)}>Cancel</Button>
            <Button onClick={handleCreatePackage} className="bg-black text-white">
              Create Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create Promo Dialog */}
      <Dialog open={showPromoDialog} onOpenChange={setShowPromoDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-normal uppercase">Create Promotion</DialogTitle>
            <DialogDescription>
              Create a new promotional code for credit purchases.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="promo-code" className="text-right text-xs uppercase font-light">
                Code
              </Label>
              <div className="col-span-3">
                <Input id="promo-code" placeholder="e.g. SUMMER25" className="h-9 text-sm uppercase" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="discount-type" className="text-right text-xs uppercase font-light">
                Type
              </Label>
              <div className="col-span-3">
                <Select defaultValue="percentage">
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    <SelectItem value="free">Free Credits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="discount-value" className="text-right text-xs uppercase font-light">
                Value
              </Label>
              <div className="col-span-3">
                <Input id="discount-value" type="number" placeholder="Discount amount" className="h-9 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="expiry-date" className="text-right text-xs uppercase font-light">
                Expires
              </Label>
              <div className="col-span-3">
                <Input id="expiry-date" type="date" className="h-9 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="usage-limit" className="text-right text-xs uppercase font-light">
                Limit
              </Label>
              <div className="col-span-3">
                <Input id="usage-limit" type="number" placeholder="Max number of uses" className="h-9 text-sm" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPromoDialog(false)}>Cancel</Button>
            <Button onClick={handleCreatePromo} className="bg-black text-white">
              Create Promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketingCredits;
