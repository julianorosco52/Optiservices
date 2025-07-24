import { io } from "socket.io-client";

const URL = "http://localhost:5000"; // Your backend URL

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
