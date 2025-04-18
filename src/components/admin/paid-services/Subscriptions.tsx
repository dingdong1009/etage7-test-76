
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Edit, Trash, Eye, Plus } from "lucide-react";
import { Subscription } from "@/types/services/paidServices";

// Mock data for subscriptions
const mockSubscriptions: Subscription[] = [
  {
    id: "sub-1",
    name: "Basic Plan",
    description: "Standard features for small brands",
    price: 29.99,
    features: ["10 product listings", "Basic analytics", "Email support"],
    type: "subscription",
    frequency: "monthly",
    autoRenewal: true,
    status: "active",
    createdAt: "2023-09-15T12:00:00Z",
    updatedAt: "2024-02-20T09:30:00Z",
    userCount: 87,
    maxUsers: 100
  },
  {
    id: "sub-2",
    name: "Professional",
    description: "Advanced features for growing brands",
    price: 99.99,
    features: ["50 product listings", "Advanced analytics", "Priority support", "Marketing tools"],
    type: "subscription",
    frequency: "monthly",
    autoRenewal: true,
    status: "active",
    createdAt: "2023-07-10T10:00:00Z",
    updatedAt: "2024-03-05T14:20:00Z",
    userCount: 45,
    maxUsers: 50
  },
  {
    id: "sub-3",
    name: "Enterprise",
    description: "Full service package for established brands",
    price: 299.99,
    features: ["Unlimited product listings", "Custom analytics", "24/7 support", "Advanced marketing tools", "API access"],
    type: "subscription",
    frequency: "annual",
    autoRenewal: true,
    status: "active",
    createdAt: "2023-05-22T08:30:00Z",
    updatedAt: "2024-04-01T11:45:00Z",
    userCount: 12,
    maxUsers: 25
  },
  {
    id: "sub-4",
    name: "Starter",
    description: "Entry level package for new brands",
    price: 19.99,
    features: ["5 product listings", "Basic support"],
    type: "subscription",
    frequency: "monthly",
    autoRenewal: true,
    status: "inactive",
    createdAt: "2023-11-05T14:20:00Z",
    updatedAt: "2024-01-15T09:10:00Z",
    userCount: 0,
    maxUsers: 10
  }
];

const Subscriptions = () => {
  const [subscriptions] = useState<Subscription[]>(mockSubscriptions);
  
  // Calculate statistics for the chart
  const activeSubscriptions = subscriptions.filter(sub => sub.status === "active");
  const totalUsers = activeSubscriptions.reduce((sum, sub) => sum + sub.userCount, 0);

  const chartData = activeSubscriptions.map(sub => ({
    name: sub.name,
    value: sub.userCount,
    maxUsers: sub.maxUsers
  }));

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light">Subscription Management</h2>
        <Button className="gap-2">
          <Plus size={16} />
          Add Subscription
        </Button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-medium text-gray-900">
                Subscription Plans ({subscriptions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-gray-50">
                    <TableHead className="w-[200px] font-medium">Name</TableHead>
                    <TableHead className="font-medium">Price</TableHead>
                    <TableHead className="font-medium">Frequency</TableHead>
                    <TableHead className="font-medium">Users</TableHead>
                    <TableHead className="font-medium">Auto Renew</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="text-right font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((subscription) => (
                    <TableRow key={subscription.id} className="border-t border-gray-100">
                      <TableCell>{subscription.name}</TableCell>
                      <TableCell>${subscription.price}</TableCell>
                      <TableCell className="capitalize">{subscription.frequency}</TableCell>
                      <TableCell>
                        {subscription.userCount}/{subscription.maxUsers}
                      </TableCell>
                      <TableCell>
                        {subscription.autoRenewal ? (
                          <Badge variant="outline" className="bg-accent-mint text-gray-800 border-accent-mint">
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            No
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {subscription.status === "active" ? (
                          <Badge variant="outline" className="bg-accent-mint text-gray-800 border-accent-mint">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-medium text-gray-900">
                User Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-light">{totalUsers}</div>
                <div className="text-sm text-gray-500">Total Active Users</div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => {
                        return [`${value} users (${((value / props.payload.maxUsers) * 100).toFixed(0)}% capacity)`, props.payload.name];
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
