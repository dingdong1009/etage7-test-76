import { useState } from "react";
import { mockSubscriptions } from "@/mock/paidServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Edit, Trash2, Eye, Plus, UserX, ToggleRight } from "lucide-react";
import { Subscription } from "@/types/services/paidServices";

interface SubscriptionsProps {
  onAddClick: () => void;
}

const Subscriptions = ({ onAddClick }: SubscriptionsProps) => {
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
      <div className="flex justify-between items-center space-x-3">
        <h2 className="text-xl font-normal tracking-tighter uppercase">Subscription Management</h2>
        <Button 
          className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase"
          onClick={onAddClick}
        >
          <Plus size={16} />
          Add Subscription
        </Button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] font-normal text-xs uppercase">Name</TableHead>
                    <TableHead className="font-normal text-xs uppercase">Price</TableHead>
                    <TableHead className="font-normal text-xs uppercase">Frequency</TableHead>
                    <TableHead className="font-normal text-xs uppercase">Users</TableHead>
                    <TableHead className="font-normal text-xs uppercase">Auto Renew</TableHead>
                    <TableHead className="font-normal text-xs uppercase">Status</TableHead>
                    <TableHead className="text-right font-normal text-xs uppercase">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((subscription) => (
                    <TableRow key={subscription.id} className="border-t border-gray-100">
                      <TableCell className="font-light">{subscription.name}</TableCell>
                      <TableCell className="font-light">${subscription.price}</TableCell>
                      <TableCell className="capitalize font-light">{subscription.frequency}</TableCell>
                      <TableCell className="font-light">
                        {subscription.userCount}/{subscription.maxUsers}
                      </TableCell>
                      <TableCell>
                        {subscription.autoRenewal ? (
                          <Badge variant="outline" className="bg-accent-mint text-gray-800  border-gray-200">
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
                          <Badge variant="outline" className="bg-accent-mint text-gray-800  border-gray-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200">
                          <Eye className="h-4 w-4" strokeWidth={1.5}  />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200">
                          <Edit className="h-4 w-4" strokeWidth={1.5}  />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-200">
                          <ToggleRight className="h-4 w-4 text-red-500" strokeWidth={1.5}  />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-200">
                          <Trash2 className="h-4 w-4 text-red-500" strokeWidth={1.5} />
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
              <CardTitle className="text-lg font-normal uppercase text-gray-900">
                User Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-light">{totalUsers}</div>
                <div className="text-xs text-gray-500">Total Active Users</div>
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
                        const actualValue = Number(value);
                        const maxValue = props.payload.maxUsers;
                        return [`${actualValue} users (${((actualValue / maxValue) * 100).toFixed(0)}% capacity)`, props.payload.name];
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
