
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

const BrandHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { name: "Dashboard", path: "/brand" },
    { name: "Products", path: "/brand/products" },
    { name: "Orders", path: "/brand/orders" },
    { name: "Lookbook", path: "/brand/lookbook" },
    { name: "Team", path: "/brand/team" },
    { name: "Store", path: "/brand/store" },
    { name: "Messages", path: "/brand/messages" },
    { name: "Subscriptions", path: "/brand/subscriptions" },
    { name: "Resources", path: "/brand/resources" },
    { name: "Settings", path: "/brand/settings" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-full px-4 flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-black text-2xl font-bold uppercase">ETAGE7</Link> | Brand
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
          <Link to="/" className="text-gray-600 hover:text-black text-sm">
            Back to Site
          </Link>
        </div>
      </div>
      
      {/* Desktop Navigation - Moved below the header bar */}
      <nav className="hidden md:block border-b border-gray-200 bg-white">
        <div className="max-w-full px-4 py-2">
          <ul className="flex space-x-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`text-sm font-light transition-all relative group ${
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
                  className={`block py-3 px-4 transition-colors ${
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
                className="block py-3 px-4 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Back to Site
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default BrandHeader;
