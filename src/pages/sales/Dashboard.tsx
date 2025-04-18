
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, BarChart, Bar } from "recharts";
import { Store, Users, BadgeDollarSign, ChartLine, Mail, MailOpen, Clock, UserCheck, UserX, ShoppingBag } from "lucide-react";
import { InvitedUser } from "@/types/users";
import InvitedUsersTable from "@/components/sales/dashboard/InvitedUsersTable";

const SalesDashboard = () => {
  const stats = [
    { 
      title: "Managed Brands", 
      count: 27, 
      description: "Active brands", 
      icon: Store,
      trend: "+12% from last month"
    },
    { 
      title: "Active Buyers", 
      count: 84, 
      description: "Connected accounts", 
      icon: Users,
      trend: "+5% from last month"
    },
    { 
      title: "New Orders", 
      count: 156, 
      description: "This month", 
      icon: ShoppingBag,
      trend: "+18% from last month"
    },
    { 
      title: "Total Commission", 
      count: "$12,450", 
      description: "Monthly earnings", 
      icon: BadgeDollarSign,
      trend: "+8% from last month"
    }
  ];

  const monthlyBrandsData = [
    { name: 'Jan', brands: 10, buyers: 45 },
    { name: 'Feb', brands: 14, buyers: 52 },
    { name: 'Mar', brands: 18, buyers: 58 },
    { name: 'Apr', brands: 22, buyers: 65 },
    { name: 'May', brands: 25, buyers: 72 },
    { name: 'Jun', brands: 27, buyers: 84 }
  ];

  const monthlyCommissionData = [
    { name: 'Jan', commission: 2500, orders: 65 },
    { name: 'Feb', commission: 4300, orders: 85 },
    { name: 'Mar', commission: 5800, orders: 110 },
    { name: 'Apr', commission: 7500, orders: 125 },
    { name: 'May', commission: 10200, orders: 145 },
    { name: 'Jun', commission: 12450, orders: 156 }
  ];

  const mockInvitedUsers: InvitedUser[] = [
    {
      id: 1,
      invitedBy: "Sales Manager 1",
      companyName: "New Fashion Brand",
      contactPerson: "Sarah Johnson",
      phone: "+1234567890",
      email: "sarah@newfashion.com",
      dateInvited: "2024-04-15",
      linkClicked: true,
      registered: false,
      converted: false,
      status: "pending"
    },
    {
      id: 2,
      invitedBy: "Sales Manager 1",
      companyName: "Luxury Boutique",
      contactPerson: "Michael Chen",
      phone: "+1234567891",
      email: "michael@luxuryboutique.com",
      dateInvited: "2024-04-14",
      linkClicked: true,
      registered: true,
      converted: true,
      status: "active"
    },
    {
      id: 3,
      invitedBy: "Sales Manager 1",
      companyName: "Style Emporium",
      contactPerson: "Emma Davis",
      phone: "+1234567892",
      email: "emma@styleemporium.com",
      dateInvited: "2024-04-13",
      linkClicked: false,
      registered: false,
      converted: false,
      status: "pending"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-4">SALES DASHBOARD</h1>
        <p className="text-sm font-light text-gray-600 max-w-2xl">
          Monitor your sales performance, manage brand relationships, and track commissions in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 shadow-none rounded-none hover:shadow-sm transition-shadow">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm flex items-center gap-2 font-light uppercase">
                <stat.icon size={16} strokeWidth={1} className="text-gray-600" />
                {stat.title}
              </CardTitle>
              <CardDescription className="text-xs">{stat.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-light">{stat.count}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-none rounded-none">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-light uppercase">Managed Accounts Growth</CardTitle>
            <CardDescription className="text-xs">Monthly brands and buyers growth</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyBrandsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="brands" 
                    name="Brands"
                    stroke="#374151" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="buyers" 
                    name="Buyers"
                    stroke="#9ca3af" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200 shadow-none rounded-none">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-light uppercase">Commission & Orders</CardTitle>
            <CardDescription className="text-xs">Monthly commission and orders overview</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyCommissionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <YAxis yAxisId="left" orientation="left" stroke="#666" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="commission" 
                    name="Commission ($)"
                    fill="#374151"
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="orders" 
                    name="Orders"
                    fill="#9ca3af"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <InvitedUsersTable invitedUsers={mockInvitedUsers} />
      </div>
    </div>
  );
};

export default SalesDashboard;
