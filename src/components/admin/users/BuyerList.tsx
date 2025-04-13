
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Buyer } from "@/types/users";

interface BuyerListProps {
  buyers: Buyer[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleAddUser: () => void;
  handleViewUser: (userType: string, userId: number) => void;
  handleEditUser: (userType: string, userId: number) => void;
}

const BuyerList = ({
  buyers,
  statusFilter,
  setStatusFilter,
  handleAddUser,
  handleViewUser,
  handleEditUser
}: BuyerListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredUsers = buyers
    .filter(user => statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase())
    .filter(user => 
      searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search buyers..."
            className="pl-9 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[150px] border-gray-200 bg-white text-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-black hover:bg-gray-800 text-white text-sm admin-button-primary" onClick={handleAddUser}>
            <Plus className="mr-1 h-4 w-4" /> Add Buyer
          </Button>
        </div>
      </div>
      
      <Card className="border border-gray-200 shadow-none rounded-lg">
        <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
          <CardTitle className="text-lg font-medium text-gray-900">
            Managed Buyers ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-gray-50">
                  <TableHead className="w-[80px] font-medium text-gray-600 text-sm">ID</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Name</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Contact</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Plan</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Last Activity</TableHead>
                  <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No buyers found with the current filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.contactPerson}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={`
                            ${user.status === "active" ? "bg-accent-mint text-gray-800 border-accent-mint" :
                              user.status === "pending" ? "bg-accent-yellow text-gray-800 border-accent-yellow" :
                              "bg-gray-100 text-gray-700 border-gray-200"}
                            text-xs font-medium px-2 py-0.5
                          `}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.plan}</TableCell>
                      <TableCell>{user.lastActivity}</TableCell>
                      <TableCell className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => handleViewUser("buyer", user.id)}
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => handleEditUser("buyer", user.id)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerList;
