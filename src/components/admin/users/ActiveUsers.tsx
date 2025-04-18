
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brand, Buyer } from "@/types/users";

type ActiveUser = (Brand | Buyer) & { type: "brand" | "buyer" };

const mockActiveUsers: ActiveUser[] = [
  {
    id: 1,
    type: "brand",
    name: "Luxury Fashion Co",
    status: "active",
    plan: "Premium",
    lastActivity: "2024-04-10",
    activeSince: "2024-01-15",
    assignedManager: 1,
    registrationDate: "2024-01-01",
    contactPerson: "John Smith",
    email: "john@luxuryfashion.com",
    phone: "+1234567890",
    website: "www.luxuryfashion.com",
    description: "High-end fashion brand",
    marketSegment: "Luxury",
    productsCount: 100,
    avgOrderValue: "$1000",
    totalSales: "$100000",
  },
  // Add more mock data as needed
];

const ActiveUsers = () => {
  const [users] = useState<ActiveUser[]>(mockActiveUsers);

  const handleViewDetails = (id: number) => {
    console.log("View details", id);
  };

  const handleActivate = (id: number) => {
    console.log("Activate", id);
  };

  const handleDeactivate = (id: number) => {
    console.log("Deactivate", id);
  };

  return (
    <Card className="border border-gray-200 shadow-none rounded-lg">
      <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
        <CardTitle className="text-lg font-medium text-gray-900">
          Active Users ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-gray-50">
              <TableHead className="w-[200px] font-medium">Company</TableHead>
              <TableHead className="font-medium">Type</TableHead>
              <TableHead className="font-medium">Plan</TableHead>
              <TableHead className="font-medium">Registration Date</TableHead>
              <TableHead className="font-medium">Sales Manager</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-t border-gray-100">
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {user.type}
                  </Badge>
                </TableCell>
                <TableCell>{user.plan}</TableCell>
                <TableCell>{user.registrationDate}</TableCell>
                <TableCell>Manager {user.assignedManager}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-accent-mint text-gray-800 border-accent-mint">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewDetails(user.id)}
                    className="hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeactivate(user.id)}
                    className="hover:bg-gray-100"
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActiveUsers;
