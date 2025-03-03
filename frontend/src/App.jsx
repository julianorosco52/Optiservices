import React, { Suspense, lazy, Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavbarWrapper from "./utils/NavbarWrapper";
import CreateTicketWrapper from "./utils/CreateTicketWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Home = lazy(() => import("./pages/Home"));

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <NavbarWrapper>
            <Navbar />
          </NavbarWrapper>

          <Suspense
            fallback={<div className="text-center text-lg">Loading...</div>}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/create-ticket" element={<CreateTicketWrapper />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Suspense>

          {/* Footer */}
          <Footer />
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
