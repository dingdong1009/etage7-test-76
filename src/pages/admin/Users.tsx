
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { UserType, ViewMode, Brand, Buyer, SalesManager, isBrand, isBuyer, isSalesManager } from "@/types/users";
import { brands, buyers, salesManagers } from "@/data/mockUsers";

// Import list components
import BrandsList from "@/components/admin/users/brand/BrandsList";
import BuyersList from "@/components/admin/users/buyer/BuyersList";
import SalesManagersList from "@/components/admin/users/salesManager/SalesManagersList";

// Import view components
import BrandView from "@/components/admin/users/brand/BrandView";
import BuyerView from "@/components/admin/users/buyer/BuyerView";
import SalesManagerView from "@/components/admin/users/salesManager/SalesManagerView";

// Import form components
import BrandForm from "@/components/admin/users/brand/BrandForm";
import BuyerForm from "@/components/admin/users/buyer/BuyerForm";
import SalesManagerForm from "@/components/admin/users/salesManager/SalesManagerForm";
import BackButton from "@/components/admin/users/BackButton";
import { Users } from "lucide-react";

const SalesUsers = () => {
  const [activeTab, setActiveTab] = useState<UserType>("brand");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedUser, setSelectedUser] = useState<Brand | Buyer | SalesManager | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const handleAddUser = () => {
    setViewMode("add");
  };

  const handleViewUser = (userType: UserType, userId: number) => {
    let user;
    if (userType === "brand") {
      user = brands.find(b => b.id === userId);
    } else if (userType === "buyer") {
      user = buyers.find(b => b.id === userId);
    } else if (userType === "salesManager") {
      user = salesManagers.find(s => s.id === userId);
    }
    
    setSelectedUser(user || null);
    setActiveTab(userType);
    setViewMode("view");
  };

  const handleEditUser = (userType: UserType, userId: number) => {
    let user;
    if (userType === "brand") {
      user = brands.find(b => b.id === userId);
    } else if (userType === "buyer") {
      user = buyers.find(b => b.id === userId);
    } else if (userType === "salesManager") {
      user = salesManagers.find(s => s.id === userId);
    }
    
    setSelectedUser(user || null);
    setActiveTab(userType);
    setViewMode("edit");
  };

  const handleGoBack = () => {
    setViewMode("list");
    setSelectedUser(null);
  };

  const handleAddUserSubmit = (data: any) => {
    console.log(`Adding new ${activeTab}:`, data);
    toast({
      title: "User Added",
      description: `The ${activeTab} has been successfully added.`,
    });
    setViewMode("list");
  };

  const handleEditUserSubmit = (data: any) => {
    console.log(`Updating ${activeTab}:`, data);
    toast({
      title: "User Updated",
      description: `The ${activeTab} has been successfully updated.`,
    });
    setViewMode("list");
  };

  const renderContent = () => {
    // List view
    if (viewMode === "list") {
      return (
        <TabsContent value="brand" className={activeTab === "brand" ? "block" : "hidden"}>
          <BrandsList 
            statusFilter={statusFilter} 
            onStatusFilterChange={setStatusFilter} 
            onAddUser={handleAddUser} 
            onViewUser={handleViewUser} 
            onEditUser={handleEditUser} 
          />
        </TabsContent>
      );
    }
    
    // View mode
    if (viewMode === "view" && selectedUser) {
      if (isBrand(selectedUser) && activeTab === "brand") {
        return <BrandView brand={selectedUser} onBack={handleGoBack} onEdit={handleEditUser} />;
      }
      if (isBuyer(selectedUser) && activeTab === "buyer") {
        return <BuyerView buyer={selectedUser} onBack={handleGoBack} onEdit={handleEditUser} />;
      }
      if (isSalesManager(selectedUser) && activeTab === "salesManager") {
        return <SalesManagerView salesManager={selectedUser} onBack={handleGoBack} onEdit={handleEditUser} />;
      }
    }
    
    // Add mode
    if (viewMode === "add") {
      if (activeTab === "brand") {
        return (
          <Card className="border border-gray-200">
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="flex items-center space-x-4">
                <BackButton onClick={handleGoBack} />
                <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                  Add New Brand
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <BrandForm 
                onSubmit={handleAddUserSubmit} 
                onCancel={handleGoBack} 
              />
            </CardContent>
          </Card>
        );
      }
      if (activeTab === "buyer") {
        return (
          <Card className="border border-gray-200">
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="flex items-center space-x-4">
                <BackButton onClick={handleGoBack} />
                <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                  Add New Buyer
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <BuyerForm 
                onSubmit={handleAddUserSubmit} 
                onCancel={handleGoBack} 
              />
            </CardContent>
          </Card>
        );
      }
      if (activeTab === "salesManager") {
        return (
          <Card className="border border-gray-200">
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="flex items-center space-x-4">
                <BackButton onClick={handleGoBack} />
                <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                  Add New Sales Manager
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <SalesManagerForm 
                onSubmit={handleAddUserSubmit} 
                onCancel={handleGoBack} 
              />
            </CardContent>
          </Card>
        );
      }
    }
    
    // Edit mode
    if (viewMode === "edit" && selectedUser) {
      if (isBrand(selectedUser) && activeTab === "brand") {
        return (
          <Card className="border border-gray-200">
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="flex items-center space-x-4">
                <BackButton onClick={handleGoBack} />
                <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                  Edit Brand: {selectedUser.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <BrandForm 
                initialData={selectedUser}
                onSubmit={handleEditUserSubmit} 
                onCancel={handleGoBack} 
                isEdit={true}
              />
            </CardContent>
          </Card>
        );
      }
      if (isBuyer(selectedUser) && activeTab === "buyer") {
        return (
          <Card className="border border-gray-200">
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="flex items-center space-x-4">
                <BackButton onClick={handleGoBack} />
                <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                  Edit Buyer: {selectedUser.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <BuyerForm 
                initialData={selectedUser}
                onSubmit={handleEditUserSubmit} 
                onCancel={handleGoBack} 
                isEdit={true}
              />
            </CardContent>
          </Card>
        );
      }
      if (isSalesManager(selectedUser) && activeTab === "salesManager") {
        return (
          <Card className="border border-gray-200">
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="flex items-center space-x-4">
                <BackButton onClick={handleGoBack} />
                <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                  Edit Sales Manager: {selectedUser.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <SalesManagerForm 
                initialData={selectedUser}
                onSubmit={handleEditUserSubmit} 
                onCancel={handleGoBack} 
                isEdit={true}
              />
            </CardContent>
          </Card>
        );
      }
    }
    
    // Default empty state
    return null;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Users className="mr-2 h-6 w-6" />
        <h1 className="text-3xl font-bold">Users</h1>
      </div>
      
      {viewMode === "list" && (
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as UserType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="brand">Brands</TabsTrigger>
            <TabsTrigger value="buyer">Buyers</TabsTrigger>
            <TabsTrigger value="salesManager">Sales Managers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="brand">
            <BrandsList 
              statusFilter={statusFilter} 
              onStatusFilterChange={setStatusFilter} 
              onAddUser={handleAddUser} 
              onViewUser={handleViewUser} 
              onEditUser={handleEditUser} 
            />
          </TabsContent>
          
          <TabsContent value="buyer">
            <BuyersList 
              statusFilter={statusFilter} 
              onStatusFilterChange={setStatusFilter} 
              onAddUser={handleAddUser} 
              onViewUser={handleViewUser} 
              onEditUser={handleEditUser} 
            />
          </TabsContent>
          
          <TabsContent value="salesManager">
            <SalesManagersList 
              statusFilter={statusFilter} 
              onStatusFilterChange={setStatusFilter} 
              onAddUser={handleAddUser} 
              onViewUser={handleViewUser} 
              onEditUser={handleEditUser} 
            />
          </TabsContent>
        </Tabs>
      )}
      
      {viewMode !== "list" && renderContent()}
    </div>
  );
};

export default SalesUsers;
