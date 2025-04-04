
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  allowedRoles?: Array<"admin" | "sales_manager" | "brand" | "buyer">;
};

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  // If no user or no profile, redirect to auth page
  if (!user || !profile) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // If approval is required and status is not approved (except for admin and sales manager)
  if (
    profile.approval_status !== "approved" && 
    profile.role !== "admin" && 
    profile.role !== "sales_manager"
  ) {
    return <Navigate to="/pending-approval" replace />;
  }
  
  // If specific roles are allowed and user doesn't have one of them
  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};
