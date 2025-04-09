import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { ChevronLeft, Plus, Eye, Edit, Users } from "lucide-react";

interface Brand {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  plan: string;
  lastActivity: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  marketSegment: string;
  productsCount: number;
  activeSince: string;
  avgOrderValue: string;
  totalSales: string;
}

interface Buyer {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  plan: string;
  lastActivity: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  marketSegment: string;
  storeCount: number;
  activeSince: string;
  avgOrderValue: string;
  annualPurchases: string;
}

interface SalesManager {
  id: number;
  name: string;
  status: "active" | "pending" | "inactive";
  email: string;
  phone: string;
  startDate: string;
  yearsInCompany: number;
  salaryPerMonth: string;
  totalCommissions: string;
  ytdCommissions: string;
  commissionRate: string;
  commissionHistory: CommissionChange[];
}

interface CommissionChange {
  rate: string;
  effectiveDate: string;
  notes?: string;
}

type UserType = "brand" | "buyer" | "salesManager";
type ViewMode = "list" | "view" | "edit" | "add";

const SalesUsers = () => {
  const [activeTab, setActiveTab] = useState<UserType>("brand");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedUser, setSelectedUser] = useState<Brand | Buyer | SalesManager | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const brands: Brand[] = [
    { 
      id: 1, 
      name: "Luxury Brands Inc.", 
      status: "active", 
      plan: "Premium", 
      lastActivity: "2 hours ago",
      contactPerson: "John Smith",
      email: "john@luxurybrandsinc.com",
      phone: "+1 (555) 123-4567",
      website: "luxurybrandsinc.com",
      description: "Leading luxury fashion and accessories brand focused on high-end retail market",
      marketSegment: "Luxury Apparel",
      productsCount: 245,
      activeSince: "June 2018",
      avgOrderValue: "$2,500",
      totalSales: "$1.2M"
    },
    { 
      id: 2, 
      name: "Fashion Forward Co.", 
      status: "active", 
      plan: "Professional", 
      lastActivity: "1 day ago",
      contactPerson: "Emily Johnson",
      email: "emily@fashionforward.co",
      phone: "+1 (555) 234-5678",
      website: "fashionforward.co",
      description: "Contemporary fashion brand targeting young professionals",
      marketSegment: "Contemporary Fashion",
      productsCount: 178,
      activeSince: "March 2019",
      avgOrderValue: "$750",
      totalSales: "$890K"
    },
    { 
      id: 3, 
      name: "Elegant Styles Ltd.", 
      status: "pending", 
      plan: "Basic", 
      lastActivity: "3 days ago",
      contactPerson: "Michael Williams",
      email: "michael@elegantstyles.com",
      phone: "+1 (555) 345-6789",
      website: "elegantstyles.com",
      description: "Classic formal wear and evening attire for special occasions",
      marketSegment: "Formal Wear",
      productsCount: 85,
      activeSince: "November 2020",
      avgOrderValue: "$1,200",
      totalSales: "$430K"
    },
    { 
      id: 4, 
      name: "Heritage Designs", 
      status: "active", 
      plan: "Premium", 
      lastActivity: "5 hours ago",
      contactPerson: "Sarah Brown",
      email: "sarah@heritagedesigns.com",
      phone: "+1 (555) 456-7890",
      website: "heritagedesigns.com",
      description: "Traditional and heritage-inspired clothing with modern touches",
      marketSegment: "Heritage Fashion",
      productsCount: 132,
      activeSince: "April 2017",
      avgOrderValue: "$950",
      totalSales: "$1.5M"
    },
    { 
      id: 5, 
      name: "Modern Collections", 
      status: "inactive", 
      plan: "Basic", 
      lastActivity: "2 weeks ago",
      contactPerson: "David Lee",
      email: "david@moderncollections.com",
      phone: "+1 (555) 567-8901",
      website: "moderncollections.com",
      description: "Minimalist modern fashion focusing on sustainable materials",
      marketSegment: "Sustainable Fashion",
      productsCount: 67,
      activeSince: "September 2021",
      avgOrderValue: "$500",
      totalSales: "$210K"
    }
  ];

  const buyers: Buyer[] = [
    { 
      id: 1, 
      name: "Department Store Group", 
      status: "active", 
      plan: "Enterprise", 
      lastActivity: "1 hour ago",
      contactPerson: "Robert Chen",
      email: "robert@departmentstoregroup.com",
      phone: "+1 (555) 678-9012",
      website: "departmentstoregroup.com",
      description: "National chain of premium department stores operating in major cities",
      marketSegment: "Department Stores",
      storeCount: 35,
      activeSince: "January 2015",
      avgOrderValue: "$45,000",
      annualPurchases: "$12M"
    },
    { 
      id: 2, 
      name: "Boutique Network LLC", 
      status: "active", 
      plan: "Professional", 
      lastActivity: "3 days ago",
      contactPerson: "Amanda Taylor",
      email: "amanda@boutiquenetwork.com",
      phone: "+1 (555) 789-0123",
      website: "boutiquenetwork.com",
      description: "Collective of upscale boutiques specializing in designer fashion",
      marketSegment: "Boutiques",
      storeCount: 12,
      activeSince: "May 2018",
      avgOrderValue: "$15,000",
      annualPurchases: "$2.5M"
    },
    { 
      id: 3, 
      name: "Global Retail Partners", 
      status: "pending", 
      plan: "Premium", 
      lastActivity: "1 week ago",
      contactPerson: "James Wilson",
      email: "james@globalretail.com",
      phone: "+1 (555) 890-1234",
      website: "globalretailpartners.com",
      description: "International retail group with presence in luxury malls worldwide",
      marketSegment: "International Retail",
      storeCount: 28,
      activeSince: "August 2017",
      avgOrderValue: "$32,000",
      annualPurchases: "$8.7M"
    },
    { 
      id: 4, 
      name: "Fashion Outlets Inc.", 
      status: "active", 
      plan: "Enterprise", 
      lastActivity: "12 hours ago",
      contactPerson: "Elizabeth Moore",
      email: "elizabeth@fashionoutlets.com",
      phone: "+1 (555) 901-2345",
      website: "fashionoutlets.com",
      description: "Operator of premium outlet malls featuring designer brands",
      marketSegment: "Outlet Retail",
      storeCount: 18,
      activeSince: "March 2016",
      avgOrderValue: "$28,000",
      annualPurchases: "$6.2M"
    },
    { 
      id: 5, 
      name: "Luxury Retail Alliance", 
      status: "inactive", 
      plan: "Basic", 
      lastActivity: "1 month ago",
      contactPerson: "Thomas Garcia",
      email: "thomas@luxuryretail.org",
      phone: "+1 (555) 012-3456",
      website: "luxuryretailalliance.org",
      description: "Consortium of high-end retailers focused on luxury goods market",
      marketSegment: "Luxury Retail",
      storeCount: 7,
      activeSince: "October 2019",
      avgOrderValue: "$18,000",
      annualPurchases: "$1.4M"
    }
  ];

  const salesManagers: SalesManager[] = [
    {
      id: 1,
      name: "James Wilson",
      status: "active",
      email: "james.wilson@company.com",
      phone: "+1 (555) 123-4567",
      startDate: "January 15, 2019",
      yearsInCompany: 4,
      salaryPerMonth: "$6,500",
      totalCommissions: "$124,500",
      ytdCommissions: "$32,800",
      commissionRate: "5.2%",
      commissionHistory: [
        { rate: "5.2%", effectiveDate: "January 1, 2023", notes: "Annual review increase" },
        { rate: "4.8%", effectiveDate: "January 1, 2022", notes: "Performance adjustment" },
        { rate: "4.5%", effectiveDate: "January 15, 2019", notes: "Initial rate" }
      ]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      status: "active",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 234-5678",
      startDate: "March 22, 2020",
      yearsInCompany: 3,
      salaryPerMonth: "$5,800",
      totalCommissions: "$98,700",
      ytdCommissions: "$28,400",
      commissionRate: "4.8%",
      commissionHistory: [
        { rate: "4.8%", effectiveDate: "April 1, 2023", notes: "Performance adjustment" },
        { rate: "4.5%", effectiveDate: "March 22, 2020", notes: "Initial rate" }
      ]
    },
    {
      id: 3,
      name: "Michael Brown",
      status: "inactive",
      email: "michael.brown@company.com",
      phone: "+1 (555) 345-6789",
      startDate: "June 10, 2018",
      yearsInCompany: 5,
      salaryPerMonth: "$7,200",
      totalCommissions: "$156,800",
      ytdCommissions: "$16,500",
      commissionRate: "5.5%",
      commissionHistory: [
        { rate: "5.5%", effectiveDate: "July 1, 2022", notes: "Performance bonus increase" },
        { rate: "5.0%", effectiveDate: "July 1, 2020", notes: "Merit increase" },
        { rate: "4.8%", effectiveDate: "June 10, 2018", notes: "Initial rate" }
      ]
    },
    {
      id: 4,
      name: "Emily Davis",
      status: "pending",
      email: "emily.davis@company.com",
      phone: "+1 (555) 456-7890",
      startDate: "November 5, 2021",
      yearsInCompany: 2,
      salaryPerMonth: "$5,500",
      totalCommissions: "$62,400",
      ytdCommissions: "$21,700",
      commissionRate: "4.5%",
      commissionHistory: [
        { rate: "4.5%", effectiveDate: "November 5, 2021", notes: "Initial rate" }
      ]
    },
    {
      id: 5,
      name: "Robert Lee",
      status: "active",
      email: "robert.lee@company.com",
      phone: "+1 (555) 567-8901",
      startDate: "August 17, 2017",
      yearsInCompany: 6,
      salaryPerMonth: "$8,000",
      totalCommissions: "$215,600",
      ytdCommissions: "$38,900",
      commissionRate: "6.0%",
      commissionHistory: [
        { rate: "6.0%", effectiveDate: "September 1, 2023", notes: "Senior role adjustment" },
        { rate: "5.5%", effectiveDate: "September 1, 2021", notes: "Team lead promotion" },
        { rate: "5.0%", effectiveDate: "September 1, 2019", notes: "Merit increase" },
        { rate: "4.8%", effectiveDate: "August 17, 2017", notes: "Initial rate" }
      ]
    }
  ];

  const addUserForm = useForm({
    defaultValues: {
      contactPerson: "",
      email: "",
      phone: "",
      companyName: "",
      description: "",
      marketSegment: "",
      website: "",
      userType: activeTab,
      productsCount: 0,
      activeSince: "",
      avgOrderValue: "",
      totalSales: "",
      storeCount: 0,
      annualPurchases: ""
    }
  });

  const editUserForm = useForm({
    defaultValues: {
      id: 0,
      name: "",
      status: "active" as "active" | "pending" | "inactive",
      plan: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      description: "",
      marketSegment: "",
      productsCount: 0,
      activeSince: "",
      avgOrderValue: "",
      totalSales: "",
      storeCount: 0,
      annualPurchases: ""
    }
  });

  const handleAddUserSubmit = (data) => {
    console.log("Form submitted:", data);
    setViewMode("list");
    addUserForm.reset();
  };

  const handleEditUserSubmit = (data) => {
    console.log("Edit form submitted:", data);
    setViewMode("list");
  };

  const handleGoBack = () => {
    setViewMode("list");
    setSelectedUser(null);
  };

  const addSalesManagerForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      startDate: "",
      salaryPerMonth: "",
      commissionRate: "",
      status: "active" as "active" | "pending" | "inactive",
    }
  });

  const editSalesManagerForm = useForm({
    defaultValues: {
      id: 0,
      name: "",
      status: "active" as "active" | "pending" | "inactive",
      email: "",
      phone: "",
      startDate: "",
      commissionRate: "",
      effectiveDate: "",
      notes: "",
    }
  });

  const handleAddSalesManagerSubmit = (data) => {
    console.log("Sales manager form submitted:", data);
    setViewMode("list");
    addSalesManagerForm.reset();
  };

  const handleEditSalesManagerSubmit = (data) => {
    console.log("Edit sales manager form submitted:", data);
    setViewMode("list");
  };

  const isBrand = (user: any): user is Brand => {
    return 'productsCount' in user && 'totalSales' in user;
  };

  const isBuyer = (user: any): user is Buyer => {
    return 'storeCount' in user && 'annualPurchases' in user;
  };

  const renderListView = (userType: UserType) => {
    const userList = userType === "brand" ? brands : buyers;
    
    const filteredUsers = statusFilter === "all" 
      ? userList 
      : userList.filter(user => user.status.toLowerCase() === statusFilter.toLowerCase());
    
    return (
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
            Managed {userType === "brand" ? "Brands" : "Buyers"}
          </CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-black text-white border-none" onClick={handleAddUser}>
              <Plus className="mr-1 h-4 w-4" /> Add User
            </Button>
            <Button className="bg-grey-200 text-black border hover:text-white">Export</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          user.status === "active" ? "bg-green-100 text-green-800" :
                          user.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.plan}</TableCell>
                    <TableCell>{user.lastActivity}</TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <Button 
                        className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                        onClick={() => handleViewUser(userType, user.id)}
                      >
                        View
                      </Button>
                      <Button 
                        className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                        onClick={() => handleEditUser(userType, user.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const isSalesManager = (user: any): user is SalesManager => {
    return 'commissionRate' in user && 'salaryPerMonth' in user;
  };

  const handleAddUser = () => {
    setViewMode("add");
  };

  const handleViewUser = (userType: UserType, userId: number) => {
    let user;
    if (userType === "brand") {
      user = brands.find(b => b.id === userId);
    } else if (userType === "buyer") {
      user = buyers.find(b => b.id === userId);
    } else if (userType === "salesManager") {
      user = salesManagers.find(s => s.id === userId);
    }
    
    setSelectedUser(user || null);
    setViewMode("view");
  };

  const handleEditUser = (userType: UserType, userId: number) => {
    let user;
    if (userType === "brand") {
      user = brands.find(b => b.id === userId);
    } else if (userType === "buyer") {
      user = buyers.find(b => b.id === userId);
    } else if (userType === "salesManager") {
      user = salesManagers.find(s => s.id === userId);
    }
    
    setSelectedUser(user || null);
    setViewMode("edit");
  };

  const renderSalesManagerListView = () => {
    const filteredUsers = statusFilter === "all" 
      ? salesManagers 
      : salesManagers.filter(user => user.status.toLowerCase() === statusFilter.toLowerCase());
    
    return (
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
            Sales Managers
          </CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Button className="bg-black text-white border-none" onClick={handleAddUser}>
              <Plus className="mr-1 h-4 w-4" /> Add User
            </Button>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-grey-200 text-black border hover:text-white">Export</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Years</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Salary/Month</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>YTD Commission</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.startDate}</TableCell>
                    <TableCell>{user.yearsInCompany}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          user.status === "active" ? "bg-green-100 text-green-800" :
                          user.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.salaryPerMonth}</TableCell>
                    <TableCell>{user.commissionRate}</TableCell>
                    <TableCell>{user.ytdCommissions}</TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <Button 
                        className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                        onClick={() => handleViewUser("salesManager", user.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button 
                        className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                        onClick={() => handleEditUser("salesManager", user.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderAddSalesManager = () => {
    return (
      <Card className="border border-gray-200">
        <CardHeader className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGoBack}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
              Add New Sales Manager
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...addSalesManagerForm}>
            <form onSubmit={addSalesManagerForm.handleSubmit(handleAddSalesManagerSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={addSalesManagerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addSalesManagerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addSalesManagerForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addSalesManagerForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., January 15, 2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addSalesManagerForm.control}
                  name="salaryPerMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Salary</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $5,500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addSalesManagerForm.control}
                  name="commissionRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission Rate</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 4.5%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addSalesManagerForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleGoBack}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white">
                  Add Sales Manager
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  };

  const renderViewSalesManager = () => {
    if (!selectedUser || !isSalesManager(selectedUser)) return null;
    
    return (
      <Card className="border border-gray-200">
        <CardHeader className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGoBack}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
              {selectedUser.name}
            </CardTitle>
          </div>
          <Button 
            className="text-xs text-black px-3 py-1.5 bg-gray-100 rounded hover:text-white"
            onClick={() => handleEditUser("salesManager", selectedUser.id)}
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge 
                    className={`${
                      selectedUser.status === "active" ? "bg-green-100 text-green-800" :
                      selectedUser.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-
