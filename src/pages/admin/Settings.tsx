
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
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">SETTINGS</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
          <TabsTrigger 
            value="general" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="integrations" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Integrations
          </TabsTrigger>
          <TabsTrigger 
            value="features" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Features
          </TabsTrigger>
          <TabsTrigger 
            value="logs" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            System Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card className="p-6 border border-gray-200 shadow-none rounded-none">
            <h2 className="text-xl md:text-2xl uppercase font-light mb-6 tracking-tighter">General Settings</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-light mb-1">
                  Site Name
                </label>
                <Input
                  id="siteName"
                  defaultValue="ETAGE7"
                  className="rounded-none border-gray-200"
                />
              </div>
              
              <div>
                <label htmlFor="adminEmail" className="block text-sm font-light mb-1">
                  Admin Email
                </label>
                <Input
                  id="adminEmail"
                  type="email"
                  defaultValue="admin@etage7.com"
                  className="rounded-none border-gray-200"
                />
              </div>
              
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-light mb-1">
                  Current Password
                </label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  className="rounded-none border-gray-200"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-light mb-1">
                  New Password
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="rounded-none border-gray-200"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-light mb-1">
                  Confirm New Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="rounded-none border-gray-200"
                />
              </div>
              
              <div className="flex space-x-8">
                <div className="flex items-center space-x-2">
                  <Switch id="maintenanceMode" className="rounded-full" />
                  <Label htmlFor="maintenanceMode" className="font-light text-sm">Maintenance Mode</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="allowRegistration" defaultChecked className="rounded-full" />
                  <Label htmlFor="allowRegistration" className="font-light text-sm">Allow Registration</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" className="rounded-none border-gray-200 text-xs font-light">
                  Cancel
                </Button>
                <Button className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card className="p-6 border border-gray-200 shadow-none rounded-none">
            <h2 className="text-xl md:text-2xl uppercase font-light mb-6 tracking-tighter">API Integrations</h2>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3">Service</TableHead>
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3">Status</TableHead>
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3">API Key</TableHead>
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.id} className="border-t border-gray-200">
                      <TableCell className="font-light">{integration.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id={`integration-${integration.id}`} checked={integration.status} className="rounded-full" />
                          <span className={integration.status ? "text-black text-xs" : "text-gray-400 text-xs"}>
                            {integration.status ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-light text-sm">
                        {integration.apiKey || <span className="text-gray-400 italic text-xs">Not set</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-gray-100">
                          <Settings2 className="h-4 w-4" strokeWidth={1} />
                          <span className="sr-only">Configure</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 flex justify-end mt-4">
              <Button className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light flex items-center gap-2">
                <Plus className="h-4 w-4" strokeWidth={1} />
                Add New Integration
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          <Card className="p-6 border border-gray-200 shadow-none rounded-none">
            <h2 className="text-xl md:text-2xl uppercase font-light mb-6 tracking-tighter">Feature Management</h2>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3">Feature</TableHead>
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3">Description</TableHead>
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3">Status</TableHead>
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature) => (
                    <TableRow key={feature.id} className="border-t border-gray-200">
                      <TableCell className="font-light">{feature.name}</TableCell>
                      <TableCell className="font-light text-sm">{feature.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id={`feature-${feature.id}`} checked={feature.status} className="rounded-full" />
                          <span className={feature.status ? "text-black text-xs" : "text-gray-400 text-xs"}>
                            {feature.status ? "Enabled" : "Disabled"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-gray-100">
                          <Settings2 className="h-4 w-4" strokeWidth={1} />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 rounded-none hover:bg-gray-100">
                          <Trash2 className="h-4 w-4" strokeWidth={1} />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 flex justify-end mt-4">
              <Button className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light flex items-center gap-2">
                <Plus className="h-4 w-4" strokeWidth={1} />
                Add New Feature
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <Card className="p-6 border border-gray-200 shadow-none rounded-none">
            <h2 className="text-xl md:text-2xl uppercase font-light mb-6 tracking-tighter">System Logs</h2>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3">Action</TableHead>
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3">User</TableHead>
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3">Timestamp</TableHead>
                    <TableHead className="font-light text-xs uppercase text-gray-500 py-3 text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id} className="border-t border-gray-200">
                      <TableCell className="font-light">{log.action}</TableCell>
                      <TableCell className="font-light text-sm">{log.user}</TableCell>
                      <TableCell className="font-light text-sm">{log.timestamp}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-gray-100">
                          <Eye className="h-4 w-4" strokeWidth={1} />
                          <span className="sr-only">View Details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 flex justify-between mt-4">
              <Button variant="outline" className="rounded-none border-gray-200 text-xs font-light flex items-center gap-2">
                <Download className="h-4 w-4" strokeWidth={1} />
                Export Logs
              </Button>
              <Button variant="outline" className="rounded-none border-gray-200 text-red-600 hover:text-red-700 text-xs font-light flex items-center gap-2">
                <X className="h-4 w-4" strokeWidth={1} />
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
