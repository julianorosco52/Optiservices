import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-gray-950 text-gray-300 py-6 border-t-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-blue-400">
                Ticketing System
              </h2>
              <p className="text-sm mt-2 max-w-md">
                A role-based ticketing system where users can submit and track
                tickets while admins manage them efficiently.
              </p>
            </div>

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
              </ul>
            </div>

            <div className="mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-200">Socials</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="https://github.com/Esam-jr"
                    className="hover:text-gray-400 transition"
                  >
                    <i className="fab fa-github-g">Github</i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/esmael-sabir/"
                    className="hover:text-blue-400 transition"
                  >
                    <i className="fab fa-linkedin-in">Linkedin</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Ticketing System. By Esam-jr
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
