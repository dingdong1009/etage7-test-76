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
        <Card className="p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-1xl md:text-2xl uppercase font-thin mb-6">Views</h2>
              <div className="mt-2 text-3xl">1,234</div>
              <p className="mt-2 text-sm text-green-500">+12.5% from last month</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </div>
        </Card>
        
        <Card className="p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-1xl md:text-2xl uppercase font-thin mb-6">Conversions</h2>
              <div className="mt-2 text-3xl">42</div>
              <p className="mt-2 text-sm text-green-500">+5.2% from last month</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400"><path d="M12 2v20"></path><path d="m17 5-5-3-5 3"></path><path d="m17 19-5 3-5-3"></path><path d="M20 10h-8"></path><path d="m16 7-3 3 3 3"></path><path d="M4 14h8"></path><path d="m8 11-3 3 3 3"></path></svg>
          </div>
        </Card>
        
        <Card className="p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-1xl md:text-2xl uppercase font-thin mb-6">Sales</h2>
              <div className="mt-2 text-3xl">$12,345</div>
              <p className="mt-2 text-sm text-green-500">+8.4% from last month</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
          </div>
        </Card>
        
        <Card className="p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-1xl md:text-2xl uppercase font-thin mb-6">Inventory</h2>
              <div className="mt-2 text-3xl">86</div>
              <p className="mt-2 text-sm text-red-500">-2.3% from last month</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400"><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path><rect width="20" height="12" x="2" y="10" rx="2"></rect></svg>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Product Views</CardTitle>
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
                <p className="text-center text-gray-500 pt-32">Views trend visualization</p>
              </LineChart>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Conversion Rates</CardTitle>
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
