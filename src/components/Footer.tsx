
import { Link } from "react-router-dom";
import { 
  Instagram, 
  MessageCircle, 
  Send, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  ChevronUp 
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-light tracking-tighter uppercase mb-6">ETAGE7</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md font-light">
              Connecting professional buyers and fashion brands through a premium 
              platform with curated experiences and tailored consulting services.
            </p>
            <div className="flex space-x-5">
              <a 
                href="https://t.me/etage7" 
                aria-label="Telegram" 
                className="text-black hover:text-gray-600 transition-fast"
              >
                <Send size={16} strokeWidth={1} />
              </a>
              <a 
                href="https://wa.me/etage7" 
                aria-label="WhatsApp" 
                className="text-black hover:text-gray-600 transition-fast"
              >
                <MessageCircle size={16} strokeWidth={1} />
              </a>
              <a 
                href="https://instagram.com/etage7" 
                aria-label="Instagram" 
                className="text-black hover:text-gray-600 transition-fast"
              >
                <Instagram size={16} strokeWidth={1} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase font-light tracking-tight mb-6">QUICK LINKS</h4>
            <ul className="space-y-4 uppercase">
              <li>
                <Link to="/brands" className="text-xs text-gray-600 hover:text-black transition-fast font-light">
                  For Brands
                </Link>
              </li>
              <li>
                <Link to="/buyers" className="text-xs text-gray-600 hover:text-black transition-fast font-light">
                  For Buyers
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-xs text-gray-600 hover:text-black transition-fast font-light">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-xs text-gray-600 hover:text-black transition-fast font-light">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase font-light tracking-tight mb-6">LEGAL</h4>
            <ul className="space-y-4 text-xs uppercase">
              <li>
                <Link to="/terms" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-light">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-light">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-light">
                 FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-light tracking-tight mb-6">CONTACT</h4>
            <ul className="space-y-4 uppercase">
              <li className="text-sm text-gray-600 font-light">Email: info@etage7.com</li>
              <li className="text-sm text-gray-600 font-light">Phone: +33 (0) 1 XX XX XX XX</li>
              <li className="text-sm text-gray-600 font-light">Paris, France</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-4 md:mb-0 font-light uppercase">
            &copy; {new Date().getFullYear()} ETAGE7. All rights reserved.
          </p>
          <div className="flex items-center space-x-5">
            <button 
              onClick={scrollToTop} 
              className="ml-2 p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-fast text-gray-600"
              aria-label="Scroll to top"
            >
              <ChevronUp size={14} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
