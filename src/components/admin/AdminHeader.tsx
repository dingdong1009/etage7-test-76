
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, } from "lucide-react";
import { adminNav } from "@/config/navigation";
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
  
  // Mock notification count
  const messageCount = 3;
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-[1481px] mx-auto w-full px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <Link to="/admin" className="text-white text-5xl font-medium uppercase">éTAGE7</Link>
        </div>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button> 
        
        {/* User options on desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/admin/messages" className="relative">
                  <Bell size={20} className="text-white hover:text-white cursor-pointer" />
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
          
          <Link to="/" className="text-white hover:text-white text-xs hover:underline font-normal">
            BACK TO SITE 
          </Link>
          <span className="text-gray-400 font-light">|</span>
          <span className="text-gray-600 text-xs text-white font-normal">ADMIN</span>
        </div>
      </div>
      
      {/* Desktop Navigation - Below the header bar */}
      <nav className="hidden md:block border-b border-t bg-white text-black border-gray-100">
        <div className="max-w-[1481px] mx-auto w-full px-8 py-2">
          <ul className="flex space-x-8">
            {adminNav.map((item) => (
              <li key={item.title}> 
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={`text-xs font-light transition-all relative group ${
                          isActive(item.href) ? "text-black" : "text-black hover:text-black"
                        }`}
                      >
                        {item.title.toUpperCase()}
                        <span
                          className={`absolute left-0 bottom-[-3px] w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full ${
                            isActive(item.href) ? "w-full" : ""
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
            {adminNav.map((item) => (
              <li key={item.title} className="border-b border-gray-100 last:border-0">
                <Link
                  to={item.href}
                  className={`block py-3 px-4 transition-colors font-light ${
                    isActive(item.href) ? "bg-gray-50 text-black" : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title.toUpperCase()}
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

export default AdminHeader;
