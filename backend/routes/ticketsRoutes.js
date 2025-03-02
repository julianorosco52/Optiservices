import express from "express";
const router = express.Router();
import {
  createTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticketController.js";
import authMiddleware from "../middleware/auth.js";

router.post("/", authMiddleware, createTicket);

router.get("/", authMiddleware, getTickets);

router.put("/:id", authMiddleware, updateTicket);

export default router;
