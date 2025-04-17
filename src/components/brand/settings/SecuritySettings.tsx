
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const SecuritySettings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would update the password in your backend
    toast({
      title: "Password updated",
      description: "Your password has been successfully changed."
    });
    
    // Reset the form fields
    const form = e.target as HTMLFormElement;
    form.reset();
  };
  
  const handleEnableTwoFactor = () => {
    toast({
      title: "Two-factor authentication",
      description: "You'll be guided through the process to set up two-factor authentication."
    });
  };
  
  return (
    <Card className="border border-gray-200 shadow-none rounded-none">
      <CardContent className="p-6">
        <h2 className="text-xl md:text-2xl uppercase font-light mb-6 tracking-tighter">Security Settings</h2>
        
        <div className="space-y-6">
          <h3 className="text-lg font-light">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input 
                  id="current-password" 
                  type={showPassword ? "text" : "password"} 
                  className="border-gray-200 pr-10 rounded-none"
                  required
                />
                <Button 
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent rounded-none"
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
                  className="border-gray-200 pr-10 rounded-none"
                  required
                />
                <Button 
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent rounded-none"
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
                  className="border-gray-200 pr-10 rounded-none"
                  required
                />
                <Button 
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent rounded-none"
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
                className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light"
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
              <Button 
                variant="outline" 
                className="rounded-none text-xs font-light"
                onClick={handleEnableTwoFactor}
              >
                Enable
              </Button>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <h3 className="text-lg font-light">Login Sessions</h3>
            <p className="text-sm">You're currently logged in on 1 device</p>
            <Button 
              variant="outline" 
              className="rounded-none text-xs font-light text-red-600 hover:text-red-700"
            >
              Log Out All Devices
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
