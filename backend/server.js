import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express, { json } from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketsRoutes.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
