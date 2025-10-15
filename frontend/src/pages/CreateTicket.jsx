import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTicketSuccess } from "../features/tickets/ticketSlice";
import api from "../utils/api";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("All fields are required!");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized access!");
        setIsSubmitting(false);
        return;
      }

      const res = await api.post("/api/tickets", { title, description });

      dispatch(createTicketSuccess(res.data));
      setTitle("");
      setDescription("");
      setSuccess("Ticket creado exitosamente! Redireccionando...");

      setTimeout(() => {
        navigate("/user-dashboard");
      }, 2000);
    } catch {
      setError("No se pudo crear el ticket. Inténtalo de nuevo!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
           Crear un ticket
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Titulo
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ingrese el titulo del ticket"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Describe el problema..."
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creando..." : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
