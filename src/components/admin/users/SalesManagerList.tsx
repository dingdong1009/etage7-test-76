
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SalesManager } from "@/types/users";

interface SalesManagerListProps {
  salesManagers: SalesManager[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleAddUser: () => void;
  handleViewUser: (userType: string, userId: number) => void;
  handleEditUser: (userType: string, userId: number) => void;
}

const SalesManagerList = ({
  salesManagers,
  statusFilter,
  setStatusFilter,
  handleAddUser,
  handleViewUser,
  handleEditUser
}: SalesManagerListProps) => {
  const filteredUsers = statusFilter === "all" 
    ? salesManagers 
    : salesManagers.filter(user => user.status.toLowerCase() === statusFilter.toLowerCase());
    
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
        <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
          Sales Managers
        </CardTitle>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-black text-white border-none" onClick={handleAddUser}>
            <Plus className="mr-1 h-4 w-4" /> Add User
          </Button>
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
                <TableHead>Level</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
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
                  <TableCell>{user.seniorityLevel}</TableCell>
                  <TableCell>{user.lastActivity}</TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button 
                      className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                      onClick={() => handleViewUser("salesManager", user.id)}
                    >
                      View
                    </Button>
                    <Button 
                      className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
                      onClick={() => handleEditUser("salesManager", user.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesManagerList;
