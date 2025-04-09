
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SalesUsers = () => {
  // Sample brands data
  const brands = [
    { id: 1, name: "Luxury Brands Inc.", status: "active", plan: "Premium", lastActivity: "2 hours ago" },
    { id: 2, name: "Fashion Forward Co.", status: "active", plan: "Professional", lastActivity: "1 day ago" },
    { id: 3, name: "Elegant Styles Ltd.", status: "pending", plan: "Basic", lastActivity: "3 days ago" },
    { id: 4, name: "Heritage Designs", status: "active", plan: "Premium", lastActivity: "5 hours ago" },
    { id: 5, name: "Modern Collections", status: "inactive", plan: "Basic", lastActivity: "2 weeks ago" }
  ];

  // Sample buyers data
  const buyers = [
    { id: 1, name: "Department Store Group", status: "active", plan: "Enterprise", lastActivity: "1 hour ago" },
    { id: 2, name: "Boutique Network LLC", status: "active", plan: "Professional", lastActivity: "3 days ago" },
    { id: 3, name: "Global Retail Partners", status: "pending", plan: "Premium", lastActivity: "1 week ago" },
    { id: 4, name: "Fashion Outlets Inc.", status: "active", plan: "Enterprise", lastActivity: "12 hours ago" },
    { id: 5, name: "Luxury Retail Alliance", status: "inactive", plan: "Basic", lastActivity: "1 month ago" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">User Management</h1>
      
      <Tabs defaultValue="brands" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="brands">Managed Brands</TabsTrigger>
          <TabsTrigger value="buyers">Managed Buyers</TabsTrigger>
        </TabsList>

        <TabsContent value="brands">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Managed Brands</CardTitle>
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
                    {brands.map((user) => (
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
                          <Button className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white">View</Button>
                          <Button className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buyers">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Managed Buyers</CardTitle>
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
                    {buyers.map((user) => (
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
                          <Button className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white">View</Button>
                          <Button className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesUsers;
