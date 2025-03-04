import React, { Component } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

class Login extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://role-based-ticketing-system-w2fw.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        this.context.login(data.token, data.role);
        this.setState({ redirect: true });
      } else {
        this.setState({ error: data.message });
      }
    } catch (error) {
      this.setState({ error: "Login failed. Try again." });
    }
  };

  render() {
    if (this.state.redirect) {
      return (
        <Navigate
          to={
            this.context.userRole === "admin"
              ? "/admin-dashboard"
              : "/user-dashboard"
          }
        />
      );
    }

    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          {this.state.error && (
            <p className="text-red-400 text-sm">{this.state.error}</p>
          )}

          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
