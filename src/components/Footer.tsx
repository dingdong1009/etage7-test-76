
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-[1481px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="uppercase font-bold text-lg mb-4">ETAGE7</h3>
            <p className="text-sm font-light mb-6">
              Connecting professional buyers and fashion brands through a premium 
              platform with curated experiences and tailored consulting services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-black hover:underline">Instagram</a>
              <a href="#" className="text-black hover:underline">LinkedIn</a>
            </div>
          </div>
          
          <div>
            <h4 className="uppercase font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li><Link to="/brands" className="text-sm hover:underline">For Brands</Link></li>
              <li><Link to="/buyers" className="text-sm hover:underline">For Buyers</Link></li>
              <li><Link to="/services" className="text-sm hover:underline">Services</Link></li>
              <li><Link to="/events" className="text-sm hover:underline">Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase font-bold mb-4">CONTACT</h4>
            <p className="text-sm mb-2">Email: info@etage7.com</p>
            <p className="text-sm mb-2">Phone: +33 (0) 1 XX XX XX XX</p>
            <p className="text-sm">Paris, France</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ETAGE7. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-xs text-gray-500 hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
