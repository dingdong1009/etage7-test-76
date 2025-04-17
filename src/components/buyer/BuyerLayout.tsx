
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Bell, Menu, MessageSquare, Package, Users, BarChart2 } from "lucide-react"; 
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BuyerLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const menuItems = [
    { name: "Dashboard", path: "/buyer", icon: <Package size={20} /> },
    { name: "Analytics", path: "/buyer/analytics", icon: <BarChart2 size={20} /> },
    { name: "Orders", path: "/buyer/orders", icon: <Package size={20} /> },
    { name: "Messages", path: "/buyer/messages", icon: <MessageSquare size={20} />, badge: 1 },
    { name: "Team", path: "/buyer/team", icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold">éTAGE7</Link>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2.5 rounded-md group transition-colors ${
                    isActive(item.path)
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-black text-white">{item.badge}</Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Link 
            to="/"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <span className="mr-3">👋</span>
            <span>Back to Site</span>
          </Link>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold">éTAGE7</Link>
          
          <div className="flex items-center space-x-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/buyer/messages" className="relative">
                    <Bell size={20} className="text-gray-700" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                      1
                    </Badge>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>1 unread message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1"
            >
              <Menu size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <nav className="p-4 bg-white border-t border-gray-100">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2.5 rounded-md ${
                      isActive(item.path)
                        ? "bg-gray-100 text-black"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge className="ml-auto bg-black text-white">{item.badge}</Badge>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/"
                  className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3">👋</span>
                  <span>Back to Site</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 md:pt-0 pt-16">
        <div className="container mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BuyerLayout;
