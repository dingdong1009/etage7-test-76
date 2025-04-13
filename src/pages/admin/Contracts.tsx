
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brand, Buyer, CommissionChange, SalesManager, UserType, ViewMode } from "@/types/users";
import BrandList from "@/components/admin/users/BrandList";
import BuyerList from "@/components/admin/users/BuyerList";
import SalesManagerList from "@/components/admin/users/SalesManagerList";
import UserDetails from "@/components/admin/users/UserDetails";
import UserEditForm from "@/components/admin/users/UserEditForm";
import UserAddForm from "@/components/admin/users/UserAddForm";

const SalesUsers = () => {
  const [activeTab, setActiveTab] = useState<UserType>("brand");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedUser, setSelectedUser] = useState<Brand | Buyer | SalesManager | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Sample data moved higher up
  const brands: Brand[] = [
    { 
      id: 1, 
      name: "Luxury Brands Inc.", 
      status: "active", 
      plan: "Premium", 
      lastActivity: "2 hours ago",
      contactPerson: "John Smith",
      email: "john@luxurybrandsinc.com",
      phone: "+1 (555) 123-4567",
      website: "luxurybrandsinc.com",
      description: "Leading luxury fashion and accessories brand focused on high-end retail market",
      marketSegment: "Luxury Apparel",
      productsCount: 245,
      activeSince: "June 2018",
      avgOrderValue: "$2,500",
      totalSales: "$1.2M"
    },
    { 
      id: 2, 
      name: "Fashion Forward Co.", 
      status: "active", 
      plan: "Professional", 
      lastActivity: "1 day ago",
      contactPerson: "Emily Johnson",
      email: "emily@fashionforward.co",
      phone: "+1 (555) 234-5678",
      website: "fashionforward.co",
      description: "Contemporary fashion brand targeting young professionals",
      marketSegment: "Contemporary Fashion",
      productsCount: 178,
      activeSince: "March 2019",
      avgOrderValue: "$750",
      totalSales: "$890K"
    },
    { 
      id: 3, 
      name: "Elegant Styles Ltd.", 
      status: "pending", 
      plan: "Basic", 
      lastActivity: "3 days ago",
      contactPerson: "Michael Williams",
      email: "michael@elegantstyles.com",
      phone: "+1 (555) 345-6789",
      website: "elegantstyles.com",
      description: "Classic formal wear and evening attire for special occasions",
      marketSegment: "Formal Wear",
      productsCount: 85,
      activeSince: "November 2020",
      avgOrderValue: "$1,200",
      totalSales: "$430K"
    },
    { 
      id: 4, 
      name: "Heritage Designs", 
      status: "active", 
      plan: "Premium", 
      lastActivity: "5 hours ago",
      contactPerson: "Sarah Brown",
      email: "sarah@heritagedesigns.com",
      phone: "+1 (555) 456-7890",
      website: "heritagedesigns.com",
      description: "Traditional and heritage-inspired clothing with modern touches",
      marketSegment: "Heritage Fashion",
      productsCount: 132,
      activeSince: "April 2017",
      avgOrderValue: "$950",
      totalSales: "$1.5M"
    },
    { 
      id: 5, 
      name: "Modern Collections", 
      status: "inactive", 
      plan: "Basic", 
      lastActivity: "2 weeks ago",
      contactPerson: "David Lee",
      email: "david@moderncollections.com",
      phone: "+1 (555) 567-8901",
      website: "moderncollections.com",
      description: "Minimalist modern fashion focusing on sustainable materials",
      marketSegment: "Sustainable Fashion",
      productsCount: 67,
      activeSince: "September 2021",
      avgOrderValue: "$500",
      totalSales: "$210K"
    }
  ];

  const buyers: Buyer[] = [
    { 
      id: 1, 
      name: "Department Store Group", 
      status: "active", 
      plan: "Enterprise", 
      lastActivity: "1 hour ago",
      contactPerson: "Robert Chen",
      email: "robert@departmentstoregroup.com",
      phone: "+1 (555) 678-9012",
      website: "departmentstoregroup.com",
      description: "National chain of premium department stores operating in major cities",
      marketSegment: "Department Stores",
      storeCount: 35,
      activeSince: "January 2015",
      avgOrderValue: "$45,000",
      annualPurchases: "$12M"
    },
    { 
      id: 2, 
      name: "Boutique Network LLC", 
      status: "active", 
      plan: "Professional", 
      lastActivity: "3 days ago",
      contactPerson: "Amanda Taylor",
      email: "amanda@boutiquenetwork.com",
      phone: "+1 (555) 789-0123",
      website: "boutiquenetwork.com",
      description: "Collective of upscale boutiques specializing in designer fashion",
      marketSegment: "Boutiques",
      storeCount: 12,
      activeSince: "May 2018",
      avgOrderValue: "$15,000",
      annualPurchases: "$2.5M"
    },
    { 
      id: 3, 
      name: "Global Retail Partners", 
      status: "pending", 
      plan: "Premium", 
      lastActivity: "1 week ago",
      contactPerson: "James Wilson",
      email: "james@globalretail.com",
      phone: "+1 (555) 890-1234",
      website: "globalretailpartners.com",
      description: "International retail group with presence in luxury malls worldwide",
      marketSegment: "International Retail",
      storeCount: 28,
      activeSince: "August 2017",
      avgOrderValue: "$32,000",
      annualPurchases: "$8.7M"
    },
    { 
      id: 4, 
      name: "Fashion Outlets Inc.", 
      status: "active", 
      plan: "Enterprise", 
      lastActivity: "12 hours ago",
      contactPerson: "Elizabeth Moore",
      email: "elizabeth@fashionoutlets.com",
      phone: "+1 (555) 901-2345",
      website: "fashionoutlets.com",
      description: "Operator of premium outlet malls featuring designer brands",
      marketSegment: "Outlet Retail",
      storeCount: 18,
      activeSince: "March 2016",
      avgOrderValue: "$28,000",
      annualPurchases: "$6.2M"
    },
    { 
      id: 5, 
      name: "Luxury Retail Alliance", 
      status: "inactive", 
      plan: "Basic", 
      lastActivity: "1 month ago",
      contactPerson: "Thomas Garcia",
      email: "thomas@luxuryretail.org",
      phone: "+1 (555) 012-3456",
      website: "luxuryretailalliance.org",
      description: "Consortium of high-end retailers focused on luxury goods market",
      marketSegment: "Luxury Retail",
      storeCount: 7,
      activeSince: "October 2019",
      avgOrderValue: "$18,000",
      annualPurchases: "$1.4M"
    }
  ];

  const salesManagers: SalesManager[] = [
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
      description: "Senior sales manager specializing in luxury brand accounts",
      seniorityLevel: "Senior",
      region: "North America",
      managedAccounts: 12,
      activeSince: "March 2017",
      monthlyTarget: "$500K",
      quarterlyPerformance: "105%",
      lastActivity: "30 minutes ago",
      commissionHistory: [
        {
          id: 1,
          rate: "2.5%",
          effectiveDate: "March 2017",
          notes: "Initial commission rate"
        },
        {
          id: 2,
          rate: "3.0%",
          effectiveDate: "January 2019",
          notes: "Performance increase after exceeding targets for 4 consecutive quarters"
        },
        {
          id: 3,
          rate: "3.2%",
          effectiveDate: "January 2022",
          notes: "Annual review adjustment"
        }
      ]
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
      description: "Mid-level sales manager focused on department store accounts",
      seniorityLevel: "Mid-level",
      region: "Europe",
      managedAccounts: 8,
      activeSince: "June 2019",
      monthlyTarget: "$350K",
      quarterlyPerformance: "98%",
      lastActivity: "2 hours ago",
      commissionHistory: [
        {
          id: 1,
          rate: "2.2%",
          effectiveDate: "June 2019",
          notes: "Initial commission rate"
        },
        {
          id: 2,
          rate: "2.5%",
          effectiveDate: "June 2020",
          notes: "First year performance review"
        },
        {
          id: 3,
          rate: "2.8%",
          effectiveDate: "January 2022",
          notes: "Promotion to mid-level manager"
        }
      ]
    },
    { 
      id: 3, 
      name: "Aisha Johnson", 
      status: "pending", 
      email: "aisha@etage7.com",
      phone: "+1 (555) 345-6789",
      startDate: "January 2023",
      yearsInCompany: 1,
      salaryPerMonth: "$5,500",
      totalCommissions: "$28,000",
      ytdCommissions: "$16,300",
      commissionRate: "2.0%",
      description: "New sales manager currently onboarding with initial client portfolio",
      seniorityLevel: "Junior",
      region: "Asia Pacific",
      managedAccounts: 5,
      activeSince: "January 2023",
      monthlyTarget: "$200K",
      quarterlyPerformance: "87%",
      lastActivity: "2 days ago",
      commissionHistory: [
        {
          id: 1,
          rate: "2.0%",
          effectiveDate: "January 2023",
          notes: "Initial commission rate"
        }
      ]
    },
    { 
      id: 4, 
      name: "Richard Chen", 
      status: "active", 
      email: "richard@etage7.com",
      phone: "+1 (555) 456-7890",
      startDate: "April 2016",
      yearsInCompany: 7,
      salaryPerMonth: "$8,500",
      totalCommissions: "$350,000",
      ytdCommissions: "$112,500",
      commissionRate: "3.5%",
      description: "Senior sales manager with expertise in international markets",
      seniorityLevel: "Senior",
      region: "Global",
      managedAccounts: 15,
      activeSince: "April 2016",
      monthlyTarget: "$650K",
      quarterlyPerformance: "112%",
      lastActivity: "1 day ago",
      commissionHistory: [
        {
          id: 1,
          rate: "2.2%",
          effectiveDate: "April 2016",
          notes: "Initial commission rate"
        },
        {
          id: 2,
          rate: "2.8%",
          effectiveDate: "April 2018",
          notes: "Performance increase after two years"
        },
        {
          id: 3,
          rate: "3.2%",
          effectiveDate: "January 2020",
          notes: "Promotion to senior sales manager"
        },
        {
          id: 4,
          rate: "3.5%",
          effectiveDate: "January 2022",
          notes: "Exceptional performance adjustment"
        }
      ]
    },
    { 
      id: 5, 
      name: "Sarah Miller", 
      status: "inactive", 
      email: "sarah@etage7.com",
      phone: "+1 (555) 567-8901",
      startDate: "August 2020",
      yearsInCompany: 3,
      salaryPerMonth: "$6,200",
      totalCommissions: "$82,000",
      ytdCommissions: "$8,400",
      commissionRate: "2.5%",
      description: "Sales manager currently on extended leave",
      seniorityLevel: "Mid-level",
      region: "Middle East",
      managedAccounts: 7,
      activeSince: "August 2020",
      monthlyTarget: "$300K",
      quarterlyPerformance: "92%",
      lastActivity: "3 weeks ago",
      commissionHistory: [
        {
          id: 1,
          rate: "2.0%",
          effectiveDate: "August 2020",
          notes: "Initial commission rate"
        },
        {
          id: 2,
          rate: "2.5%",
          effectiveDate: "September 2021",
          notes: "Annual performance review increase"
        }
      ]
    }
  ];

  const handleAddUserSubmit = (data) => {
    console.log("Form submitted:", data);
    setViewMode("list");
  };

  const handleEditUserSubmit = (data) => {
    console.log("Edit form submitted:", data);
    setViewMode("list");
  };

  const handleGoBack = () => {
    setViewMode("list");
    setSelectedUser(null);
  };

  const handleViewUser = (userType: string, userId: number) => {
    let userList;
    if (userType === "brand") {
      userList = brands;
    } else if (userType === "buyer") {
      userList = buyers;
    } else {
      userList = salesManagers;
    }
    
    const user = userList.find(u => u.id === userId);
    
    if (user) {
      setSelectedUser(user);
      setViewMode("view");
    }
  };

  const handleEditUser = (userType: string, userId: number) => {
    let userList;
    if (userType === "brand") {
      userList = brands;
    } else if (userType === "buyer") {
      userList = buyers;
    } else {
      userList = salesManagers;
    }
    
    const user = userList.find(u => u.id === userId);
    
    if (user) {
      setSelectedUser(user);
      setViewMode("edit");
    }
  };

  const handleAddUser = () => {
    setViewMode("add");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">Contract Templates</h1>
      <Tabs defaultValue="brand" className="w-full" onValueChange={(value) => setActiveTab(value as UserType)}>
        <div className="border-t border-gray-200 mb-6">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="brand" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Managed Brands 
            </TabsTrigger>
            <TabsTrigger 
              value="buyer" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Managed Buyers
            </TabsTrigger>
            <TabsTrigger 
              value="salesManager" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Sales Managers
            </TabsTrigger> 
          </TabsList>
        </div>

        <TabsContent value="brand">
          {viewMode === "list" && (
            <BrandList 
              brands={brands} 
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              handleAddUser={handleAddUser}
              handleViewUser={handleViewUser}
              handleEditUser={handleEditUser}
            />
          )}
          {viewMode === "view" && selectedUser && (
            <UserDetails 
              user={selectedUser as Brand} 
              activeTab={activeTab}
              handleGoBack={handleGoBack}
              handleEditUser={handleEditUser}
            />
          )}
          {viewMode === "edit" && selectedUser && (
            <UserEditForm 
              user={selectedUser as Brand}
              activeTab={activeTab}
              handleGoBack={handleGoBack}
              handleEditUserSubmit={handleEditUserSubmit}
            />
          )}
          {viewMode === "add" && (
            <UserAddForm 
              activeTab={activeTab}
              handleGoBack={handleGoBack}
              handleAddUserSubmit={handleAddUserSubmit}
            />
          )}
        </TabsContent>

        <TabsContent value="buyer">
          {viewMode === "list" && (
            <BuyerList 
              buyers={buyers} 
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              handleAddUser={handleAddUser}
              handleViewUser={handleViewUser}
              handleEditUser={handleEditUser}
            />
          )}
          {viewMode === "view" && selectedUser && (
            <UserDetails 
              user={selectedUser as Buyer}
              activeTab={activeTab}
              handleGoBack={handleGoBack}
              handleEditUser={handleEditUser}
            />
          )}
          {viewMode === "edit" && selectedUser && (
            <UserEditForm 
              user={selectedUser as Buyer}
              activeTab={activeTab}
              handleGoBack={handleGoBack}
              handleEditUserSubmit={handleEditUserSubmit}
            />
          )}
          {viewMode === "add" && (
            <UserAddForm 
              activeTab={activeTab}
              handleGoBack={handleGoBack}
              handleAddUserSubmit={handleAddUserSubmit}
            />
          )}
        </TabsContent>

        <TabsContent value="salesManager">
          {viewMode === "list" && (
            <SalesManagerList 
              salesManagers={salesManagers} 
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              handleAddUser={handleAddUser}
              handleViewUser={handleViewUser}
              handleEditUser={handleEditUser}
            />
          )}
          {viewMode === "view" && selectedUser && (
            <UserDetails 
              user={selectedUser as SalesManager}
              activeTab={activeTab}
              handleGoBack={handleGoBack}
              handleEditUser={handleEditUser}
            />
          )}
          {viewMode === "edit" && selectedUser && (
            <UserEditForm 
              user={selectedUser as SalesManager}
              activeTab={activeTab}
              handleGoBack={handleGoBack}
              handleEditUserSubmit={handleEditUserSubmit}
            />
          )}
          {viewMode === "add" && (
            <UserAddForm 
              activeTab={activeTab}
              handleGoBack={handleGoBack}
              handleAddUserSubmit={handleAddUserSubmit}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContracts;
