
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BrandSettings = () => {
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

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Brand Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    id="brandName"
                    name="brandName"
                    value={profileForm.brandName}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={profileForm.contactName}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={profileForm.address}
                    onChange={handleProfileChange}
                    rows={3}
                    className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="bg-black text-white px-4 py-2 hover:bg-black-600"
                >
                  Update Profile
                </button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="bg-black text-white px-4 py-2 hover:bg-black-600"
                >
                  Update Password
                </button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.emailNotifications}
                      onChange={() => handleNotificationChange('emailNotifications')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">Order Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified of new orders and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.orderAlerts}
                      onChange={() => handleNotificationChange('orderAlerts')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">Marketing Updates</h3>
                    <p className="text-sm text-gray-500">Receive updates about marketing features and tips</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.marketingUpdates}
                      onChange={() => handleNotificationChange('marketingUpdates')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">Low Inventory Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified when product inventory is running low</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.lowInventory}
                      onChange={() => handleNotificationChange('lowInventory')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">Stock Alerts</h3>
                    <p className="text-sm text-gray-500">Notifications for stock changes and new inventory</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.stockAlerts}
                      onChange={() => handleNotificationChange('stockAlerts')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">Price Changes</h3>
                    <p className="text-sm text-gray-500">Get notified about price updates and promotions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.priceChanges}
                      onChange={() => handleNotificationChange('priceChanges')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">Delivery Updates</h3>
                    <p className="text-sm text-gray-500">Notifications for shipping and delivery changes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.deliveryUpdates}
                      onChange={() => handleNotificationChange('deliveryUpdates')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">System Announcements</h3>
                    <p className="text-sm text-gray-500">Important platform updates and announcements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.systemAnnouncements}
                      onChange={() => handleNotificationChange('systemAnnouncements')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        
        
        {/* Advanced Settings Tab */}
        <TabsContent value="advanced">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium">Data Management</h3>
                <p className="text-sm text-gray-500 mt-1">Control how your data is stored and processed</p>
                
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Data Caching</span>
                      <p className="text-xs text-gray-500">Cache data for better performance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Analytics</span>
                      <p className="text-xs text-gray-500">Allow usage analytics to improve services</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium">Display Settings</h3>
                <p className="text-sm text-gray-500 mt-1">Customize how information is displayed</p>
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Default Date Format</label>
                    <select className="w-full p-2 border border-gray-200 rounded">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Default Currency</label>
                    <select className="w-full p-2 border border-gray-200 rounded">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-yellow-100 rounded-md bg-yellow-50">
                <h3 className="font-medium text-yellow-800">Danger Zone</h3>
                <p className="text-sm text-yellow-700 mt-1">These actions cannot be undone.</p>
                
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Export All Data
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50">
                    Delete Brand Account
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandSettings;
