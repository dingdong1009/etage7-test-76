
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import BrandsPage from "./pages/BrandsPage";
import BuyersPage from "./pages/BuyersPage";
import ServicesPage from "./pages/ServicesPage";
import EventsPage from "./pages/EventsPage";
import ResourcesPage from "./pages/ResourcesPage";
import CuratedPage from "./pages/CuratedPage";
import AuthPage from "./pages/AuthPage";
import UsersManagementPage from "./pages/UsersManagementPage";
import PendingApprovalPage from "./pages/PendingApprovalPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Layout with Header and Footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/buyers" element={<BuyersPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/curated" element={<CuratedPage />} />
              <Route path="/pending-approval" element={<PendingApprovalPage />} />
              
              {/* Protected Routes - For Admin and Sales Manager */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "sales_manager"]} />}>
                <Route path="/users-management" element={<UsersManagementPage />} />
              </Route>
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
