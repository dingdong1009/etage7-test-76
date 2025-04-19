
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brand, Buyer, SalesManager, InvitedUser, RegistrationRequest } from "@/types/users";
import PendingRegistrations from "@/components/admin/users/PendingRegistrations";
import ActiveUsers from "@/components/admin/users/ActiveUsers";
import InactiveUsers from "@/components/admin/users/InactiveUsers";
import InvitedUsers from "@/components/admin/users/InvitedUsers";
import SalesManagerList from "@/components/admin/users/SalesManagerList";
import InviteUserForm from "@/components/admin/users/InviteUserForm";

// Mock data for sales managers
const mockSalesManagers: SalesManager[] = [
  {
    id: 1,
    name: "Jessica Thompson",
    status: "active",
    email: "jessica@etage7.com",
    phone: "+1 (555) 123-4567",
    startDate: "March 2017",
    yearsInCompany: 6,
    salaryPerMonth: "$7,500",
    totalCommissions: "$230,000",
    ytdCommissions: "$78,500",
    commissionRate: "3.2%",
    lastActivity: "2024-03-15", // Added missing required field
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    status: "active",
    email: "marcus@etage7.com",
    phone: "+1 (555) 234-5678",
    startDate: "June 2019",
    yearsInCompany: 4,
    salaryPerMonth: "$6,500",
    totalCommissions: "$120,000",
    ytdCommissions: "$45,200",
    commissionRate: "2.8%",
    lastActivity: "2024-03-20", // Added missing required field
  },
];

const Users = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const handleAddUser = () => {
    console.log("Add new user");
  };
  
  const handleViewUser = (userType: string, userId: number) => {
    console.log("View user", userType, userId);
  };
  
  const handleEditUser = (userType: string, userId: number) => {
    console.log("Edit user", userType, userId);
  };

  return (
    <div className="space-y-6 pt-5">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">User management</h1>
      
      <div className="pt-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="pending" 
              className="text-xs font-normal uppercase border-r border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-r data-[state=active]:border-white"
            >
              Pending Registration
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              Active Users
            </TabsTrigger>
            <TabsTrigger 
              value="inactive" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              Inactive Users
            </TabsTrigger>
            <TabsTrigger 
              value="invited" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              Invited Users
            </TabsTrigger>
            <TabsTrigger 
              value="sales" 
              className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
            >
              Sales Managers
            </TabsTrigger>
            <TabsTrigger 
              value="invite" 
              className="text-xs font-normal uppercase border-l border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-l data-[state=active]:border-white"
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
            <SalesManagerList 
              salesManagers={mockSalesManagers} 
              statusFilter={statusFilter} 
              setStatusFilter={setStatusFilter}
              handleAddUser={handleAddUser}
              handleViewUser={handleViewUser}
              handleEditUser={handleEditUser}
            />
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
