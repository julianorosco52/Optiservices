import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto px-4">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo & About */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-blue-400">
                Ticketing System
              </h2>
              <p className="text-sm mt-2 max-w-md">
                A role-based ticketing system where users can submit and track
                tickets while admins manage them efficiently.
              </p>
            </div>

            {/* Quick Links */}
            <div className="mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-200">
                Quick Links
              </h3>
              <ul className="mt-2 space-y-2 text-center md:text-left">
                <li>
                  <Link to="/" className="hover:text-blue-400 transition">
                    Home
                  </Link>
                </li>
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
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-blue-400 transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-200">Follow Us</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="hover:text-blue-400 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="hover:text-blue-400 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-blue-400 transition">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Ticketing System. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
