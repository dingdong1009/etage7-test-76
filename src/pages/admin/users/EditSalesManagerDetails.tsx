
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { SalesManager } from "@/types/users";

const EditSalesManagerDetails = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the manager's details
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
          <p>Loading manager details...</p>
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
        <h1 className="text-4xl uppercase font-thin">Edit {manager?.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <Input defaultValue={manager?.name} className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <Input defaultValue={manager?.email} className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <Input defaultValue={manager?.phone} className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-gray-500">Start Date</label>
                <Input defaultValue={manager?.startDate} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl uppercase font-thin">Compensation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Salary per Month</label>
                <Input defaultValue={manager?.salaryPerMonth} className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-gray-500">Commission Rate</label>
                <Input defaultValue={manager?.commissionRate} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleBack}>
            Cancel
          </Button>
          <Button type="submit" className="bg-black text-white">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSalesManagerDetails;
