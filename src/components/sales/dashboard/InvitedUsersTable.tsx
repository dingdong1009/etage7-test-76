
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MailOpen, Clock, UserCheck, UserX, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvitedUser } from "@/types/users";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface InvitedUsersTableProps {
  invitedUsers: InvitedUser[];
}

const InvitedUsersTable: React.FC<InvitedUsersTableProps> = ({ invitedUsers }) => {
  const handleResendInvite = (id: number) => {
    toast({
      title: "Invitation resent",
      description: "The invitation has been resent successfully.",
    });
  };

  const handleCancelInvite = (id: number) => {
    toast({
      title: "Invitation cancelled",
      description: "The invitation has been cancelled.",
    });
  };

  const getStatusIcon = (user: InvitedUser) => {
    if (user.converted) return <UserCheck className="h-4 w-4 text-green-500" />;
    if (user.registered) return <MailOpen className="h-4 w-4 text-blue-500" />;
    if (user.linkClicked) return <Mail className="h-4 w-4 text-yellow-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  const getStatusText = (user: InvitedUser) => {
    if (user.converted) return "Converted";
    if (user.registered) return "Registered";
    if (user.linkClicked) return "Link clicked";
    return "Pending";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-light tracking-tighter">INVITATIONS STATUS</h2>
      
      <Card className="border border-gray-200 shadow-none rounded-lg">
        <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
          <CardTitle className="text-lg font-medium text-gray-900">
            Recent Invitations ({invitedUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent bg-gray-50">
                <TableHead className="w-[200px] font-medium">Company</TableHead>
                <TableHead className="font-medium">Contact</TableHead>
                <TableHead className="font-medium">Date Invited</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Progress</TableHead>
                <TableHead className="text-right font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitedUsers.map((user) => (
                <TableRow key={user.id} className="border-t border-gray-100">
                  <TableCell>{user.companyName}</TableCell>
                  <TableCell>
                    <div>{user.contactPerson}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </TableCell>
                  <TableCell>{user.dateInvited}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(user)}
                      <span className="text-sm">{getStatusText(user)}</span>
                    </div>
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
                          className="text-xs cursor-pointer"
                          onClick={() => handleResendInvite(user.id)}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Resend Invite
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-xs cursor-pointer text-red-600"
                          onClick={() => handleCancelInvite(user.id)}
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Cancel Invite
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default InvitedUsersTable;
