
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Array<"admin" | "sales_manager" | "brand" | "buyer">;
  requireApproved?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  requireApproved = true 
}: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
      } else if (profile) {
        // Check for required approval
        if (requireApproved && profile.approval_status !== "approved") {
          navigate("/registration-success");
        }
        
        // Check for role-based access
        if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
          navigate("/");
        }
      }
    }
  }, [user, profile, isLoading, navigate, allowedRoles, requireApproved]);

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // If not logged in, or doesn't have required role, don't render children
  if (!user || !profile) {
    return null;
  }

  if (requireApproved && profile.approval_status !== "approved") {
    return null;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
