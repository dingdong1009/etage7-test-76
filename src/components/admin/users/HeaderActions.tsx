
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeaderActionsProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onAddUser: () => void;
}

const HeaderActions = ({ statusFilter, onStatusFilterChange, onAddUser }: HeaderActionsProps) => {
  return (
    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
      <Select
        value={statusFilter}
        onValueChange={onStatusFilterChange}
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
      <Button className="bg-black text-white border-none" onClick={onAddUser}>
        <Plus className="mr-1 h-4 w-4" /> Add User
      </Button>
      <Button className="bg-grey-200 text-black border hover:text-white">Export</Button>
    </div>
  );
};

export default HeaderActions;
