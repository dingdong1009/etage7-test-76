
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
          
          {/* Logo - Update to navigate to hero section */}
          <button 
            onClick={() => navigateToSection('hero')} 
            className="text-black text-5xl font-medium tracking-tighter uppercase"
          >
            éTAGE7 
          </button>
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
      <nav className="hidden md:block bg-white">
        <div className="max-w-[1481px] mx-auto px-4 py-2">
        <ul className="flex space-x-8">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                {item.isSection ? (
                  <button 
                    onClick={() => navigateToSection(item.path)}
                    className={`text-xs font-light uppercase relative group transition-fast ${
                      activeSection === item.path ? 'after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[0.5px] after:bg-black' : ''
                    }`}
                  >
                    {item.name}
                    <span className={`absolute left-0 bottom-[-2px] w-0 h-[0.5px] bg-black transition-all duration-300 ${
                      activeSection === item.path ? 'w-full' : 'group-hover:w-full'
                    }`}></span>
                  </button>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`text-xs font-light uppercase relative group transition-fast ${
                      location.pathname === item.path ? 'after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[0.5px] after:bg-black' : ''
                    }`}
                  >
                    {item.name}
                    <span className={`absolute left-0 bottom-[-2px] w-0 h-[0.5px] bg-black transition-all duration-300 ${
                      location.pathname === item.path ? 'w-full' : 'group-hover:w-full'
                    }`}></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <div className="container-lg p-6 flex flex-col h-full">
            <nav className="flex-grow">
              <ul className="space-y-8 pt-4">
                {mainNavItems.map((item) => (
                  <li key={item.name} className="py-2">
                    {item.isSection ? (
                      <button 
                        onClick={() => {
                          navigateToSection(item.path);
                          setIsMenuOpen(false);
                        }}
                        className="text-xl uppercase font-light tracking-tighter"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link 
                        to={item.path} 
                        className="text-xl uppercase font-light tracking-tighter"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
                {secondaryNavItems.map((item) => (
                  <li key={item.name} className="py-2">
                    <Link 
                      to={item.path} 
                      className="text-xl uppercase font-light tracking-tighter"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="pt-10 pb-4 mt-auto border-t border-gray-100">
              <p className="text-sm text-gray-500 font-light">© {new Date().getFullYear()} ETAGE7</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
