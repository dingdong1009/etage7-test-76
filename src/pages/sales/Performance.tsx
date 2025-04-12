
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowUp, ArrowDown, TrendingUp, ChartBar, PieChart, Activity } from "lucide-react";
import { useState } from "react";

const SalesPerformance = () => {
  const [timeFrame, setTimeFrame] = useState("monthly");
  
  // Sample data - in a real app this would come from an API
  const performanceData = {
    monthly: [
      { name: "Jan", revenue: 45000, commission: 4500, brands: 15, buyers: 42 },
      { name: "Feb", revenue: 52000, commission: 5200, brands: 18, buyers: 45 },
      { name: "Mar", revenue: 49000, commission: 4900, brands: 20, buyers: 50 },
      { name: "Apr", revenue: 63000, commission: 6300, brands: 22, buyers: 55 },
      { name: "May", revenue: 58000, commission: 5800, brands: 25, buyers: 62 },
      { name: "Jun", revenue: 72000, commission: 7200, brands: 27, buyers: 70 }
    ],
    quarterly: [
      { name: "Q1", revenue: 146000, commission: 14600, brands: 20, buyers: 50 },
      { name: "Q2", revenue: 193000, commission: 19300, brands: 27, buyers: 70 },
      { name: "Q3", revenue: 210000, commission: 21000, brands: 32, buyers: 85 },
      { name: "Q4", revenue: 240000, commission: 24000, brands: 38, buyers: 98 }
    ],
    yearly: [
      { name: "2020", revenue: 520000, commission: 52000, brands: 12, buyers: 35 },
      { name: "2021", revenue: 680000, commission: 68000, brands: 18, buyers: 52 },
      { name: "2022", revenue: 750000, commission: 75000, brands: 24, buyers: 65 },
      { name: "2023", revenue: 820000, commission: 82000, brands: 30, buyers: 78 },
      { name: "2024", revenue: 789000, commission: 78900, brands: 38, buyers: 98 }
    ]
  };
  
  const currentData = performanceData[timeFrame as keyof typeof performanceData];
  
  // Calculate metrics for the scorecard
  const currentMetrics = {
    revenue: currentData[currentData.length - 1].revenue,
    commission: currentData[currentData.length - 1].commission,
    brands: currentData[currentData.length - 1].brands,
    buyers: currentData[currentData.length - 1].buyers
  };
  
  const previousMetrics = {
    revenue: currentData[currentData.length - 2]?.revenue || 0,
    commission: currentData[currentData.length - 2]?.commission || 0,
    brands: currentData[currentData.length - 2]?.brands || 0,
    buyers: currentData[currentData.length - 2]?.buyers || 0
  };
  
  const calculateChange = (current: number, previous: number) => {
    if (!previous) return { value: 0, isPositive: true };
    const changeValue = ((current - previous) / previous * 100).toFixed(1);
    return {
      value: Math.abs(Number(changeValue)),
      isPositive: Number(changeValue) >= 0
    };
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-4xl font-light tracking-tighter">Performance Analytics</h1>
        
        <Select 
          value={timeFrame} 
          onValueChange={setTimeFrame}
        >
          <SelectTrigger className="w-[180px] border-gray-200">
            <SelectValue placeholder="Select Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly (2024)</SelectItem>
            <SelectItem value="quarterly">Quarterly (2024)</SelectItem>
            <SelectItem value="yearly">Annual (2020-2024)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-none hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-light">Total Revenue</p>
                <h3 className="text-2xl font-light mt-1">${currentMetrics.revenue.toLocaleString()}</h3>
              </div>
              <div className={`flex items-center text-sm ${
                calculateChange(currentMetrics.revenue, previousMetrics.revenue).isPositive 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {calculateChange(currentMetrics.revenue, previousMetrics.revenue).isPositive 
                  ? <ArrowUp className="h-4 w-4 mr-1" /> 
                  : <ArrowDown className="h-4 w-4 mr-1" />
                }
                {calculateChange(currentMetrics.revenue, previousMetrics.revenue).value}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200 shadow-none hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-light">Commission Earned</p>
                <h3 className="text-2xl font-light mt-1">${currentMetrics.commission.toLocaleString()}</h3>
              </div>
              <div className={`flex items-center text-sm ${
                calculateChange(currentMetrics.commission, previousMetrics.commission).isPositive 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {calculateChange(currentMetrics.commission, previousMetrics.commission).isPositive 
                  ? <ArrowUp className="h-4 w-4 mr-1" /> 
                  : <ArrowDown className="h-4 w-4 mr-1" />
                }
                {calculateChange(currentMetrics.commission, previousMetrics.commission).value}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200 shadow-none hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-light">Active Brands</p>
                <h3 className="text-2xl font-light mt-1">{currentMetrics.brands}</h3>
              </div>
              <div className={`flex items-center text-sm ${
                calculateChange(currentMetrics.brands, previousMetrics.brands).isPositive 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {calculateChange(currentMetrics.brands, previousMetrics.brands).isPositive 
                  ? <ArrowUp className="h-4 w-4 mr-1" /> 
                  : <ArrowDown className="h-4 w-4 mr-1" />
                }
                {calculateChange(currentMetrics.brands, previousMetrics.brands).value}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200 shadow-none hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-light">Active Buyers</p>
                <h3 className="text-2xl font-light mt-1">{currentMetrics.buyers}</h3>
              </div>
              <div className={`flex items-center text-sm ${
                calculateChange(currentMetrics.buyers, previousMetrics.buyers).isPositive 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {calculateChange(currentMetrics.buyers, previousMetrics.buyers).isPositive 
                  ? <ArrowUp className="h-4 w-4 mr-1" /> 
                  : <ArrowDown className="h-4 w-4 mr-1" />
                }
                {calculateChange(currentMetrics.buyers, previousMetrics.buyers).value}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-none hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-light tracking-tighter">Revenue & Commission</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#000" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="commission" 
                    stroke="#888" 
                    activeDot={{ r: 6 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200 shadow-none hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-light tracking-tighter">Brands & Buyers Growth</CardTitle>
            <ChartBar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="brands" fill="#333" />
                  <Bar dataKey="buyers" fill="#999" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesPerformance;
