
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    const redirectUser = () => {
      if (!isLoading) {
        if (!user) {
          // Store the current path to redirect back after login
          const returnPath = location.pathname;
          console.log("Not authenticated, redirecting to auth page. Return path:", returnPath);
          // Use replace to avoid building up history stack
          navigate("/auth", { replace: true, state: { returnTo: returnPath } });
        } else if (profile) {
          // Check for required approval
          if (requireApproved && profile.approval_status !== "approved") {
            console.log("User not approved, redirecting to registration success page");
            navigate("/registration-success", { replace: true });
          }
          
          // Check for role-based access
          if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
            console.log("User doesn't have required role, redirecting to home");
            navigate("/", { replace: true });
          }
        }
      }
    };

    redirectUser();
  }, [user, profile, isLoading, navigate, allowedRoles, requireApproved, location]);

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
