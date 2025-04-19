import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, UserCheck, UserX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RegistrationRequest } from "@/types/users";
import { useToast } from "@/hooks/use-toast";

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
    name: "Fashion Corp",
    type: "brand"
  }
];

const PendingRegistrations = () => {
  const [registrations, setRegistrations] = useState<RegistrationRequest[]>(mockRegistrations);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewDetails = (id: number) => {
    navigate(`/admin/users/registration/${id}`);
  };

  const handleStatusChange = (id: number, newStatus: "approved" | "rejected") => {
    setRegistrations(prevRegistrations =>
      prevRegistrations.map(reg =>
        reg.id === id ? { ...reg, status: newStatus } : reg
      )
    );

    toast({
      title: `Registration ${newStatus}`,
      description: `The registration request has been ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-[#F2FCE2] text-gray-700 border-gray-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-[#FFDEE2] text-gray-700 border-gray-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4 pt-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal uppercase tracking-tighter">REGISTRATION REQUESTS ({registrations.length})</h2>
      </div>

      <Card className="border border-gray-200 shadow-none rounded-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow >
                <TableHead className="font-normal text-xs uppercase">Type</TableHead>
                <TableHead className="font-normal text-xs uppercase">Company</TableHead>
                <TableHead className="font-normal text-xs uppercase">Name</TableHead>
                <TableHead className="font-normal text-xs uppercase">Contact</TableHead>
                <TableHead className="font-normal text-xs uppercase">Registration Date</TableHead>
                <TableHead className="font-normal text-xs uppercase">Status</TableHead>
                <TableHead className="font-normal text-xs uppercase text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => (
                <TableRow key={reg.id} className="font-light">
                  <TableCell>
                    <Badge variant="secondary" className="capitalize border-gray-200">
                      {reg.userType}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-light">{reg.companyName}</TableCell>
                  <TableCell className="font-light">{reg.contactPerson}</TableCell>

                  <div className="flex flex-col space-y-1 pt-5">
                    <div className="flex items-center">
                      <span className="text-xs">{reg.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs">{reg.phone}</span>
                    </div>
                  </div>

                  <TableCell>{reg.registrationDate}</TableCell>
                  <TableCell className="font-light">{getStatusBadge(reg.status)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(reg.id)}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStatusChange(reg.id, "approved")}
                      className="h-8 w-8 p-0 hover:bg-green-100"
                      title="Approve Registration"
                    >
                      <UserCheck className="h-4 w-4 text-green-700" strokeWidth={1.5} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStatusChange(reg.id, "rejected")}
                      className="h-8 w-8 p-0 hover:bg-red-100"
                      title="Reject Registration"
                    >
                      <UserX className="h-4 w-4 text-red-500" strokeWidth={1.5} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingRegistrations;
