import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import socket from "../utils/socket";
import { AuthContext } from "../context/AuthContext";

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTicket(res.data.ticket);
        setComments(res.data.comments);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchTicketDetails();

    socket.connect();
    socket.on("comment:new", (comment) => {
      if (comment.ticketId === id) {
        setComments((prevComments) => [...prevComments, comment]);
      }
    });

    return () => {
      socket.disconnect();
      socket.off("comment:new");
    };
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/tickets/${id}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
      <p className="mb-4">{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Assigned to: {ticket.assignedTo ? ticket.assignedTo.username : "Unassigned"}</p>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id} className="mb-4 p-4 border rounded">
            <p className="font-bold">{comment.userId.username}</p>
            <p>{comment.text}</p>
            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} className="mt-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a comment"
          required
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default TicketDetails;
