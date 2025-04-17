
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";

// Mock page components for the pages that are missing
const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;
const Blog = () => <div>Blog Page</div>;
const Shop = () => <div>Shop Page</div>;
const ProductDetails = () => <div>Product Details Page</div>;
const BuyerDashboard = () => <div>Buyer Dashboard</div>;
const BrandDashboard = () => <div>Brand Dashboard</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;
const Users = () => <div>Users Page</div>;
const Subscriptions = () => <div>Subscriptions Page</div>;
const Login = () => <div>Login Page</div>;
const Register = () => <div>Register Page</div>;
const ForgotPassword = () => <div>Forgot Password Page</div>;
const ResetPassword = () => <div>Reset Password Page</div>;
const BrandProducts = () => <div>Brand Products</div>;
const BrandOrders = () => <div>Brand Orders</div>;
const BrandLookbook = () => <div>Brand Lookbook</div>;
const BrandAdditionalServices = () => <div>Brand Additional Services</div>;
const BrandTeam = () => <div>Brand Team</div>;
const BrandStore = () => <div>Brand Store</div>;
const BrandMessages = () => <div>Brand Messages</div>;
const BrandSubscriptions = () => <div>Brand Subscriptions</div>;
const BrandResources = () => <div>Brand Resources</div>;
const BrandSettings = () => <div>Brand Settings</div>;
const AdminEmailCredits = () => <div>Admin Email Credits</div>;

import BuyerLayout from "./components/buyer/BuyerLayout";
import BrandLayout from "./components/brand/BrandLayout";
import AdminLayout from "./components/admin/AdminLayout";

// Import the Marketing component
import Marketing from "./pages/brand/Marketing";

// Mock auth context
const useAuth = () => {
  return {
    isLoggedIn: true,
    userType: "brand"
  };
};

function App() {
  const { isLoggedIn, userType } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
        </Route>

        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={!isLoggedIn ? <ForgotPassword /> : <Navigate to="/" />} />
        <Route path="/reset-password" element={!isLoggedIn ? <ResetPassword /> : <Navigate to="/" />} />

        {/* Buyer Routes */}
        <Route 
          path="/buyer" 
          element={isLoggedIn && userType === "buyer" ? <BuyerLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<BuyerDashboard />} />
        </Route>

        {/* Brand Routes */}
        <Route 
          path="/brand" 
          element={isLoggedIn && userType === "brand" ? <BrandLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<BrandDashboard />} />
          <Route path="products" element={<BrandProducts />} />
          <Route path="orders" element={<BrandOrders />} />
          <Route path="lookbook" element={<BrandLookbook />} />
          <Route path="additional-services" element={<BrandAdditionalServices />} />
          <Route path="team" element={<BrandTeam />} />
          <Route path="store" element={<BrandStore />} />
          <Route path="messages" element={<BrandMessages />} />
          <Route path="subscriptions" element={<BrandSubscriptions />} />
          <Route path="resources" element={<BrandResources />} />
          <Route path="settings" element={<BrandSettings />} />
          <Route path="marketing" element={<Marketing />} />
        </Route>

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={isLoggedIn && userType === "salesManager" ? <AdminLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="email-credits" element={<AdminEmailCredits />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
