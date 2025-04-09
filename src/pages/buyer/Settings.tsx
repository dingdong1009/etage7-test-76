
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const BuyerSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    newProducts: true,
    orderUpdates: true,
    marketingEmails: false
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto rounded-none">
          <TabsTrigger value="profile" className="rounded-none">Profile</TabsTrigger>
          <TabsTrigger value="password" className="rounded-none">Password</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-none">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card className="border border-gray-200 rounded-none">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your buyer account information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter your first name" 
                    className="rounded-none" 
                    defaultValue="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter your last name" 
                    className="rounded-none" 
                    defaultValue="Smith"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="rounded-none" 
                  defaultValue="john.smith@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="Enter your phone number" 
                  className="rounded-none" 
                  defaultValue="+1 (555) 123-4567"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  placeholder="Enter your company name" 
                  className="rounded-none" 
                  defaultValue="Fashion Retail Co."
                />
              </div>
              
              <div className="pt-4">
                <Button className="rounded-none">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="password" className="space-y-4 mt-4">
          <Card className="border border-gray-200 rounded-none">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  type="password" 
                  placeholder="Enter your current password" 
                  className="rounded-none" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  placeholder="Enter your new password" 
                  className="rounded-none" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="Confirm your new password" 
                  className="rounded-none" 
                />
              </div>
              
              <div className="pt-4">
                <Button className="rounded-none">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card className="border border-gray-200 rounded-none">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Channels</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications on your device</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Products</p>
                    <p className="text-sm text-gray-500">Get notified when brands add new products</p>
                  </div>
                  <Switch 
                    checked={notifications.newProducts}
                    onCheckedChange={(checked) => setNotifications({...notifications, newProducts: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-gray-500">Get notified about order status changes</p>
                  </div>
                  <Switch 
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, orderUpdates: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-gray-500">Receive promotional offers and newsletters</p>
                  </div>
                  <Switch 
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketingEmails: checked})}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="rounded-none">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerSettings;
