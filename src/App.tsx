import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import BuyerLayout from "./components/buyer/BuyerLayout";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BrandLayout from "./components/brand/BrandLayout";
import BrandDashboard from "./pages/brand/BrandDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Subscriptions from "./pages/admin/Subscriptions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useAuth } from './contexts/AuthContext';
import BrandProducts from './pages/brand/BrandProducts';
import BrandOrders from './pages/brand/BrandOrders';
import BrandLookbook from './pages/brand/BrandLookbook';
import BrandAdditionalServices from './pages/brand/BrandAdditionalServices';
import BrandTeam from './pages/brand/BrandTeam';
import BrandStore from './pages/brand/BrandStore';
import BrandMessages from './pages/brand/BrandMessages';
import BrandSubscriptions from './pages/brand/BrandSubscriptions';
import BrandResources from './pages/brand/BrandResources';
import BrandSettings from './pages/brand/BrandSettings';

// Import the new routes
import Marketing from "./pages/brand/Marketing";
import AdminEmailCredits from "./pages/admin/EmailCredits";

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
      element: <BrandLayout><Marketing /></BrandLayout>,
    },
    
    // Add the new Email Credits management route for admin
    {
      path: "/admin/email-credits",
      element: <AdminLayout><AdminEmailCredits /></AdminLayout>,
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
