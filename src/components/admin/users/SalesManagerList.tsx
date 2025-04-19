
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Plus, Search, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SalesManager } from "@/types/users";

interface SalesManagerListProps {
  salesManagers: SalesManager[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleAddUser: () => void;
  handleViewUser: (userType: string, userId: number) => void;
  handleEditUser: (userType: string, userId: number) => void;
}
const handleDeactivate = (id: number) => {
  console.log("Deactivate", id);
};

const SalesManagerList = ({
  salesManagers,
  statusFilter,
  setStatusFilter,
  handleAddUser,
  handleViewUser,
  handleEditUser
}: SalesManagerListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Ensure salesManagers is always an array, even if it's undefined
  const managers = Array.isArray(salesManagers) ? salesManagers : [];
  
  const filteredUsers = managers
    .filter(user => statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase())
    .filter(user => 
      searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal tracking-tighter">ACTIVE USERS ({filteredUsers.length})</h2>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by Sales Managers..."
              className="pl-10 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[150px] font-light text-xs uppercase border-gray-200 rounded-none">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all" className="text-xs uppercase font-light">ALL STATUS</SelectItem>
              <SelectItem value="active" className="text-xs uppercase font-light">Active</SelectItem>
              <SelectItem value="pending" className="text-xs uppercase font-light">Pending</SelectItem>
              <SelectItem value="inactive" className="text-xs uppercase font-light">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase" onClick={handleAddUser}>
            <Plus className="mr-1 h-4 w-4" /> Add Manager
          </Button>
        </div>
      </div>
      
      <div>
      <Card className="border border-gray-200 shadow-none rounded-lg">
        <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] font-normal text-xs uppercase">ID</TableHead>
                  <TableHead className="font-normal text-xs uppercase">Name</TableHead>
                  <TableHead className="font-normal text-xs uppercase">Start Date</TableHead>
                  <TableHead className="font-normal text-xs uppercase">Years in Company</TableHead>
                  <TableHead className="font-normal text-xs uppercase">Salary/Month</TableHead>
                  <TableHead className="font-normal text-xs uppercase">Commission Rate</TableHead>
                  <TableHead className="font-normal text-xs uppercase">Status</TableHead>
                  <TableHead className="text-right font-normal text-xs uppercase">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                      No sales managers found with the current filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                      <TableCell className="font-light">{user.id}</TableCell>
                      <TableCell className="font-light">{user.name}</TableCell>
                      <TableCell className="font-light">{user.startDate}</TableCell>
                      <TableCell className="font-light">{user.yearsInCompany}</TableCell>
                      <TableCell className="font-light">{user.salaryPerMonth}</TableCell>
                      <TableCell className="font-light">{user.commissionRate}</TableCell>
                      <TableCell className="capitalize">
                        <Badge 
                          variant="outline"
                          className={`
                            ${user.status === "active" ? "bg-accent-mint text-gray-800 border-gray-200" :
                              user.status === "pending" ? "bg-accent-yellow text-gray-800 border-gray-200" :
                              "bg-gray-100 text-gray-700 border-gray-200"}
                            text-xs font-normal px-2 py-0.5
                          `}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                      <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 hover:bg-gray-200"
                          onClick={() => handleViewUser("manager", user.id)}
                          title="View"
                        >
                          <Eye className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 hover:bg-gray-200"
                          onClick={() => handleEditUser("manager", user.id)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" strokeWidth={1.5}  />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeactivate(user.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100"
                        >
                          <UserX className="h-4 w-4 text-red-500" strokeWidth={1.5}  />
                    </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default SalesManagerList;
