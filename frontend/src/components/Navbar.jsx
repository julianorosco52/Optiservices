import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, Ticket, LogOut, User, Shield, Moon, Sun } from "lucide-react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      isDarkMode: localStorage.getItem("darkMode") === "true" || false,
    };
  }

  componentDidMount() {
    // Apply dark mode from local storage on mount
    if (this.state.isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }

  toggleMenu = () => {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  toggleDarkMode = () => {
    this.setState(
      (prevState) => {
        const newDarkMode = !prevState.isDarkMode;
        localStorage.setItem("darkMode", newDarkMode);
        return { isDarkMode: newDarkMode };
      },
      () => {
        if (this.state.isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    );
  };

  handleLogout = (logout) => {
    logout();
    this.setState({ isMenuOpen: false });
  };

  render() {
    const { isDarkMode } = this.state;
    
    return (
      <AuthContext.Consumer>
        {({ isAuthenticated, userRole, logout }) => (
          <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <div className="container-custom mx-auto">
              <div className="flex justify-between items-center h-16">
                {/* Logo & Brand */}
                <div className="flex items-center">
                  <Link
                    to={isAuthenticated ? (userRole === "admin" ? "/admin-dashboard" : "/user-dashboard") : "/"}
                    className="flex items-center space-x-2"
                  >
                    <Ticket className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Role<span className="text-indigo-600 dark:text-indigo-400">Tix</span>
                    </span>
                  </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200"
                      >
                        Log In
                      </Link>
                      <Link
                        to="/signup"
                        className="btn btn-primary"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      {userRole === "admin" && (
                        <Link
                          to="/admin-dashboard"
                          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200"
                        >
                          <Shield className="h-5 w-5 mr-1" />
                          Admin
                        </Link>
                      )}
                      {userRole === "user" && (
                        <Link
                          to="/create-ticket"
                          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200"
                        >
                          <Ticket className="h-5 w-5 mr-1" />
                          New Ticket
                        </Link>
                      )}
                      <Link
                        to={userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200"
                      >
                        <User className="h-5 w-5 mr-1" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => this.handleLogout(logout)}
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-200"
                      >
                        <LogOut className="h-5 w-5 mr-1" />
                        Logout
                      </button>
                    </>
                  )}
                  
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={this.toggleDarkMode}
                    className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
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
                    onClick={this.toggleDarkMode}
                    className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label="Toggle dark mode"
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    onClick={this.toggleMenu}
                  >
                    {this.state.isMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {this.state.isMenuOpen && (
              <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-fade-in">
                <div className="container-custom py-3 space-y-2">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-200"
                        onClick={this.toggleMenu}
                      >
                        Log In
                      </Link>
                      <Link
                        to="/signup"
                        className="block py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors duration-200"
                        onClick={this.toggleMenu}
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      {userRole === "user" && (
                        <Link
                          to="/create-ticket"
                          className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-200"
                          onClick={this.toggleMenu}
                        >
                          <div className="flex items-center">
                            <Ticket className="h-5 w-5 mr-2" />
                            New Ticket
                          </div>
                        </Link>
                      )}
                      <Link
                        to={userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                        className="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-200"
                        onClick={this.toggleMenu}
                      >
                        <div className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          Dashboard
                        </div>
                      </Link>
                      <button
                        onClick={() => this.handleLogout(logout)}
                        className="block w-full text-left py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <LogOut className="h-5 w-5 mr-2" />
                          Logout
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </nav>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Navbar;
