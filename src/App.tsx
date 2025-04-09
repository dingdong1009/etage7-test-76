
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Sales components
import SalesLayout from "./components/sales/SalesLayout";
import SalesDashboard from "./pages/sales/Dashboard";
import SalesPerformance from "./pages/sales/Performance";
import SalesUsers from "./pages/sales/Users";
import SalesMessages from "./pages/sales/Messages";
import SalesSettings from "./pages/sales/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/brands" element={<Layout><BrandsPage /></Layout>} />
          <Route path="/buyers" element={<Layout><BuyersPage /></Layout>} />
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
          <Route path="/events" element={<Layout><EventsPage /></Layout>} />
          <Route path="/resources" element={<Layout><ResourcesPage /></Layout>} />
          <Route path="/curated" element={<Layout><CuratedPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/thank-you" element={<Layout><ThankYouPage /></Layout>} />
          <Route path="/reset-password" element={<Layout><ResetPasswordPage /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="contracts" element={<AdminContracts />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="subscriptions" element={<AdminSubscriptions />} />
          </Route>
          
          {/* Sales Routes */}
          <Route path="/sales" element={<SalesLayout />}>
            <Route index element={<SalesDashboard />} />
            <Route path="performance" element={<SalesPerformance />} />
            <Route path="users" element={<SalesUsers />} />
            <Route path="messages" element={<SalesMessages />} />
            <Route path="settings" element={<SalesSettings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
