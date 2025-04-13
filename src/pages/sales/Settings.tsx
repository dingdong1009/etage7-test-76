import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Bell, User, Lock, Mail, Eye, EyeOff, Camera, AlertTriangle, Download } from "lucide-react";

const SalesSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock user data for demonstration
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@etage7.com",
    phone: "+1 (555) 123-4567",
    title: "Senior Sales Manager",
    language: "english",
    timezone: "america_new_york",
    notifications: {
      email: true,
      push: true,
      sms: false,
      news: true,
      marketing: false
    }
  });

  // Mock error logs for demonstration
  const errorLogs = [
    { id: 1, level: "Error", message: "Failed to sync client data", source: "CRM Integration", timestamp: "2023-12-15 11:32:21" },
    { id: 2, level: "Warning", message: "Report generation timeout", source: "Sales Analytics", timestamp: "2023-12-14 14:27:39" },
    { id: 3, level: "Error", message: "Calendar sync failed", source: "Meeting Scheduler", timestamp: "2023-12-13 09:15:47" },
  ];
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the updated profile data to your API
    console.log("Saving profile:", userData);
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle password change logic
    console.log("Changing password");
  };
  
  const toggleNotification = (key: keyof typeof userData.notifications) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-light tracking-tighter">Account Settings</h1>
      
      <Card className="border-gray-200 shadow-none">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row">
            {/* Sidebar navigation on desktop, tabs on mobile */}
            <aside className="md:w-64 md:border-r md:border-gray-100 md:min-h-[600px]">
              <TabsList className="h-auto p-0 bg-transparent flex flex-row md:flex-col w-full">
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center justify-between w-full p-4 border-b border-gray-100 data-[state=active]:bg-gray-50 rounded-none"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </div>
                  <ChevronRight className="h-4 w-4 hidden md:block" />
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="flex items-center justify-between w-full p-4 border-b border-gray-100 data-[state=active]:bg-gray-50 rounded-none"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Security</span>
                  </div>
                  <ChevronRight className="h-4 w-4 hidden md:block" />
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="flex items-center justify-between w-full p-4 border-b border-gray-100 data-[state=active]:bg-gray-50 rounded-none"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </div>
                  <ChevronRight className="h-4 w-4 hidden md:block" />
                </TabsTrigger>
                <TabsTrigger 
                  value="errorLogs" 
                  className="flex items-center justify-between w-full p-4 border-b border-gray-100 data-[state=active]:bg-gray-50 rounded-none"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Error Logs</span>
                  </div>
                  <ChevronRight className="h-4 w-4 hidden md:block" />
                </TabsTrigger>
              </TabsList>
            </aside>
            
            {/* Tab content */}
            <div className="flex-1">
              <TabsContent value="profile" className="m-0 p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-light tracking-tighter">Profile Information</h2>
                    <p className="text-sm text-gray-500">Update your account details and profile</p>
                  </div>
                  
                  <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <Button 
                        size="icon"
                        variant="outline" 
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <form onSubmit={handleSaveProfile} className="w-full">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={userData.name}
                            onChange={e => setUserData({...userData, name: e.target.value})}
                            className="border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={userData.email}
                            onChange={e => setUserData({...userData, email: e.target.value})}
                            className="border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            value={userData.phone}
                            onChange={e => setUserData({...userData, phone: e.target.value})}
                            className="border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Job Title</Label>
                          <Input 
                            id="title" 
                            value={userData.title}
                            onChange={e => setUserData({...userData, title: e.target.value})}
                            className="border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select 
                            value={userData.language}
                            onValueChange={value => setUserData({...userData, language: value})}
                          >
                            <SelectTrigger id="language" className="border-gray-200">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="german">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select 
                            value={userData.timezone}
                            onValueChange={value => setUserData({...userData, timezone: value})}
                          >
                            <SelectTrigger id="timezone" className="border-gray-200">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="america_new_york">America/New_York (EST)</SelectItem>
                              <SelectItem value="america_los_angeles">America/Los_Angeles (PST)</SelectItem>
                              <SelectItem value="europe_london">Europe/London (GMT)</SelectItem>
                              <SelectItem value="europe_paris">Europe/Paris (CET)</SelectItem>
                              <SelectItem value="asia_tokyo">Asia/Tokyo (JST)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-right">
                        <Button 
                          type="submit" 
                          variant="black"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="m-0 p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-light tracking-tighter">Security Settings</h2>
                    <p className="text-sm text-gray-500">Manage your password and account security</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-light">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Input 
                            id="current-password" 
                            type={showPassword ? "text" : "password"} 
                            className="border-gray-200 pr-10"
                          />
                          <Button 
                            type="button"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input 
                            id="new-password" 
                            type={showPassword ? "text" : "password"} 
                            className="border-gray-200 pr-10"
                          />
                          <Button 
                            type="button"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative">
                          <Input 
                            id="confirm-password" 
                            type={showPassword ? "text" : "password"} 
                            className="border-gray-200 pr-10"
                          />
                          <Button 
                            type="button"
                            variant="ghost"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-right">
                        <Button 
                          type="submit" 
                          variant="black"
                        >
                          Update Password
                        </Button>
                      </div>
                    </form>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-light">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Enhance your account security by enabling 2FA</p>
                        </div>
                        <Button variant="outline">
                          Enable
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0 p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-light tracking-tighter">Notification Preferences</h2>
                    <p className="text-sm text-gray-500">Manage how you receive notifications</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={userData.notifications.email}
                        onCheckedChange={() => toggleNotification('email')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications on your device</p>
                      </div>
                      <Switch 
                        id="push-notifications" 
                        checked={userData.notifications.push}
                        onCheckedChange={() => toggleNotification('push')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive important updates via SMS</p>
                      </div>
                      <Switch 
                        id="sms-notifications" 
                        checked={userData.notifications.sms}
                        onCheckedChange={() => toggleNotification('sms')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="news-notifications">Newsletter</Label>
                        <p className="text-sm text-gray-500">Receive weekly newsletter updates</p>
                      </div>
                      <Switch 
                        id="news-notifications" 
                        checked={userData.notifications.news}
                        onCheckedChange={() => toggleNotification('news')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-notifications">Marketing</Label>
                        <p className="text-sm text-gray-500">Receive marketing communications</p>
                      </div>
                      <Switch 
                        id="marketing-notifications" 
                        checked={userData.notifications.marketing}
                        onCheckedChange={() => toggleNotification('marketing')}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 text-right">
                    <Button variant="black">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="errorLogs" className="m-0 p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-light tracking-tighter">Error Logs</h2>
                    <p className="text-sm text-gray-500">View and manage system error logs</p>
                  </div>
                  
                  <div className="space-y-6">
                    {errorLogs.map((log) => (
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
                          <Button variant="ghost" size="sm" className="text-xs">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs text-red-600 border-red-200 hover:bg-red-50">
                            Resolve
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {errorLogs.length > 0 && (
                      <div className="flex justify-between items-center pt-4">
                        <Button variant="outline" className="text-xs" size="sm">
                          View All Logs
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs flex items-center gap-1"
                        >
                          <Download className="h-3 w-3" />
                          Export Logs
                        </Button>
                      </div>
                    )}
                    
                    {errorLogs.length === 0 && (
                      <div className="p-8 text-center border border-dashed border-gray-200 rounded-lg">
                        <p className="text-gray-500">No error logs found</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};

export default SalesSettings;
