
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvitedUser } from "@/types/users";

const mockInvitedUsers: InvitedUser[] = [
  {
    id: 1,
    invitedBy: "Sales Manager 1",
    companyName: "New Fashion Brand",
    contactPerson: "Sarah Johnson",
    phone: "+1234567890",
    email: "sarah@newfashion.com",
    dateInvited: "2024-04-15",
    linkClicked: true,
    registered: false,
    converted: false,
    status: "pending"
  },
  // Add more mock data as needed
];

const InvitedUsers = () => {
  const [users] = useState<InvitedUser[]>(mockInvitedUsers);

  const handleViewDetails = (id: number) => {
    console.log("View details", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete", id);
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
          Invited Users ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-gray-50">
              <TableHead className="w-[200px] font-medium">Company</TableHead>
              <TableHead className="font-medium">Contact</TableHead>
              <TableHead className="font-medium">Invited By</TableHead>
              <TableHead className="font-medium">Date Invited</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Progress</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-t border-gray-100">
                <TableCell>{user.companyName}</TableCell>
                <TableCell>
                  <div>{user.contactPerson}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </TableCell>
                <TableCell>{user.invitedBy}</TableCell>
                <TableCell>{user.dateInvited}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-accent-yellow text-gray-800 border-accent-yellow">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className={user.linkClicked ? "text-green-600" : "text-gray-500"}>
                      ✓ Link Clicked
                    </div>
                    <div className={user.registered ? "text-green-600" : "text-gray-500"}>
                      {user.registered ? "✓" : "○"} Registered
                    </div>
                    <div className={user.converted ? "text-green-600" : "text-gray-500"}>
                      {user.converted ? "✓" : "○"} Converted
                    </div>
                  </div>
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
                    onClick={() => handleEdit(user.id)}
                    className="hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                    className="hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4" />
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

export default InvitedUsers;
