
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card className="p-6 border border-gray-200">
            <h2 className="text-lg font-medium mb-4">General Settings</h2>
            
            <form className="space-y-4">
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
              
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch id="maintenanceMode" />
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="allowRegistration" defaultChecked />
                  <Label htmlFor="allowRegistration">Allow Registration</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="border-gray-300">
                  Cancel
                </Button>
                <Button className="bg-black text-white border-none hover:underline">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card className="border border-gray-200">
            <h2 className="text-lg font-medium p-6 pb-4">API Integrations</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Service</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">API Key</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {integrations.map((integration) => (
                  <TableRow key={integration.id} className="border-t border-gray-200">
                    <TableCell className="font-medium">{integration.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch id={`integration-${integration.id}`} checked={integration.status} />
                        <span className={integration.status ? "text-green-600" : "text-gray-400"}>
                          {integration.status ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {integration.apiKey || <span className="text-gray-400 italic">Not set</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="border-gray-200">
                        Configure
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 flex justify-end">
              <Button className="bg-black text-white border-none hover:underline">
                Add New Integration
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          <Card className="border border-gray-200">
            <h2 className="text-lg font-medium p-6 pb-4">Feature Management</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Feature</TableHead>
                  <TableHead className="font-medium">Description</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.id} className="border-t border-gray-200">
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    <TableCell>{feature.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch id={`feature-${feature.id}`} checked={feature.status} />
                        <span className={feature.status ? "text-green-600" : "text-gray-400"}>
                          {feature.status ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-200">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-200 text-red-600 hover:text-red-700">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 flex justify-end">
              <Button className="bg-black text-white border-none hover:underline">
                Add New Feature
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <Card className="border border-gray-200">
            <h2 className="text-lg font-medium p-6 pb-4">System Logs</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Action</TableHead>
                  <TableHead className="font-medium">User</TableHead>
                  <TableHead className="font-medium">Timestamp</TableHead>
                  <TableHead className="font-medium text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="border-t border-gray-200">
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="border-gray-200">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 flex justify-between">
              <Button variant="outline" className="border-gray-200">
                Export Logs
              </Button>
              <Button variant="outline" className="border-gray-200 text-red-600 hover:text-red-700">
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
