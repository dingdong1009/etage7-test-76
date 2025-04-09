
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";
import { UserType } from "@/types/users";

interface UserActionButtonsProps {
  userType: UserType;
  userId: number;
  onViewUser: (userType: UserType, userId: number) => void;
  onEditUser: (userType: UserType, userId: number) => void;
}

const UserActionButtons = ({ userType, userId, onViewUser, onEditUser }: UserActionButtonsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button 
        className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
        onClick={() => onViewUser(userType, userId)}
      >
        <Eye className="h-4 w-4 mr-1" /> View
      </Button>
      <Button 
        className="text-xs text-black px-2 py-1 bg-gray-100 rounded hover:text-white"
        onClick={() => onEditUser(userType, userId)}
      >
        <Edit className="h-4 w-4 mr-1" /> Edit
      </Button>
    </div>
  );
};

export default UserActionButtons;
