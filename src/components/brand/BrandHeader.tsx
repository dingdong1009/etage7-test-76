
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MessageSquare, Search, X, ShoppingBag } from "lucide-react";
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
  const messageCount = 1;
  // Mock cart items count
  const cartItemsCount = 2;
  
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
                  <ShoppingBag size={20} className="text-gray-600 hover:text-black cursor-pointer" />
                  {cartItemsCount > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-white text-black text-xs rounded-full"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{cartItemsCount} items in cart</p> 
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/brand/messages" className="relative">
                  <MessageSquare size={20} className="text-gray-600 hover:text-black cursor-pointer" />
                  {messageCount > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-white text-black text-xs rounded-full"
                    >
                      {messageCount}
                    </Badge>
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{messageCount} unread messages</p> 
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/" className="text-gray-600 hover:text-white text-xs font-normal">
            BACK TO SITE 
          </Link>
          <span className="text-gray-400 font-light">|</span>
          <span className="text-gray-600 text-xs text-white font-light">BRAND</span>
        </div>
      </div>
      
      {/* Desktop Navigation - Below the header bar */}
      <nav className="hidden  md:block border-b border-t bg-white text-black border-gray-100">
        <div className="max-w-[1481px] mx-auto w-full px-8 py-2">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}> 
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={`text-xs font-light transition-all relative group ${
                          isActive(item.path) ? "text-black" : "text-black hover:text-black"
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
                    <TooltipContent>
                      <p>{item.tooltip}</p>
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
        <div className="md:hidden bg-white shadow-md w-full">
          <ul className="flex flex-col">
            {menuItems.map((item) => (
              <li key={item.name} className="border-b border-gray-100 last:border-0">
                <Link
                  to={item.path}
                  className={`block py-3 px-4 transition-colors font-light ${
                    isActive(item.path) ? "bg-gray-50 text-black" : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name.toUpperCase()}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-100">
              <Link
                to="/"
                className="block py-3 px-4 text-gray-600 font-light"
                onClick={() => setIsMenuOpen(false)}
              >
                BACK TO SITE 
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default BrandHeader;
