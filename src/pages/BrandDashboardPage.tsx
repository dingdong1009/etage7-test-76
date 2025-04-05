
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BrandDashboardPage = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Safety check - redirect if not a brand
    if (profile && profile.role !== "brand") {
      navigate("/");
    }
  }, [profile, navigate]);

  return (
    <div className="container max-w-[1481px] px-4 py-10">
      <h1 className="text-3xl uppercase font-thin mb-8">
        <span className="font-normal">BRAND</span> DASHBOARD
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase font-thin">Products</CardTitle>
            <CardDescription>Manage your products</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Add, edit, and remove products from your inventory.
            </p>
            <Button variant="outline" className="w-full">MANAGE PRODUCTS</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="uppercase font-thin">Subscription</CardTitle>
            <CardDescription>Your current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              {profile?.approval_status === "approved" 
                ? "View or upgrade your current subscription plan."
                : "Your account is pending approval. Subscription options will be available once approved."}
            </p>
            <Button variant="outline" className="w-full" disabled={profile?.approval_status !== "approved"}>
              {profile?.approval_status === "approved" ? "MANAGE SUBSCRIPTION" : "AWAITING APPROVAL"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="uppercase font-thin">Buyer Requests</CardTitle>
            <CardDescription>Inquiries from buyers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Review and respond to inquiries from interested buyers.
            </p>
            <Button variant="outline" className="w-full">VIEW REQUESTS</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandDashboardPage;
