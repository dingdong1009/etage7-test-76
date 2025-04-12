
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Settings2, Trash2, Eye, Download, X } from "lucide-react";

const AdminSettings = () => {
  const integrations = [
    { id: 1, name: "Stripe", status: true, apiKey: "sk_test_***************" },
    { id: 2, name: "SendGrid", status: false, apiKey: "" },
    { id: 3, name: "Google Analytics", status: true, apiKey: "UA-***********" },
  ];

  const features = [
    { id: 1, name: "User Registration", status: true, description: "Allow new users to register" },
    { id: 2, name: "Brand Profiles", status: true, description: "Enable brand profile pages" },
    { id: 3, name: "Messaging System", status: false, description: "In-platform messaging between users" },
    { id: 4, name: "Notifications", status: true, description: "Email notifications for users" },
  ];

  const logs = [
    { id: 1, action: "User Login", user: "admin@example.com", timestamp: "2023-12-15 14:32:45" },
    { id: 2, action: "Settings Changed", user: "admin@example.com", timestamp: "2023-12-14 10:15:22" },
    { id: 3, action: "User Created", user: "admin@example.com", timestamp: "2023-12-10 09:45:11" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="admin-title">Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 bg-transparent border-b border-gray-200 p-0 h-auto flex space-x-6 overflow-x-auto">
          <TabsTrigger 
            value="general"
            className="py-3 px-1 rounded-none data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-medium data-[state=active]:shadow-none text-gray-600 hover:text-black transition-colors bg-transparent"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="integrations"
            className="py-3 px-1 rounded-none data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-medium data-[state=active]:shadow-none text-gray-600 hover:text-black transition-colors bg-transparent"
          >
            Integrations
          </TabsTrigger>
          <TabsTrigger 
            value="features"
            className="py-3 px-1 rounded-none data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-medium data-[state=active]:shadow-none text-gray-600 hover:text-black transition-colors bg-transparent"
          >
            Features
          </TabsTrigger>
          <TabsTrigger 
            value="logs"
            className="py-3 px-1 rounded-none data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-medium data-[state=active]:shadow-none text-gray-600 hover:text-black transition-colors bg-transparent"
          >
            System Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-6">
          <Card className="p-6 border border-gray-200 shadow-sm rounded-none">
            <h2 className="admin-subtitle mb-6">General Settings</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium mb-1">
                    Site Name
                  </label>
                  <Input
                    id="siteName"
                    defaultValue="ETAGE7"
                    className="border-gray-300 rounded-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="adminEmail" className="block text-sm font-medium mb-1">
                    Admin Email
                  </label>
                  <Input
                    id="adminEmail"
                    type="email"
                    defaultValue="admin@etage7.com"
                    className="border-gray-300 rounded-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                    Current Password
                  </label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    className="border-gray-300 rounded-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="border-gray-300 rounded-none"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="border-gray-300 rounded-none"
                />
              </div>
              
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch id="maintenanceMode" className="data-[state=checked]:bg-black" />
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="allowRegistration" defaultChecked className="data-[state=checked]:bg-black" />
                  <Label htmlFor="allowRegistration">Allow Registration</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" className="border-gray-300 rounded-none">
                  Cancel
                </Button>
                <Button className="bg-black text-white border-none rounded-none hover:bg-gray-800">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4 mt-6">
          <Card className="p-6 border border-gray-200 shadow-sm rounded-none">
            <h2 className="admin-subtitle mb-6">API Integrations</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-50">
                    <TableHead className="font-medium text-gray-700">Service</TableHead>
                    <TableHead className="font-medium text-gray-700">Status</TableHead>
                    <TableHead className="font-medium text-gray-700">API Key</TableHead>
                    <TableHead className="font-medium text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <TableCell className="font-medium">{integration.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id={`integration-${integration.id}`} checked={integration.status} className="data-[state=checked]:bg-black" />
                          <span className={integration.status ? "text-green-600" : "text-gray-400"}>
                            {integration.status ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {integration.apiKey || <span className="text-gray-400 italic">Not set</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings2 className="h-4 w-4" />
                          <span className="sr-only">Configure</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 flex justify-end">
              <Button className="bg-black text-white border-none rounded-none hover:bg-gray-800 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Integration
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4 mt-6">
          <Card className="p-6 border border-gray-200 shadow-sm rounded-none">
            <h2 className="admin-subtitle mb-6">Feature Management</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-50">
                    <TableHead className="font-medium text-gray-700">Feature</TableHead>
                    <TableHead className="font-medium text-gray-700">Description</TableHead>
                    <TableHead className="font-medium text-gray-700">Status</TableHead>
                    <TableHead className="font-medium text-gray-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature) => (
                    <TableRow key={feature.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <TableCell className="font-medium">{feature.name}</TableCell>
                      <TableCell>{feature.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id={`feature-${feature.id}`} checked={feature.status} className="data-[state=checked]:bg-black" />
                          <span className={feature.status ? "text-green-600" : "text-gray-400"}>
                            {feature.status ? "Enabled" : "Disabled"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 flex justify-end">
              <Button className="bg-black text-white border-none rounded-none hover:bg-gray-800 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Feature
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4 mt-6">
          <Card className="p-6 border border-gray-200 shadow-sm rounded-none">
            <h2 className="admin-subtitle mb-6">System Logs</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-50">
                    <TableHead className="font-medium text-gray-700">Action</TableHead>
                    <TableHead className="font-medium text-gray-700">User</TableHead>
                    <TableHead className="font-medium text-gray-700">Timestamp</TableHead>
                    <TableHead className="font-medium text-gray-700 text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 flex justify-between">
              <Button variant="outline" className="border-gray-200 rounded-none flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Logs
              </Button>
              <Button variant="outline" className="border-gray-200 rounded-none text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2">
                <X className="h-4 w-4" />
                Clear Logs
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
