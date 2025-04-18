
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Mail, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brand, Buyer } from "@/types/users";

type InactiveUser = (Brand | Buyer) & { type: "brand" | "buyer" };

const mockInactiveUsers: InactiveUser[] = [
  {
    id: 1,
    type: "brand",
    name: "Vintage Boutique",
    status: "inactive",
    plan: "Basic",
    lastActivity: "2023-12-15",
    activeSince: "2023-06-15",
    assignedManager: 2,
    registrationDate: "2023-06-01",
    contactPerson: "Emma Wilson",
    email: "emma@vintageboutique.com",
    phone: "+1234567890",
    website: "www.vintageboutique.com",
    description: "Vintage clothing store",
    marketSegment: "Vintage",
    productsCount: 50,
    avgOrderValue: "$200",
    totalSales: "$10000",
  },
  // Add more mock data as needed
];

const InactiveUsers = () => {
  const [users] = useState<InactiveUser[]>(mockInactiveUsers);

  const handleViewDetails = (id: number) => {
    console.log("View details", id);
  };

  const handleActivate = (id: number) => {
    console.log("Activate", id);
  };

  const handleSendEmail = (id: number) => {
    console.log("Send email", id);
  };

  return (
    <Card className="border border-gray-200 shadow-none rounded-lg">
      <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
        <CardTitle className="text-lg font-medium text-gray-900">
          Inactive Users ({users.length})
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
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
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
                    onClick={() => handleActivate(user.id)}
                    className="hover:bg-gray-100"
                  >
                    <UserCheck className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSendEmail(user.id)}
                    className="hover:bg-gray-100"
                  >
                    <Mail className="h-4 w-4" />
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

export default InactiveUsers;
