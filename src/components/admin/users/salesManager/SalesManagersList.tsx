
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "../StatusBadge";
import UserActionButtons from "../UserActionButtons";
import HeaderActions from "../HeaderActions";
import { salesManagers } from "@/data/mockUsers";
import { UserType } from "@/types/users";

interface SalesManagersListProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onAddUser: () => void;
  onViewUser: (userType: UserType, userId: number) => void;
  onEditUser: (userType: UserType, userId: number) => void;
}

const SalesManagersList = ({ 
  statusFilter, 
  onStatusFilterChange, 
  onAddUser, 
  onViewUser, 
  onEditUser 
}: SalesManagersListProps) => {
  
  const filteredUsers = statusFilter === "all" 
    ? salesManagers 
    : salesManagers.filter(user => user.status.toLowerCase() === statusFilter.toLowerCase());
  
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
        <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
          Sales Managers
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
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Years</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Salary/Month</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>YTD Commission</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.startDate}</TableCell>
                  <TableCell>{user.yearsInCompany}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>{user.salaryPerMonth}</TableCell>
                  <TableCell>{user.commissionRate}</TableCell>
                  <TableCell>{user.ytdCommissions}</TableCell>
                  <TableCell>
                    <UserActionButtons 
                      userType="salesManager" 
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

export default SalesManagersList;
