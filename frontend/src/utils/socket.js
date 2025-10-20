import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


const SOCKET_URL = API_URL.replace("/api", "");

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
  autoConnect: false,
  auth: {
    token: null,
  },
});

export const connectSocket = (token) => {
  socket.auth.token = token;
  socket.connect();
};

export default socket;
