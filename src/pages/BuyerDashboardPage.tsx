
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BuyerDashboardPage = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Safety check - redirect if not a buyer
    if (profile && profile.role !== "buyer") {
      navigate("/");
    }
  }, [profile, navigate]);

  return (
    <div className="container max-w-[1481px] px-4 py-10">
      <h1 className="text-3xl uppercase font-thin mb-8">
        <span className="font-normal">BUYER</span> DASHBOARD
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase font-thin">Discover Brands</CardTitle>
            <CardDescription>Browse available brands</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Explore our curated selection of fashion brands.
            </p>
            <Button variant="outline" className="w-full" onClick={() => navigate("/brands")}>
              BROWSE BRANDS
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="uppercase font-thin">AI Recommendations</CardTitle>
            <CardDescription>Hand-picked brands for you</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              Get personalized brand recommendations based on your preferences.
            </p>
            <Button variant="outline" className="w-full">GET RECOMMENDATIONS</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="uppercase font-thin">Contact History</CardTitle>
            <CardDescription>Your brand inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">
              View and manage your brand communication history.
            </p>
            <Button variant="outline" className="w-full">VIEW HISTORY</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyerDashboardPage;
