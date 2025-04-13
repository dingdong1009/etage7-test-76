
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Bell, X, Search } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("EN");
  const location = useLocation();
  
  // Mock notification count - this would be fetched from a backend in a real app
  const notificationCount = 3;
  
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
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsMenuOpen(false);
    }
  };
  
  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "RU" : "EN");
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path !== "/admin" && location.pathname.startsWith(path));
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-medium ${
        isScrolled ? "bg-white border-b border-gray-100" : "bg-white"
      }`}
    >
      <div className="container-lg h-16 flex items-center justify-between">
       <div className="flex items-center space-x-6">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-black focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={18} strokeWidth={1} /> : <Menu size={18} strokeWidth={1} />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="text-black text-5xl font-medium tracking-tighter uppercase">
            éTAGE7
          </Link>
        </div>
        
        {/* User options on desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Bell size={20} strokeWidth={1} className="text-gray-600 hover:text-black cursor-pointer transition-colors" />
                  {notificationCount > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent-pink text-black text-xs rounded-full font-light"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white shadow-md" showArrow={true}>
                <p className="text-xs font-light">{notificationCount} unread notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/" className="text-gray-600 hover:text-black text-xs uppercase font-light tracking-wide transition-colors">
            Back to Site
          </Link>
        </div>
      </div> 
      
      {/* Desktop Navigation - Below the header bar */}
      <nav className="hidden lg:block">
        <div className="mx-auto px-4 py-2"> 
          <ul className="flex space-x-8 overflow-x-auto">
            {menuItems.map((item) => (
              <li key={item.name}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={`text-xs font-light transition-all uppercase whitespace-nowrap relative group ${
                          isActive(item.path) ? "text-black" : "text-gray-600 hover:text-black"
                        }`}
                      >
                        {item.name}
                        <span
                          className={`absolute left-0 bottom-[-3px] w-0 h-[0.5px] bg-black transition-all duration-300 group-hover:w-full ${
                            isActive(item.path) ? "w-full" : ""
                          }`}
                        ></span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white shadow-md">
                      <p className="text-xs font-light">{item.tooltip}</p>
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
        <div className="md:hidden fixed inset-0 top-16 bg-white z-50 overflow-y-auto animate-fade-in">
          <div className="p-6 flex flex-col h-full">
            <ul className="flex flex-col space-y-1 pt-6">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`block py-3 px-4 transition-colors text-sm uppercase font-light tracking-wide ${
                      isActive(item.path) 
                        ? "text-black" 
                        : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              
              {/* Language toggle in mobile menu */}
              <li className="py-2">
                <button
                  onClick={toggleLanguage}
                  className="block py-3 px-4 text-sm uppercase font-light tracking-wide text-gray-600 hover:text-black"
                >
                  {language === "EN" ? "ENGLISH" : "РУССКИЙ"}
                </button>
              </li>
              
              <li className="border-t border-gray-100 mt-4 pt-4">
                <Link
                  to="/"
                  className="block py-3 px-4 text-gray-600 hover:text-black transition-colors text-sm uppercase font-light tracking-wide"
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
