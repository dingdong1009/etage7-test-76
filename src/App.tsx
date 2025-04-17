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

// Admin components
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminContracts from "./pages/admin/Contracts";
import AdminPages from "./pages/admin/Pages";
import AdminAnnouncements from "./pages/admin/Announcements";
import AdminSettings from "./pages/admin/Settings";
import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminAdditionalServices from "./pages/admin/AdditionalServices";
import AdminResources from "./pages/admin/Resources";

// Brand components
import BrandLayout from "./components/brand/BrandLayout";
import BrandDashboard from "./pages/brand/Dashboard";
import BrandProducts from "./pages/brand/Products";
import BrandOrders from "./pages/brand/Orders";
import BrandOrderDetails from "./pages/brand/OrderDetails";
import BrandLookbook from "./pages/brand/Lookbook";
import BrandAdditionalServices from "./pages/brand/AdditionalServices";
import BrandTeam from "./pages/brand/Team";
import BrandStore from "./pages/brand/Store";
import BrandMessages from "./pages/brand/Messages";
import BrandSubscriptions from "./pages/brand/Subscriptions";
import BrandResources from "./pages/brand/Resources";
import BrandSettings from "./pages/brand/Settings";

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
            
            {/* Brand portal routes */}
            <Route path="/brand" element={<BrandLayout />}>
              <Route index element={<BrandDashboard />} />
              <Route path="products" element={<BrandProducts />} />
              <Route path="orders" element={<BrandOrders />} />
              <Route path="orders/:orderId" element={<BrandOrderDetails />} />
              <Route path="lookbook" element={<BrandLookbook />} />
              <Route path="additional-services" element={<BrandAdditionalServices />} />
              <Route path="team" element={<BrandTeam />} />
              <Route path="store" element={<BrandStore />} />
              <Route path="messages" element={<BrandMessages />} />
              <Route path="subscriptions" element={<BrandSubscriptions />} />
              <Route path="resources" element={<BrandResources />} />
              <Route path="settings" element={<BrandSettings />} />
            </Route>
            
            {/* Buyer portal routes */}
            <Route path="/buyer" element={<BuyerLayout />}>
              <Route index element={<BuyerDashboard />} />
              <Route path="orders" element={<BuyerOrders />} />
              <Route path="messages" element={<BuyerMessages />} />
              <Route path="additional-services" element={<BuyerAdditionalServices />} />
              <Route path="team" element={<BuyerTeam />} />
              <Route path="resources" element={<BuyerResources />} />
              <Route path="settings" element={<BuyerSettings />} />
            </Route>
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="contracts" element={<AdminContracts />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="subscriptions" element={<AdminSubscriptions />} />
              <Route path="additional-services" element={<AdminAdditionalServices />} />
              <Route path="resources" element={<AdminResources />} />
            </Route>
            
            {/* Sales routes */}
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
