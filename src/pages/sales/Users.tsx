
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesManagerList from "@/components/admin/users/SalesManagerList";
import { Brand, Buyer, SalesManager } from "@/types/users";

// Mock data for demonstration purposes
const mockBrands: Brand[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Brand ${i + 1}`,
  status: i % 3 === 0 ? "active" : i % 3 === 1 ? "pending" : "inactive",
  plan: i % 2 === 0 ? "Premium" : "Basic",
  lastActivity: "2023-10-15",
  contactPerson: `John Doe ${i + 1}`,
  email: `contact${i + 1}@brand${i + 1}.com`,
  phone: `+1 555-${i}${i}${i}-${i}${i}${i}${i}`,
  website: `https://brand${i + 1}.com`,
  description: `Description for Brand ${i + 1}`,
  marketSegment: i % 3 === 0 ? "Fashion" : i % 3 === 1 ? "Home Goods" : "Electronics",
  productsCount: Math.floor(Math.random() * 100) + 1,
  activeSince: "2023-01-01",
  avgOrderValue: `$${Math.floor(Math.random() * 500) + 100}`,
  totalSales: `$${Math.floor(Math.random() * 10000) + 1000}`,
}));

const mockBuyers: Buyer[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Buyer ${i + 1}`,
  status: i % 3 === 0 ? "active" : i % 3 === 1 ? "pending" : "inactive",
  plan: i % 2 === 0 ? "Premium" : "Basic",
  lastActivity: "2023-10-15",
  contactPerson: `Jane Doe ${i + 1}`,
  email: `contact${i + 1}@buyer${i + 1}.com`,
  phone: `+1 555-${i}${i}${i}-${i}${i}${i}${i}`,
  website: `https://buyer${i + 1}.com`,
  description: `Description for Buyer ${i + 1}`,
  marketSegment: i % 3 === 0 ? "Department Store" : i % 3 === 1 ? "Boutique" : "Online Marketplace",
  storeCount: Math.floor(Math.random() * 10) + 1,
  activeSince: "2023-01-01",
  avgOrderValue: `$${Math.floor(Math.random() * 500) + 100}`,
  annualPurchases: `$${Math.floor(Math.random() * 1000000) + 100000}`,
}));

const mockSalesManagers: SalesManager[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Sales Manager ${i + 1}`,
  status: i % 3 === 0 ? "active" : i % 3 === 1 ? "pending" : "inactive",
  email: `manager${i + 1}@etage7.com`,
  phone: `+1 555-${i}${i}${i}-${i}${i}${i}${i}`,
  startDate: "2023-01-01",
  yearsInCompany: Math.floor(Math.random() * 5) + 1,
  salaryPerMonth: `$${Math.floor(Math.random() * 3000) + 5000}`,
  totalCommissions: `$${Math.floor(Math.random() * 20000) + 10000}`,
  ytdCommissions: `$${Math.floor(Math.random() * 10000) + 5000}`,
  commissionRate: `${Math.floor(Math.random() * 5) + 2}%`,
}));

const SalesUsers = () => {
  const [activeTab, setActiveTab] = useState("managers");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    setViewMode("add");
    setSelectedUser(null);
  };

  const handleViewUser = (userType: string, userId: number) => {
    setViewMode("view");
    
    let user = null;
    if (userType === "brand") {
      user = mockBrands.find(brand => brand.id === userId);
    } else if (userType === "buyer") {
      user = mockBuyers.find(buyer => buyer.id === userId);
    } else if (userType === "manager") {
      user = mockSalesManagers.find(manager => manager.id === userId);
    }
    
    setSelectedUser(user);
  };

  const handleEditUser = (userType: string, userId: number) => {
    setViewMode("edit");
    
    let user = null;
    if (userType === "brand") {
      user = mockBrands.find(brand => brand.id === userId);
    } else if (userType === "buyer") {
      user = mockBuyers.find(buyer => buyer.id === userId);
    } else if (userType === "manager") {
      user = mockSalesManagers.find(manager => manager.id === userId);
    }
    
    setSelectedUser(user);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-light tracking-tighter">Users Management</h1>
      
      <Card className="border-gray-200 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-light">User Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="managers" className="text-sm">SALES MANAGERS</TabsTrigger>
              <TabsTrigger value="brands" className="text-sm">BRANDS</TabsTrigger>
              <TabsTrigger value="buyers" className="text-sm">BUYERS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="managers" className="space-y-4">
              <SalesManagerList 
                salesManagers={mockSalesManagers}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                handleAddUser={handleAddUser}
                handleViewUser={handleViewUser}
                handleEditUser={handleEditUser}
              />
            </TabsContent>
            
            {/* Note: The brand and buyer lists would be imported from their respective components */}
            <TabsContent value="brands" className="space-y-4">
              <p className="text-center py-6 text-gray-500">Brand management interface would be displayed here</p>
            </TabsContent>
            
            <TabsContent value="buyers" className="space-y-4">
              <p className="text-center py-6 text-gray-500">Buyer management interface would be displayed here</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesUsers;
