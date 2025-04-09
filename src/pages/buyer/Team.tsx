
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, MoreHorizontal } from "lucide-react";

const BuyerTeam = () => {
  // Sample team data
  const teamMembers = [
    { 
      id: 1, 
      name: "John Smith", 
      email: "john.smith@example.com", 
      role: "Buyer Manager", 
      status: "active", 
      joined: "Jan 15, 2023"
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      email: "sarah.johnson@example.com", 
      role: "Buyer Assistant", 
      status: "active", 
      joined: "Mar 22, 2023"
    },
    { 
      id: 3, 
      name: "Robert Williams", 
      email: "robert.williams@example.com", 
      role: "Product Specialist", 
      status: "inactive", 
      joined: "May 10, 2023"
    },
    { 
      id: 4, 
      name: "Emma Brown", 
      email: "emma.brown@example.com", 
      role: "Financial Analyst", 
      status: "active", 
      joined: "Aug 05, 2023"
    },
    { 
      id: 5, 
      name: "Michael Davis", 
      email: "michael.davis@example.com", 
      role: "Buyer Assistant", 
      status: "pending", 
      joined: "Oct 18, 2023"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <button className="text-xs px-3 py-2 bg-black text-white rounded-none flex items-center gap-1 w-full sm:w-auto justify-center">
          <UserPlus size={16} />
          Add Team Member
        </button>
      </div>
      
      <Card className="border border-gray-200 rounded-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Team Members</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="search" 
              placeholder="Search members..." 
              className="w-full rounded-none border border-gray-200 pl-8 py-2 text-sm outline-none focus:border-black"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`rounded-none ${
                          member.status === "active" ? "bg-green-100 text-green-800" :
                          member.status === "inactive" ? "bg-gray-100 text-gray-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.joined}</TableCell>
                    <TableCell className="text-right">
                      <button className="p-1 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">Showing 5 of 5 members</p>
            <div className="flex space-x-1">
              <button className="px-2 py-1 text-sm border rounded-none">Previous</button>
              <button className="px-2 py-1 text-sm border rounded-none bg-gray-100">1</button>
              <button className="px-2 py-1 text-sm border rounded-none">Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerTeam;
