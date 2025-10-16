import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getTicketsSuccess,
  deleteTicketSuccess,
  updateTicketSuccess,
} from "../features/tickets/ticketSlice";
import api from "../utils/api";
import socket from "../utils/socket";
import {
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Trash2,
  Calendar,
} from "lucide-react";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get(
          `/tickets?page=${page}&limit=10&status=${filterStatus}&search=${searchTerm}`
        );
        dispatch(getTicketsSuccess(res.data.tickets));
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchTickets();

    const onUpdated = (updatedTicket) => {
      dispatch(updateTicketSuccess(updatedTicket));
    };

    const onDeleted = (deletedTicketId) => {
      dispatch(deleteTicketSuccess(deletedTicketId));
    };

    socket.on("ticket:updated", onUpdated);
    socket.on("ticket:deleted", onDeleted);

    return () => {
      socket.off("ticket:updated", onUpdated);
      socket.off("ticket:deleted", onDeleted);
    };
  }, [page, filterStatus, searchTerm, dispatch]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDeleteTicket = async (id) => {
    try {
      await api.delete(`/tickets/${id}`);
      dispatch(deleteTicketSuccess(id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Abierto: {
        icon: <Clock className="h-4 w-4 mr-1" />,
        label: "Abierto",
        class:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      },
      "En curso": {
        icon: <AlertTriangle className="h-4 w-4 mr-1" />,
        label: "En curso",
        class:  
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      Cerrado: {
        icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
        label: "Cerrado",
        class:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      },
    };

    const config = statusConfig[status] || statusConfig["Abierto"];

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      <div className="container-custom py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-white">
              Mis reportes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Realice un seguimiento y control de sus reportes fácilmente.
            </p>
          </div>
          <Link
            to="/create-ticket"
            className="btn btn-primary mt-4 sm:mt-0 inline-flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            Nuevo Ticket
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder="     Buscar tickets..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <select
                className="input py-2 max-w-xs"
                value={filterStatus}
                onChange={handleFilterChange}
              >
                <option value="Estados">Estados</option>
                <option value="Abierto">Abierto</option>
                <option value="En curso">En curso</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Loading your tickets...
            </p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="h-24 w-24 mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300 dark:text-gray-600"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No se encontraron tickets
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
              {searchTerm || filterStatus !== "all"
                ? "Intente buscar por filtro"
                : "You don't have any support tickets yet"}
            </p>
            <Link
              to="/create-ticket"
              className="btn btn-primary inline-flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Crear nuevo ticket
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Ticket
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {ticket.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {ticket.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
                          {formatDate(ticket.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left">
                          <Link
                            to={`/tickets/${ticket._id}`}
                            className="text-blue-500 hover:underline mr-4"
                          >
                            Ver detalles
                          </Link>
                          <button
                            onClick={() => handleDeleteTicket(ticket._id)}
                            className="flex items-center text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 mr-2"
          >
            Anterior
          </button>
          <span className="p-2">
            Pagina  {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 ml-2"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
