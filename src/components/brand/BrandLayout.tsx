
import { Outlet } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import Footer from "@/components/Footer"; // Import the Footer component from the Index page

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
      <Footer /> {/* Replace the existing footer with the Footer component */}
    </div>
  );
};

export default BrandLayout;
