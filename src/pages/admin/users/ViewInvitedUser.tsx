
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InvitedUser } from "@/types/users";

const ViewInvitedUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<InvitedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    const mockUser: InvitedUser = {
      id: Number(userId),
      type: "brand",
      invitedBy: "Sales Manager 1",
      companyName: "New Fashion Brand",
      contactPerson: "Sarah Johnson",
      phone: "+1234567890",
      email: "sarah@newfashion.com",
      dateInvited: "2024-04-15",
      linkClicked: true,
      registered: false,
      converted: false,
      status: "pending"
    };
    setUser(mockUser);
    setLoading(false);
  }, [userId]);

  const handleBack = () => {
    navigate("/admin/users");
  };

  const handleEdit = () => {
    navigate(`/admin/users/invited/${userId}/edit`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
          </Button>
        </div>
        <div className="h-96 flex items-center justify-center">
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
          </Button>
          <h1 className="text-4xl uppercase font-thin">{user?.companyName}</h1>
        </div>
        <Button className="bg-black text-white" onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" /> Edit User
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Status Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Badge variant="secondary" className="capitalize border-gray-200">
                {user?.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <Badge variant="secondary" className="capitalize border-gray-200">
                {user?.type}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date Invited</p>
              <p className="font-medium">{user?.dateInvited}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Contact Person</p>
              <p className="font-medium">{user?.contactPerson}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user?.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className={user?.linkClicked ? "text-green-600" : "text-gray-500"}>
                ✓ Link Clicked
              </div>
              <div className={user?.registered ? "text-green-600" : "text-gray-500"}>
                {user?.registered ? "✓" : "○"} Registered
              </div>
              <div className={user?.converted ? "text-green-600" : "text-gray-500"}>
                {user?.converted ? "✓" : "○"} Converted
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewInvitedUser;
