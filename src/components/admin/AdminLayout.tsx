
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8 pt-24">
        <Outlet />
      </main>
      <footer className="py-4 px-4 md:px-6 text-center text-xs text-gray-500 border-t border-gray-100 bg-white">
        <p className="font-light">© {new Date().getFullYear()} ETAGE7 | Admin Panel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
