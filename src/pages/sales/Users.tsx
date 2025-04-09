
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const SalesUsers = () => {
  const [activeTab, setActiveTab] = useState("brand");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  // Sample brands data
  const brands = [
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

  // Sample buyers data
  const buyers = [
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

  // Form for adding a new user
  const addUserForm = useForm({
    defaultValues: {
      contactPerson: "",
      email: "",
      phone: "",
      companyName: "",
      description: "",
      marketSegment: "",
      website: "",
      userType: activeTab
    }
  });

  const handleAddUserSubmit = (data) => {
    console.log("Form submitted:", data);
    setIsAddUserDialogOpen(false);
    addUserForm.reset();
    // In a real app, you would add the user to the appropriate list
  };

  const openAddUserDialog = () => {
    addUserForm.setValue("userType", activeTab);
    setIsAddUserDialogOpen(true);
  };

  // Function to view user details
  const handleViewUser = (userType, userId) => {
    navigate(`/sales/users/${userType}/${userId}/view`);
  };

  // Function to edit user
  const handleEditUser = (userType, userId) => {
    navigate(`/sales/users/${userType}/${userId}/edit`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">User Management</h1>
      
      <Tabs defaultValue="brand" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="brand">Managed Brands</TabsTrigger>
          <TabsTrigger value="buyer">Managed Buyers</TabsTrigger>
        </TabsList>

        <TabsContent value="brand">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Managed Brands</CardTitle>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <Button className="bg-black text-white border-none" onClick={openAddUserDialog}>
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
                    {brands.map((user) => (
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
                            onClick={() => handleViewUser("brand", user.id)}
                          >
                            View
                          </Button>
                          <Button 
                            className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                            onClick={() => handleEditUser("brand", user.id)}
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
        </TabsContent>

        <TabsContent value="buyer">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Managed Buyers</CardTitle>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <Button className="bg-black text-white border-none" onClick={openAddUserDialog}>
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
                    {buyers.map((user) => (
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
                            onClick={() => handleViewUser("buyer", user.id)}
                          >
                            View
                          </Button>
                          <Button 
                            className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                            onClick={() => handleEditUser("buyer", user.id)}
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
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl uppercase font-thin">
              Add New {activeTab === "brand" ? "Brand" : "Buyer"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...addUserForm}>
            <form onSubmit={addUserForm.handleSubmit(handleAddUserSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={addUserForm.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
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
                  control={addUserForm.control}
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
                  control={addUserForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
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
                        <Input placeholder="Website URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
                  name="marketSegment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Segment</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select market segment" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activeTab === "brand" ? (
                            <>
                              <SelectItem value="luxury">Luxury Apparel</SelectItem>
                              <SelectItem value="contemporary">Contemporary Fashion</SelectItem>
                              <SelectItem value="formal">Formal Wear</SelectItem>
                              <SelectItem value="heritage">Heritage Fashion</SelectItem>
                              <SelectItem value="sustainable">Sustainable Fashion</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="department">Department Stores</SelectItem>
                              <SelectItem value="boutiques">Boutiques</SelectItem>
                              <SelectItem value="international">International Retail</SelectItem>
                              <SelectItem value="outlet">Outlet Retail</SelectItem>
                              <SelectItem value="luxury-retail">Luxury Retail</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={addUserForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the company" 
                        className="min-h-32" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white">
                  Send Invitation & Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesUsers;
