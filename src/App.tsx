
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

  const routes = [
    {
      path: "/",
      element: <Layout><Home /></Layout>,
    },
    {
      path: "/about",
      element: <Layout><About /></Layout>,
    },
    {
      path: "/contact",
      element: <Layout><Contact /></Layout>,
    },
    {
      path: "/blog",
      element: <Layout><Blog /></Layout>,
    },
    {
      path: "/shop",
      element: <Layout><Shop /></Layout>,
    },
    {
      path: "/product-details/:id",
      element: <Layout><ProductDetails /></Layout>,
    },
    {
      path: "/login",
      element: !isLoggedIn ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "/register",
      element: !isLoggedIn ? <Register /> : <Navigate to="/" />,
    },
    {
      path: "/forgot-password",
      element: !isLoggedIn ? <ForgotPassword /> : <Navigate to="/" />,
    },
    {
      path: "/reset-password",
      element: !isLoggedIn ? <ResetPassword /> : <Navigate to="/" />,
    },
    {
      path: "/buyer",
      element: isLoggedIn && userType === "buyer" ? <BuyerLayout><BuyerDashboard /></BuyerLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandDashboard /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/products",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandProducts /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/orders",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandOrders /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/lookbook",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandLookbook /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/additional-services",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandAdditionalServices /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/team",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandTeam /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/store",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandStore /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/messages",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandMessages /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/subscriptions",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandSubscriptions /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/resources",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandResources /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/brand/settings",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><BrandSettings /></BrandLayout> : <Navigate to="/login" />,
    },
    {
      path: "/admin",
      element: isLoggedIn && userType === "salesManager" ? <AdminLayout><AdminDashboard /></AdminLayout> : <Navigate to="/login" />,
    },
    {
      path: "/admin/users",
      element: isLoggedIn && userType === "salesManager" ? <AdminLayout><Users /></AdminLayout> : <Navigate to="/login" />,
    },
    {
      path: "/admin/subscriptions",
      element: isLoggedIn && userType === "salesManager" ? <AdminLayout><Subscriptions /></AdminLayout> : <Navigate to="/login" />,
    },
    
    // Add the new Marketing route for brands
    {
      path: "/brand/marketing",
      element: isLoggedIn && userType === "brand" ? <BrandLayout><Marketing /></BrandLayout> : <Navigate to="/login" />,
    },
    
    // Add the new Email Credits management route for admin
    {
      path: "/admin/email-credits",
      element: isLoggedIn && userType === "salesManager" ? <AdminLayout><AdminEmailCredits /></AdminLayout> : <Navigate to="/login" />,
    },
  ];
  
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
