
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brand, Buyer, SalesManager, InvitedUser, RegistrationRequest } from "@/types/users";
import PendingRegistrations from "@/components/admin/users/PendingRegistrations";
import ActiveUsers from "@/components/admin/users/ActiveUsers";
import InactiveUsers from "@/components/admin/users/InactiveUsers";
import InvitedUsers from "@/components/admin/users/InvitedUsers";
import SalesManagerList from "@/components/admin/users/SalesManagerList";
import InviteUserForm from "@/components/admin/users/InviteUserForm";

const Users = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">USER MANAGEMENT</h1>
      
      <div className="border-t border-gray-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="pending" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Pending Registration
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Active Users
            </TabsTrigger>
            <TabsTrigger 
              value="inactive" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Inactive Users
            </TabsTrigger>
            <TabsTrigger 
              value="invited" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Invited Users
            </TabsTrigger>
            <TabsTrigger 
              value="sales" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Sales Managers
            </TabsTrigger>
            <TabsTrigger 
              value="invite" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Invite Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <PendingRegistrations />
          </TabsContent>
          
          <TabsContent value="active">
            <ActiveUsers />
          </TabsContent>
          
          <TabsContent value="inactive">
            <InactiveUsers />
          </TabsContent>
          
          <TabsContent value="invited">
            <InvitedUsers />
          </TabsContent>
          
          <TabsContent value="sales">
            <SalesManagerList />
          </TabsContent>
          
          <TabsContent value="invite">
            <InviteUserForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Users;
