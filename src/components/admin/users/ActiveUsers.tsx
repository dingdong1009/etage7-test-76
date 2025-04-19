
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

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="bg-[#F2FCE2] text-gray-700 border-gray-200">Active</Badge>;
    case "inactive":
      return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">Inactive</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}; 

const ActiveUsers = () => {
  const [users, setUsers] = useState<ActiveUser[]>(mockActiveUsers);

  const handleViewDetails = (id: number) => {
    console.log("View details", id);
  };

  const handleDeactivate = (id: number) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status: "inactive" } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="space-y-4 pt-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal tracking-tighter">ACTIVE USERS ({users.length})</h2>
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
                  <TableHead className="font-normal text-xs uppercase">Registration Date</TableHead>
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
                    <TableCell>
                      <div className="flex flex-col space-y-1 pt-5">
                        <div className="flex items-center">
                          <span className="text-xs">{user.email}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs">{user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.registrationDate}</TableCell>
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
                        <Eye className="h-4 w-4" strokeWidth={1.5} />
                      </Button>
                      {user.status === "active" ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeactivate(user.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100"
                        >
                          <UserX className="h-4 w-4 text-red-500" strokeWidth={1.5} />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {/* Reactivate logic if needed */}}
                          className="h-8 w-8 p-0 hover:bg-green-100"
                        >
                          <UserCheck className="h-4 w-4 text-green-500" strokeWidth={1.5} />
                        </Button>
                      )}
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

export default ActiveUsers;
