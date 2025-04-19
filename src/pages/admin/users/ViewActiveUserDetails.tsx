
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Brand, Buyer } from "@/types/users";

type ActiveUser = (Brand | Buyer) & { type: "brand" | "buyer" };

const ViewActiveUserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<ActiveUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    const mockUser: ActiveUser = {
      id: Number(userId),
      type: "brand",
      name: "Luxury Fashion Co",
      status: "active",
      plan: "Premium",
      lastActivity: "2024-04-10",
      activeSince: "2024-01-15",
      assignedManager: 1,
      registrationDate: "2024-01-01",
      contactPerson: "John Smith",
      email: "john@luxuryfashion.com",
      phone: "+1234567890",
      website: "www.luxuryfashion.com",
      description: "High-end fashion brand",
      marketSegment: "Luxury",
      productsCount: 100,
      avgOrderValue: "$1000",
      totalSales: "$100000",
    };
    setUser(mockUser);
    setLoading(false);
  }, [userId]);

  const handleBack = () => {
    navigate("/admin/users");
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
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
        </Button>
        <h1 className="text-4xl uppercase font-thin">{user?.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-medium">{user?.plan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Since</p>
              <p className="font-medium">{user?.activeSince}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
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
            {user?.website && (
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <a 
                  href={user.website.startsWith('http') ? user.website : `https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-700 hover:underline"
                >
                  {user.website}
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Market Segment</p>
              <p className="font-medium">{user?.marketSegment}</p>
            </div>
            {user?.type === "brand" && user.productsCount !== undefined && (
              <div>
                <p className="text-sm text-gray-500">Products Count</p>
                <p className="font-medium">{user.productsCount}</p>
              </div>
            )}
            {user?.type === "buyer" && user.storeCount !== undefined && (
              <div>
                <p className="text-sm text-gray-500">Store Count</p>
                <p className="font-medium">{user.storeCount}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="font-medium">{user?.avgOrderValue}</p>
            </div>
            {user?.type === "brand" && 'totalSales' in user && (
              <div>
                <p className="text-sm text-gray-500">Total Sales</p>
                <p className="font-medium">{user.totalSales}</p>
              </div>
            )}
            {user?.type === "buyer" && 'annualPurchases' in user && (
              <div>
                <p className="text-sm text-gray-500">Annual Purchases</p>
                <p className="font-medium">{user.annualPurchases}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewActiveUserDetails;
