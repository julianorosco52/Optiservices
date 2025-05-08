import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarWrapper from "./utils/NavbarWrapper";
import CreateTicketWrapper from "./utils/CreateTicketWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProviderWrapper from "./utils/AuthProviderWrapper";
import { Loader2 } from "lucide-react";

// Lazy load components for better performance
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Home = lazy(() => import("./pages/Home"));
const CreateTicket = lazy(() => import("./pages/CreateTicket"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400 mx-auto" />
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <AuthProviderWrapper>
        <div className="flex flex-col min-h-screen">
          <NavbarWrapper>
            <Navbar />
          </NavbarWrapper>

          <main className="flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/create-ticket" element={<CreateTicketWrapper />} />
                <Route 
                  path="*" 
                  element={
                    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
                      <div className="text-center max-w-md mx-auto px-4">
                        <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">404</h1>
                        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Sorry, the page you are looking for doesn't exist or has been moved.</p>
                      </div>
                    </div>
                  } 
                />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </AuthProviderWrapper>
    </Router>
  );
};

export default App;
