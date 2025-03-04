import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class UserDashboard extends Component {
  state = { tickets: [], isLoading: true, error: null };

  async componentDidMount() {
    await this.fetchTickets();
  }

  fetchTickets = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ isLoading: false, error: "User not authenticated." });
      return;
    }

    try {
      const res = await axios.get(
        "https://role-based-ticketing-system-w2fw.onrender.com/api/tickets",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const tickets = Array.isArray(res.data) ? res.data : [];
      this.setState({ tickets, isLoading: false });
    } catch (err) {
      console.error("Error fetching tickets:", err);
      this.setState({
        isLoading: false,
        error: "Failed to load tickets. Please try again.",
      });
    }
  };

  handleDelete = async (ticketId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      await axios.delete(
        `https://role-based-ticketing-system-w2fw.onrender.com/api/tickets/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove deleted ticket from state
      this.setState((prevState) => ({
        tickets: prevState.tickets.filter((ticket) => ticket._id !== ticketId),
      }));
    } catch (err) {
      console.error("Error deleting ticket:", err);
      alert("Failed to delete ticket. Please try again.");
    }
  };

  render() {
    const { tickets, isLoading, error } = this.state;

    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold text-center mb-6">🎟️ My Tickets</h1>

        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
          </div>
        )}

        {error && (
          <p className="text-center bg-red-600 text-white p-3 rounded-lg shadow">
            {error}
          </p>
        )}

        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="p-5 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-lg font-semibold text-blue-400">
                  {ticket.title}
                </h2>
                <p className="text-gray-300 mt-2">{ticket.description}</p>
                <div className="mt-4 flex justify-between items-center space-x-1">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded ${
                      ticket.status === "Open" ? "bg-green-500" : "bg-gray-600"
                    }`}
                  >
                    {ticket.status}
                  </span>
                  <button
                    onClick={() => this.handleDelete(ticket._id)}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <p className="text-center text-gray-400">No tickets found.</p>
          )
        )}

        <div className="mt-8 text-center">
          <Link to="/create-ticket">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-all shadow-md hover:shadow-lg">
              + Create Ticket
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default React.memo(UserDashboard);
