
import { Outlet } from "react-router-dom";
import SalesHeader from "./SalesHeader";

const SalesLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SalesHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8 pt-24 max-w-[1481px] mx-auto w-full animate-fade-in">
        <div>
          <Outlet />
        </div>
      </main>
      <footer className="py-6 px-4 md:px-8 border-t border-gray-100 bg-white">
        <div className="max-w-[1481px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-light text-xs text-gray-500">© {new Date().getFullYear()} ETAGE7 Sales Panel. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors link-underline">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors link-underline">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors link-underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalesLayout;
