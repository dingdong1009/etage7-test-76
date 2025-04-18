import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesManager, MonthlySubscriptionData } from "@/types/users";
import { TrendingUp, TrendingDown, BadgePercent, BarChart3, ChartLine, UserCheck } from "lucide-react";
interface SalesPerformanceSectionProps {
  salesManagers: SalesManager[];
}
const SalesPerformanceSection: React.FC<SalesPerformanceSectionProps> = ({
  salesManagers
}) => {
  const [selectedManager, setSelectedManager] = useState<string>("all");
  const [activeMetric, setActiveMetric] = useState<string>("subscriptions");
  const getManagerData = () => {
    if (selectedManager === "all") {
      return salesManagers;
    }
    const manager = salesManagers.find(m => m.id.toString() === selectedManager);
    return manager ? [manager] : [];
  };
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };
  const getSubscriptionsData = () => {
    const manager = salesManagers.find(m => m.id.toString() === selectedManager);
    if (selectedManager === "all" || !manager || !manager.monthlySubscriptions) {
      // Aggregate data for all managers
      const monthlyData = {};
      salesManagers.forEach(manager => {
        if (manager.monthlySubscriptions) {
          manager.monthlySubscriptions.forEach(data => {
            if (!monthlyData[data.month]) {
              monthlyData[data.month] = {
                month: data.month,
                subscriptions: 0,
                renewals: 0,
                leads: 0,
                conversions: 0
              };
            }
            monthlyData[data.month].subscriptions += data.subscriptions;
            monthlyData[data.month].renewals += data.renewals;
            monthlyData[data.month].leads += data.leads;
            monthlyData[data.month].conversions += data.conversions;
          });
        }
      });
      return Object.values(monthlyData);
    }
    return manager.monthlySubscriptions;
  };
  const getPerformanceMetric = (manager: SalesManager) => {
    switch (activeMetric) {
      case "subscriptions":
        return manager.totalSubscriptions || 0;
      case "renewalRate":
        return parseFloat((manager.renewalRate || "0").replace("%", ""));
      case "conversionRate":
        return parseFloat((manager.conversionRate || "0").replace("%", ""));
      default:
        return 0;
    }
  };
  const getMetricColor = (value: number, metricType: string) => {
    if (metricType === "subscriptions") {
      return value > 30 ? "#F2FCE2" : value > 15 ? "#D3E4FD" : "#FFDEE2";
    } else {
      return value > 75 ? "#F2FCE2" : value > 50 ? "#D3E4FD" : "#FFDEE2";
    }
  };
  const getMetricIcon = (metricType: string) => {
    switch (metricType) {
      case "subscriptions":
        return <BarChart3 className="h-4 w-4 text-gray-400" strokeWidth={1.5} />;
      case "renewalRate":
        return <TrendingUp className="h-4 w-4 text-gray-400" strokeWidth={1.5} />;
      case "conversionRate":
        return <BadgePercent className="h-4 w-4 text-gray-400" strokeWidth={1.5} />;
      default:
        return <ChartLine className="h-4 w-4 text-gray-400" strokeWidth={1.5} />;
    }
  };
  const getMetricTitle = (metricType: string) => {
    switch (metricType) {
      case "subscriptions":
        return "TOTAL SUBSCRIPTIONS";
      case "renewalRate":
        return "RENEWAL RATE";
      case "conversionRate":
        return "CONVERSION RATE";
      default:
        return "";
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-light tracking-tighter">SALES MANAGER PERFORMANCE</h2>
        <div className="flex items-center gap-2">
          <Select value={selectedManager} onValueChange={setSelectedManager}>
            <SelectTrigger className="w-[200px] h-9 text-xs font-light border-gray-200 rounded-none">
              <SelectValue placeholder="Select Manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all" className="text-xs uppercase font-light">ALL MANAGERS</SelectItem>
                {salesManagers.map(manager => <SelectItem key={manager.id} value={manager.id.toString()} className="text-xs font-light">
                    {manager.name}
                  </SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Tabs value={activeMetric} onValueChange={setActiveMetric} className="w-full">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger value="subscriptions" className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none">
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="renewalRate" className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none">
              Renewal Rate
            </TabsTrigger>
            <TabsTrigger value="conversionRate" className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none">
              Conversion Rate
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeMetric} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {getManagerData().map(manager => <Card key={manager.id} className="border border-gray-200 shadow-none hover:shadow-sm transition-shadow rounded-none">
                  <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                      <CardTitle className="text-sm font-light uppercase">
                        {manager.name}
                      </CardTitle>
                      <span className="text-xs text-gray-500">{manager.region || 'Global'}</span>
                    </div>
                    {getMetricIcon(activeMetric)}
                  </CardHeader>
                  <CardContent className="pt-0 pb-4 px-4">
                    <div className="mt-2">
                      <div className="text-2xl font-light">
                        {activeMetric === "subscriptions" ? manager.totalSubscriptions : activeMetric === "renewalRate" ? manager.renewalRate : manager.conversionRate}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {getMetricTitle(activeMetric)}
                      </p>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
            
            
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default SalesPerformanceSection;