
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, User, Lock } from "lucide-react";

const SalesSettings = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    performanceReports: true,
    newClientAlerts: false
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
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
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border border-gray-200 hover:shadow-md transition-all duration-300">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-xl font-light">
              <User size={20} className="text-gray-500" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
              <Button type="submit" variant="black" className="transition-all hover:scale-[1.02]">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 hover:shadow-md transition-all duration-300">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-xl font-light">
              <Lock size={20} className="text-gray-500" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
              <Button type="submit" variant="black" className="transition-all hover:scale-[1.02]">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200 hover:shadow-md transition-all duration-300">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2 text-xl font-light">
            <Bell size={20} className="text-gray-500" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive email notifications for new messages</p>
              </div>
              <Switch 
                checked={notifications.emailNotifications} 
                onCheckedChange={() => handleNotificationChange('emailNotifications')}
                className="data-[state=checked]:bg-black"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Performance Reports</h3>
                <p className="text-sm text-gray-500">Weekly performance reports via email</p>
              </div>
              <Switch 
                checked={notifications.performanceReports} 
                onCheckedChange={() => handleNotificationChange('performanceReports')}
                className="data-[state=checked]:bg-black"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">New Client Alerts</h3>
                <p className="text-sm text-gray-500">Immediate notifications for new client sign-ups</p>
              </div>
              <Switch 
                checked={notifications.newClientAlerts} 
                onCheckedChange={() => handleNotificationChange('newClientAlerts')}
                className="data-[state=checked]:bg-black"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesSettings;
