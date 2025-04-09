
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";

const ViewUser = () => {
  const { userType, userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch user data from an API
    // This is a mock implementation
    const fetchUserData = () => {
      setLoading(true);
      setTimeout(() => {
        // Sample data - in a real app, this would be fetched from an API
        if (userType === "brand") {
          const brandUser = {
            id: Number(userId),
            name: "Luxury Brands Inc.",
            status: "active",
            plan: "Premium",
            lastActivity: "2 hours ago",
            contactPerson: "John Smith",
            email: "john@luxurybrandsinc.com",
            phone: "+1 (555) 123-4567",
            website: "luxurybrandsinc.com",
            description: "Leading luxury fashion and accessories brand focused on high-end retail market",
            marketSegment: "Luxury Apparel",
            productsCount: 245,
            activeSince: "June 2018",
            avgOrderValue: "$2,500",
            totalSales: "$1.2M"
          };
          setUser(brandUser);
        } else {
          const buyerUser = {
            id: Number(userId),
            name: "Department Store Group",
            status: "active",
            plan: "Enterprise",
            lastActivity: "1 hour ago",
            contactPerson: "Robert Chen",
            email: "robert@departmentstoregroup.com",
            phone: "+1 (555) 678-9012",
            website: "departmentstoregroup.com",
            description: "National chain of premium department stores operating in major cities",
            marketSegment: "Department Stores",
            storeCount: 35,
            activeSince: "January 2015",
            avgOrderValue: "$45,000",
            annualPurchases: "$12M"
          };
          setUser(buyerUser);
        }
        setLoading(false);
      }, 500);
    };

    fetchUserData();
  }, [userId, userType]);

  const handleBack = () => {
    navigate("/sales/users");
  };

  const handleEdit = () => {
    navigate(`/sales/users/${userType}/${userId}/edit`);
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
          <h1 className="text-4xl uppercase font-thin">{user?.name}</h1>
        </div>
        <Button className="bg-black text-white" onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" /> Edit User
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">User Status</p>
              <p className="font-medium">{user?.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-medium">{user?.plan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Activity</p>
              <p className="font-medium">{user?.lastActivity}</p>
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
            <div>
              <p className="text-sm text-gray-500">Website</p>
              <a href={`https://${user?.website}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                {user?.website}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Company Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium">{user?.description}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Segment</p>
              <p className="font-medium">{user?.marketSegment}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Since</p>
              <p className="font-medium">{user?.activeSince}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userType === "brand" ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">Products Count</p>
                  <p className="font-medium">{user?.productsCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Order Value</p>
                  <p className="font-medium">{user?.avgOrderValue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="font-medium">{user?.totalSales}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-500">Store Count</p>
                  <p className="font-medium">{user?.storeCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Order Value</p>
                  <p className="font-medium">{user?.avgOrderValue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Purchases</p>
                  <p className="font-medium">{user?.annualPurchases}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewUser;
