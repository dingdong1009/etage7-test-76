
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvitedUser, Brand, Buyer } from "@/types/users";


const mockInvitedUsers: InvitedUser[] = [
  {
    id: 1,
    type: "brand",
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
    <div className="space-y-4 pt-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal tracking-tighter">INVITED USERS ({users.length})</h2>
        <div className="flex items-center gap-2">

        </div>
      </div>

     <div>
    <Card className="border border-gray-200 shadow-none rounded-lg">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
          <TableRow >
              <TableHead className="font-normal text-xs uppercase">Type</TableHead>
              <TableHead className="font-normal text-xs uppercase">Company</TableHead>
              <TableHead className="font-normal text-xs uppercase">Name</TableHead>
              <TableHead className="font-normal text-xs uppercase">Contact</TableHead>
              <TableHead className="font-normal text-xs uppercase">Invited By</TableHead>
              <TableHead className="font-normal text-xs uppercase">Date Invited</TableHead>
              <TableHead className="font-normal text-xs uppercase">Status</TableHead>
              <TableHead className="font-normal text-xs uppercase">Progress</TableHead>
              <TableHead className="text-right font-normal text-xs uppercase">Actions</TableHead>
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
                <TableCell>{user.companyName}</TableCell>
                <TableCell>
                  <div>{user.contactPerson}</div>
                </TableCell>
                <div className="flex flex-col space-y-1 pt-5">
                  <div className="flex items-center">
                    <span className="text-xs">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">{user.phone}</span>
                    </div>
                  </div>
                <TableCell>{user.invitedBy}</TableCell>
                <TableCell>{user.dateInvited}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize border-gray-200">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-xs">
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
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <Eye className="h-4 w-4" strokeWidth={1.5}  />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(user.id)}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <Edit className="h-4 w-4" strokeWidth={1.5}  />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                    className="h-8 w-8 p-0 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" strokeWidth={1.5}  />
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

export default InvitedUsers;
