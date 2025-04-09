
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SalesUsers = () => {
  // Sample user data
  const users = [
    { id: 1, name: "Luxury Brands Inc.", status: "active", plan: "Premium", lastActivity: "2 hours ago" },
    { id: 2, name: "Fashion Forward Co.", status: "active", plan: "Professional", lastActivity: "1 day ago" },
    { id: 3, name: "Elegant Styles Ltd.", status: "pending", plan: "Basic", lastActivity: "3 days ago" },
    { id: 4, name: "Heritage Designs", status: "active", plan: "Premium", lastActivity: "5 hours ago" },
    { id: 5, name: "Modern Collections", status: "inactive", plan: "Basic", lastActivity: "2 weeks ago" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">User Management</h1>
      
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Managed Users</CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Button className="bg-black text-white border-none">+ Add User</Button>
            <Button className="bg-grey-200 text-black border hover:text-white">Export</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${
                          user.status === "active" ? "bg-green-100 text-green-800" :
                          user.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.plan}</TableCell>
                    <TableCell>{user.lastActivity}</TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <Button className="text-xs px-2 py-1 bg-gray-100 rounded">View</Button>
                      <Button className="text-xs px-2 py-1 bg-gray-100 rounded">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesUsers;
