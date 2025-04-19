import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RegistrationRequest } from "@/types/users";

const ViewRegistrationDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<RegistrationRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    const mockRequest: RegistrationRequest = {
      id: Number(requestId),
      companyName: "Fashion Corp",
      contactPerson: "John Smith",
      userType: "brand",
      email: "john@fashioncorp.com",
      phone: "+1234567890",
      description: "High-end fashion brand",
      registrationDate: "2024-04-15",
      status: "pending",
      name: "Fashion Corp",
      type: "brand",
      website: "https://fashioncorp.com"
    };
    setRequest(mockRequest);
    setLoading(false);
  }, [requestId]);

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
          <p>Loading request details...</p>
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
        <h1 className="text-4xl uppercase font-thin">{request?.companyName}</h1>
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
                {request?.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <Badge variant="secondary" className="capitalize border-gray-200">
                {request?.userType}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registration Date</p>
              <p className="font-medium">{request?.registrationDate}</p>
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
              <p className="font-medium">{request?.contactPerson}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{request?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{request?.phone}</p>
            </div>
          </CardContent>
        </Card>

        {(request?.description || request?.website) && (
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl uppercase font-thin">Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {request.description && (
                <p className="font-light">{request.description}</p>
              )}
              {request.website && (
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a 
                    href={request.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    {request.website}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewRegistrationDetails;
