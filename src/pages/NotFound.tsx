
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6">404</h1>
        <p className="text-xl text-gray-600 mb-8 font-light">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild className="bg-black text-white hover:bg-gray-900">
          <Link to="/">
            RETURN TO HOME <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
