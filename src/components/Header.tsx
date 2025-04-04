
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, LogOut, Users } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isAdmin = profile?.role === "admin";
  const isSalesManager = profile?.role === "sales_manager";
  const isApproved = profile?.approval_status === "approved";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-[1481px] mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="font-bold text-black text-xl uppercase">ETAGE7</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "CLOSE" : "MENU"}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center">
          <ul className="flex space-x-8 items-center">
            {[
              { name: "BRANDS", path: "/brands" },
              { name: "BUYERS", path: "/buyers" },
              { name: "SERVICES", path: "/services" },
              { name: "EVENTS", path: "/events" },
              { name: "RESOURCES", path: "/resources" },
              { name: "CURATED", path: "/curated" },
            ].map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className="text-black font-light hover:font-normal relative group"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            
            {!user ? (
              <li>
                <Button asChild className="bg-black hover:bg-gray-800 ml-4">
                  <Link to="/auth">
                    LOGIN / REGISTER
                  </Link>
                </Button>
              </li>
            ) : (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 border-black">
                      <UserCircle size={18} />
                      {profile?.full_name?.split(' ')[0] || 'Account'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {profile?.full_name || 'Your Account'}
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs text-gray-500 font-normal">
                      {profile?.role.toUpperCase()}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {(isAdmin || isSalesManager) && isApproved && (
                      <>
                        <DropdownMenuItem onClick={() => navigate("/manage-users")}>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Users
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
          </ul>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full">
          <ul className="flex flex-col p-4">
            {[
              { name: "BRANDS", path: "/brands" },
              { name: "BUYERS", path: "/buyers" },
              { name: "SERVICES", path: "/services" },
              { name: "EVENTS", path: "/events" },
              { name: "RESOURCES", path: "/resources" },
              { name: "CURATED", path: "/curated" },
            ].map((item) => (
              <li key={item.name} className="py-2 border-b border-gray-100">
                <Link 
                  to={item.path} 
                  className="text-black uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            {!user ? (
              <li className="py-4">
                <Button asChild className="w-full bg-black hover:bg-gray-800">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    LOGIN / REGISTER
                  </Link>
                </Button>
              </li>
            ) : (
              <>
                {(isAdmin || isSalesManager) && isApproved && (
                  <li className="py-2 border-b border-gray-100">
                    <Link 
                      to="/manage-users" 
                      className="text-black uppercase flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      MANAGE USERS
                    </Link>
                  </li>
                )}
                <li className="py-4">
                  <Button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                    variant="outline"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    SIGN OUT
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
