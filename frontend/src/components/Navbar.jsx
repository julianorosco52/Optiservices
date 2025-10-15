import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../features/auth/authSlice";
import { Menu, X, Ticket, LogOut, User, Shield, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-background-light-ui dark:bg-background-dark-ui shadow-sm border-b-2 border-blue-800 dark:border-blue-700 sticky top-1 z-50">
      <div className="container-custom mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link
              to={
                isAuthenticated
                  ? user?.role === "admin"
                    ? "/admin-dashboard"
                    : "/user-dashboard"
                  : "/"
              }
              className="flex items-center space-x-2"
            >
              <Ticket className="h-6 w-6 text-blue-800 dark:text-white" />
              <span className="text-xl font-bold text-blue-800 dark:text-text-dark">
                Optiservices
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 "
                >
                  Iniciar sesión
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={
                    user?.role === "admin"
                      ? "/admin-dashboard"
                      : "/user-dashboard"
                  }
                  className="flex items-center text-text-muted hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  <User className="h-5 w-5 mr-1" />
                  Panel principal
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-text-muted hover:text-accent-error font-medium transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Cerrar sesión
                </button>
              </>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-white hover:bg-blue-300 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-text-muted hover:bg-secondary transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              className="p-2 rounded-md text-text-muted hover:bg-secondary transition-colors duration-200"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-light-ui dark:bg-background-dark-ui border-t border-secondary animate-fade-in">
          <div className="container-custom py-3 space-y-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 text-text-muted hover:bg-secondary rounded-lg font-medium transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 px-4 text-text-dark bg-primary hover:bg-opacity-90 rounded-lg font-medium transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {user?.role === "user" && (
                  <Link
                    to="/create-ticket"
                    className="block py-2 px-4 text-text-muted hover:bg-secondary rounded-lg font-medium transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center">
                      <Ticket className="h-5 w-5 mr-2" />
                      Nuevo Ticket
                    </div>
                  </Link>
                )}
                <Link
                  to={
                    user?.role === "admin"
                      ? "/admin-dashboard"
                      : "/user-dashboard"
                  }
                  className="block py-2 px-4 text-text-muted hover:bg-secondary rounded-lg font-medium transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Dashboard
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 text-text-muted hover:bg-secondary rounded-lg font-medium transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Cerrar sesión
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

