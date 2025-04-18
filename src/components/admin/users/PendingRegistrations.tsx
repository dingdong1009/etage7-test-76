
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationRequest } from "@/types/users";

const mockRegistrations: RegistrationRequest[] = [
  {
    id: 1,
    companyName: "Fashion Corp",
    contactPerson: "John Smith",
    userType: "brand",
    email: "john@fashioncorp.com",
    phone: "+1234567890",
    description: "High-end fashion brand",
    registrationDate: "2024-04-15",
    status: "pending",
    name: "Fashion Corp", // Added for component compatibility
    type: "brand" // Added for component compatibility
  },
  // Add more mock data as needed
];

const PendingRegistrations = () => {
  const [registrations] = useState<RegistrationRequest[]>(mockRegistrations);

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
          Pending Registrations ({registrations.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-gray-50">
              <TableHead className="w-[200px] font-medium">Company</TableHead>
              <TableHead className="font-medium">Contact</TableHead>
              <TableHead className="font-medium">Type</TableHead>
              <TableHead className="font-medium">Email</TableHead>
              <TableHead className="font-medium">Phone</TableHead>
              <TableHead className="font-medium">Registration Date</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((reg) => (
              <TableRow key={reg.id} className="border-t border-gray-100">
                <TableCell>{reg.companyName}</TableCell>
                <TableCell>{reg.contactPerson}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {reg.userType}
                  </Badge>
                </TableCell>
                <TableCell>{reg.email}</TableCell>
                <TableCell>{reg.phone}</TableCell>
                <TableCell>{reg.registrationDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-accent-yellow text-gray-800 border-accent-yellow">
                    {reg.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewDetails(reg.id)}
                    className="hover:bg-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleActivate(reg.id)}
                    className="hover:bg-gray-100"
                  >
                    <UserCheck className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeactivate(reg.id)}
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

export default PendingRegistrations;
