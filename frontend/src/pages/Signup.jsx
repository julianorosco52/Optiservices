import React, { Component } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

class Signup extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      role: "user",
      error: "",
      redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, role } = this.state;

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        this.context.login(data.token, data.role);
        this.setState({ redirect: true });
      } else {
        this.setState({ error: data.message || "Signup failed. Try again." });
      }
    } catch (error) {
      this.setState({ error: "Signup failed. Please try again later." });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

          {this.state.error && (
            <p className="text-red-400 text-sm text-center">
              {this.state.error}
            </p>
          )}

          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">Username</label>
              <input
                type="text"
                name="username"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={this.state.username}
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm">Select Role</label>
              <select
                name="role"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={this.state.role}
                onChange={this.handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
