import React, { Suspense, lazy, Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarWrapper from "./components/NavbarWrapper";
import Footer from "./components/Footer";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Home = lazy(() => import("./pages/Home"));

class App extends Component {
  render() {
    return (
      <Router>
        <NavbarWrapper />
        <Suspense
          fallback={<div className="text-center text-lg">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    );
  }
}

export default App;
