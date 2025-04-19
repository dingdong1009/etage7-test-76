
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
    lastActivity: "2023-12-15", // Required field for Brand
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
const getStatusBadge = (status: string) => {
  switch (status) {
    case "inactive":
      return <Badge variant="outline" className="bg-[#F2FCE2] text-gray-700 border-gray-200">Active</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}; 
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
    <div className="space-y-4 pt-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal tracking-tighter">INACTIVE USERS ({users.length})</h2>
        <div className="flex items-center gap-2">

        </div>
      </div>

     <div>
    <Card className="border border-gray-200 shadow-none rounded-lg">

      <CardContent className="p-0">
        <Table>
          <TableHeader>
          <TableRow>
              <TableHead className="font-normal text-xs uppercase">Type</TableHead>
              <TableHead className="font-normal text-xs uppercase">Company</TableHead>
              <TableHead className="font-normal text-xs uppercase">Name</TableHead>
              <TableHead className="font-normal text-xs uppercase">Contact</TableHead>
              <TableHead className="font-normal text-xs uppercase">Last Active</TableHead>
              <TableHead className="font-normal text-xs uppercase">Status</TableHead>
              <TableHead className="font-normal text-xs uppercase">Plan</TableHead>
              <TableHead className="font-normal text-xs uppercase">Sales Manager</TableHead>
              <TableHead className="font-normal text-xs uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {users.map((user) => (
              <TableRow key={user.id} className="font-light">
                <TableCell>
                  <Badge variant="secondary" className="capitalize border-gray-200">
                    {user.type}
                  </Badge>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell className="font-light">{user.contactPerson}</TableCell>
                <div className="flex flex-col space-y-1 pt-5">
                  <div className="flex items-center">
                    <span className="text-xs">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">{user.phone}</span>
                    </div>
                  </div>
                  <TableCell>{user.lastActivity}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>



                <TableCell>{user.plan}</TableCell>
                <TableCell>Manager {user.assignedManager}</TableCell>

                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewDetails(user.id)}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <Eye className="h-4 w-4" strokeWidth={1.5}  />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleActivate(user.id)}
                    className="h-8 w-8 p-0 hover:bg-green-100"
                  >
                    <UserCheck className="h-4 w-4 text-green-700" strokeWidth={1.5}  />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
    </div>
  );
};

export default InactiveUsers;
