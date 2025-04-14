
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Download, Search, User, Lock, Bell, Settings2, Database } from "lucide-react";

const BrandSettings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [profileForm, setProfileForm] = useState({
    brandName: "Elegant Fashion House",
    contactName: "John Doe",
    email: "john.doe@elegantfashion.com",
    phone: "+1 (555) 987-6543",
    address: "123 Fashion Avenue, New York, NY 10001"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderAlerts: true,
    marketingUpdates: true,
    lowInventory: false,
    stockAlerts: true,
    priceChanges: false,
    deliveryUpdates: true,
    systemAnnouncements: true
  });

  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [currency, setCurrency] = useState("USD ($)");

  const errorLogs = [
    { id: 1, level: "Error", message: "Failed to upload product images", source: "Product Management", timestamp: "2023-12-15 13:27:45" },
    { id: 2, level: "Warning", message: "Low inventory for SKU-1234", source: "Inventory System", timestamp: "2023-12-14 09:32:18" },
    { id: 3, level: "Error", message: "Order processing failed", source: "Order Management", timestamp: "2023-12-13 16:44:51" },
  ];

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings]
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update logic
    console.log("Password update:", passwordForm);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic
    console.log("Profile update:", profileForm);
  };

  const filterLogsBySearch = (logs: typeof errorLogs) => {
    if (!searchQuery) return logs;
    
    return logs.filter(log => 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl uppercase font-light mb-6">Account Settings</h1>
      
      {/* Header with search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          <span className="text-lg font-light">Manage your account settings</span>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            type="search"
            placeholder="Search settings..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full sm:w-[300px] border-gray-200"
          />
        </div>
      </div>

      {/* Main tabs section */}
      <Tabs defaultValue="profile" className="w-full">
        <div className="border-b border-gray-200 mb-6">
          <TabsList className="bg-transparent p-0 h-auto flex gap-6">
            <TabsTrigger 
              value="profile" 
              className="px-0 py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent data-[state=active]:bg-transparent text-base data-[state=active]:shadow-none"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="px-0 py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent data-[state=active]:bg-transparent text-base data-[state=active]:shadow-none"
            >
              <Lock className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="px-0 py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent data-[state=active]:bg-transparent text-base data-[state=active]:shadow-none"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="advanced" 
              className="px-0 py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent data-[state=active]:bg-transparent text-base data-[state=active]:shadow-none"
            >
              <Database className="mr-2 h-4 w-4" />
              Advanced
            </TabsTrigger>
            <TabsTrigger 
              value="errorLogs" 
              className="px-0 py-3 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent data-[state=active]:bg-transparent text-base data-[state=active]:shadow-none"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Error Logs
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="profile" className="m-0">
          <Card className="border border-gray-200 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-light">Brand Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="brandName" className="text-sm font-medium text-gray-700 mb-1">
                      Brand Name
                    </Label>
                    <Input
                      id="brandName"
                      name="brandName"
                      value={profileForm.brandName}
                      onChange={handleProfileChange}
                      className="border-gray-200"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactName" className="text-sm font-medium text-gray-700 mb-1">
                      Contact Person
                    </Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={profileForm.contactName}
                      onChange={handleProfileChange}
                      className="border-gray-200"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="border-gray-200"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      className="border-gray-200"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1">
                      Address
                    </Label>
                    <textarea
                      id="address"
                      name="address"
                      value={profileForm.address}
                      onChange={handleProfileChange}
                      rows={3}
                      className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-none"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-black text-white px-4 py-2 hover:bg-gray-800 rounded-none"
                  >
                    Update Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="m-0">
          <Card className="border border-gray-200 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-light">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </Label>
                    <Input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="border-gray-200"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Separator className="my-4" />
                  </div>
                  
                  <div>
                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </Label>
                    <Input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="border-gray-200"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="border-gray-200"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-black text-white px-4 py-2 hover:bg-gray-800 rounded-none"
                  >
                    Update Password
                  </Button>
                </div>
              </form>

              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-light mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between bg-gray-50 p-4">
                  <div>
                    <p className="font-medium">Enhance your account security</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Button 
                    variant="outline"
                    className="border-gray-200"
                  >
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="m-0">
          <Card className="border border-gray-200 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-light">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {Object.entries(notificationSettings).map(([key, value]) => {
                    const displayName = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase());
                    
                    return (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-100 hover:bg-gray-50">
                        <div>
                          <h3 className="font-medium">{displayName}</h3>
                          <p className="text-sm text-gray-500">
                            Receive notifications about {displayName.toLowerCase()}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={value}
                            onChange={() => handleNotificationChange(key)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-black text-white px-4 py-2 hover:bg-gray-800 rounded-none"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="m-0">
          <Card className="border border-gray-200 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-light">Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-4 border border-gray-200">
                  <h3 className="font-medium mb-3">Data Management</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Data Caching</span>
                        <p className="text-xs text-gray-500">Cache data for better performance</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Analytics</span>
                        <p className="text-xs text-gray-500">Allow usage analytics to improve services</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200">
                  <h3 className="font-medium mb-3">Display Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Default Date Format</Label>
                      <Select value={dateFormat} onValueChange={setDateFormat}>
                        <SelectTrigger className="w-full border-gray-200 mt-1">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Default Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-full border-gray-200 mt-1">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD ($)">USD ($)</SelectItem>
                          <SelectItem value="EUR (€)">EUR (€)</SelectItem>
                          <SelectItem value="GBP (£)">GBP (£)</SelectItem>
                          <SelectItem value="JPY (¥)">JPY (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-yellow-100 bg-yellow-50 mt-6">
                <h3 className="font-medium text-yellow-800 mb-3">Danger Zone</h3>
                <p className="text-sm text-yellow-700 mb-4">These actions cannot be undone.</p>
                
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-none">
                    <Download className="mr-2 h-4 w-4" />
                    Export All Data
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 rounded-none">
                    Delete Brand Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errorLogs" className="m-0">
          <Card className="border border-gray-200 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-light">Error Logs</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-200 text-xs flex items-center gap-1 h-8"
                >
                  <Download className="h-3 w-3" />
                  Export Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filterLogsBySearch(errorLogs).length > 0 ? (
                <div className="space-y-4">
                  {filterLogsBySearch(errorLogs).map((log) => (
                    <div key={log.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            log.level === 'Error' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {log.level === 'Error' && <AlertTriangle className="mr-1 h-3 w-3" />}
                            {log.level}
                          </span>
                          <span className="text-sm font-medium">{log.source}</span>
                        </div>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="font-mono text-sm">{log.message}</p>
                      </div>
                      
                      <div className="mt-3 flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="text-xs h-8">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs text-red-600 border-red-200 hover:bg-red-50 h-8">
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No error logs found matching your search</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandSettings;
