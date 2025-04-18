
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, BarChart, Bar } from "recharts";
import { Store, Users, BadgeDollarSign, ChartLine, User, Heart, ShoppingCart, Eye } from "lucide-react";

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
      icon: ShoppingCart,
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

  // Sample data for the charts - in a real application this would come from an API
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-4">SALES DASHBOARD</h1>
        <p className="text-sm font-light text-gray-600 max-w-2xl">
          Monitor your sales performance, manage brand relationships, and track commissions in real-time.
        </p>
      </div>

      {/* Stats Grid */}
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

      {/* Charts Grid */}
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
    </div>
  );
};

export default SalesDashboard;
