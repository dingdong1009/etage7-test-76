import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import BrandsPage from "./pages/BrandsPage";
import BuyersPage from "./pages/BuyersPage";
import ServicesPage from "./pages/ServicesPage";
import EventsPage from "./pages/EventsPage";
import ResourcesPage from "./pages/ResourcesPage";
import CuratedPage from "./pages/CuratedPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ThankYouPage from "./pages/ThankYouPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import PressPage from "./pages/PressPage";
import PressKitPage from "./pages/PressKitPage";
import FaqPage from "./pages/FaqPage";
import BrandStorefront from "./pages/brand/BrandStorefront";
import Marketing from "./pages/brand/Marketing";
import BrandPaidServices from "./pages/brand/PaidServices";

// Admin components
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import Administration from "./pages/admin/Administration";
import Agenda from "./pages/admin/Agenda";
import AdminPaidServices from "./pages/admin/PaidServices";

// Brand components
import BrandLayout from "./components/brand/BrandLayout";
import BrandDashboard from "./pages/brand/Dashboard";
import BrandProducts from "./pages/brand/Products";
import BrandOrders from "./pages/brand/Orders";
import BrandOrderDetails from "./pages/brand/OrderDetails";
import BrandLookbook from "./pages/brand/Lookbook";
import BrandStore from "./pages/brand/Store";
import BrandMessages from "./pages/brand/Messages";

// Buyer components
import BuyerLayout from "./components/buyer/BuyerLayout";
import BuyerDashboard from "./pages/buyer/Dashboard";
import BuyerOrders from "./pages/buyer/Orders";
import BuyerMessages from "./pages/buyer/Messages";
import BuyerAdditionalServices from "./pages/buyer/AdditionalServices";
import BuyerTeam from "./pages/buyer/Team";
import BuyerResources from "./pages/buyer/Resources";
import BuyerSettings from "./pages/buyer/Settings";

// Sales components
import SalesLayout from "./components/sales/SalesLayout";
import SalesDashboard from "./pages/sales/Dashboard";
import SalesPerformance from "./pages/sales/Performance";
import SalesUsers from "./pages/sales/Users";
import SalesMessages from "./pages/sales/Messages";
import SalesSettings from "./pages/sales/Settings";
import ViewInvitedUser from "./pages/admin/users/ViewInvitedUser";
import EditInvitedUser from "./pages/admin/users/EditInvitedUser";

// Initialize QueryClient
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Outlet /></Layout>}>
              <Route index element={<Index />} />
              <Route path="brands" element={<BrandsPage />} />
              <Route path="buyers" element={<BuyersPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="curated" element={<CuratedPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="thank-you" element={<ThankYouPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="press" element={<PressPage />} />
              <Route path="press-kit" element={<PressKitPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="brand/:brandSlug" element={<BrandStorefront />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            
            <Route path="/brand" element={<BrandLayout />}>
              <Route index element={<BrandDashboard />} />
              <Route path="products" element={<BrandProducts />} />
              <Route path="orders" element={<BrandOrders />} />
              <Route path="orders/:orderId" element={<BrandOrderDetails />} />
              <Route path="lookbook" element={<BrandLookbook />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="store" element={<BrandStore />} />
              <Route path="messages" element={<BrandMessages />} />
            </Route>
            
            <Route path="/buyer" element={<BuyerLayout />}>
              <Route index element={<BuyerDashboard />} />
              <Route path="orders" element={<BuyerOrders />} />
              <Route path="messages" element={<BuyerMessages />} />
              <Route path="additional-services" element={<BuyerAdditionalServices />} />
              <Route path="team" element={<BuyerTeam />} />
              <Route path="resources" element={<BuyerResources />} />
              <Route path="settings" element={<BuyerSettings />} />
            </Route>
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/invited/:userId" element={<ViewInvitedUser />} />
              <Route path="users/invited/:userId/edit" element={<EditInvitedUser />} />
              <Route path="paid-services" element={<AdminPaidServices />} />
              <Route path="agenda" element={<Agenda />} />
              <Route path="administration" element={<Administration />} />
            </Route>
            
            <Route path="/sales" element={<SalesLayout />}>
              <Route index element={<SalesDashboard />} />
              <Route path="performance" element={<SalesPerformance />} />
              <Route path="users" element={<SalesUsers />} />
              <Route path="messages" element={<SalesMessages />} />
              <Route path="settings" element={<SalesSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
