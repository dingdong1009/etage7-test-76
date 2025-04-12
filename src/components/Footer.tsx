
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
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-normal tracking-tighter uppercase mb-6">ETAGE7</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md">
              Connecting professional buyers and fashion brands through a premium 
              platform with curated experiences and tailored consulting services.
            </p>
            <div className="flex space-x-5">
              <a 
                href="https://t.me/etage7" 
                aria-label="Telegram" 
                className="text-black hover:text-gray-600 transition-fast"
              >
                <Send size={18} strokeWidth={1.25} />
              </a>
              <a 
                href="https://wa.me/etage7" 
                aria-label="WhatsApp" 
                className="text-black hover:text-gray-600 transition-fast"
              >
                <MessageCircle size={18} strokeWidth={1.25} />
              </a>
              <a 
                href="https://instagram.com/etage7" 
                aria-label="Instagram" 
                className="text-black hover:text-gray-600 transition-fast"
              >
                <Instagram size={18} strokeWidth={1.25} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase font-normal tracking-tight mb-6">QUICK LINKS</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/brands" className="text-sm text-gray-600 hover:text-black transition-fast">
                  For Brands
                </Link>
              </li>
              <li>
                <Link to="/buyers" className="text-sm text-gray-600 hover:text-black transition-fast">
                  For Buyers
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-600 hover:text-black transition-fast">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-gray-600 hover:text-black transition-fast">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase font-normal tracking-tight mb-6">LEGAL</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-black flex items-center gap-2 transition-fast">
                  <FileText size={14} strokeWidth={1.25} /> Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-black flex items-center gap-2 transition-fast">
                  <ShieldCheck size={14} strokeWidth={1.25} /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-black flex items-center gap-2 transition-fast">
                  <HelpCircle size={14} strokeWidth={1.25} /> FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase font-normal tracking-tight mb-6">CONTACT</h4>
            <ul className="space-y-4">
              <li className="text-sm text-gray-600">Email: info@etage7.com</li>
              <li className="text-sm text-gray-600">Phone: +33 (0) 1 XX XX XX XX</li>
              <li className="text-sm text-gray-600">Paris, France</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ETAGE7. All rights reserved.
          </p>
          <div className="flex items-center space-x-5">
            <Link to="/faq" className="text-xs text-gray-500 hover:text-black transition-fast">
              FAQ
            </Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-black transition-fast">
              Terms
            </Link>
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-black transition-fast">
              Privacy
            </Link>
            <button 
              onClick={scrollToTop} 
              className="ml-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-fast text-gray-600"
              aria-label="Scroll to top"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
