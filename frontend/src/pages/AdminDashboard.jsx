import React, { Component } from "react";
import axios from "axios";

class AdminDashboard extends Component {
  state = { tickets: [] };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get("/api/tickets", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => this.setState({ tickets: res.data }))
      .catch((err) => console.error(err));
  }

  updateStatus = (id, status) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `/api/tickets/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        this.setState((prevState) => ({
          tickets: prevState.tickets.map((t) =>
            t._id === id ? { ...t, status } : t
          ),
        }));
      });
  };

  render() {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">All Tickets</h1>
        {this.state.tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="p-4 my-4 bg-gray-100 rounded-lg shadow"
          >
            <h2 className="font-semibold">{ticket.title}</h2>
            <select
              onChange={(e) => this.updateStatus(ticket._id, e.target.value)}
              value={ticket.status}
              className="border p-1 rounded"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>
        ))}
      </div>
    );
  }
}

export default React.memo(AdminDashboard);
