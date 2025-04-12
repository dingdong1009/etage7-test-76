
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Eye, ArrowUpDown, BadgeDollarSign, Package } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin tracking-tighter mb-6">Brand Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-gray-200 rounded-none">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-1xl md:text-2xl uppercase font-thin mb-6">Views</h2>
              <div className="mt-2 text-3xl font-light">1,234</div>
              <p className="mt-2 text-sm text-green-500">+12.5% from last month</p>
            </div>
            <Eye className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
        
        <Card className="p-4 border border-gray-200 rounded-none">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-1xl md:text-2xl uppercase font-thin mb-6">Conversions</h2>
              <div className="mt-2 text-3xl font-light">42</div>
              <p className="mt-2 text-sm text-green-500">+5.2% from last month</p>
            </div>
            <ArrowUpDown className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
        
        <Card className="p-4 border border-gray-200 rounded-none">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-1xl md:text-2xl uppercase font-thin mb-6">Sales</h2>
              <div className="mt-2 text-3xl font-light">$12,345</div>
              <p className="mt-2 text-sm text-green-500">+8.4% from last month</p>
            </div>
            <BadgeDollarSign className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
        
        <Card className="p-4 border border-gray-200 rounded-none">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-1xl md:text-2xl uppercase font-thin mb-6">Inventory</h2>
              <div className="mt-2 text-3xl font-light">86</div>
              <p className="mt-2 text-sm text-red-500">-2.3% from last month</p>
            </div>
            <Package className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 rounded-none">
          <CardHeader>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Product Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={{}}>
                <LineChart
                  data={viewsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
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
        
        <Card className="border border-gray-200 rounded-none">
          <CardHeader>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Conversion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={{}}>
                <BarChart
                  data={conversionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
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
