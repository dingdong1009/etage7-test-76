
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is currently in view
      const sections = ['hero', 'brand', 'buyer', 'services'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in the viewport (with some buffer)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active section based on current path when component mounts
  useEffect(() => {
    // Reset active section when not on homepage
    if (location.pathname !== '/') {
      setActiveSection(null);
      return;
    }
    
    // Check URL hash to see if it points to a section
    if (location.hash) {
      const section = location.hash.substring(1); // Remove the # character
      setActiveSection(section);
    }
  }, [location]);

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

  // Handle navigation to section
  const navigateToSection = (id: string) => {
    if (location.pathname !== '/') {
      // If not on the home page, navigate to the home page with the hash
      window.location.href = `/#${id}`;
      return;
    }
    
    // If already on the home page, scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };
 
  const mainNavItems = [
    { name: "HOME", path: "hero", isSection: true },
    { name: "BRANDS", path: "brand", isSection: true },
    { name: "BUYERS", path: "buyer", isSection: true },
    { name: "PLATFORM", path: "paltform", isSection: true },
    { name: "CONSULTING", path: "services", isSection: true },
    { name: "EVENTS", path: "/events", isSection: false },
    { name: "CURATED", path: "/curated", isSection: false },
    { name: "RESOURCES", path: "/resources", isSection: false },
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
          
          {/* Logo - Update to navigate to hero section */}
          <button 
            onClick={() => navigateToSection('hero')} 
            className="text-black text-5xl font-medium tracking-tighter uppercase"
          >
            éTAGE7 
          </button>
        </div> 
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
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

export default Header;
