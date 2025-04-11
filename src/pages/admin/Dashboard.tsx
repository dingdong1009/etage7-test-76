
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { ChevronDown, Users, CreditCard, BadgePercent, BarChart3, ChartLine, PieChartIcon, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [selectedSalesManager, setSelectedSalesManager] = useState("all");
  const [expiringView, setExpiringView] = useState("week");

  const stats = [
    { title: "Active Users", count: 1254, description: "Registered users", icon: Users },
    { title: "Subscriptions", count: 584, description: "Active plans", icon: CreditCard },
    { title: "Brands", count: 327, description: "Approved brands", icon: BadgePercent },
    { title: "Buyers", count: 921, description: "Approved buyers", icon: Users }
  ];

  // Sample data for the charts - in a real application this would come from an API
  const monthlyUserData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 600 },
    { name: 'Mar', users: 800 },
    { name: 'Apr', users: 1000 },
    { name: 'May', users: 1200 },
    { name: 'Jun', users: 1254 }
  ];

  // Data for the upcoming expiring subscriptions
  const expiringSubscriptionsWeekly = [
    { name: 'Mon', expiring: 4 },
    { name: 'Tue', expiring: 6 },
    { name: 'Wed', expiring: 3 },
    { name: 'Thu', expiring: 7 },
    { name: 'Fri', expiring: 5 },
    { name: 'Sat', expiring: 2 },
    { name: 'Sun', expiring: 0 }
  ];

  const expiringSubscriptionsMonthly = [
    { name: 'Week 1', expiring: 20 },
    { name: 'Week 2', expiring: 15 },
    { name: 'Week 3', expiring: 18 },
    { name: 'Week 4', expiring: 12 }
  ];

  const expiringSubscriptionsQuarterly = [
    { name: 'Jan', expiring: 28 },
    { name: 'Feb', expiring: 24 },
    { name: 'Mar', expiring: 32 },
    { name: 'Apr', expiring: 18 },
    { name: 'May', expiring: 27 },
    { name: 'Jun', expiring: 22 }
  ];

  // Function to get the appropriate data based on selected view
  const getExpiringSubscriptionsData = () => {
    switch(expiringView) {
      case 'week':
        return expiringSubscriptionsWeekly;
      case 'month':
        return expiringSubscriptionsMonthly;
      case 'quarter':
        return expiringSubscriptionsQuarterly;
      default:
        return expiringSubscriptionsWeekly;
    }
  };

  const salesManagerPerformance = [
    { name: 'John', sales: 120000 },
    { name: 'Sarah', sales: 86000 },
    { name: 'Michael', sales: 99000 },
    { name: 'Emily', sales: 110000 },
    { name: 'David', sales: 65000 }
  ];

  const individualSalesData = {
    'john': [
      { month: 'Jan', sales: 18000 },
      { month: 'Feb', sales: 20000 },
      { month: 'Mar', sales: 22000 },
      { month: 'Apr', sales: 19000 },
      { month: 'May', sales: 21000 },
      { month: 'Jun', sales: 20000 }
    ],
    'sarah': [
      { month: 'Jan', sales: 12000 },
      { month: 'Feb', sales: 14000 },
      { month: 'Mar', sales: 16000 },
      { month: 'Apr', sales: 14500 },
      { month: 'May', sales: 15000 },
      { month: 'Jun', sales: 14500 }
    ],
    'michael': [
      { month: 'Jan', sales: 16000 },
      { month: 'Feb', sales: 17000 },
      { month: 'Mar', sales: 18000 },
      { month: 'Apr', sales: 15000 },
      { month: 'May', sales: 16500 },
      { month: 'Jun', sales: 16500 }
    ],
    'emily': [
      { month: 'Jan', sales: 17000 },
      { month: 'Feb', sales: 18000 },
      { month: 'Mar', sales: 19000 },
      { month: 'Apr', sales: 18500 },
      { month: 'May', sales: 19500 },
      { month: 'Jun', sales: 18000 }
    ],
    'david': [
      { month: 'Jan', sales: 10000 },
      { month: 'Feb', sales: 11000 },
      { month: 'Mar', sales: 12000 },
      { month: 'Apr', sales: 10500 },
      { month: 'May', sales: 11500 },
      { month: 'Jun', sales: 10000 }
    ],
    'all': [
      { month: 'Jan', sales: 73000 },
      { month: 'Feb', sales: 80000 },
      { month: 'Mar', sales: 87000 },
      { month: 'Apr', sales: 77500 },
      { month: 'May', sales: 83500 },
      { month: 'Jun', sales: 79000 }
    ]
  };

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-1xl md:text-2xl uppercase font-thin mb-6">{stat.title}</h2>
                <div className="mt-2 text-3xl">{stat.count.toLocaleString()}</div>
                <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
              </div>
              <stat.icon className="h-8 w-8 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">User Growth</CardTitle>
            <ChartLine className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={{}}>
              <LineChart data={monthlyUserData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#0088FE" activeDot={{ r: 8 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Upcoming Expiring Subscriptions</CardTitle>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <Tabs value={expiringView} onValueChange={setExpiringView} className="w-[180px]">
                <TabsList className="h-8 text-xs">
                  <TabsTrigger value="week" className="px-2 py-1 text-xs">This Week</TabsTrigger>
                  <TabsTrigger value="month" className="px-2 py-1 text-xs">This Month</TabsTrigger>
                  <TabsTrigger value="quarter" className="px-2 py-1 text-xs">This Quarter</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={{}}>
              <BarChart data={getExpiringSubscriptionsData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
                          <p className="text-sm font-medium">{payload[0].payload.name}</p>
                          <p className="text-sm text-amber-600">
                            <span className="font-bold">{payload[0].value}</span> subscriptions expiring
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }} 
                />
                <Legend />
                <Bar dataKey="expiring" fill="#FFBB28" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Sales Manager Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={{}}>
              <BarChart data={salesManagerPerformance} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8">
                  {salesManagerPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex flex-col md:flex-row gap-2 md:items-center w-full">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Individual Performance</CardTitle>
              <Select value={selectedSalesManager} onValueChange={setSelectedSalesManager}>
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue placeholder="Select Manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="uppercase">
                    <SelectItem value="all">ALL MANAGERS</SelectItem>
                    <SelectItem value="john">John</SelectItem>
                    <SelectItem value="sarah">Sarah</SelectItem>
                    <SelectItem value="michael">Michael</SelectItem>
                    <SelectItem value="emily">Emily</SelectItem>
                    <SelectItem value="david">David</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <PieChartIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={{}}>
              <LineChart data={individualSalesData[selectedSalesManager]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#FF8042" activeDot={{ r: 8 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
