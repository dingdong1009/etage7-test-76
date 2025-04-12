
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Bell, X } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Mock notification count - this would be fetched from a backend in a real app
  const notificationCount = 3;
  
  const menuItems = [
    { name: "Dashboard", path: "/admin", tooltip: "Admin dashboard overview" },
    { name: "Users", path: "/admin/users", tooltip: "Manage platform users" },
    { name: "Contracts", path: "/admin/contracts", tooltip: "Manage contracts" },
    { name: "Pages", path: "/admin/pages", tooltip: "Edit website pages" },
    { name: "Announcements", path: "/admin/announcements", tooltip: "Create and publish announcements" },
    { name: "Subscriptions", path: "/admin/subscriptions", tooltip: "Manage user subscriptions" },
    { name: "Additional Services", path: "/admin/additional-services", tooltip: "Manage bookings and service offerings" },
    { name: "Resources", path: "/admin/resources", tooltip: "Manage educational resources" },
    { name: "Settings", path: "/admin/settings", tooltip: "Admin settings" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white">
      <div className="max-w-[1481px] mx-auto bg-black px-4 flex justify-between items-center h-16">
        <Link to="/admin" className="flex items-center gap-2 text-white">
          <span className="text-2xl font-bold uppercase tracking-tighter">ETAGE7</span>
          <span className="text-gray-300 text-sm">| ADMIN</span>
        </Link>
        
        {/* Mobile menu button */}
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative cursor-pointer">
                  <Bell size={20} className="text-gray-300 hover:text-white transition-colors" />
                  {notificationCount > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent-pink text-black text-xs rounded-full"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white shadow-md">
                <p>{notificationCount} new service bookings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/" className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">
            BACK TO SITE
          </Link>
          
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Desktop Navigation - Below the header bar */}
      <nav className="hidden md:block border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-[1481px] mx-auto px-4 py-2">
          <ul className="flex space-x-6 overflow-x-auto">
            {menuItems.map((item) => (
              <li key={item.name}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={`text-sm font-light transition-all whitespace-nowrap relative group ${
                          isActive(item.path) ? "text-black" : "text-gray-600 hover:text-black"
                        }`}
                      >
                        {item.name.toUpperCase()}
                        <span
                          className={`absolute left-0 bottom-[-3px] w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full ${
                            isActive(item.path) ? "w-full" : ""
                          }`}
                        ></span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white shadow-md">
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* Mobile Menu - Full overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 pt-16 overflow-y-auto">
          <div className="p-4">
            <ul className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`block py-3 px-4 transition-colors ${
                      isActive(item.path) 
                        ? "bg-gray-50 text-black font-medium" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name.toUpperCase()}
                  </Link>
                </li>
              ))}
              <li className="border-t border-gray-100 mt-4 pt-4">
                <Link
                  to="/"
                  className="block py-3 px-4 text-gray-600 hover:bg-gray-50 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BACK TO SITE
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
