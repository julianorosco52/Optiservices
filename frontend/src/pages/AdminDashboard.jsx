import React, { Component } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

class AdminDashboard extends Component {
  state = {
    tickets: [],
    filteredTickets: [],
    statusFilter: "All",
    isLoading: true,
    error: null,
  };

  async componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        this.setState({ error: "Unauthorized access!", isLoading: false });
        return;
      }

      const res = await axios.get(
        "https://role-based-ticketing-system-w2fw.onrender.com/api/tickets",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const tickets = Array.isArray(res.data) ? res.data : [];
      this.setState({ tickets, filteredTickets: tickets, isLoading: false });
    } catch (error) {
      this.setState({ error: "Failed to load tickets.", isLoading: false });
    }
  };

  handleStatusChange = async (ticketId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://role-based-ticketing-system-w2fw.onrender.com/api/tickets/${ticketId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      this.setState((prevState) => {
        const updatedTickets = prevState.tickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        );
        return { tickets: updatedTickets, filteredTickets: updatedTickets };
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  handleFilterChange = (e) => {
    const status = e.target.value;
    this.setState({
      statusFilter: status,
      filteredTickets:
        status === "All"
          ? this.state.tickets
          : this.state.tickets.filter((ticket) => ticket.status === status),
    });
  };

  render() {
    const { tickets, filteredTickets, statusFilter, isLoading, error } =
      this.state;

    const statusCounts = {
      Open: tickets.filter((t) => t.status === "Open").length,
      "In Progress": tickets.filter((t) => t.status === "In Progress").length,
      Closed: tickets.filter((t) => t.status === "Closed").length,
    };

    const data = [
      { name: "Open", value: statusCounts.Open },
      { name: "In Progress", value: statusCounts["In Progress"] },
      { name: "Closed", value: statusCounts.Closed },
    ];

    const COLORS = ["#4CAF50", "#FFC107", "#FF5252"];

    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center mt-8">
          <p className="text-red-500">{error}</p>
          <button
            onClick={this.fetchTickets}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
          🛠️ Admin Dashboard
        </h1>

        {/* Analytics Chart */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center mb-4">
              📊 Ticket Analytics
            </h2>
            <PieChart width={470} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">🎟️ Tickets</h2>
          <select
            value={statusFilter}
            onChange={this.handleFilterChange}
            className="bg-gray-800 text-white p-2 rounded-lg border border-gray-700"
            aria-label="Filter tickets by status"
          >
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Tickets List */}
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-gray-800 p-4 mb-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold text-blue-300">
                {ticket.title}
              </h3>
              <p className="text-gray-300">{ticket.description}</p>
              <p className="text-gray-500">
                ⏲ Created At: {new Date(ticket.createdAt).toLocaleString()}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-3 py-1 rounded text-white font-semibold ${
                    ticket.status === "Open"
                      ? "bg-green-500"
                      : ticket.status === "In Progress"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {ticket.status}
                </span>

                <select
                  value={ticket.status}
                  onChange={(e) =>
                    this.handleStatusChange(ticket._id, e.target.value)
                  }
                  className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600"
                  aria-label="Change ticket status"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tickets found.</p>
        )}
      </div>
    );
  }
}

export default AdminDashboard;
