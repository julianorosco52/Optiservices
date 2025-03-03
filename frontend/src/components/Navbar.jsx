import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.getItem("token"),
      userRole: localStorage.getItem("role"),
      isMenuOpen: false,
    };
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.setState({ isAuthenticated: false, userRole: null });
    this.props.navigate("/login");
  };

  toggleMenu = () => {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  render() {
    const { isAuthenticated, userRole, isMenuOpen } = this.state;

    return (
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-400">
            Ticketing System
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-lg">
            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-400 transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-blue-400 transition">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                {userRole === "user" && (
                  <li>
                    <Link
                      to="/user-dashboard"
                      className="hover:text-blue-400 transition"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                {userRole === "admin" && (
                  <li>
                    <Link
                      to="/admin-dashboard"
                      className="hover:text-blue-400 transition"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={this.handleLogout}
                    className="hover:text-red-400 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={this.toggleMenu}
          >
            {isMenuOpen ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 p-4">
            <ul className="flex flex-col space-y-4 text-center">
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-blue-400 transition"
                      onClick={this.toggleMenu}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="hover:text-blue-400 transition"
                      onClick={this.toggleMenu}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {userRole === "user" && (
                    <li>
                      <Link
                        to="/user-dashboard"
                        className="hover:text-blue-400 transition"
                        onClick={this.toggleMenu}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {userRole === "admin" && (
                    <li>
                      <Link
                        to="/admin-dashboard"
                        className="hover:text-blue-400 transition"
                        onClick={this.toggleMenu}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        this.handleLogout();
                        this.toggleMenu();
                      }}
                      className="hover:text-red-400 transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

export default Navbar;
