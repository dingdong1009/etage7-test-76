
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    lowInventory: false
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
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Profile
              </button>
            </form>
          </CardContent>
        </Card>
        
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
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Password
              </button>
            </form>
          </CardContent>
        </Card>
      </div>

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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium">API & Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium">API Access</h3>
            <p className="text-sm text-gray-500 mt-1">Manage API keys and access for external integrations</p>
            <div className="mt-2 flex items-center gap-2">
              <input 
                type="text" 
                value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
                readOnly 
                className="bg-gray-50 border border-gray-200 rounded p-2 text-sm flex-1"
              />
              <button className="text-xs px-3 py-2 bg-blue-500 text-white rounded">Generate New Key</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 border rounded-md hover:border-blue-500 cursor-pointer transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Shopify</h3>
                <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded">Not Connected</span>
              </div>
              <p className="text-xs text-gray-500">Connect your Shopify store</p>
            </div>

            <div className="p-3 border rounded-md hover:border-blue-500 cursor-pointer transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Instagram</h3>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">Connected</span>
              </div>
              <p className="text-xs text-gray-500">Share products on Instagram</p>
            </div>

            <div className="p-3 border rounded-md hover:border-blue-500 cursor-pointer transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Google Analytics</h3>
                <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded">Not Connected</span>
              </div>
              <p className="text-xs text-gray-500">Track website analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
    </div>
  );
};

export default BrandSettings;
