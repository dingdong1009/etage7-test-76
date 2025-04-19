import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { 
  FileText, 
  Folder, 
  Settings, 
  Users, 
  Mail, 
  Book, 
  Video, 
  ShieldCheck, 
  Bell, 
  Plus, 
  Search,
  Eye, 
  Edit, 
  Trash2, 
  ArrowRight, 
  Activity,
  PenTool,
  SquareX,
  SquareCheck,
  Download,
  Upload,
  UserCheck,
  FileImage,
  MessageSquare,
  Key,
  Signature
} from "lucide-react";
import { toast } from "sonner";

// Mock data for the page management
const addPages = [
  { id: 1, title: "About Us", slug: "/about", type: "static", lastUpdated: "2025-04-10", status: "published" },
  { id: 2, title: "Contact", slug: "/contact", type: "static", lastUpdated: "2025-04-12", status: "published" },
  { id: 3, title: "Terms of Service", slug: "/terms", type: "static", lastUpdated: "2025-04-05", status: "published" },
  { id: 4, title: "Privacy Policy", slug: "/privacy", type: "static", lastUpdated: "2025-04-05", status: "published" },
  { id: 5, title: "FAQ", slug: "/faq", type: "static", lastUpdated: "2025-04-15", status: "draft" },
  { id: 6, title: "Events", slug: "/test1", type: "dynamic", lastUpdated: "2025-04-16", status: "active", itemCount: 12 },
  { id: 7, title: "Curated Stories", slug: "/faq", type: "dynamic", lastUpdated: "2025-04-15", status: "active", itemCount: 8 },
  { id: 8, title: "Career Opportunities", slug: "/faq", type: "dynamic", lastUpdated: "2025-04-10", status: "active", itemCount: 5 }
];

// Mock data for resources
const resourcesDocs = [
  { id: 1, title: "Standard Buyer-Seller Agreement",type: "contract",  language: "english", created: "2025-03-15", views: 47, status:"published" },
  { id: 2, title: "Exclusive Distribution Contract",type: "contract",  language: "english", created: "2025-03-20", views: 32, status:"published" },
  { id: 3, title: "Стандартный договор поставки",type: "contract",  language: "russian", created: "2025-03-25", views: 28, status:"published" },
  { id: 4, title: "Соглашение о конфиденциальности",type: "contract",  language: "russian", created: "2025-04-01", views: 19, status:"draft" },
  { id: 5, title: "Platform Introduction", type: "video", created: "2025-03-10", views: 215, status:"published" },
  { id: 6, title: "Effective Product Listings", type: "article", created: "2025-03-18", views: 189, status:"published" },
  { id: 7, title: "Buyer's Guide to ETAGE7", type: "pdf", created: "2025-03-22", views: 143, status:"published" },
  { id: 8, title: "Advanced Marketing Features", type: "video", created: "2025-04-05", views: 98, status:"published" }
];

// Mock data for user roles
const userRoles = [
  { id: 1, name: "Admin", users: 5, permissions: "Full access" },
  { id: 2, name: "Brand Manager", users: 28, permissions: "Brand management, orders, marketing" },
  { id: 3, name: "Buyer", users: 43, permissions: "Browsing, ordering, messaging" },
  { id: 4, name: "Sales Representative", users: 12, permissions: "User management, performance tracking" },
  { id: 5, name: "Content Editor", users: 8, permissions: "Content management, page editing" }
];

// Mock data for automatic messages
const automaticMessages = [
  { id: 1, title: "Welcome Email", trigger: "New registration", status: "active", lastUpdated: "2025-04-01" },
  { id: 2, title: "Order Confirmation", trigger: "Order placed", status: "active", lastUpdated: "2025-03-28" },
  { id: 3, title: "Payment Receipt", trigger: "Payment processed", status: "active", lastUpdated: "2025-03-25" },
  { id: 4, title: "Password Reset", trigger: "Reset request", status: "active", lastUpdated: "2025-04-05" },
  { id: 5, title: "Subscription Confirmation", trigger: "New subscription", status: "inactive", lastUpdated: "2025-03-20" }
];

// Mock data for system logs
const systemLogs = [
  { id: 1, user: "admin@etage7.com", action: "User created", timestamp: "2025-04-18 09:32:45", ip: "192.168.1.1", status: "success" },
  { id: 2, user: "brand@example.com", action: "Login attempt", timestamp: "2025-04-18 10:15:22", ip: "192.168.1.2", status: "failed" },
  { id: 3, user: "buyer@example.com", action: "Order placed", timestamp: "2025-04-18 11:45:11", ip: "192.168.1.3", status: "success" },
  { id: 4, user: "sales@etage7.com", action: "Content edited", timestamp: "2025-04-17 15:27:33", ip: "192.168.1.4", status: "success" },
  { id: 5, user: "admin@etage7.com", action: "Settings changed", timestamp: "2025-04-17 16:14:05", ip: "192.168.1.1", status: "success" }
];

// Mock data for notifications preferences
const notificationPreferences = [
  { id: 1, type: "New User Registration", email: true, dashboard: true, push: false },
  { id: 2, type: "Order Updates", email: true, dashboard: true, push: true },
  { id: 3, type: "Payment Notifications", email: true, dashboard: true, push: true },
  { id: 4, type: "System Alerts", email: true, dashboard: true, push: true },
  { id: 5, type: "Content Updates", email: false, dashboard: true, push: false }
];

// Main component
const Administration = () => {
  // State management
  const [activeTab, setActiveTab] = useState("pages");
  const [searchQuery, setSearchQuery] = useState("");
  const [resourceFilter, setResourceFilter] = useState("all");
  const [logTimeFilter, setLogTimeFilter] = useState("all");
  
  // Forms
  const securityForm = useForm({
    defaultValues: {
      currentEmail: "admin@etage7.com",
      newEmail: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  // Event handlers
  const handleCreatePage = () => {
    toast.success("New page creation dialog would open here");
  };

  const handleUpdateRole = (roleId: number) => {
    toast.success(`Role ID ${roleId} updated successfully`);
  };

  const handleCreateTemplate = () => {
    toast.success("New contract template form would open here");
  };

  const handleEditMessage = (id: number) => {
    toast.success(`Editing message ID ${id}`);
  };

  const handleUpdateSecurity = () => {
    toast.success("Security details updated successfully");
  };

  const handleEditPreference = (id: number) => {
    toast.success(`Updated notification preference ID ${id}`);
  };

  const handleViewLog = (id: number) => {
    toast.success(`Viewing log details for ID ${id}`);
  };

  return (
    <div className="space-y-6 pt-5">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">ADMINISTRATION</h1>
      
      <div className="pt-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="pages" 
              className="text-xs font-normal uppercase border-r border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-r data-[state=active]:border-white"
            >
              Page Management
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="roles" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              User Roles
            </TabsTrigger>
            <TabsTrigger 
              value="messages" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              Automatic Messages
            </TabsTrigger>
            <TabsTrigger 
              value="logs" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              Logs
            </TabsTrigger>
            <TabsTrigger 
              value="preferences" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              Security
            </TabsTrigger>
          </TabsList>

          {/* Page Management Tab Content */}
      <TabsContent value="pages" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal uppercase tracking-tighter">Page Management</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by Pages..."
              className="pl-10 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger className="w-[150px] font-light text-xs uppercase border-gray-200 rounded-none">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs uppercase font-light">ALL STATUS</SelectItem>
              <SelectItem value="published" className="text-xs uppercase font-light">Published</SelectItem>
              <SelectItem value="draft" className="text-xs uppercase font-light">Draft</SelectItem>
              <SelectItem value="active" className="text-xs uppercase font-light">Active</SelectItem>
              <SelectItem value="inactive" className="text-xs uppercase font-light">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase">
            <Plus className="mr-1 h-4 w-4" /> Add new page
          </Button>
        </div>
      </div>

            {/* Pages Management Section */}
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=" font-normal text-xs uppercase">Title</TableHead>
                      <TableHead className=" font-normal text-xs uppercase">URL</TableHead>
                      <TableHead className=" font-normal text-xs uppercase">Type</TableHead>
                      <TableHead className=" font-normal text-xs uppercase">Items</TableHead>
                      <TableHead className=" font-normal text-xs uppercase">Last Updated</TableHead>
                      <TableHead className=" font-normal text-xs uppercase">Status</TableHead>
                      <TableHead className="text-right  font-normal text-xs uppercase">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addPages.map((page) => (
                      <TableRow key={page.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                        <TableCell className="font-light">{page.title}</TableCell>
                        <TableCell className="font-mono text-sm text-gray-600">{page.slug}</TableCell>
                        <TableCell className="capitalize">                          <Badge variant="outline" className={`
                              ${page.type === "dynamic" ? "bg-accent-pink text-gray-800 border-gray-200 capitalize" : "capitalize bg-accent-yellow text-gray-700 border-gray-200"}
                              text-xs font-medium px-2 py-0.5
                            `}>
                            {page.type}
                          </Badge></TableCell>
                        <TableCell className="font-light">{page.itemCount}</TableCell>

                        <TableCell className="font-light">{page.lastUpdated}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                              ${page.status === "published"|| page.status === "active" ? "bg-accent-mint text-gray-800 border-gray-200 capitalize" : "capitalize bg-gray-100 text-gray-700 border-gray-200"}
                              text-xs font-medium px-2 py-0.5
                            `}>
                            {page.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200" title="View">
                              <Eye className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200" title="Edit">
                              <Edit className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-100" title="Delete">
                              <Trash2 className="h-4 w-4 text-red-500" strokeWidth={1.5} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab Content */}
          <TabsContent value="resources" className="space-y-6">
            <div className="flex justify-between items-center">
            <h2 className="text-xl font-normal uppercase tracking-tighter">PResources Management</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by Pages..."
                      className="pl-10 w-full md:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                    <Select value={resourceFilter} onValueChange={value => setResourceFilter(value)}>
                      <SelectTrigger className="w-[180px] font-light text-xs uppercase border-gray-200 rounded-none">
                        <SelectValue placeholder="Filter resources" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-xs uppercase font-light">All Resources</SelectItem>
                        <SelectItem value="contracts" className="text-xs uppercase font-light">Contracts</SelectItem>
                        <SelectItem value="videos" className="text-xs uppercase font-light">Videos</SelectItem>
                        <SelectItem value="articles" className="text-xs uppercase font-light">Articles</SelectItem>
                        <SelectItem value="pdfs" className="text-xs uppercase font-light">PDFs</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                    className="bg-black hover:bg-gray-800 text-white text-sm" 
                    onClick={handleCreateTemplate}
                  >
                    <Plus className="mr-2 h-4 w-4" strokeWidth={1.5} /> Create New Template
                  </Button>
                </div>
              </div>
              
            {/* Contract Templates Section */}
            <Card className="border border-gray-200 shadow-none rounded-none">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-base font-medium text-gray-900">
                  Contract Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-gray-50/50">
                      <TableHead className="font-medium text-sm">Title</TableHead>
                      <TableHead className="font-medium text-sm">Type</TableHead>
                      <TableHead className="font-medium text-sm">Language</TableHead>
                      <TableHead className="font-medium text-sm">Created</TableHead>
                      <TableHead className="font-medium text-sm">Views</TableHead>
                      <TableHead className="font-medium text-sm">Status</TableHead>
                      <TableHead className="text-right font-medium text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resourcesDocs.map((material) => (
                      <TableRow key={material.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                        <TableCell className="flex items-center">
                          {material.type === "video" && <Video className="h-4 w-4 mr-2 text-gray-500" strokeWidth={1.5} />}
                          {material.type === "article" && <FileText className="h-4 w-4 mr-2 text-gray-500" strokeWidth={1.5} />}
                          {material.type === "pdf" && <FileText className="h-4 w-4 mr-2 text-gray-500" strokeWidth={1.5} />}
                          {material.type === "contract" && <Signature className="h-4 w-4 mr-2 text-gray-500" strokeWidth={1.5} />}
                          {material.title}
                        </TableCell>
                        <TableCell className="capitalize">{material.type}</TableCell>
                        <TableCell className="capitalize">{material.language}</TableCell>
                        <TableCell>{material.created}</TableCell>
                        <TableCell>{material.views}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                              ${material.status === "published" ? "bg-accent-mint text-gray-800 border-gray-200 capitalize" : "capitalize bg-yellow-100 text-gray-700 border-gray-200"}
                              text-xs font-medium px-2 py-0.5
                            `}>
                            {material.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200" title="View">
                              <Eye className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200" title="Edit">
                              <Edit className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200" title="Delete">
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>


          {/* User Roles Tab Content */}
          <TabsContent value="roles" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-normal uppercase tracking-tighter">User role management</h2>
            <div className="flex items-center space-x-3">
              <Button className="bg-black hover:bg-gray-800 text-white">
                <Plus className="mr-2 h-4 w-4" strokeWidth={1.5} /> Add New Role
              </Button>
              </div>
            </div>

            <Card className="border border-gray-200 shadow-none rounded-none">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-normal text-xs uppercase">Role</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Users</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Permissions</TableHead>
                      <TableHead className="text-right font-normal text-xs uppercase">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userRoles.map((role) => (
                      <TableRow key={role.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                        <TableCell className="flex items-center font-light">
                          {role.name}
                        </TableCell>
                        <TableCell className="font-light">{role.users}</TableCell>
                        <TableCell className="font-light">{role.permissions}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200" title="View">
                              <Eye className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 p-0 hover:bg-gray-200" 
                              title="Edit" 
                              onClick={() => handleUpdateRole(role.id)}
                            >
                              <Edit className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200" title="Users">
                              <Users className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-100" title="Delete">
                              <Trash2 className="h-4 w-4 text-red-500" strokeWidth={1.5} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
         </TabsContent>

          {/* Automatic Messages Tab Content */}
          <TabsContent value="messages" className="space-y-6">
          <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal uppercase tracking-tighter">Automatic Messages</h2>
        <div className="flex items-center space-x-3">

          <Select>
            <SelectTrigger className="w-[150px] font-light text-xs uppercase border-gray-200 rounded-none">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all" className="text-xs uppercase font-light">ALL STATUS</SelectItem>
              <SelectItem value="active" className="text-xs uppercase font-light">Active</SelectItem>
              <SelectItem value="inactive" className="text-xs uppercase font-light">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase">
            <Plus className="mr-1 h-4 w-4" /> Add new Message
          </Button>
        </div>
      </div>

            {/* Pages Management Section */}
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-normal text-xs uppercase">Message Title</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Trigger</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Status</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Last Updated</TableHead>
                      <TableHead className="text-right font-normal text-xs uppercase">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {automaticMessages.map((message) => (
                      <TableRow key={message.id} >
                        <TableCell  className="font-light">
                          {message.title}
                        </TableCell>
                        <TableCell className="font-light">{message.trigger}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                              ${message.status === "active" ? "bg-accent-mint text-gray-800 border-gray-200 capitalize" : "bg-gray-100 text-gray-700 capitalize border-gray-200"}
                              text-xs font-medium px-2 py-0.5
                            `}>
                            {message.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-light">{message.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200" title="View">
                              <Eye className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            <Button
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 p-0 hover:bg-gray-200" 
                              title="Edit" 
                              onClick={() => handleEditMessage(message.id)}
                            >
                              <Edit className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                            <Button variant="ghost" size="icon" className={`
                              ${message.status === "active" ? "h-8 w-8 p-0 hover:bg-orange-200 capitalize" : "capitalize hover:bg-green-200 "}
                             h-8 w-8 p-0 capitalize
                            `}>
                              {message.status === "active" ? ( 
                                <SquareX className="h-4 w-4 text-orange-500" strokeWidth={1.5} />
                              ) : (
                                <SquareCheck className="h-4 w-4 text-green-500" strokeWidth={1.5} />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-100" title="Delete">
                              <Trash2 className="h-4 w-4 text-red-500" strokeWidth={1.5} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab Content */}
          <TabsContent value="logs" className="space-y-6">
          <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal uppercase tracking-tighter">System Logs</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by logs..."
              className="pl-10 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={logTimeFilter} onValueChange={value => setLogTimeFilter(value)}>
                <SelectTrigger className="w-[180px] border-gray-200">
                  <SelectValue placeholder="Filter by time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
        </div>
      </div>
            <Card className="border border-gray-200 shadow-none rounded-none">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-normal text-xs uppercase">User</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Action</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Timestamp</TableHead>
                      <TableHead className="font-normal text-xs uppercase">IP Address</TableHead>
                      <TableHead className="font-normal text-xs uppercase">Status</TableHead>
                      <TableHead className="text-right font-normal text-xs uppercase">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systemLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-light">{log.user}</TableCell>
                        <TableCell className="font-light">
                          {log.action}
                        </TableCell>
                        <TableCell className="font-light">{log.timestamp}</TableCell>
                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                              ${log.status === "success" ? "bg-accent-mint text-gray-800 border-gray-200 capitalize" : "bg-red-100 text-red-800 border-gray-200 capitalize"}
                              text-xs font-medium px-2 py-0.5
                            `}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 p-0 hover:bg-gray-200" 
                            title="View Details" 
                            onClick={() => handleViewLog(log.id)}
                          >
                            <Eye className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-4">
              <Button variant="outline" className="border-gray-200 text-gray-700">
                <Download className="mr-2 h-4 w-4" strokeWidth={1.5} /> Export Logs
              </Button>
            </div>
          </TabsContent>

          {/* Preferences Tab Content */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="border border-gray-200 shadow-none rounded-none">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-base font-medium text-gray-900">
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-gray-50/50">
                      <TableHead className="font-medium text-sm">Notification Type</TableHead>
                      <TableHead className="font-medium text-sm">Email</TableHead>
                      <TableHead className="font-medium text-sm">Dashboard</TableHead>
                      <TableHead className="font-medium text-sm">Push</TableHead>
                      <TableHead className="text-right font-medium text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationPreferences.map((pref) => (
                      <TableRow key={pref.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                        <TableCell className="flex items-center">
                          <Bell className="h-4 w-4 mr-2 text-gray-500" strokeWidth={1.5} />
                          {pref.type}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Switch id={`email-${pref.id}`} checked={pref.email} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Switch id={`dashboard-${pref.id}`} checked={pref.dashboard} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Switch id={`push-${pref.id}`} checked={pref.push} />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 p-0 hover:bg-gray-200" 
                            title="Edit" 
                            onClick={() => handleEditPreference(pref.id)}
                          >
                            <Settings className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-none rounded-none mt-6">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-base font-medium text-gray-900">
                  System Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Maintenance Mode</h3>
                      <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Allow User Registration</h3>
                      <p className="text-sm text-gray-500">Enable new user registrations</p>
                    </div>
                    <Switch id="user-registration" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Send email notifications to administrators</p>
                    </div>
                    <Switch id="admin-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Activity Logging</h3>
                      <p className="text-sm text-gray-500">Log all user activities in the system</p>
                    </div>
                    <Switch id="activity-logging" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab Content */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border border-gray-200 shadow-none rounded-none">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-base font-medium text-gray-900">
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={securityForm.handleSubmit(handleUpdateSecurity)} className="space-y-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Update Email Address</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentEmail">Current Email</Label>
                      <Input 
                        id="currentEmail" 
                        value={securityForm.getValues('currentEmail')} 
                        disabled 
                        className="border-gray-200" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newEmail">New Email</Label>
                      <Input 
                        id="newEmail"
                        type="email"
                        placeholder="Enter new email address" 
                        className="border-gray-200" 
                        {...securityForm.register('newEmail')}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6 space-y-4">
                    <h3 className="text-lg font-medium">Update Password</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        type="password"
                        placeholder="Enter current password" 
                        className="border-gray-200" 
                        {...securityForm.register('currentPassword')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password"
                        placeholder="Enter new password" 
                        className="border-gray-200" 
                        {...securityForm.register('newPassword')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        placeholder="Confirm new password" 
                        className="border-gray-200" 
                        {...securityForm.register('confirmPassword')}
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Enable Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 space-y-4">
                    <h3 className="text-lg font-medium">API Keys</h3>
                    
                    <div className="flex items-center">
                      <Key className="h-5 w-5 mr-2 text-gray-500" strokeWidth={1.5} />
                      <p className="text-sm text-gray-500">Manage your application API keys</p>
                    </div>
                    
                    <Button variant="outline" className="border-gray-200 text-gray-700">
                      Manage API Keys
                    </Button>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button type="button" variant="outline" className="border-gray-200">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
    </div>
  );
};

export default Administration;
