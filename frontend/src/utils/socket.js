import { io } from "socket.io-client";

const URL =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const socket = io(URL, {
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
