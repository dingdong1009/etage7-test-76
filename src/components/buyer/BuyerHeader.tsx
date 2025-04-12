
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

const BuyerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const location = useLocation();
  
  // Mock notification count - this would be fetched from a backend in a real app
  const notificationCount = 2;
  
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
    { name: "Dashboard", path: "/buyer", tooltip: "Buyer dashboard overview" },
    { name: "Orders", path: "/buyer/orders", tooltip: "View and manage orders" },
    { name: "Messages", path: "/buyer/messages", tooltip: "Communication with brands" },
    { name: "Additional Services", path: "/buyer/additional-services", tooltip: "Book consulting services" },
    { name: "Team", path: "/buyer/team", tooltip: "Manage your team" },
    { name: "Resources", path: "/buyer/resources", tooltip: "Educational resources" },
    { name: "Settings", path: "/buyer/settings", tooltip: "Account settings" },
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
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-medium ${
      isScrolled ? "bg-white border-b border-gray-100" : "bg-white"
    }`}>
      <div className="container-lg h-16 border-b flex items-center justify-between">
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
          {/* Language selector */}
          <button 
            onClick={toggleLanguage}
            className="text-xs font-light uppercase hover:text-gray-600 transition-fast"
            aria-label="Toggle language"
          >
            {language}
          </button>
          
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
      
      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="container-lg">
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
      <nav className="absolute hidden lg:block bg-white border-b">
        <div className="container-lg py-2">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={`text-xs font-light uppercase relative group transition-fast ${
                          isActive(item.path) ? "text-black" : "text-gray-600 hover:text-black"
                        }`}
                      >
                        {item.name}
                        <span
                          className={`absolute left-0 bottom-[-2px] w-0 h-[0.5px] bg-black transition-all duration-300 group-hover:w-full ${
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
              <p className="text-sm text-gray-500 font-light">© {new Date().getFullYear()} ETAGE7 </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default BuyerHeader;
