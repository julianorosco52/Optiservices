import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import socket from "../utils/socket";
import { Send, Paperclip, MessageSquare } from "lucide-react";

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
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
    if (!newComment.trim()) return;
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
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-10 bg-gray-900 text-white">
        Ticket not found
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">
            {ticket.title}
          </h1>
          <p className="text-gray-400 mb-4">{ticket.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                ticket.status === "Open"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : ticket.status === "In Progress"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {ticket.status}
            </span>
            <span className="text-gray-500">
              Assigned to:{" "}
              <span className="font-medium text-gray-300">
                {ticket.assignedTo ? ticket.assignedTo.username : "Unassigned"}
              </span>
            </span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold flex items-center">
              <MessageSquare className="mr-2" />
              Comments
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">
                    {comment.userId.username.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-blue-400">
                        {comment.userId.username}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No comments yet.
              </div>
            )}
          </div>
          <div className="p-6 border-t border-gray-700">
            <form onSubmit={handleAddComment} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1 relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 pr-24 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Add a comment..."
                  required
                  rows="1"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                ></textarea>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button
                    type="submit"
                    className="p-2 text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed"
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
