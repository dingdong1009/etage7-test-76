
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import BrandsPage from "./pages/BrandsPage";
import BuyersPage from "./pages/BuyersPage";
import ServicesPage from "./pages/ServicesPage";
import EventsPage from "./pages/EventsPage";
import ResourcesPage from "./pages/ResourcesPage";
import CuratedPage from "./pages/CuratedPage";
import AuthPage from "./pages/AuthPage";
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import UsersManagementPage from "./pages/UsersManagementPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/registration-success" element={<RegistrationSuccessPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
            
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/brands" element={<Layout><BrandsPage /></Layout>} />
            <Route path="/buyers" element={<Layout><BuyersPage /></Layout>} />
            <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
            <Route path="/events" element={<Layout><EventsPage /></Layout>} />
            <Route path="/resources" element={<Layout><ResourcesPage /></Layout>} />
            <Route path="/curated" element={<Layout><CuratedPage /></Layout>} />
            
            <Route path="/manage-users" element={
              <Layout>
                <ProtectedRoute allowedRoles={["admin", "sales_manager"]}>
                  <UsersManagementPage />
                </ProtectedRoute>
              </Layout>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
