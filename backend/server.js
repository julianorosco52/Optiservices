import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express, { json } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const server = http.createServer(app);

const allowedOriginsEnv =
  process.env.ALLOWED_ORIGINS || "http://localhost:5173";
const allowedOrigins = allowedOriginsEnv.split(",").map((o) => o.trim());

const io = new Server(server, {
  cors: {
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Socket.io middleware for authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    socket.user = decoded;
    next();
  });
});

app.use(json());
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(helmet());

connectDB();

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
