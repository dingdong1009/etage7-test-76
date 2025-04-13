
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { ChevronDown, Users, CreditCard, BadgePercent, BarChart3, ChartLine, PieChartIcon, Clock } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminDashboard = () => {
  const [selectedSalesManager, setSelectedSalesManager] = useState("all");

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

  const monthlySubscriptionData = [
    { name: 'Jan', subscriptions: 200 },
    { name: 'Feb', subscriptions: 300 },
    { name: 'Mar', subscriptions: 350 },
    { name: 'Apr', subscriptions: 450 },
    { name: 'May', subscriptions: 520 },
    { name: 'Jun', subscriptions: 584 }
  ];

  // New expiring subscriptions data
  const expiringSubscriptionsData = [
    { name: '7 days', count: 12, fill: '#FFDEE2' }, // soft pink
    { name: '14 days', count: 18, fill: '#D3E4FD' }, // soft blue
    { name: '30 days', count: 24, fill: '#D3E4FD' }, // soft blue
    { name: '60 days', count: 35, fill: '#F1F0FB' }, // soft gray
    { name: '90 days', count: 47, fill: '#F1F0FB' }  // soft gray
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

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">DASHBOARD</h1>
      
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-none rounded-none hover:shadow-md transition-shadow">
          <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-light">USER GROWTH</CardTitle>
            <ChartLine className="h-4 w-4 text-gray-500" strokeWidth={1} />
          </CardHeader>
          <CardContent className="pt-4 p-6">
            <ChartContainer config={{}}>
              <LineChart data={monthlyUserData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" strokeWidth={0.5} fontSize={12} tickLine={false} />
                <YAxis stroke="#888" strokeWidth={0.5} fontSize={12} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#000" 
                  strokeWidth={1} 
                  dot={{ stroke: '#000', strokeWidth: 1, fill: '#fff', r: 3 }} 
                  activeDot={{ r: 5 }} 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-none rounded-none hover:shadow-md transition-shadow">
          <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-light">SUBSCRIPTION GROWTH</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" strokeWidth={1} />
          </CardHeader>
          <CardContent className="pt-4 p-6">
            <ChartContainer config={{}}>
              <LineChart data={monthlySubscriptionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" strokeWidth={0.5} fontSize={12} tickLine={false} />
                <YAxis stroke="#888" strokeWidth={0.5} fontSize={12} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="subscriptions" 
                  stroke="#000" 
                  strokeWidth={1} 
                  dot={{ stroke: '#000', strokeWidth: 1, fill: '#fff', r: 3 }} 
                  activeDot={{ r: 5 }} 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-none rounded-none hover:shadow-md transition-shadow">
          <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-light">EXPIRING SUBSCRIPTIONS</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" strokeWidth={1} />
          </CardHeader>
          <CardContent className="pt-4 p-6">
            <ChartContainer config={{}}>
              <BarChart data={expiringSubscriptionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" strokeWidth={0.5} fontSize={12} tickLine={false} />
                <YAxis stroke="#888" strokeWidth={0.5} fontSize={12} tickLine={false} />
                <Tooltip formatter={(value) => `${value} subscriptions`} />
                <Legend />
                <Bar dataKey="count" name="Expiring Subscriptions">
                  {expiringSubscriptionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-none rounded-none hover:shadow-md transition-shadow">
          <CardHeader className="px-6 py-4 border-b border-gray-100 flex flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row gap-2 md:items-center w-full">
              <CardTitle className="text-lg font-light">INDIVIDUAL PERFORMANCE</CardTitle>
              <Select value={selectedSalesManager} onValueChange={setSelectedSalesManager}>
                <SelectTrigger className="w-[180px] h-8 border-gray-200 rounded-none text-xs font-light">
                  <SelectValue placeholder="Select Manager" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectGroup className="uppercase text-xs font-light">
                    <SelectItem value="all">ALL MANAGERS</SelectItem>
                    <SelectItem value="john">JOHN</SelectItem>
                    <SelectItem value="sarah">SARAH</SelectItem>
                    <SelectItem value="michael">MICHAEL</SelectItem>
                    <SelectItem value="emily">EMILY</SelectItem>
                    <SelectItem value="david">DAVID</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <PieChartIcon className="h-4 w-4 text-gray-500" strokeWidth={1} />
          </CardHeader>
          <CardContent className="pt-4 p-6">
            <ChartContainer config={{}}>
              <LineChart data={individualSalesData[selectedSalesManager]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" strokeWidth={0.5} fontSize={12} tickLine={false} />
                <YAxis stroke="#888" strokeWidth={0.5} fontSize={12} tickLine={false} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#000" 
                  strokeWidth={1} 
                  dot={{ stroke: '#000', strokeWidth: 1, fill: '#fff', r: 3 }} 
                  activeDot={{ r: 5 }} 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
