
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const location = useLocation();

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

  const scrollToSection = (id: string) => {
    // Close mobile menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // If we're already on the index page
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on a different page, navigate to index page with hash
      window.location.href = `/#${id}`;
    }
  };

  const mainNavItems = [
    { name: "HOME", path: "/", action: null },
    { name: "BRANDS", path: "#brand", action: () => scrollToSection("brand") },
    { name: "BUYERS", path: "#buyer", action: () => scrollToSection("buyer") },
    { name: "SERVICES", path: "#services", action: () => scrollToSection("services") },
    { name: "EVENTS", path: "/events", action: null },
    { name: "CURATED", path: "/curated", action: null },
    { name: "RESOURCES", path: "/resources", action: null },
  ];

  const secondaryNavItems = [

  ];

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
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                {item.action ? (
                  <button
                    onClick={item.action}
                    className="text-xs font-light uppercase relative group transition-fast"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-[-2px] w-0 h-[0.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link 
                    to={item.path} 
                    className="text-xs font-light uppercase relative group transition-fast"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-[-2px] w-0 h-[0.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center">
          {/* Language, Search, User */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <button 
              onClick={toggleLanguage}
              className="text-xs font-light uppercase hover:text-gray-600 transition-fast"
              aria-label="Toggle language">
              {language}
            </button>
            {/* Search button */}
            <button 
              onClick={toggleSearch}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              className="hover:text-gray-600 transition-fast"
            >
              <Search size={18} strokeWidth={1} />
            </button>
            {/* Login icon */}
            <Link to="/login" className="hover:text-gray-600 transition-fast hidden sm:block">
              <User size={18} strokeWidth={1} />
            </Link>
          </div>
        </div>
      </div> 
 
      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-4">
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
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <div className="container-lg p-6 flex flex-col h-full">
            <nav className="flex-grow">
              <ul className="space-y-8 pt-4">
                {mainNavItems.map((item) => (
                  <li key={item.name} className="py-2">
                    {item.action ? (
                      <button
                        onClick={item.action}
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

export default Header;
