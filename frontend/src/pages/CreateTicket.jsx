import React, { Component } from "react";
import axios from "axios";

class CreateTicket extends Component {
  state = {
    title: "",
    description: "",
    error: null,
    success: null,
    isSubmitting: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: null });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description } = this.state;
    if (!title || !description) {
      this.setState({ error: "All fields are required!" });
      return;
    }

    this.setState({ isSubmitting: true });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        this.setState({ error: "Unauthorized access!", isSubmitting: false });
        return;
      }

      await axios.post(
        "https://role-based-ticketing-system-w2fw.onrender.com/api/tickets",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      this.setState({
        title: "",
        description: "",
        success: "Ticket created successfully!, Redirecting...",
        isSubmitting: false,
      });

      setTimeout(() => {
        this.props.navigate("/user-dashboard");
      }, 2000);
    } catch (error) {
      this.setState({
        error: "Failed to create ticket. Try again!",
        isSubmitting: false,
      });
    }
  };

  render() {
    const { title, description, error, success, isSubmitting } = this.state;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
        <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
            🎫 Create a Ticket
          </h2>

          {error && (
            <p className="bg-red-600 text-white text-center p-2 rounded mb-4">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-500 text-white text-center p-2 rounded mb-4">
              {success}
            </p>
          )}

          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter ticket title"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={this.handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Describe the issue..."
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Create Ticket"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTicket;
