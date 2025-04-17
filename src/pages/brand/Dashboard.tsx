
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Bell, MessageSquare, Package, ShoppingCart, Megaphone, CreditCard, Settings, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const BrandDashboard = () => {
  // Sample data for charts
  const viewsData = [
    { name: "Jan", views: 65 },
    { name: "Feb", views: 59 },
    { name: "Mar", views: 80 },
    { name: "Apr", views: 81 },
    { name: "May", views: 56 },
    { name: "Jun", views: 55 },
    { name: "Jul", views: 40 }
  ];

  const conversionData = [
    { name: "Jan", rate: 2.5 },
    { name: "Feb", rate: 3.1 },
    { name: "Mar", rate: 3.5 },
    { name: "Apr", rate: 3.2 },
    { name: "May", rate: 3.8 },
    { name: "Jun", rate: 4.0 },
    { name: "Jul", rate: 4.2 }
  ];

  // Chart configuration object required by ChartContainer
  const chartConfig = {
    views: {
      label: "Product Views",
      color: "#000"
    },
    rate: {
      label: "Conversion Rate",
      color: "#000"
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative -mx-8 px-8 py-12 bg-gray-50/50 border-b border-gray-100">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-4">
            BRAND DASHBOARD
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl">
            Monitor your performance, manage products, and stay updated with your latest activities.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/brand/messages" className="block">
          <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-1">Messages</p>
                  <h3 className="text-2xl font-light">12</h3>
                </div>
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-xs text-green-500">3 new messages</div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/brand/products" className="block">
          <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-1">Products</p>
                  <h3 className="text-2xl font-light">86</h3>
                </div>
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-xs text-gray-500">12 low in stock</div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/brand/orders" className="block">
          <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-1">Orders</p>
                  <h3 className="text-2xl font-light">24</h3>
                </div>
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-xs text-green-500">5 new orders</div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/brand/notifications" className="block">
          <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-1">Notifications</p>
                  <h3 className="text-2xl font-light">7</h3>
                </div>
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-xs text-gray-500">2 require action</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                <Megaphone className="h-5 w-5" />
              </div>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <Link to="/brand/marketing">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <h3 className="text-lg font-light mb-2">Marketing</h3>
            <p className="text-sm text-gray-500">View campaign performance and analytics</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                <CreditCard className="h-5 w-5" />
              </div>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <Link to="/brand/paid-services">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <h3 className="text-lg font-light mb-2">Paid Services</h3>
            <p className="text-sm text-gray-500">Manage your subscriptions and services</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                <Settings className="h-5 w-5" />
              </div>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <Link to="/brand/settings">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <h3 className="text-lg font-light mb-2">Settings</h3>
            <p className="text-sm text-gray-500">Configure your brand preferences</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-none rounded-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-light mb-6 uppercase">Product Views</h3>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <LineChart
                  data={viewsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip formatter={(value) => `${value} views`} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#000" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-none rounded-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-light mb-6 uppercase">Conversion Rates</h3>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={conversionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar 
                    dataKey="rate" 
                    name="Conversion Rate" 
                    fill="#000"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandDashboard;
