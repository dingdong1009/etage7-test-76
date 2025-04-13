
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Bell, Search, X } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const BrandHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("EN");
  const location = useLocation();
  
  // Mock notification count - this would be fetched from a backend in a real app
  const notificationCount = 1;
  
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
    { name: "Dashboard", path: "/brand", tooltip: "Brand dashboard overview" },
    { name: "Products", path: "/brand/products", tooltip: "Manage your products" },
    { name: "Orders", path: "/brand/orders", tooltip: "View and manage orders" },
    { name: "Lookbook", path: "/brand/lookbook", tooltip: "Create and manage lookbooks" },
    { name: "Additional Services", path: "/brand/additional-services", tooltip: "Book consulting services" },
    { name: "Team", path: "/brand/team", tooltip: "Manage your team" },
    { name: "Store", path: "/brand/store", tooltip: "Manage your store" },
    { name: "Messages", path: "/brand/messages", tooltip: "Communication with buyers" },
    { name: "Subscriptions", path: "/brand/subscriptions", tooltip: "Manage your subscriptions" },
    { name: "Resources", path: "/brand/resources", tooltip: "Educational resources" },
    { name: "Settings", path: "/brand/settings", tooltip: "Account settings" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsSearchOpen(false);
    }
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
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-[1481px] mx-auto w-full px-8 flex justify-between items-center h-16">
       <div className="flex items-center gap-2">
          <Link to="/" className="text-white text-5xl font-medium uppercase">éTAGE7</Link>
        </div>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-black p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button> 
        
        {/* User options on desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Bell size={20} className="text-gray-600 hover:text-black cursor-pointer" />
                  {notificationCount > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-white text-black text-xs rounded-full"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{notificationCount} unread notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/" className="text-gray-600 hover:text-white text-xs font-normal">
            BACK TO SITE
          </Link>
          <span className="text-gray-400 font-light">|</span>
          <span className="text-gray-600 text-xs text-white font-light">ADMIN</span>
        </div>
      </div>
      
      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="max-w-[1481px] mx-auto">
            <form className="flex items-center">
              <Search size={16} strokeWidth={1} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 focus:outline-none text-lg bg-transparent font-light"
                autoFocus
              />
              <button 
                type="button" 
                onClick={toggleSearch}
                className="text-gray-500 hover:text-black"
              >
                <X size={16} strokeWidth={1} />
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Desktop Navigation - Below the header bar */}
      <nav className="hidden md:block bg-white">
        <div className="max-w-[1481px] mx-auto px-4 py-2">
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
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto animate-fade-in">
          <div className="container-lg p-6 flex flex-col h-full">
            <nav className="flex-grow">
              <ul className="space-y-8 pt-4">
                {menuItems.map((item) => (
                  <li key={item.name} className="py-2">
                    <Link 
                      to={item.path} 
                      className={`text-xl uppercase font-light tracking-tighter ${
                        isActive(item.path) ? "text-black" : "text-gray-600"
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
                    className="text-xl uppercase font-light tracking-tighter"
                  >
                    {language === "EN" ? "ENGLISH" : "РУССКИЙ"}
                  </button>
                </li>
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

export default BrandHeader;
