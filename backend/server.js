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


// Configurar CORS

const allowedOriginsEnv =
  process.env.ALLOWED_ORIGINS || "http://localhost:5173,https://optiservices.vercel.app";
const allowedOrigins = allowedOriginsEnv.split(",").map((o) => o.trim());

const corsOptions = {
  origin: (origin, cb) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /vercel\.app$/.test(origin) // permite cualquier subdominio de vercel.app
    ) {
      return cb(null, true);
    }
    return cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};


// Configurar Socket.io

const io = new Server(server, {
  cors: corsOptions
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Error de autenticación"));

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error("Error de autenticación"));
    socket.user = decoded;
    next();
  });
});


// Middlewares

app.use(json());
app.use(cors(corsOptions)); // CORS para REST API
app.use(helmet());

connectDB();

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("La API se está ejecutando...");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
