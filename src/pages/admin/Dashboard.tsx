
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  const stats = [
    { title: "Active Users", count: 0, description: "Registered users" },
    { title: "Subscriptions", count: 0, description: "Active plans" },
    { title: "Brands", count: 0, description: "Approved brands" },
    { title: "Buyers", count: 0, description: "Approved buyers" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 border border-gray-200">
            <h2 className="text-xl font-bold">{stat.title}</h2>
            <div className="mt-2 text-3xl">{stat.count}</div>
            <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <div className="text-sm text-gray-500 italic">No recent activity to show</div>
        </Card>
        
        <Card className="p-4 border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Performance Overview</h2>
          <div className="text-sm text-gray-500 italic">No data available</div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
