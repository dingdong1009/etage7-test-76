import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Instagram, 
  MessageCircle, 
  Send, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  ChevronUp,
  Mail
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Newsletter subscription successful",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-light tracking-tighter uppercase mb-4">ETAGE7</h3>
            <form onSubmit={handleNewsletterSubmit} className="mb-5">
              <div className="flex items-center gap-2">
                <div className="flex-grow">
                  <Input
                    type="email"
                    placeholder="Subscribe to newsletter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-0 border-b border-gray-300 rounded-none focus:border-black h-8 text-sm"
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white hover:bg-black hover:underline transition-all duration-300 h-8 px-3"
                  size="sm"
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </Button>
              </div>
            </form>
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
            <h4 className="text-xs uppercase font-normal tracking-tight mb-6">QUICK LINKS</h4>
            <ul className="space-y-2 uppercase">
              <li>
                <Link to="/brands" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-normal">
                  For Brands
                </Link>
              </li>
              <li>
                <Link to="/buyers" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-normal">
                  For Buyers
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-normal">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-normal">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase font-normal tracking-tight mb-6">LEGAL</h4>
            <ul className="space-y-2 uppercase">
              <li>
                <Link to="/terms" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-normal">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-normal">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-xs text-gray-600 hover:text-black flex items-center gap-2 transition-fast font-normal">
                 FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase font-normal tracking-tight mb-6">CONTACT</h4>
            <ul className="space-y-2 uppercase">
              <li className="text-xs text-gray-600 font-normal">Email: privet@etage7.ru</li>
              <li className="text-xs text-gray-600 font-normal">Phone: +7 (925) 130-45-10</li>
              <li className="text-xs text-gray-600 font-normal">Moscow, Russia</li>
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
