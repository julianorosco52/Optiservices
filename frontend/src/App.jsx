import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./utils/Layout";
import LoadingFallback from "./components/LoadingFallback";
import { connectSocket } from "./utils/socket";

// Lazy load components for better performance
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Home = lazy(() => import("./pages/Home"));
const CreateTicket = lazy(() => import("./pages/CreateTicket"));
const TicketDetails = lazy(() => import("./pages/TicketDetails"));

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      connectSocket(token);
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />
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
      </Layout>
    </Router>
  );
};

export default App;
