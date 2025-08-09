import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  assignTicket,
  addComment
} from "../controllers/ticketController.js";
import authMiddleware from "../middleware/auth.js";
import {
  createTicketValidation,
  updateTicketValidation,
  addCommentValidation
} from "../middleware/validators/ticketValidators.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createTicketValidation,
  handleValidationErrors,
  createTicket
);

router.get("/", authMiddleware, getTickets);

router.get("/:id", authMiddleware, getTicketById);

router.put(
  "/:id",
  authMiddleware,
  updateTicketValidation,
  handleValidationErrors,
  updateTicket
);

router.put("/:id/assign", authMiddleware, assignTicket);

router.post(
  "/:id/comments",
  authMiddleware,
  addCommentValidation,
  handleValidationErrors,
  addComment
);

router.delete("/:id", authMiddleware, deleteTicket);

export default router;
