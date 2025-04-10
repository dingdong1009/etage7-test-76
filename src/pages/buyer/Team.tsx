
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Edit, Trash2 } from "lucide-react";

// Team member interface for type safety
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Inactive";
  joinDate: string;
}

const Team = () => {
  // Sample team members data
  const [teamMembers] = useState<TeamMember[]>([
    { id: "1", name: "Sophie Martin", email: "sophie@fashionstore.com", role: "Owner", status: "Active", joinDate: "Jan 15, 2023" },
    { id: "2", name: "Jean Dupont", email: "jean@fashionstore.com", role: "Buyer", status: "Active", joinDate: "Mar 22, 2023" },
    { id: "3", name: "Amelia Chen", email: "amelia@fashionstore.com", role: "Buyer Assistant", status: "Active", joinDate: "Jun 10, 2023" },
    { id: "4", name: "Lucas Bernard", email: "lucas@fashionstore.com", role: "Merchandiser", status: "Active", joinDate: "Sep 05, 2023" },
    { id: "5", name: "Emma Wilson", email: "emma@fashionstore.com", role: "Buyer", status: "Pending", joinDate: "Apr 01, 2024" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Team</h1>
        <Button className="bg-black text-white hover:bg-gray-800">
          <UserPlus size={16} className="mr-2" />
          Add Member
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="hidden md:table-cell">{member.joinDate}</TableCell>
                  <TableCell>
                    <span 
                      className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                        member.status === "Active" ? "bg-green-100 text-green-800" :
                        member.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        title="Edit team member"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        title="Delete team member"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
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

export default Team;
