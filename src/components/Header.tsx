
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "HOME", path: "/" },
    { title: "BRANDS", path: "/brands" },
    { title: "BUYERS", path: "/buyers" },
    { title: "SERVICES", path: "/services" },
    { title: "EVENTS", path: "/events" },
    { title: "RESOURCES", path: "/resources" },
    { title: "CURATED", path: "/curated" },
  ];

  // Add admin and sales manager links if user has those roles
  const adminLinks = profile?.role === "admin" || profile?.role === "sales_manager" ? [
    { title: "USERS", path: "/users-management" },
  ] : [];
  
  // Combine all links
  const allLinks = [...navLinks, ...adminLinks];

  return (
    <header
      className={`w-full fixed top-0 transition-all duration-300 z-50 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-semibold uppercase">
            PLATFORM
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {allLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-black hover:underline hover:decoration-2 hover:underline-offset-8 transition-all relative group font-light"
              >
                <span>{link.title}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="hover:bg-black hover:text-white transition-colors"
              >
                SIGN OUT
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => navigate("/auth")}
                className="hover:bg-black hover:text-white transition-colors"
              >
                LOGIN / REGISTER
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] px-6">
              <div className="flex flex-col h-full py-6">
                <div className="flex justify-end mb-8">
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetTrigger>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {allLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="py-2 text-black hover:underline hover:decoration-2 hover:underline-offset-8 transition-all"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-auto space-y-4">
                  {user ? (
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut}
                      className="w-full hover:bg-black hover:text-white transition-colors"
                    >
                      SIGN OUT
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/auth")}
                      className="w-full hover:bg-black hover:text-white transition-colors"
                    >
                      LOGIN / REGISTER
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
