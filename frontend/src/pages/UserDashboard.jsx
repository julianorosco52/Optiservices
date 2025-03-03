import React, { Component } from "react";
import axios from "axios";

class UserDashboard extends Component {
  state = { tickets: [] };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get("/api/tickets", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => this.setState({ tickets: res.data }))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">My Tickets</h1>
        {this.state.tickets.length > 0 ? (
          this.state.tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-4 my-4 bg-gray-100 rounded-lg shadow"
            >
              <h2 className="font-semibold">{ticket.title}</h2>
              <p>{ticket.description}</p>
              <span
                className={`px-2 py-1 rounded text-white ${
                  ticket.status === "Open" ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                {ticket.status}
              </span>
            </div>
          ))
        ) : (
          <p>No tickets found.</p>
        )}
      </div>
    );
  }
}

export default React.memo(UserDashboard);
