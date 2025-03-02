const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  createTicket,
  getTickets,
  updateTicket,
} = require("../controllers/ticketController");

router.post("/", authMiddleware, createTicket);

router.get("/", authMiddleware, getTickets);

router.put("/:id", authMiddleware, updateTicket);

module.exports = router;
