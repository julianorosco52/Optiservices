import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class Login extends Component {
  state = { email: "", password: "", error: "", redirect: false };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        email: this.state.email,
        password: this.state.password,
      });
      localStorage.setItem("token", res.data.token);
      this.setState({ redirect: true });
    } catch (err) {
      this.setState({ error: "Invalid credentials" });
    }
  };

  render() {
    if (this.state.redirect) return <Navigate to="/user-dashboard" />;

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-96"
          onSubmit={this.handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {this.state.error && (
            <p className="text-red-500 text-sm">{this.state.error}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mt-4 border rounded"
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mt-4 border rounded"
            onChange={this.handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 mt-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default React.memo(Login);
