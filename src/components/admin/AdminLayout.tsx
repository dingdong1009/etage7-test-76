
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8 pt-24 max-w-[1481px] mx-auto w-full">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      <footer className="py-6 px-4 md:px-8 border-t border-gray-100 bg-white">
        <div className="max-w-[1481px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-light text-sm text-gray-500">© {new Date().getFullYear()} ETAGE7 Admin Portal. All rights reserved.</p>
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

export default AdminLayout;
