import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  handleLogout = (logout) => {
    logout();
    this.setState({ isMenuOpen: false });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ isAuthenticated, userRole, logout }) => (
          <nav className="bg-gray-900 text-white shadow-lg border-b-amber-100">
            <div className="container mx-auto flex justify-between items-center p-4">
              {!isAuthenticated && (
                <Link
                  to="/"
                  className="text-2xl font-bold font-mono italic text-blue-400"
                >
                  RoleTix{" "}
                </Link>
              )}
              {isAuthenticated && userRole === "user" && (
                <Link
                  to="/user-dashboard"
                  className="text-2xl font-bold text-blue-400"
                >
                  User Dashboard
                </Link>
              )}
              {isAuthenticated && userRole === "admin" && (
                <Link
                  to="/admin-dashboard"
                  className="text-2xl font-bold text-blue-400 italic"
                >
                  Admin Dashboard
                </Link>
              )}

              {/* Desktop Menu */}
              <ul className="hidden md:flex space-x-6 text-lg">
                {!isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="hover:text-blue-400 transition"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="hover:text-blue-400 transition"
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      onClick={() => this.handleLogout(logout)}
                      className="hover:text-red-400 transition"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden focus:outline-none"
                onClick={this.toggleMenu}
              >
                {this.state.isMenuOpen ? (
                  <X size={28} className="text-white" />
                ) : (
                  <Menu size={28} className="text-white" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {this.state.isMenuOpen && (
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
                          onClick={() => this.handleLogout(logout)}
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
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Navbar;
