
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

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
  const [navigationAttempted, setNavigationAttempted] = useState(false);

  useEffect(() => {
    // Only redirect if we haven't already attempted navigation
    if (!navigationAttempted) {
      const redirectUser = () => {
        if (!isLoading) {
          if (!user) {
            // Store the current path to redirect back after login
            const returnPath = location.pathname;
            console.log("Not authenticated, redirecting to auth page. Return path:", returnPath);
            // Use replace to avoid building up history stack
            navigate("/auth", { replace: true, state: { returnTo: returnPath } });
            setNavigationAttempted(true);
          } else if (profile) {
            // Check for required approval
            if (requireApproved && profile.approval_status !== "approved") {
              console.log("User not approved, redirecting to registration success page");
              navigate("/registration-success", { replace: true });
              setNavigationAttempted(true);
            }
            
            // Check for role-based access
            else if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
              console.log("User doesn't have required role, redirecting to home");
              navigate("/", { replace: true });
              setNavigationAttempted(true);
            }
          }
        }
      };

      redirectUser();
    }
  }, [user, profile, isLoading, navigate, allowedRoles, requireApproved, location, navigationAttempted]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // If not logged in, don't render children
  if (!user || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-600">Please log in to access this page</p>
      </div>
    );
  }

  // If approval required but not approved
  if (requireApproved && profile.approval_status !== "approved") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-600">Your account is pending approval</p>
      </div>
    );
  }

  // If role check fails
  if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-600">You don't have permission to access this page</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
