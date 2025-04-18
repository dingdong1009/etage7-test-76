
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, BadgePercent, BarChart3 } from "lucide-react";
import { RegistrationRequest, SalesManager } from "@/types/users";
import RegistrationRequestsTable from "@/components/admin/dashboard/RegistrationRequestsTable";
import SalesPerformanceSection from "@/components/admin/dashboard/SalesPerformanceSection";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  // Mock data for registration requests
  const [registrationRequests, setRegistrationRequests] = useState<RegistrationRequest[]>([
    {
      id: 1,
      userType: "brand",
      companyName: "Nouveau Fashion",
      contactPerson: "Emma Johnson",
      email: "emma@nouveaufashion.com",
      phone: "+1 (555) 123-4567",
      status: "pending",
      registrationDate: "2023-04-15",
      website: "nouveaufashion.com",
      description: "Contemporary sustainable fashion brand"
    },
    {
      id: 2,
      userType: "buyer",
      companyName: "Elite Department Stores",
      contactPerson: "Michael Smith",
      email: "michael@elitestores.com",
      phone: "+1 (555) 234-5678",
      status: "pending",
      registrationDate: "2023-04-14",
      website: "elitestores.com",
      description: "Premium department store chain"
    },
    {
      id: 3,
      userType: "brand",
      companyName: "Heritage Apparel Co.",
      contactPerson: "David Wilson",
      email: "david@heritageapparel.com",
      phone: "+1 (555) 345-6789",
      status: "approved",
      registrationDate: "2023-04-10",
      assignedManager: 1,
      website: "heritageapparel.com",
      description: "Traditional clothing with modern designs"
    },
    {
      id: 4,
      userType: "buyer",
      companyName: "Boutique Collection",
      contactPerson: "Sophia Garcia",
      email: "sophia@boutiquecollection.com",
      phone: "+1 (555) 456-7890",
      status: "rejected",
      registrationDate: "2023-04-08",
      website: "boutiquecollection.com",
      description: "Curated collection of boutique stores"
    },
    {
      id: 5,
      userType: "brand",
      companyName: "Modern Essentials",
      contactPerson: "James Brown",
      email: "james@modernessentials.com",
      phone: "+1 (555) 567-8901",
      status: "pending",
      registrationDate: "2023-04-16",
      website: "modernessentials.com",
      description: "Minimalist everyday fashion basics"
    }
  ]);

  // Mock data for sales managers with performance metrics
  const [salesManagers, setSalesManagers] = useState<SalesManager[]>([
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
      seniorityLevel: "Senior",
      region: "North America",
      managedAccounts: 12,
      activeSince: "March 2017",
      monthlyTarget: "$500K",
      quarterlyPerformance: "105%",
      lastActivity: "30 minutes ago",
      // Performance metrics
      totalSubscriptions: 45,
      renewalRate: "87%",
      conversionRate: "65%",
      monthlySubscriptions: [
        { month: "Jan", subscriptions: 3, renewals: 85, leads: 5, conversions: 60 },
        { month: "Feb", subscriptions: 5, renewals: 82, leads: 8, conversions: 63 },
        { month: "Mar", subscriptions: 4, renewals: 88, leads: 7, conversions: 57 },
        { month: "Apr", subscriptions: 6, renewals: 90, leads: 9, conversions: 67 },
        { month: "May", subscriptions: 8, renewals: 86, leads: 12, conversions: 67 },
        { month: "Jun", subscriptions: 7, renewals: 91, leads: 10, conversions: 70 }
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
      seniorityLevel: "Mid-level",
      region: "Europe",
      managedAccounts: 8,
      activeSince: "June 2019",
      monthlyTarget: "$350K",
      quarterlyPerformance: "98%",
      lastActivity: "2 hours ago",
      // Performance metrics
      totalSubscriptions: 32,
      renewalRate: "78%",
      conversionRate: "58%",
      monthlySubscriptions: [
        { month: "Jan", subscriptions: 2, renewals: 75, leads: 4, conversions: 50 },
        { month: "Feb", subscriptions: 4, renewals: 77, leads: 7, conversions: 57 },
        { month: "Mar", subscriptions: 5, renewals: 79, leads: 9, conversions: 56 },
        { month: "Apr", subscriptions: 6, renewals: 77, leads: 11, conversions: 55 },
        { month: "May", subscriptions: 7, renewals: 80, leads: 12, conversions: 58 },
        { month: "Jun", subscriptions: 8, renewals: 80, leads: 14, conversions: 57 }
      ]
    },
    {
      id: 3,
      name: "Aisha Johnson",
      status: "active",
      email: "aisha@etage7.com",
      phone: "+1 (555) 345-6789",
      startDate: "January 2023",
      yearsInCompany: 1,
      salaryPerMonth: "$5,500",
      totalCommissions: "$28,000",
      ytdCommissions: "$16,300",
      commissionRate: "2.0%",
      seniorityLevel: "Junior",
      region: "Asia Pacific",
      managedAccounts: 5,
      activeSince: "January 2023",
      monthlyTarget: "$200K",
      quarterlyPerformance: "87%",
      lastActivity: "2 days ago",
      // Performance metrics
      totalSubscriptions: 18,
      renewalRate: "70%",
      conversionRate: "45%",
      monthlySubscriptions: [
        { month: "Jan", subscriptions: 1, renewals: 65, leads: 3, conversions: 33 },
        { month: "Feb", subscriptions: 2, renewals: 68, leads: 5, conversions: 40 },
        { month: "Mar", subscriptions: 3, renewals: 70, leads: 7, conversions: 43 },
        { month: "Apr", subscriptions: 3, renewals: 71, leads: 7, conversions: 43 },
        { month: "May", subscriptions: 4, renewals: 73, leads: 9, conversions: 44 },
        { month: "Jun", subscriptions: 5, renewals: 74, leads: 10, conversions: 50 }
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
      seniorityLevel: "Senior",
      region: "Global",
      managedAccounts: 15,
      activeSince: "April 2016",
      monthlyTarget: "$650K",
      quarterlyPerformance: "112%",
      lastActivity: "1 day ago",
      // Performance metrics
      totalSubscriptions: 52,
      renewalRate: "92%",
      conversionRate: "73%",
      monthlySubscriptions: [
        { month: "Jan", subscriptions: 4, renewals: 90, leads: 6, conversions: 67 },
        { month: "Feb", subscriptions: 7, renewals: 91, leads: 10, conversions: 70 },
        { month: "Mar", subscriptions: 9, renewals: 93, leads: 12, conversions: 75 },
        { month: "Apr", subscriptions: 10, renewals: 92, leads: 14, conversions: 71 },
        { month: "May", subscriptions: 11, renewals: 94, leads: 15, conversions: 73 },
        { month: "Jun", subscriptions: 11, renewals: 92, leads: 15, conversions: 73 }
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
      seniorityLevel: "Mid-level",
      region: "Middle East",
      managedAccounts: 7,
      activeSince: "August 2020",
      monthlyTarget: "$300K",
      quarterlyPerformance: "92%",
      lastActivity: "3 weeks ago",
      // Performance metrics
      totalSubscriptions: 12,
      renewalRate: "65%",
      conversionRate: "40%",
      monthlySubscriptions: [
        { month: "Jan", subscriptions: 3, renewals: 62, leads: 8, conversions: 38 },
        { month: "Feb", subscriptions: 2, renewals: 65, leads: 6, conversions: 33 },
        { month: "Mar", subscriptions: 2, renewals: 64, leads: 5, conversions: 40 },
        { month: "Apr", subscriptions: 2, renewals: 67, leads: 5, conversions: 40 },
        { month: "May", subscriptions: 2, renewals: 66, leads: 5, conversions: 40 },
        { month: "Jun", subscriptions: 1, renewals: 68, leads: 3, conversions: 33 }
      ]
    }
  ]);

  const stats = [
    { title: "Active Users", count: 1254, description: "Registered users", icon: Users },
    { title: "Subscriptions", count: 584, description: "Active plans", icon: CreditCard },
    { title: "Brands", count: 327, description: "Approved brands", icon: BadgePercent },
    { title: "Buyers", count: 921, description: "Approved buyers", icon: BarChart3 }
  ];

  const handleStatusChange = (id: number, status: "pending" | "approved" | "rejected") => {
    setRegistrationRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const handleAssignManager = (id: number, managerId: number) => {
    setRegistrationRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, assignedManager: managerId } : request
      )
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">DASHBOARD</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 shadow-none rounded-none hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-sm font-light mb-2 text-gray-700 uppercase">{stat.title}</h2>
                  <div className="mt-2 text-3xl font-light">{stat.count.toLocaleString()}</div>
                  <p className="mt-2 text-xs text-gray-500 font-light">{stat.description}</p>
                </div>
                <stat.icon className="h-8 w-8 text-gray-300" strokeWidth={1} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Registration Requests Table */}
      <div className="border-t border-gray-100 pt-6">
        <RegistrationRequestsTable 
          registrationRequests={registrationRequests} 
          salesManagers={salesManagers.map(m => ({ id: m.id, name: m.name }))}
          onStatusChange={handleStatusChange}
          onAssignManager={handleAssignManager}
        />
      </div>
      
      {/* Sales Performance Section */}
      <div className="border-t border-gray-100 pt-6">
        <SalesPerformanceSection salesManagers={salesManagers} />
      </div>
    </div>
  );
};

export default AdminDashboard;
