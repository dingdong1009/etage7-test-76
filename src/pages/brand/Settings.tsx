
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandSettings from "@/components/brand/settings/BrandSettings";
import ProfileSettings from "@/components/brand/settings/ProfileSettings";
import SecuritySettings from "@/components/brand/settings/SecuritySettings";
import NotificationSettings from "@/components/brand/settings/NotificationSettings";
import TeamSettings from "@/components/brand/settings/TeamSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase">Settings</h1>
        <p className="text-sm font-light text-gray-600 max-w-2xl">
          Manage your brand settings, profile, security, and team.
        </p>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="border-b border-gray-100">
          <TabsList className="bg-transparent p-0 h-auto mb-[-1px]">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 h-auto text-xs uppercase font-light"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="brand" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 h-auto text-xs uppercase font-light"
            >
              Brand
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 h-auto text-xs uppercase font-light"
            >
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 h-auto text-xs uppercase font-light"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 h-auto text-xs uppercase font-light"
            >
              Team
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="profile" className="mt-6">
          <ProfileSettings />
        </TabsContent>
        
        <TabsContent value="brand" className="mt-6">
          <BrandSettings />
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="team" className="mt-6">
          <TeamSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
