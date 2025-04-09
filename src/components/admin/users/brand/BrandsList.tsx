
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brand } from "@/types/users";
import StatusBadge from "../StatusBadge";
import UserActionButtons from "../UserActionButtons";
import HeaderActions from "../HeaderActions";
import { brands } from "@/data/mockUsers";
import { UserType } from "@/types/users";

interface BrandsListProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onAddUser: () => void;
  onViewUser: (userType: UserType, userId: number) => void;
  onEditUser: (userType: UserType, userId: number) => void;
}

const BrandsList = ({ 
  statusFilter, 
  onStatusFilterChange, 
  onAddUser, 
  onViewUser, 
  onEditUser 
}: BrandsListProps) => {
  
  const filteredUsers = statusFilter === "all" 
    ? brands 
    : brands.filter(user => user.status.toLowerCase() === statusFilter.toLowerCase());
  
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
        <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
          Managed Brands
        </CardTitle>
        <HeaderActions 
          statusFilter={statusFilter} 
          onStatusFilterChange={onStatusFilterChange} 
          onAddUser={onAddUser} 
        />
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
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>{user.plan}</TableCell>
                  <TableCell>{user.lastActivity}</TableCell>
                  <TableCell>
                    <UserActionButtons 
                      userType="brand" 
                      userId={user.id}
                      onViewUser={onViewUser}
                      onEditUser={onEditUser}
                    />
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

export default BrandsList;
