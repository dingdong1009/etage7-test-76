
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import UserAddForm from "@/components/admin/users/UserAddForm";

const AddSalesManager = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/admin/users");
  };

  const handleAddUserSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // In a real app, this would send the data to an API
    navigate("/admin/users");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
        </Button>
        <h1 className="text-4xl uppercase font-thin">Add New Sales Manager</h1>
      </div>

      <UserAddForm
        activeTab="salesManager"
        handleGoBack={handleGoBack}
        handleAddUserSubmit={handleAddUserSubmit}
      />
    </div>
  );
};

export default AddSalesManager;
