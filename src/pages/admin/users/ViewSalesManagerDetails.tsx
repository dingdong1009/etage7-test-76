
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SalesManager } from "@/types/users";

const ViewSalesManagerDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [manager, setManager] = useState<SalesManager | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    const mockManager: SalesManager = {
      id: Number(userId),
      name: "Jessica Thompson",
      status: "active",
      email: "jessica@etage7.com",
      phone: "+1 (555) 123-4567",
      startDate: "March 2017",
      yearsInCompany: 6,
      salaryPerMonth: "$7,500",
      totalCommissions: "$230,000",
      ytdCommissions: "$78,500",
      commissionRate: "3.2%",
      lastActivity: "2024-03-15",
    };
    setManager(mockManager);
    setLoading(false);
  }, [userId]);

  const handleBack = () => {
    navigate("/admin/users");
  };

  const handleEdit = () => {
    navigate(`/admin/users/sales/${userId}/edit`);
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
          <p>Loading manager details...</p>
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
          <h1 className="text-4xl uppercase font-thin">{manager?.name}</h1>
        </div>
        <Button className="bg-black text-white" onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" /> Edit Manager
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Status Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Badge variant="secondary" className="capitalize border-gray-200">
                {manager?.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{manager?.startDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Years in Company</p>
              <p className="font-medium">{manager?.yearsInCompany}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{manager?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{manager?.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Performance</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Salary per Month</p>
              <p className="font-medium">{manager?.salaryPerMonth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Commission Rate</p>
              <p className="font-medium">{manager?.commissionRate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Commissions</p>
              <p className="font-medium">{manager?.totalCommissions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">YTD Commissions</p>
              <p className="font-medium">{manager?.ytdCommissions}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewSalesManagerDetails;
