
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AdminUsers = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Brand", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Buyer", status: "Active" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Brand", status: "Pending" },
    { id: 4, name: "Bob Wilson", email: "bob@example.com", role: "Buyer", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">User Management</h1>
        <Button className="bg-black text-white border-none hover:underline">
          Add New User
        </Button>
      </div>

      <div className="rounded-none border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Email</TableHead>
              <TableHead className="font-medium">Role</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-t border-gray-200">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge 
                    variant={user.status === "Active" ? "default" : user.status === "Pending" ? "outline" : "secondary"} 
                    className={`font-normal ${user.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                      user.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100" : 
                      "bg-gray-100 text-gray-800 hover:bg-gray-100"}`}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-200">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200 text-red-600 hover:text-red-700">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
