
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
              <Route path="*" element={<NotFound />} />
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
