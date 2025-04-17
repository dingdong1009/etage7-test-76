
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ProfileSettings: React.FC = () => {
  const [userData, setUserData] = useState({
    name: "Sarah Johnson",
    email: "sarah@fashionbrand.com",
    phone: "+1 (555) 123-4567",
    role: "Brand Manager",
    language: "english",
    timezone: "america_new_york"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the profile data to your backend
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };

  return (
    <Card className="border border-gray-200 shadow-none rounded-none">
      <CardContent className="p-6">
        <h2 className="text-xl md:text-2xl uppercase font-light mb-6 tracking-tighter">Personal Information</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <Button 
              size="icon"
              variant="outline" 
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <form className="flex-1 space-y-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="border-gray-200 rounded-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="border-gray-200 rounded-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="border-gray-200 rounded-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  value={userData.role}
                  onChange={(e) => setUserData({...userData, role: e.target.value})}
                  className="border-gray-200 rounded-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={userData.language}
                  onValueChange={(value) => setUserData({...userData, language: value})}
                >
                  <SelectTrigger id="language" className="border-gray-200 rounded-none">
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
                  onValueChange={(value) => setUserData({...userData, timezone: value})}
                >
                  <SelectTrigger id="timezone" className="border-gray-200 rounded-none">
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
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
