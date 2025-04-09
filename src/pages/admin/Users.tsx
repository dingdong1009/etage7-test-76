
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
import { ChevronLeft, Plus } from "lucide-react";

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
  level: string;
  lastActivity: string;
  email: string;
  phone: string;
  region: string;
  description: string;
  managedAccounts: number;
  activeSince: string;
  monthlyTarget: string;
  totalSales: string;
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
      name: "John Davis", 
      status: "active", 
      level: "Senior", 
      lastActivity: "1 hour ago",
      email: "john.davis@etage7.com",
      phone: "+1 (555) 123-4567",
      region: "North America",
      description: "Seasoned sales manager with over 10 years experience in luxury fashion",
      managedAccounts: 15,
      activeSince: "January 2018",
      monthlyTarget: "$150,000",
      totalSales: "$1.8M"
    },
    { 
      id: 2, 
      name: "Emma Rodriguez", 
      status: "active", 
      level: "Mid-level", 
      lastActivity: "2 days ago",
      email: "emma.r@etage7.com",
      phone: "+1 (555) 234-5678",
      region: "Europe",
      description: "Specializes in building relationships with high-end boutiques",
      managedAccounts: 12,
      activeSince: "March 2020",
      monthlyTarget: "$120,000",
      totalSales: "$950K"
    },
    { 
      id: 3, 
      name: "Marcus Chan", 
      status: "pending", 
      level: "Junior", 
      lastActivity: "5 days ago",
      email: "marcus.c@etage7.com",
      phone: "+1 (555) 345-6789",
      region: "Asia Pacific",
      description: "Rising talent with strong connections in emerging markets",
      managedAccounts: 8,
      activeSince: "September 2022",
      monthlyTarget: "$80,000",
      totalSales: "$420K"
    },
    { 
      id: 4, 
      name: "Sarah Kim", 
      status: "active", 
      level: "Senior", 
      lastActivity: "3 hours ago",
      email: "sarah.k@etage7.com",
      phone: "+1 (555) 456-7890",
      region: "Global",
      description: "Global accounts specialist focusing on luxury department stores",
      managedAccounts: 10,
      activeSince: "May 2017",
      monthlyTarget: "$180,000",
      totalSales: "$2.1M"
    },
    { 
      id: 5, 
      name: "Raj Patel", 
      status: "inactive", 
      level: "Mid-level", 
      lastActivity: "3 weeks ago",
      email: "raj.p@etage7.com",
      phone: "+1 (555) 567-8901",
      region: "Middle East",
      description: "Experienced in developing luxury fashion markets in emerging economies",
      managedAccounts: 6,
      activeSince: "July 2019",
      monthlyTarget: "$100,000",
      totalSales: "$780K"
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

  const handleViewUser = (userType: UserType, userId: number) => {
    let userList;
    
    if (userType === "brand") {
      userList = brands;
    } else if (userType === "buyer") {
      userList = buyers;
    } else {
      userList = salesManagers;
    }
    
    const user = userList.find(u => u.id === userId);
    
    if (user) {
      setSelectedUser(user);
      setViewMode("view");
    }
  };

  const handleEditUser = (userType: UserType, userId: number) => {
    let userList;
    
    if (userType === "brand") {
      userList = brands;
    } else if (userType === "buyer") {
      userList = buyers;
    } else {
      userList = salesManagers;
    }
    
    const user = userList.find(u => u.id === userId);
    
    if (user) {
      setSelectedUser(user);
      editUserForm.reset({
        ...user,
        status: user.status
      });
      setViewMode("edit");
    }
  };

  const handleAddUser = () => {
    addUserForm.setValue("userType", activeTab);
    setViewMode("add");
  };

  const isBrand = (user: any): user is Brand => {
    return 'productsCount' in user && 'totalSales' in user && !('managedAccounts' in user);
  };

  const isBuyer = (user: any): user is Buyer => {
    return 'storeCount' in user && 'annualPurchases' in user;
  };
  
  const isSalesManager = (user: any): user is SalesManager => {
    return 'managedAccounts' in user && 'monthlyTarget' in user;
  };

  const renderListView = (userType: UserType) => {
    let userList;
    let titleText;
    
    if (userType === "brand") {
      userList = brands;
      titleText = "Brands";
    } else if (userType === "buyer") {
      userList = buyers;
      titleText = "Buyers";
    } else {
      userList = salesManagers;
      titleText = "Sales Managers";
    }
    
    const filteredUsers = statusFilter === "all" 
      ? userList 
      : userList.filter(user => user.status.toLowerCase() === statusFilter.toLowerCase());
    
    return (
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
            Managed {titleText}
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
                  <TableHead>{userType === "salesManager" ? "Level" : "Plan"}</TableHead>
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
                    <TableCell>
                      {userType === "salesManager" 
                        ? (user as SalesManager).level 
                        : (user as Brand | Buyer).plan
                      }
                    </TableCell>
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

  const renderViewUser = () => {
    if (!selectedUser) return null;
    
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
            onClick={() => handleEditUser(activeTab, selectedUser.id)}
          >
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {isSalesManager(selectedUser) ? "Manager Information" : "Company Information"}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {isSalesManager(selectedUser) ? "Manager Name" : "Company Name"}
                  </p>
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
                
                {isSalesManager(selectedUser) ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Level</p>
                      <p>{selectedUser.level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Region</p>
                      <p>{selectedUser.region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Active Since</p>
                      <p>{selectedUser.activeSince}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Plan</p>
                      <p>{(selectedUser as Brand | Buyer).plan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Market Segment</p>
                      <p>{(selectedUser as Brand | Buyer).marketSegment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <p>{(selectedUser as Brand | Buyer).website}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Active Since</p>
                      <p>{(selectedUser as Brand | Buyer).activeSince}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {!isSalesManager(selectedUser) && (
                  <div>
                    <p className="text-sm text-gray-500">Contact Person</p>
                    <p>{(selectedUser as Brand | Buyer).contactPerson}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Activity</p>
                  <p>{selectedUser.lastActivity}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-700 mb-8">{selectedUser.description}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {isBrand(selectedUser) && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Products Count</p>
                    <p className="text-2xl font-semibold">{selectedUser.productsCount}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Average Order Value</p>
                    <p className="text-2xl font-semibold">{selectedUser.avgOrderValue}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="text-2xl font-semibold">{selectedUser.totalSales}</p>
                  </div>
                </>
              )}
              
              {isBuyer(selectedUser) && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Store Count</p>
                    <p className="text-2xl font-semibold">{selectedUser.storeCount}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Average Order Value</p>
                    <p className="text-2xl font-semibold">{selectedUser.avgOrderValue}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Annual Purchases</p>
                    <p className="text-2xl font-semibold">{selectedUser.annualPurchases}</p>
                  </div>
                </>
              )}
              
              {isSalesManager(selectedUser) && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Managed Accounts</p>
                    <p className="text-2xl font-semibold">{selectedUser.managedAccounts}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Monthly Target</p>
                    <p className="text-2xl font-semibold">{selectedUser.monthlyTarget}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="text-2xl font-semibold">{selectedUser.totalSales}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderEditUser = () => {
    if (!selectedUser) return null;
    
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
              Edit {selectedUser.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...editUserForm}>
            <form onSubmit={editUserForm.handleSubmit(handleEditUserSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {isSalesManager(selectedUser) ? "Manager Information" : "Company Information"}
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={editUserForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {isSalesManager(selectedUser) ? "Manager Name" : "Company Name"}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
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
                    
                    {isSalesManager(selectedUser) ? (
                      <>
                        <FormField
                          control={editUserForm.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Level</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Junior">Junior</SelectItem>
                                  <SelectItem value="Mid-level">Mid-level</SelectItem>
                                  <SelectItem value="Senior">Senior</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={editUserForm.control}
                          name="region"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Region</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select region" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="North America">North America</SelectItem>
                                  <SelectItem value="Europe">Europe</SelectItem>
                                  <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                                  <SelectItem value="Middle East">Middle East</SelectItem>
                                  <SelectItem value="Global">Global</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    ) : (
                      <>
                        <FormField
                          control={editUserForm.control}
                          name="plan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Plan</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select plan" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Basic">Basic</SelectItem>
                                  <SelectItem value="Professional">Professional</SelectItem>
                                  <SelectItem value="Premium">Premium</SelectItem>
                                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={editUserForm.control}
                          name="marketSegment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Market Segment</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={editUserForm.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {!isSalesManager(selectedUser) && (
                      <FormField
                        control={editUserForm.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={editUserForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <FormField
                  control={editUserForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {isBrand(selectedUser) && (
                    <>
                      <FormField
                        control={editUserForm.control}
                        name="productsCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Products Count</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="avgOrderValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Order Value</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="totalSales"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Sales</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {isBuyer(selectedUser) && (
                    <>
                      <FormField
                        control={editUserForm.control}
                        name="storeCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store Count</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="avgOrderValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Order Value</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="annualPurchases"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Annual Purchases</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {isSalesManager(selectedUser) && (
                    <>
                      <FormField
                        control={editUserForm.control}
                        name="managedAccounts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Managed Accounts</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="monthlyTarget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Target</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={editUserForm.control}
                        name="totalSales"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Sales</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={handleGoBack}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  };

  const renderAddUser = () => {
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
              Add New {activeTab === "brand" ? "Brand" : activeTab === "buyer" ? "Buyer" : "Sales Manager"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...addUserForm}>
            <form onSubmit={addUserForm.handleSubmit(handleAddUserSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {activeTab === "salesManager" ? "Manager Information" : "Company Information"}
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={addUserForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {activeTab === "salesManager" ? "Manager Name" : "Company Name"}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {activeTab === "salesManager" ? (
                      <FormField
                        control={addUserForm.control}
                        name="region"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select region" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="North America">North America</SelectItem>
                                <SelectItem value="Europe">Europe</SelectItem>
                                <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                                <SelectItem value="Middle East">Middle East</SelectItem>
                                <SelectItem value="Global">Global</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <>
                        <FormField
                          control={addUserForm.control}
                          name="marketSegment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Market Segment</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={addUserForm.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {activeTab !== "salesManager" && (
                      <FormField
                        control={addUserForm.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={addUserForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={addUserForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <FormField
                  control={addUserForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {activeTab === "brand" && (
                    <>
                      <FormField
                        control={addUserForm.control}
                        name="productsCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Products Count</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addUserForm.control}
                        name="avgOrderValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Order Value</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addUserForm.control}
                        name="totalSales"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Sales</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {activeTab === "buyer" && (
                    <>
                      <FormField
                        control={addUserForm.control}
                        name="storeCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store Count</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addUserForm.control}
                        name="avgOrderValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Order Value</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addUserForm.control}
                        name="annualPurchases"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Annual Purchases</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {activeTab === "salesManager" && (
                    <>
                      <FormField
                        control={addUserForm.control}
                        name="managedAccounts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Managed Accounts</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addUserForm.control}
                        name="monthlyTarget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Target</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addUserForm.control}
                        name="totalSales"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Sales</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={handleGoBack}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white">
                  Create User
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="brand" value={activeTab} onValueChange={(value) => setActiveTab(value as UserType)}>
        <TabsList className="grid grid-cols-3 mb-8 bg-transparent">
          <TabsTrigger value="brand" className="text-sm">BRANDS</TabsTrigger>
          <TabsTrigger value="buyer" className="text-sm">BUYERS</TabsTrigger>
          <TabsTrigger value="salesManager" className="text-sm">SALES MANAGERS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="brand">
          {viewMode === "list" && renderListView("brand")}
          {viewMode === "view" && renderViewUser()}
          {viewMode === "edit" && renderEditUser()}
          {viewMode === "add" && renderAddUser()}
        </TabsContent>
        
        <TabsContent value="buyer">
          {viewMode === "list" && renderListView("buyer")}
          {viewMode === "view" && renderViewUser()}
          {viewMode === "edit" && renderEditUser()}
          {viewMode === "add" && renderAddUser()}
        </TabsContent>
        
        <TabsContent value="salesManager">
          {viewMode === "list" && renderListView("salesManager")}
          {viewMode === "view" && renderViewUser()}
          {viewMode === "edit" && renderEditUser()}
          {viewMode === "add" && renderAddUser()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesUsers;
