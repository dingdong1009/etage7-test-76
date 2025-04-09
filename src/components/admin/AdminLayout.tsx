
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
      <footer className="py-4 px-4 md:px-6 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
        <p>© {new Date().getFullYear()} ETAGE7 Admin Panel. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
