
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart } from "recharts";

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
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Brand Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +8.4% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              -2.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Product Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <LineChart
                width={500}
                height={300}
                data={viewsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* Chart components would go here */}
                <p className="text-center text-gray-500 pt-32">Views trend visualization</p>
              </LineChart>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Conversion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <BarChart
                width={500}
                height={300}
                data={conversionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* Chart components would go here */}
                <p className="text-center text-gray-500 pt-32">Conversion rate visualization</p>
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandDashboard;
