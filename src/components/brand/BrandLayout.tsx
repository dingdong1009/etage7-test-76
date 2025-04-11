
import { Outlet } from "react-router-dom";
import BrandHeader from "./BrandHeader";

const BrandLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BrandHeader />
      <main className="max-w-[1481px] mx-auto flex-1 pt-16">
        <Outlet />
      </main>
      <footer className="py-4 px-4 md:px-6 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
        <p>© {new Date().getFullYear()} ETAGE7 Brand Panel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BrandLayout;
