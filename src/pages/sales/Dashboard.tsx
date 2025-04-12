
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, Store, BadgeDollarSign, ChartLine } from "lucide-react";

const SalesDashboard = () => {
  const stats = [
    { title: "Managed Brands", count: 27, description: "Total brands", icon: Store },
    { title: "Buyers", count: 84, description: "Active accounts", icon: Users },
    { title: "Total Commission", count: "$12,450", description: "This month", icon: BadgeDollarSign }
  ];

  // Sample data for the charts - in a real application this would come from an API
  const monthlyBrandsData = [
    { name: 'Jan', brands: 10 },
    { name: 'Feb', brands: 14 },
    { name: 'Mar', brands: 18 },
    { name: 'Apr', brands: 22 },
    { name: 'May', brands: 25 },
    { name: 'Jun', brands: 27 }
  ];

  const monthlyCommissionData = [
    { name: 'Jan', commission: 2500 },
    { name: 'Feb', commission: 4300 },
    { name: 'Mar', commission: 5800 },
    { name: 'Apr', commission: 7500 },
    { name: 'May', commission: 10200 },
    { name: 'Jun', commission: 12450 }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">SALES DASHBOARD</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 border border-gray-200 rounded-none hover:border-gray-300 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-1xl md:text-2xl uppercase font-light tracking-tighter mb-3">{stat.title}</h2>
                <div className="mt-2 text-3xl font-light">{stat.count}</div>
                <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
              </div>
              <stat.icon className="h-8 w-8 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 rounded-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-1xl md:text-2xl uppercase font-light tracking-tighter">BRANDS GROWTH</CardTitle>
            <ChartLine className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={{}}>
              <LineChart data={monthlyBrandsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="brands" 
                  stroke="#000" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 rounded-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-1xl md:text-2xl uppercase font-light tracking-tighter">COMMISSION GROWTH</CardTitle>
            <BadgeDollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={{}}>
              <LineChart data={monthlyCommissionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="commission" 
                  stroke="#333" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesDashboard;
