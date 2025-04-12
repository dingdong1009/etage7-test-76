
import { Outlet } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import { 
  Instagram, 
  MessageCircle, 
  Send, 
  ChevronUp 
} from "lucide-react";

const BrandLayout = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BrandHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8 pt-24 max-w-[1481px] mx-auto w-full animate-fade-in">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-[1481px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4">
            <div className="lg:col-span-1">
              <h3 className="text-xl font-light tracking-tighter uppercase mb-6">ETAGE7 Brand</h3>
              <p className="text-sm text-gray-600 mb-6 max-w-md font-light">
                Access premium tools and resources designed to help your brand succeed in the fashion industry.
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
              <h4 className="text-xs uppercase font-light tracking-tight mb-6">Quick Links</h4>
              <ul className="space-y-4 uppercase">
                <li>
                  <a href="/brand" className="text-xs text-gray-600 hover:text-black transition-fast font-light link-underline">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/brand/products" className="text-xs text-gray-600 hover:text-black transition-fast font-light link-underline">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/brand/orders" className="text-xs text-gray-600 hover:text-black transition-fast font-light link-underline">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="/brand/lookbook" className="text-xs text-gray-600 hover:text-black transition-fast font-light link-underline">
                    Lookbook
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs uppercase font-light tracking-tight mb-6">Resources</h4>
              <ul className="space-y-4 uppercase">
                <li>
                  <a href="/brand/resources" className="text-xs text-gray-600 hover:text-black transition-fast font-light link-underline">
                    Guides & Tutorials
                  </a>
                </li>
                <li>
                  <a href="/brand/messages" className="text-xs text-gray-600 hover:text-black transition-fast font-light link-underline">
                    Message Support
                  </a>
                </li>
                <li>
                  <a href="/brand/additional-services" className="text-xs text-gray-600 hover:text-black transition-fast font-light link-underline">
                    Additional Services
                  </a>
                </li>
                <li>
                  <a href="/brand/settings" className="text-xs text-gray-600 hover:text-black transition-fast font-light link-underline">
                    Account Settings
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs uppercase font-light tracking-tight mb-6">Contact</h4>
              <ul className="space-y-4 text-xs uppercase">
                <li className="text-gray-600 font-light">Email: brands@etage7.com</li>
                <li className="text-gray-600 font-light">Phone: +33 (0) 1 XX XX XX XX</li>
                <li className="text-gray-600 font-light">Paris, France</li>
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
    </div>
  );
};

export default BrandLayout;
