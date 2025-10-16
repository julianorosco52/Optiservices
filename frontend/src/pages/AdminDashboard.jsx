import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTicketsSuccess,
  updateTicketSuccess,
} from "../features/tickets/ticketSlice";
import api from "../utils/api";
import socket from "../utils/socket";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Users,
  BarChart,
  Ticket as TicketIcon,
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const [stats, setStats] = useState({
    total: 0,
    abierto: 0,
    enCurso: 0,
    cerrado: 0,
  });
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [ticketsRes, adminsRes] = await Promise.all([
          api.get(
            `/tickets?page=${page}&limit=10&status=${filterStatus}&search=${searchTerm}`
          ),
          api.get("/users/admins"),
        ]);

        dispatch(getTicketsSuccess(ticketsRes.data.tickets));
        setTotalPages(ticketsRes.data.totalPages);
        setAdmins(adminsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInitialData();

    const onUpdated = (updatedTicket) => {
      dispatch(updateTicketSuccess(updatedTicket));
    };
    const onAssigned = (assignedTicket) => {
      dispatch(updateTicketSuccess(assignedTicket));
    };

    socket.on("ticket:updated", onUpdated);
    socket.on("ticket:assigned", onAssigned);

    return () => {
      socket.off("ticket:updated", onUpdated);
      socket.off("ticket:assigned", onAssigned);
    };
  }, [page, filterStatus, searchTerm, dispatch]);

  useEffect(() => {
    const abierto = tickets.filter((t) => t.status === "Abierto").length;
    const enCurso = tickets.filter((t) => t.status === "En curso").length;
    const cerrado = tickets.filter((t) => t.status === "Cerrado").length;
    setStats({ total: tickets.length, abierto, enCurso, cerrado });
  }, [tickets]);

  const handleAssignTicket = async (ticketId, adminId) => {
    try {
      await api.put(`/tickets/${ticketId}/assign`, { adminId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (ticketId, status) => {
    try {
      await api.put(`/tickets/${ticketId}`, { status });
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = [
    { name: "Abierto", count: stats.abierto },
    { name: "En curso", count: stats.enCurso },
    { name: "Cerrado", count: stats.cerrado },
  ];

  const StatCard = ({ icon, label, value, color }) => (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4`}
    >
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-white mb-6">
          Panel de administrador
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<TicketIcon className="h-6 w-6 text-blue-600" />}
            label="Total de tickets"
            value={stats.total}
            color="bg-blue-100 dark:bg-blue-900/30"
          />
          <StatCard
            icon={<Clock className="h-6 w-6 text-yellow-600" />}
            label="Abierto"
            value={stats.abierto}
            color="bg-yellow-100 dark:bg-yellow-900/30"
          />
          <StatCard
            icon={<AlertTriangle className="h-6 w-6 text-orange-600" />}
            label="En curso"
            value={stats.enCurso}
            color="bg-orange-100 dark:bg-orange-900/30"
          />
          <StatCard
            icon={<CheckCircle2 className="h-6 w-6 text-green-600" />}
            label="Cerrado"
            value={stats.cerrado}
            color="bg-green-100 dark:bg-green-900/30"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart className="h-6 w-6 mr-2" />
              Descripción general del estado del ticket
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-gray-200 dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="name"
                  className="text-xs text-gray-600 dark:text-gray-400"
                />
                <YAxis className="text-xs text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(5px)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    color: "#1f2937",
                  }}
                  cursor={{ fill: "rgba(239, 246, 255, 0.5)" }}
                />
                <Legend iconType="circle" iconSize={10} />
                <Bar
                  dataKey="count"
                  fill="#1E63C9"
                  name="Tickets"
                  radius={[4, 4, 0, 0]}
                  barSize={80}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Administradores
            </h2>
            <ul className="space-y-3">
              {admins.map((admin) => (
                <li
                  key={admin._id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <span className="text-gray-800 dark:text-gray-200">
                    {admin.username}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {admin.email}
                  </span>
                </li>
              ))}
            </ul>
          </div>
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <select
                className="input py-2 max-w-xs"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="Estados">Estados</option>
                <option value="Abierto">Abierto</option>
                <option value="En curso">En curso</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Asignado a
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Comportamiento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {ticket.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {ticket.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={ticket.status}
                        onChange={(e) =>
                          handleUpdateStatus(ticket._id, e.target.value)
                        }
                        className="input text-sm"
                      >
                        <option>Abierto</option>
                        <option>En curso</option>
                        <option>Cerrado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={ticket.assignedTo?._id || ""}
                        onChange={(e) =>
                          handleAssignTicket(ticket._id, e.target.value)
                        }
                        className="input text-sm"
                      >
                        <option value="">Sin asignar</option>
                        {admins.map((admin) => (
                          <option key={admin._id} value={admin._id}>
                            {admin.username}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`/tickets/${ticket._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Ver detalles
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

export default AdminDashboard;
