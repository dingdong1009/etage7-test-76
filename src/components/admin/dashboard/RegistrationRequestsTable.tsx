
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegistrationRequest } from "@/types/users";
import { 
  Check, 
  X, 
  UserCheck, 
  Calendar,
  Mail,
  Phone,
  Globe,
  MoreHorizontal,
  Building,
  Store,
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface RegistrationRequestsTableProps {
  registrationRequests: RegistrationRequest[];
  salesManagers: { id: number; name: string }[];
  onStatusChange: (id: number, status: "pending" | "approved" | "rejected") => void;
  onAssignManager: (id: number, managerId: number) => void;
}

const RegistrationRequestsTable: React.FC<RegistrationRequestsTableProps> = ({
  registrationRequests,
  salesManagers,
  onStatusChange,
  onAssignManager,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredRequests = registrationRequests.filter(request => {
    if (statusFilter === "all") return true;
    return request.status === statusFilter;
  });
  
  const handleStatusChange = (id: number, status: "pending" | "approved" | "rejected") => {
    onStatusChange(id, status);
    toast({
      title: `Request ${status}`,
      description: `Registration request has been ${status}`,
    });
  };
  
  const handleAssignManager = (id: number, managerId: number) => {
    onAssignManager(id, managerId);
    const managerName = salesManagers.find(manager => manager.id === managerId)?.name;
    toast({
      title: "Manager Assigned",
      description: `Request assigned to ${managerName}`,
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-light tracking-tighter">REGISTRATION REQUESTS</h2>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-9 font-light text-xs uppercase border-gray-200 rounded-none">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs uppercase font-light">ALL STATUS</SelectItem>
              <SelectItem value="pending" className="text-xs uppercase font-light">PENDING</SelectItem>
              <SelectItem value="approved" className="text-xs uppercase font-light">APPROVED</SelectItem>
              <SelectItem value="rejected" className="text-xs uppercase font-light">REJECTED</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-light text-xs uppercase">Type</TableHead>
              <TableHead className="font-light text-xs uppercase">Name</TableHead>
              <TableHead className="font-light text-xs uppercase">Contact</TableHead>
              <TableHead className="font-light text-xs uppercase">Registration Date</TableHead>
              <TableHead className="font-light text-xs uppercase">Status</TableHead>
              <TableHead className="font-light text-xs uppercase">Assigned To</TableHead>
              <TableHead className="font-light text-xs uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No registration requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-light">
                    <div className="flex items-center">
                      {request.userType === "brand" ? (
                        <Building className="mr-2 h-4 w-4 text-gray-400" />
                      ) : (
                        <Store className="mr-2 h-4 w-4 text-gray-400" />
                      )}
                      {request.userType === "brand" ? "Brand" : "Buyer"}
                    </div>
                  </TableCell>
                  <TableCell className="font-light">{request.companyName}</TableCell>
                  <TableCell className="font-light">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-xs">{request.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-xs">{request.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-light">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      {request.registrationDate}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <Select 
                      value={request.assignedManager?.toString()} 
                      onValueChange={(value) => handleAssignManager(request.id, Number(value))}
                    >
                      <SelectTrigger className="w-[140px] h-8 text-xs font-light border-gray-200 rounded-none">
                        <SelectValue placeholder="Assign Manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {salesManagers.map((manager) => (
                          <SelectItem key={manager.id} value={manager.id.toString()} className="text-xs">
                            {manager.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="text-xs font-light">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-xs cursor-pointer flex items-center"
                          onClick={() => handleStatusChange(request.id, "approved")}
                        >
                          <Check className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-xs cursor-pointer flex items-center"
                          onClick={() => handleStatusChange(request.id, "rejected")}
                        >
                          <X className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-xs cursor-pointer flex items-center"
                          onClick={() => handleStatusChange(request.id, "pending")}
                        >
                          <UserCheck className="mr-2 h-4 w-4" /> Mark as Pending
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RegistrationRequestsTable;
