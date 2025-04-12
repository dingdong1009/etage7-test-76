
import { Outlet } from "react-router-dom";
import BuyerHeader from "./BuyerHeader";

const BuyerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BuyerHeader />
      <main className="flex-1 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      <footer className="py-8 px-4 md:px-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-light text-sm text-gray-500">© {new Date().getFullYear()} ETAGE7 Buyer Portal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BuyerLayout;
