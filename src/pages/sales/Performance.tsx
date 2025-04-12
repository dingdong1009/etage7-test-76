
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { BarChart3 } from "lucide-react";

const SalesPerformance = () => {
  // Sample data for the performance chart
  const monthlyPerformanceData = [
    { name: 'Jan', commission: 2500 },
    { name: 'Feb', commission: 4300 },
    { name: 'Mar', commission: 5800 },
    { name: 'Apr', commission: 7500 },
    { name: 'May', commission: 10200 },
    { name: 'Jun', commission: 12450 }
  ];
  
  // Monochrome colors for the bar chart
  const COLORS = ['#333333', '#555555', '#777777', '#999999', '#BBBBBB', '#DDDDDD'];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-light tracking-tighter mb-6">PERFORMANCE <span className="font-normal">METRICS</span></h1>

      <Card className="border-gray-200 rounded-none hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl uppercase font-light tracking-tighter">Monthly Commission</CardTitle>
          <BarChart3 className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={{}}>
            <BarChart data={monthlyPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="commission" fill="#8884d8">
                {monthlyPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200 rounded-none hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-light tracking-tighter">Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-normal">Conversion Rate</span>
                  <span className="text-sm font-light">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-none h-1.5">
                  <div className="bg-black h-1.5" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-normal">Renewal Rate</span>
                  <span className="text-sm font-light">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-none h-1.5">
                  <div className="bg-black h-1.5" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-normal">Customer Satisfaction</span>
                  <span className="text-sm font-light">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-none h-1.5">
                  <div className="bg-black h-1.5" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 rounded-none hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-light tracking-tighter">Goals Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-normal">Quarterly Target</span>
                  <span className="text-sm font-light">$35,000 / $45,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-none h-1.5">
                  <div className="bg-black h-1.5" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-normal">New Brands</span>
                  <span className="text-sm font-light">15 / 20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-none h-1.5">
                  <div className="bg-black h-1.5" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-normal">Client Retention</span>
                  <span className="text-sm font-light">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-none h-1.5">
                  <div className="bg-black h-1.5" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesPerformance;
