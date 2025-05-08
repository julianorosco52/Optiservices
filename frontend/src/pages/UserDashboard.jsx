import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Calendar
} from "lucide-react";

const UserDashboard = () => {
  const { userEmail } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulated ticket data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const demoTickets = [
        {
          id: "T-1001",
          title: "Network connectivity issue",
          description: "Unable to connect to the company VPN from home",
          createdAt: "2023-05-12T10:30:00Z",
          status: "pending",
          priority: "high"
        },
        {
          id: "T-1002",
          title: "Email not syncing on mobile app",
          description: "The mobile app isn't showing new emails that I can see on desktop",
          createdAt: "2023-05-10T14:20:00Z",
          status: "in-progress",
          priority: "medium"
        },
        {
          id: "T-1003",
          title: "Request for software license",
          description: "Need Adobe Creative Suite for the marketing team project",
          createdAt: "2023-05-08T09:15:00Z",
          status: "resolved",
          priority: "low"
        },
        {
          id: "T-1004",
          title: "Printer not working in meeting room",
          description: "The printer in the main conference room isn't responding to print jobs",
          createdAt: "2023-05-05T16:45:00Z",
          status: "cancelled",
          priority: "medium"
        },
        {
          id: "T-1005",
          title: "New laptop request",
          description: "Current laptop is slow and outdated, requesting an upgrade",
          createdAt: "2023-05-01T11:00:00Z",
          status: "pending",
          priority: "high"
        }
      ];
      
      setTickets(demoTickets);
      setFilteredTickets(demoTickets);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter tickets based on search term and status filter
    let results = tickets;
    
    if (searchTerm) {
      results = results.filter(
        ticket => 
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== "all") {
      results = results.filter(ticket => ticket.status === filterStatus);
    }
    
    setFilteredTickets(results);
  }, [searchTerm, filterStatus, tickets]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Delete ticket
  const handleDeleteTicket = (id) => {
    // In a real app, this would be an API call
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        icon: <Clock className="h-4 w-4 mr-1" />,
        label: "Pending",
        class: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      },
      "in-progress": {
        icon: <AlertTriangle className="h-4 w-4 mr-1" />,
        label: "In Progress",
        class: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      },
      resolved: {
        icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
        label: "Resolved",
        class: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      },
      cancelled: {
        icon: <XCircle className="h-4 w-4 mr-1" />,
        label: "Cancelled",
        class: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  // Priority badge
  const PriorityBadge = ({ priority }) => {
    const priorityConfig = {
      high: {
        class: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        label: "High"
      },
      medium: {
        class: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
        label: "Medium"
      },
      low: {
        class: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        label: "Low"
      }
    };

    const config = priorityConfig[priority] || priorityConfig.medium;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      <div className="container-custom py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              My Support Tickets
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track and manage your support requests
            </p>
          </div>
          <Link
            to="/create-ticket"
            className="btn btn-primary mt-4 sm:mt-0 inline-flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            New Ticket
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder="Search tickets..."
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
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading your tickets...</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="h-24 w-24 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 dark:text-gray-600">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No tickets found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-5">{searchTerm || filterStatus !== "all" ? "Try adjusting your filters" : "You don't have any support tickets yet"}</p>
            <Link to="/create-ticket" className="btn btn-primary inline-flex items-center">
              <PlusCircle className="h-5 w-5 mr-1" />
              Create New Ticket
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ticket
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {ticket.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {ticket.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <PriorityBadge priority={ticket.priority} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
                          {formatDate(ticket.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => handleDeleteTicket(ticket.id)}
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
      </div>
    </div>
  );
};

export default UserDashboard;
