
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, FileText, Download, CreditCard, Package, Bell, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const BrandSubscriptions = () => {
  // Sample transactions
  const transactions = [
    { id: "INV-001", date: "2023-04-01", amount: "$49.99", status: "paid" },
    { id: "INV-002", date: "2023-03-01", amount: "$49.99", status: "paid" },
    { id: "INV-003", date: "2023-02-01", amount: "$49.99", status: "paid" },
    { id: "INV-004", date: "2023-01-01", amount: "$39.99", status: "paid" }
  ];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = transactions.filter(transaction => {
    if (statusFilter !== "all" && transaction.status !== statusFilter) return false;
    return transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">SUBSCRIPTIONS</h1>
      
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 bg-transparent mb-6">
          <TabsTrigger 
            value="current" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Current Plan
          </TabsTrigger>
          <TabsTrigger 
            value="billing" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Billing History
          </TabsTrigger>
          <TabsTrigger 
            value="options" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Plan Options
          </TabsTrigger>
          <TabsTrigger 
            value="services" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Additional Services
          </TabsTrigger>
        </TabsList>

        {/* Current Plan Tab */}
        <TabsContent value="current">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-3 border border-gray-200 rounded-none">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-light">Current Subscription</CardTitle>
                  <Button variant="outline" size="sm" className="rounded-none text-xs border-black text-black hover:bg-gray-50">
                    Manage Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-none bg-gray-50 border-gray-200">
                    <div>
                      <Badge className="mb-2 bg-black hover:bg-gray-800 text-white font-normal">Professional</Badge>
                      <h3 className="text-xl font-light">$49.99<span className="text-sm font-normal text-gray-500">/month</span></h3>
                      <p className="text-sm text-gray-600 mt-1">Billed monthly</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                        Change Plan
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Plan Features</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                          <span>Up to 50 products</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                          <span>Advanced analytics</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                          <span>Custom domain</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                          <span>Team accounts (up to 5)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-black mr-2 mt-0.5" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Payment Information</h3>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-none">
                        <div className="flex items-center">
                          <div className="h-8 w-12 bg-gray-100 flex items-center justify-center mr-3 text-xs font-medium">
                            VISA
                          </div>
                          <div>
                            <p className="text-sm">Visa ending in 4242</p>
                            <p className="text-xs text-gray-500">Expires 12/2024</p>
                          </div>
                        </div>
                        <Button variant="link" className="text-sm text-black hover:text-gray-600">Edit</Button>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Upcoming payment</h4>
                        <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200">
                          <div>
                            <p className="text-sm font-medium">$49.99</p>
                            <p className="text-xs text-gray-500">Due on May 1, 2025</p>
                          </div>
                          <Badge className="bg-black hover:bg-gray-800 font-normal">Scheduled</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Right sidebar card */}
            <Card className="border border-gray-200 rounded-none h-fit">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-base font-light">Subscription Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-6">
                  <div className="p-3 border border-gray-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                      <CreditCard size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment Method</p>
                      <p className="text-xs text-gray-500">Visa (••••4242)</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                      <Package size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Plan</p>
                      <p className="text-xs text-gray-500">Professional ($49.99/mo)</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                      <Bell size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Renewal</p>
                      <p className="text-xs text-gray-500">Auto-renews on May 1, 2025</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                      <BarChart size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Usage</p>
                      <p className="text-xs text-gray-500">32/50 products used</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Billing History Tab */}
        <TabsContent value="billing">
          <Card className="border border-gray-200 rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="text-base font-light">Billing History</CardTitle>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Input
                      type="search"
                      placeholder="Search invoices..."
                      className="rounded-none border-gray-200 pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute left-3 top-2.5 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                  </div>
                  <select
                    className="rounded-none border border-gray-200 p-2 h-10 text-sm w-full md:w-auto"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              transaction.status === "paid" ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                            } font-normal`}
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="text-xs px-2 py-1 bg-white border-gray-200 hover:bg-gray-50">
                              <FileText size={12} className="mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs px-2 py-1 bg-white border-gray-200 hover:bg-gray-50">
                              <Download size={12} className="mr-1" />
                              PDF
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plan Options Tab */}
        <TabsContent value="options">
          <Card className="border border-gray-200 rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light">Available Plans</CardTitle>
              <CardDescription className="text-gray-500">Select a plan that best fits your needs</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">Basic</h3>
                    <Badge className="bg-gray-500 hover:bg-gray-600 font-normal">$19.99/mo</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">For small brands just getting started</p>
                  <div className="my-4 border-t border-gray-100 pt-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Up to 15 products</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Basic analytics</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Email support</span>
                      </li>
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full rounded-none mt-4 border-black text-black hover:bg-gray-50">
                    Switch to Basic
                  </Button>
                </div>
                
                <div className="border border-black bg-gray-50 p-5 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-black text-white hover:bg-gray-800 font-normal">Current Plan</Badge>
                  </div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">Professional</h3>
                    <Badge className="bg-black hover:bg-gray-800 font-normal">$49.99/mo</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">For growing brands with multiple products</p>
                  <div className="my-4 border-t border-gray-100 pt-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Up to 50 products</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Advanced analytics</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Custom domain</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Team accounts (up to 5)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Priority support</span>
                      </li>
                    </ul>
                  </div>
                  <Button disabled className="w-full rounded-none mt-4 bg-black text-white hover:bg-gray-800 opacity-50">
                    Current Plan
                  </Button>
                </div>
                
                <div className="border border-gray-200 p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">Enterprise</h3>
                    <Badge className="bg-gray-800 hover:bg-gray-700 font-normal">$99.99/mo</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">For established brands with high volume</p>
                  <div className="my-4 border-t border-gray-100 pt-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Unlimited products</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Premium analytics</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Multiple custom domains</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Team accounts (unlimited)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                        <span className="text-sm">Dedicated account manager</span>
                      </li>
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full rounded-none mt-4 border-black text-black hover:bg-gray-50">
                    Upgrade to Enterprise
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Additional Services Tab */}
        <TabsContent value="services">
          <Card className="border border-gray-200 rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light">Premium Services</CardTitle>
              <CardDescription className="text-gray-500">Add-on services to enhance your brand presence</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 p-5">
                  <h3 className="font-medium">Custom Design</h3>
                  <p className="text-sm text-gray-500 mt-1">Professional design services for your brand presence</p>
                  <div className="my-4">
                    <p className="font-medium">From $499</p>
                    <p className="text-xs text-gray-500 mt-1">One-time fee</p>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                      <span className="text-sm">Custom storefront design</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                      <span className="text-sm">Brand identity refresh</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                      <span className="text-sm">Custom product photography</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full rounded-none mt-4 border-black text-black hover:bg-gray-50">
                    Get a Quote
                  </Button>
                </div>
                
                <div className="border border-gray-200 p-5">
                  <h3 className="font-medium">Marketing Campaign</h3>
                  <p className="text-sm text-gray-500 mt-1">Strategic marketing to expand your brand reach</p>
                  <div className="my-4">
                    <p className="font-medium">From $299/month</p>
                    <p className="text-xs text-gray-500 mt-1">Monthly subscription</p>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                      <span className="text-sm">Social media management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                      <span className="text-sm">Email marketing campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                      <span className="text-sm">Performance reporting</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full rounded-none mt-4 border-black text-black hover:bg-gray-50">
                    Learn More
                  </Button>
                </div>
                
                <div className="border border-gray-200 p-5">
                  <h3 className="font-medium">SEO Optimization</h3>
                  <p className="text-sm text-gray-500 mt-1">Improve your online visibility and search ranking</p>
                  <div className="my-4">
                    <p className="font-medium">From $199/month</p>
                    <p className="text-xs text-gray-500 mt-1">Monthly subscription</p>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                      <span className="text-sm">Keyword optimization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                      <span className="text-sm">Content strategy</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-black mr-2 mt-0.5" />
                      <span className="text-sm">Performance analytics</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full rounded-none mt-4 border-black text-black hover:bg-gray-50">
                    Get Started
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandSubscriptions;
