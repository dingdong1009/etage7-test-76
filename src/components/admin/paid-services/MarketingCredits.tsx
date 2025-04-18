
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { MarketingCredit } from "@/types/services/paidServices";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

const MarketingCredits = () => {
  const [credits] = useState<MarketingCredit[]>(mockMarketingCredits);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Calculate totals
  const totalCredits = credits.reduce((sum, credit) => sum + credit.totalCredits, 0);
  const totalUsed = credits.reduce((sum, credit) => sum + credit.usedCredits, 0);
  const remainingCredits = totalCredits - totalUsed;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-light">Marketing Credits Management</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by user or ID..."
              className="pl-10 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="gap-2">
            <Plus size={16} />
            Add Credits
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 shadow-none rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-mint/20 rounded-full flex items-center justify-center mr-4">
                <div className="w-6 h-6 text-gray-800">💰</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Credits</div>
                <div className="text-2xl font-light">{totalCredits}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 shadow-none rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-mint/20 rounded-full flex items-center justify-center mr-4">
                <div className="w-6 h-6 text-gray-800">📊</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Used Credits</div>
                <div className="text-2xl font-light">{totalUsed}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 shadow-none rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-mint/20 rounded-full flex items-center justify-center mr-4">
                <div className="w-6 h-6 text-gray-800">⭐</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Remaining Credits</div>
                <div className="text-2xl font-light">{remainingCredits}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-medium text-gray-900">
                Credit Allocations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-gray-50">
                    <TableHead className="font-medium">ID</TableHead>
                    <TableHead className="font-medium">User Type</TableHead>
                    <TableHead className="font-medium">Total</TableHead>
                    <TableHead className="font-medium">Used</TableHead>
                    <TableHead className="font-medium">Remaining</TableHead>
                    <TableHead className="font-medium">Expiry</TableHead>
                    <TableHead className="text-right font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {credits.map((credit) => (
                    <TableRow key={credit.id} className="border-t border-gray-100">
                      <TableCell className="font-medium">{credit.id}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {credit.userType}
                        </Badge>
                      </TableCell>
                      <TableCell>{credit.totalCredits}</TableCell>
                      <TableCell>{credit.usedCredits}</TableCell>
                      <TableCell>{credit.totalCredits - credit.usedCredits}</TableCell>
                      <TableCell>
                        {credit.expiryDate
                          ? new Date(credit.expiryDate).toLocaleDateString()
                          : "Never"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="text-xs">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-medium text-gray-900">
                Credit Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="used" name="Credits Used" stroke="#8884d8" />
                    <Line type="monotone" dataKey="added" name="Credits Added" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="border border-gray-200 shadow-none rounded-lg">
        <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
          <CardTitle className="text-lg font-medium text-gray-900">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="credits">Credits</TabsTrigger>
              <TabsTrigger value="debits">Debits</TabsTrigger>
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
                      <div className={transaction.type === 'credit' ? 'text-green-600' : 'text-gray-800'}>
                        {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
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
                        <div className="text-green-600">
                          +{transaction.amount}
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
                        <div className="text-gray-800">
                          -{transaction.amount}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingCredits;
